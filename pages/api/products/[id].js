// pages/admin/products/[id].js
import AdminProductForm from "../../../components/AdminProductForm";
import { prisma } from "../../../lib/prisma"; // server-side import for getServerSideProps
import axios from "axios";

export async function getServerSideProps({ params }) {
  const id = parseInt(params.id || 0, 10);
  // fetch product server-side using prisma to seed initial values
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { notFound: true };
  // convert to plain object
  return { props: { product } };
}

export default function EditProduct({ product }) {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <AdminProductForm initial={product} onSuccess={() => window.location.href = "/admin/products"} />
    </main>
  );
}
