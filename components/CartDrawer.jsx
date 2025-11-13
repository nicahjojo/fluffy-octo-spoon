import { useState } from "react";
import { X } from "lucide-react"; // optional: icon from lucide-react

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([
    // sample placeholder items
    { id: 1, name: "Red Velvet Cake", qty: 1, price: 650 },
    { id: 2, name: "Vanilla Yogurt", qty: 2, price: 300 },
  ]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        🛒 View Cart ({items.length})
      </button>

      {/* Drawer */}
      {isOpen && (
        <aside className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-80 bg-white h-full shadow-lg flex flex-col p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Your Cart</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                <X size={22} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-gray-500 text-center mt-10">
                  Your cart is empty
                </div>
              ) : (
                items.map((it) => (
                  <div
                    key={it.id}
                    className="flex justify-between items-center border-b py-3"
                  >
                    <div>
                      <p className="font-medium">{it.name}</p>
                      <p className="text-sm text-gray-500">Qty: {it.qty}</p>
                    </div>
                    <p className="font-semibold">
                      KSh {(it.price * it.qty).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Total and Buttons */}
            {items.length > 0 && (
              <>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>KSh {total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button className="bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                    Checkout
                  </button>
                  <button
                    onClick={() => setItems([])}
                    className="border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      )}
    </>
  );
}
