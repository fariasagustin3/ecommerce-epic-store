import { Toaster } from "react-hot-toast";
import Layout from "src/components/Layout";
import "src/styles/globals.css";
import { CartProvider } from "use-shopping-cart";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function App({ Component, pageProps }) {
  return (
    <CartProvider currency="USD" cartMode="checkout-session" stripe={stripeKey}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </CartProvider>
  );
}
