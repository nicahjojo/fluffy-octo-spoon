import React from "react";

export default function Cart({ cart = [], total = 0, handleCheckout, clearCart }) {
  return (
    <main className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-gray-500 text-center">Your cart is empty.</div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b py-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/images/default.jpg"}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Qty: {item.qty}</p>
                </div>
              </div>

              <div className="font-semibold text-lg sm:text-right">
                KSh {(item.price * item.qty / 100).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="mt-6 text-xl font-bold text-right">
            Total: <span className="text-black">KSh {(total / 100).toFixed(2)}</span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <button
              className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 transition"
              onClick={clearCart}
            >
              Clear
            </button>
          </div>
        </>
      )}
    </main>
  );
}
