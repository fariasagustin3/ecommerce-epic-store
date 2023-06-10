import { stripe } from "src/utils/stripe";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (!id.startsWith("cs_")) {
        throw new Error("Incorrect checkout session id");
      } else {
        const checkoutSession = await stripe.checkout.sessions.retrieve(id);
        res.status(200).json(checkoutSession);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).send("Method not allowed");
  }
}
