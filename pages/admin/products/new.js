// pages/admin/products/new.js
import AdminProductForm from "../../../components/AdminProductForm";
import { useRouter } from "next/router";

export default function NewProduct() {
  const router = useRouter();

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <AdminProductForm onSuccess={() => router.push("/admin/products")} />
    </main>
  );
}
