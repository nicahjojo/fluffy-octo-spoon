import { useState } from "react";

export default function Home() {
  const [products] = useState([
    { id: 1, title: "Novels", price: 35000, image: "/images/books.jpg", description: "Romantic,Fantasy, Sci-fi novels all genres available" },
    { id: 2, title: "Children clothes", price: 30000, image: "/images/c.clothes.jpg", description: "Varriety of children clothings available" },
    { id: 3, title: "Women clothes", price: 32000, image: "/images/f.clothes.jpg", description: "Varriety of women clothings available" },
    { id: 4, title: "Men clothes", price: 31000, image: "/images/m.clothes.jpg", description: "Varriety of men clothings available" },
    { id: 5, title: "Heels", price: 36000, image: "/images/heels.jpg", description: "Variety of stylish heels available" },
    { id: 6, title: "phones", price: 30000, image: "/images/phones.jpg", description: "Latest smartphone models available" },
    { id: 7, title: "Sneakers", price: 38000, image: "/images/sneakers.jpg", description: "Comfortable and trendy sneakers" },
    { id: 8, title: "Woven bag", price: 35000, image: "/images/woven.jpg", description: "Handcrafted woven bags" },
  ]);

  // Login / Signup form state
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    alert(`${authMode === "login" ? "Login" : "Signup"} attempted with ${email}`);
    setEmail("");
    setPassword("");
  };

  return (
    <main className="container mx-auto p-6">
      {/* Login / Signup Section */}
      <section className="max-w-md mx-auto mb-12 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {authMode === "login" ? "Login" : "Sign Up"}
        </h1>
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-semibold hover:opacity-90 transition"
          >
            {authMode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          {authMode === "login" ? (
            <>
              Don't have an account?{" "}
              <button className="text-blue-500 underline" onClick={() => setAuthMode("signup")}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="text-blue-500 underline" onClick={() => setAuthMode("login")}>
                Login
              </button>
            </>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <div className="overflow-hidden rounded w-40 h-40 mb-2">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h2 className="font-bold text-lg text-center">{p.title}</h2>
            <p className="text-gray-600 text-center">{p.description}</p>
            <p className="mt-2 font-semibold text-lg">
              KSh {(p.price / 100).toFixed(2)}
            </p>
            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push(p);
                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`${p.title} added to cart!`);
              }}
              className="bg-black text-white px-4 py-2 rounded mt-3 hover:opacity-90 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
