export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-24 min-h-screen">
      <h1 className="text-4xl font-headline font-bold mb-8">Cancellation & Refund Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 font-body">
        <p><strong>Last updated:</strong> April 2026</p>
        <p>Glow India believes in helping its customers as far as possible, and has therefore a liberal cancellation policy.</p>

        <h2 className="text-2xl font-bold mt-8">1. Cancellations</h2>
        <ul className="list-disc pl-6">
          <li>Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
          <li>Glow India does not accept cancellation requests for items that have already been shipped or are out for delivery.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">2. Refunds & Returns</h2>
        <ul className="list-disc pl-6">
          <li>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 2 days of receipt of the products.</li>
          <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 24 hours of receiving the product.</li>
          <li>For eligible refunds, the amount will be processed and credited back to the original payment source (via Razorpay) within 5-7 working days.</li>
        </ul>
      </div>
    </div>
  )
}