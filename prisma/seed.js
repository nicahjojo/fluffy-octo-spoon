import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear old data
  await prisma.product.deleteMany();

  // Add new products
  await prisma.product.createMany({
    data: [
      {
        title: "Novels",
        price: 35000,
        image: "/images/books.jpg",
        description: "Romantic, Fantasy, Sci-fi novels all genres available",
      },
      {
        title: "Children clothes",
        price: 30000,
        image: "/images/c.clothes.jpg",
        description: "Variety of children clothings available",
      },
      {
        title: "Women clothes",
        price: 32000,
        image: "/images/f.clothes.jpg",
        description: "Variety of women clothings available",
      },
      {
        title: "Men clothes",
        price: 31000,
        image: "/images/m.clothes.jpg",
        description: "Variety of men clothings available",
      },
      {
        title: "Heels",
        price: 36000,
        image: "/images/heels.jpg",
        description: "Variety of stylish heels available",
      },
      {
        title: "Phones",
        price: 30000,
        image: "/images/phones.jpg",
        description: "Latest smartphone models available",
      },
      {
        title: "Sneakers",
        price: 38000,
        image: "/images/sneakers.jpg",
        description: "Comfortable and trendy sneakers",
      },
      {
        title: "Woven bag",
        price: 35000,
        image: "/images/woven.jpg",
        description: "Handcrafted woven bags",
      },
    ],
  });

  console.log("✅ Products seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
