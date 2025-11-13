// pages/admin/products/[id].js
import AdminProductForm from "../../../components/AdminProductForm";
import { prisma } from "../../../lib/prisma";

export async function getServerSideProps({ params }) {
  const id = parseInt(params.id || 0, 10);

  try {
    // Fetch product from database
    const product = await prisma.product.findUnique({ where: { id } });
    
    if (!product) {
      return { notFound: true };
    }

    // Convert Date objects to strings if needed
    return { props: { product: JSON.parse(JSON.stringify(product)) } };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
}

export default function EditProduct({ product }) {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Product</h1>
      <div className="max-w-xl mx-auto">
        <AdminProductForm
          initial={product}
          onSuccess={() => window.location.href = "/admin/products"}
        />
      </div>
    </main>
  );
}
