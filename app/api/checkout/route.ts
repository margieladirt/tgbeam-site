import Stripe from "stripe";

type CheckoutItem = {
  lookupKey: string;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      console.error("Stripe checkout error: STRIPE_SECRET_KEY is not set");
      return Response.json(
        { error: "Unable to create checkout session" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);

    const { items } = await req.json();

    console.log("Checkout items received:", items);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    const checkoutItems: CheckoutItem[] = items.map((item) => ({
      lookupKey: item.lookupKey,
      quantity: item.quantity,
    }));

    for (const item of checkoutItems) {
      if (!item.lookupKey || !item.quantity || item.quantity < 1) {
        return Response.json({ error: "Invalid cart item" }, { status: 400 });
      }
    }

    const lookupKeys = checkoutItems.map((item) => item.lookupKey);

    console.log("Lookup keys:", lookupKeys);

    const prices = await stripe.prices.list({
      lookup_keys: lookupKeys,
      active: true,
      expand: ["data.product"],
    });

    console.log(
      "Stripe prices found:",
      prices.data.map((p) => ({
        id: p.id,
        lookup_key: p.lookup_key,
        active: p.active,
        currency: p.currency,
        unit_amount: p.unit_amount,
      }))
    );

    const lineItems = checkoutItems.map((item) => {
      const price = prices.data.find(
        (stripePrice) => stripePrice.lookup_key === item.lookupKey
      );

      if (!price) {
        throw new Error(
          `No active Stripe price found for lookup key: ${item.lookupKey}`
        );
      }

      return {
        price: price.id,
        quantity: item.quantity,
      };
    });

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop`,
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ["JP", "US"],
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to create checkout session";

    return Response.json(
      {
        error: "Unable to create checkout session",
        detail: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 }
    );
  }
}
