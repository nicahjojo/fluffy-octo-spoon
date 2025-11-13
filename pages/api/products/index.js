import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } else if (req.method === "POST") {
      const { title, description, price, image } = req.body;
      if (!title || !price) return res.status(400).json({ error: "Title and price required" });

      const product = await prisma.product.create({
        data: { title, description, price, image },
      });

      res.status(201).json(product);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch/create product" });
  }
}
