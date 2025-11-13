export default function Footer() {
  return (
    <footer className="border-t mt-12 py-6 bg-gray-100 text-center text-sm text-gray-600">
      <p>
        © {new Date().getFullYear()} MyShop — Built with{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Next.js
        </a>
      </p>
      <p className="mt-1 text-gray-500">All rights reserved.</p>
    </footer>
  );
}
