import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={p.image || "/images/placeholder.png"}
              alt={p.title}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h2 className="font-bold text-lg text-center">{p.title}</h2>
            <p className="text-gray-600 text-center">{p.description}</p>
            <p className="mt-2 font-semibold text-lg">
              KSh {(p.price / 100).toFixed(2)}
            </p>
            <button
              onClick={() => handleAddToCart(p)}
              className="mt-3 px-4 py-2 bg-black text-white rounded hover:opacity-90 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
