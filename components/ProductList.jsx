import { useState } from "react";

export default function ProductList() {
  // Sample 8 products
  const [products] = useState([
    {
      id: 1,
      title: "Novels",
      description: "Romantic,Fantasy, Sci-fi novels all genres available",
      price: 35000,
      image: "/images/books.jpg",
    },
    {
      id: 2,
      title: "Children clothes",
      description: "Variety of clothes for children of all ages",
      price: 30000,
      image: "/images/c.clothes.jpg",
    },
    {
      id: 3,
      title: "Women clothes",
      description: "Variety of clothes for women of all ages",
      price: 32000,
      image: "/images/f.clothees.jpg",
    },
    {
      id: 4,
      title: "Men clothes",
      description: "Varriety of men clothings available",
      price: 31000,
      image: "/images/m.clothes.jpg",
    },
    {
      id: 5,
      title: "Heels",
      description: "Variety of heels for all occasions",
      price: 36000,
      image: "/images/heels.jpg",
    },
    {
      id: 6,
      title: "phones",
      description: "Latest smartphone models available",
      price: 30000,
      image: "/images/phones.jpg",
    },
    {
      id: 7,
      title: "Sneakers",
      description: "Comfortable and trendy sneakers",
      price: 38000,
      image: "/images/sneakers.jpg",
    },
    {
      id: 8,
      title: "Woven bag",
      description: "Handcrafted woven bags",
      price: 35000,
      image: "/images/woven-bag.jpg",
    },
  ]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow bg-white"
          >
            <img
              src={p.image || "/images/default.jpg"}
              alt={p.title}
              className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded mb-2"
            />
            <h2 className="font-bold text-lg text-center">{p.title}</h2>
            <p className="text-gray-600 text-center">{p.description}</p>
            <p className="mt-2 font-semibold text-black text-lg">
              KSh {(p.price / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
