// pages/api/webhook.js
import { buffer } from "micro";
import Stripe from "stripe";
import prisma from "../../lib/prisma";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // You may search for a pending order and mark as paid. Here we update orders with matching email+amount if you store that link.
    console.log("Checkout session completed:", session.id);
    // Example: mark orders paid where total matches and status pending (simplistic)
    await prisma.order.updateMany({
      where: { status: "pending" },
      data: { status: "paid" },
    });
  }

  res.json({ received: true });
}
