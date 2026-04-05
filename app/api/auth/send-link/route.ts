import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!supabaseServiceKey) {
      return NextResponse.json({ error: 'Server configuration missing: Supabase Service Key' }, { status: 500 })
    }

    // Initialize Supabase Admin client with the service role key to bypass RLS and generate secure tokens
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get the origin dynamically
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // 1. Generate the official Magic Link natively inside Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        redirectTo: `${origin}/auth-confirm`
      }
    })

    if (error) {
      console.error('[Generate Link Error]:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Extract the raw token to build a secure PKCE-bypass client route
    const actionLink = data?.properties?.action_link
    let directClientLink = `${origin}/auth-confirm`
    if (actionLink) {
      const parsedUrl = new URL(actionLink)
      const token = parsedUrl.searchParams.get('token')
      if (token) {
        directClientLink = `${origin}/auth-confirm?token_hash=${token}&type=magiclink`
      }
    }

    if (!actionLink) {
      return NextResponse.json({ error: 'Failed to generate action link' }, { status: 500 })
    }

    // 2. Dispatch the exact URL natively via Resend API directly
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Glow India <noreply@glowindia.online>',
        to: [email],
        subject: 'Secure Sign In - Glow India',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1D2631; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin: 0;">Glow<span style="color: #1DA1F2;">India</span></h1>
            </div>
            
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
              <h2 style="color: #1D2631; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 16px; text-align: center;">Your secure login link</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px; text-align: center;">Click the button below to instantly sign in to your Glow India account. No password needed!</p>
              
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${directClientLink}" style="display: inline-block; background: linear-gradient(to right, #1DA1F2, #0ea5e9); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 9999px; box-shadow: 0 4px 14px 0 rgba(29, 161, 242, 0.39);">Sign In Securely</a>
              </div>
              
              <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0; text-align: center;">Or copy and paste this URL into your browser:<br/><br/>
                <a href="${directClientLink}" style="color: #1DA1F2; word-break: break-all;">${directClientLink}</a>
              </p>
            </div>
            
            <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; text-align: center;">
              This link expires in 1 hour. If you didn't request this email, please ignore it.
            </p>
          </div>
        `
      })
    })

    const resendResult = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('[Resend Error]:', resendResult)
      return NextResponse.json({ error: resendResult.message || 'Failed to dispatch email via Resend' }, { status: 500 })
    }

    // Success response
    return NextResponse.json({ success: true, message: 'Magic link dispatched successfully' }, { status: 200 })

  } catch (err: any) {
    console.error('[Send Link Unknown Error]:', err)
    return NextResponse.json({ error: 'Internal server error while processing magic link' }, { status: 500 })
  }
}
