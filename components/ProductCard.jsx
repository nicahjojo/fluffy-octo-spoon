import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const img = product.images?.[0] || "/images/placeholder.png";
  const { addToCart } = useCart();

  return (
    <article className="rounded-lg shadow-md p-4 flex flex-col hover:shadow-xl transition-shadow bg-white">
      <Link href={`/products/${product.id}`}>
        <img
          src={img}
          alt={product.title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-3"
        />
      </Link>

      <h3 className="text-lg font-semibold truncate">{product.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>

      <div className="mt-2 font-bold text-black text-lg">
        KSh {(product.price / 100).toFixed(2)}
      </div>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Add to Cart
      </button>
    </article>
  );
}
