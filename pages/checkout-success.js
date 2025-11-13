// pages/checkout-success.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CheckoutSuccess() {
  const { query } = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!query.session_id) return;
    axios.get(`/api/stripe-session?session_id=${query.session_id}`).then(res => setSession(res.data));
    // clear cart from localStorage
    try { localStorage.removeItem("cart"); } catch (e) {}
  }, [query.session_id]);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Thank you — Payment succeeded!</h1>
      <p className="mt-4">Your order is being processed. Session: {query.session_id}</p>
      {session && <pre className="mt-4 p-4 bg-gray-100 rounded">{JSON.stringify(session, null, 2)}</pre>}
    </main>
  );
}
