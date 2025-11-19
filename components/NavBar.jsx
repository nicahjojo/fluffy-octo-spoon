import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Nicah's Shop</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link href="/cart" className="hover:text-gray-300 transition-colors">Cart</Link>
          <Link href="/admin" className="hover:text-gray-300 transition-colors">Admin</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/cart" className="block hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Cart</Link>
          <Link href="/admin" className="block hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
}
