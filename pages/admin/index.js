


export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } else if (req.method === "POST") {
      const { name, description, price, imageUrl } = req.body;

      if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          imageUrl,
        },
      });

      res.status(201).json(product);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
