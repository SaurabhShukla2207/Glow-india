export default function ContactUs() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-24 min-h-screen">
      <h1 className="text-4xl font-headline font-bold mb-8">Contact Us</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 font-body">
        <p>We'd love to hear from you. For any inquiries, support, or partnership opportunities, you can reach us through any of the channels below.</p>
        
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl mt-8">
          <h2 className="text-2xl font-bold mt-0 mb-4">Glow India Headquarters</h2>
          
          <div className="space-y-4">
            <p><strong>Operating Address:</strong><br />
            [Your Registered Business Address Here]<br />
            [Your City, State, Pincode]<br />
            India</p>
            
            <p><strong>Email:</strong><br />
            support@glowindia.online<br/>
            </p>

            <p><strong>Phone:</strong><br />
            +91 [Your 10-Digit Support Number] (Mon-Fri, 10 AM to 6 PM)
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8">Grievance Officer</h3>
        <p>In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:<br/>
        Name: [Officer Name]<br/>
        Email: grievance@glowindia.online
        </p>

      </div>
    </div>
  )
}