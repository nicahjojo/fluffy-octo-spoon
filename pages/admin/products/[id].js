import AdminProductForm from "../../../components/AdminProductForm";
import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req });
  if (!session || session.user.role !== "admin") {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const id = parseInt(params.id, 10);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { notFound: true };

  return { props: { product: JSON.parse(JSON.stringify(product)) } };
}

export default function EditProduct({ product }) {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <AdminProductForm
        initial={product}
        onSuccess={() => window.location.href = "/admin/products"}
      />
    </main>
  );
}
