// pages/api/products/[id].js
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const id = parseInt(req.query.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  if (req.method === "GET") {
    const product = await prisma.product.findUnique({ where: { id } });
    return res.json(product);
  }

  if (req.method === "PUT") {
    const { title, description, price, image } = req.body;
    const updated = await prisma.product.update({
      where: { id },
      data: { title, description, price, image },
    });
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    await prisma.product.delete({ where: { id } });
    return res.json({ success: true });
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end("Method Not Allowed");
}
