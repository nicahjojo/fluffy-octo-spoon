import { prisma } from "../../lib/prisma";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { cartItems, email } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Build Stripe line items
    const line_items = [];
    let totalAmount = 0;

    for (const item of cartItems) {
      const product = await prisma.product.findUnique({ where: { id: item.id } });
      if (!product) continue;

      line_items.push({
        price_data: {
          currency: "kes",
          product_data: { name: product.title, images: product.image ? [product.image] : [] },
          unit_amount: product.price,
        },
        quantity: item.qty,
      });

      totalAmount += product.price * item.qty;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: email || undefined,
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/cart`,
    });

    // Save order in database
    await prisma.order.create({
      data: {
        items: JSON.stringify(cartItems),
        total: totalAmount,
        stripeSessionId: session.id,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
}
