import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany(); // Clear old data

  await prisma.product.createMany({
    data: [
      { id: 1, title: "Novels", price: 35000, image: "/images/books.jpg", description: "Romantic,Fantasy, Sci-fi novels all genres available" },
    { id: 2, title: "Children clothes", price: 30000, image: "/images/c.clothes.jpg", description: "Varriety of children clothings available" },
    { id: 3, title: "Women clothes", price: 32000, image: "/images/f.clothes.jpg", description: "Varriety of women clothings available" },
    { id: 4, title: "Men clothes", price: 31000, image: "/images/m.clothes.jpg", description: "Varriety of men clothings available" },
    { id: 5, title: "Heels", price: 36000, image: "/images/heels.jpg", description: "Variety of stylish heels available" },
    { id: 6, title: "phones", price: 30000, image: "/images/phones.jpg", description: "Latest smartphone models available" },
    { id: 7, title: "Sneakers", price: 38000, image: "/images/sneakers.jpg", description: "Comfortable and trendy sneakers" },
    { id: 8, title: "Woven bag", price: 35000, image: "/images/woven.jpg", description: "Handcrafted woven bags" }, 
    ],
  });

  console.log("✅ Products seeded successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
