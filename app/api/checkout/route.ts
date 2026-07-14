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

    // Consolidate duplicate lookup keys so repeated cart entries become a
    // single line item with the combined quantity (Stripe rejects the same
    // price appearing more than once in a session's line_items).
    const quantitiesByLookupKey = new Map<string, number>();
    for (const item of checkoutItems) {
      quantitiesByLookupKey.set(
        item.lookupKey,
        (quantitiesByLookupKey.get(item.lookupKey) ?? 0) + item.quantity
      );
    }

    const consolidatedItems: CheckoutItem[] = Array.from(
      quantitiesByLookupKey,
      ([lookupKey, quantity]) => ({ lookupKey, quantity })
    );

    const lookupKeys = consolidatedItems.map((item) => item.lookupKey);

    console.log("Lookup keys:", lookupKeys);

    // stripe.prices.list accepts at most 10 lookup_keys per request, so batch
    // larger carts and collect every matching price.
    const LOOKUP_KEY_BATCH_SIZE = 10;
    const prices: Stripe.Price[] = [];
    for (let i = 0; i < lookupKeys.length; i += LOOKUP_KEY_BATCH_SIZE) {
      const batch = lookupKeys.slice(i, i + LOOKUP_KEY_BATCH_SIZE);
      const page = await stripe.prices.list({
        lookup_keys: batch,
        active: true,
        limit: 100,
        expand: ["data.product"],
      });
      prices.push(...page.data);
    }

    console.log(
      "Stripe prices found:",
      prices.map((p) => ({
        id: p.id,
        lookup_key: p.lookup_key,
        active: p.active,
        currency: p.currency,
        unit_amount: p.unit_amount,
      }))
    );

    const resolvedItems = consolidatedItems.map((item) => {
      const price = prices.find(
        (stripePrice) => stripePrice.lookup_key === item.lookupKey
      );

      if (!price) {
        throw new Error(
          `No active Stripe price found for lookup key: ${item.lookupKey}`
        );
      }

      return {
        price,
        quantity: item.quantity,
      };
    });

    const lineItems = resolvedItems.map(({ price, quantity }) => ({
      price: price.id,
      quantity,
    }));

    // Stripe metadata limits: max 50 keys, 40 chars/key, 500 chars/value.
    // Exceeding any of these rejects the entire request.
    const STRIPE_METADATA_MAX_KEYS = 50;
    const STRIPE_METADATA_MAX_VALUE_LENGTH = 500;
    const clampValue = (value: string) =>
      value.slice(0, STRIPE_METADATA_MAX_VALUE_LENGTH);

    // One metadata key per line item so each renders on its own row in the
    // Stripe dashboard, e.g. item_1: "mountain_tee_white_l_usd x1". The lookup
    // key itself encodes product/color/size, keeping each row self-describing.
    const orderMetadata: Stripe.MetadataParam = {
      item_count: String(
        resolvedItems.reduce((sum, { quantity }) => sum + quantity, 0)
      ),
    };

    const formatItem = ({
      price,
      quantity,
    }: (typeof resolvedItems)[number]) => `${price.lookup_key} x${quantity}`;

    // Keep within the 50-key cap: emit one key per item until the budget runs
    // out, then fold any remaining items into a single overflow key so a large
    // cart can never push the whole metadata object over the limit.
    const reservedKeyCount = Object.keys(orderMetadata).length;
    const maxItemKeys = STRIPE_METADATA_MAX_KEYS - reservedKeyCount;

    if (resolvedItems.length <= maxItemKeys) {
      resolvedItems.forEach((item, index) => {
        orderMetadata[`item_${index + 1}`] = clampValue(formatItem(item));
      });
    } else {
      // Reserve the final slot for the overflow summary.
      const inlineCount = maxItemKeys - 1;
      resolvedItems.slice(0, inlineCount).forEach((item, index) => {
        orderMetadata[`item_${index + 1}`] = clampValue(formatItem(item));
      });
      orderMetadata.items_overflow = clampValue(
        resolvedItems.slice(inlineCount).map(formatItem).join("; ")
      );
    }

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
      metadata: orderMetadata,
      payment_intent_data: {
        metadata: orderMetadata,
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
