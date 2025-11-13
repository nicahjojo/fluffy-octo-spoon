import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NavBar from "../components/NavBar";
import { CartProvider } from "../context/CartContext";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <NavBar />
        <Component {...pageProps} />
      </CartProvider>
    </SessionProvider>
  );
}
