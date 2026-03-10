export const dynamic = 'force-dynamic';

const Stripe = require('stripe');
const { pool } = require('../../../../lib/db');

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      await pool.query(
        `UPDATE registrations 
         SET payment_status = 'paid', 
             stripe_payment_id = $1 
         WHERE email = $2 
         AND payment_status = 'pending'`,
        [paymentIntent.id, paymentIntent.receipt_email]
      );
    }

    return Response.json({ received: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}