import React, { useState } from "react";
import axios from "axios";

export default function AdminProductForm({ initial = {}, onSuccess }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [price, setPrice] = useState(initial.price ? initial.price / 100 : "");
  const [image, setImage] = useState(initial.image || "");
  const [uploading, setUploading] = useState(false);

  // Handle file selection (local images in /public/images)
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(`/images/${file.name}`); // Use local image path
    }
  };

  // Submit product to database
  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title,
      description,
      price: Math.round(parseFloat(price) * 100),
      image,
    };

    try {
      const url = initial.id ? `/api/products/${initial.id}` : "/api/products";
      const method = initial.id ? "put" : "post";
      const res = await axios[method](url, payload);

      if (onSuccess) onSuccess(res.data);
      alert("✅ Product saved successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to save product!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-5"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        {initial.id ? "Edit Product" : "Add New Product"}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-black"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-black"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price (KSh)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-32 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-black"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input type="file" accept="image/*" onChange={handleImageSelect} />
        {uploading && <div className="text-sm text-gray-600">Uploading...</div>}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-3 w-40 h-40 object-cover rounded shadow"
          />
        )}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
