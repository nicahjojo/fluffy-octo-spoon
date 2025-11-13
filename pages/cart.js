import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart items from localStorage when the page loads
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Remove an item from the cart
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Calculate total price
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-gray-500 text-center text-lg">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.image || "/images/default.jpg"}
                  alt={item.title}
                  className="w-40 h-40 object-cover rounded mb-3"
                />
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-600 mb-1">{item.description}</p>
                <p className="font-bold text-lg text-black">
                  KSh {(item.price / 100).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-3 hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold mb-3">
              Total: KSh {(getTotal() / 100).toFixed(2)}
            </h2>
            <button
              onClick={clearCart}
              className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-black transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
