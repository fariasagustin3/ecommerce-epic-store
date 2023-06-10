import { stripe } from "src/utils/stripe";
import { validateCartItems } from "use-shopping-cart/utilities";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const inventory = await stripe.products.list({
        expand: ["data.default_price"],
      });
      const products = inventory.data.map((product) => {
        const price = product.default_price;
        return {
          currency: price.currency,
          id: product.id,
          name: product.name,
          price: price.unit_amount,
          image: product.images[0],
        };
      });
      const lineItems = validateCartItems(products, req.body);

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems,
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });

      res.status(200).json(session);
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method not allowed");
  }
}
