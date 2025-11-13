// pages/admin/products/index.js
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
    fetchProducts();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to delete product!");
    }
  }

  return (
    <main className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Products (Admin)</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-gray-500 text-center py-6">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded shadow p-4 flex flex-col md:flex-row items-center gap-4 hover:shadow-lg transition"
            >
              <img
                src={p.image || "/images/placeholder.png"}
                alt={p.title}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg">{p.title}</div>
                <div className="text-gray-600 mt-1">KSh {(p.price / 100).toFixed(2)}</div>
              </div>
              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="px-3 py-1 border rounded text-sm text-white bg-blue-600 hover:bg-blue-500 transition text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 border rounded text-sm text-white bg-red-600 hover:bg-red-500 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
