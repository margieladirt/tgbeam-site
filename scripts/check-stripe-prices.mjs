import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY is not set");
  process.exit(1);
}

// Report the MODE only, never the key value.
console.log("Stripe key mode:", key.startsWith("sk_live") ? "LIVE" : key.startsWith("sk_test") ? "TEST" : "UNKNOWN");

const stripe = new Stripe(key);

const expected = [
  "mountain_tee_white_s",
  "mountain_tee_white_m",
  "mountain_tee_white_l",
  "mountain_tee_white_xl",
  "mountain_tee_black_s",
  "mountain_tee_black_m",
  "mountain_tee_black_l",
  "mountain_tee_black_xl",
  "tote_bag",
];

const found = await stripe.prices.list({ limit: 100, active: true });

const byKey = new Map();
for (const p of found.data) {
  if (p.lookup_key) byKey.set(p.lookup_key, p);
}

console.log("\nAll ACTIVE prices with lookup keys in this account/mode:");
for (const p of found.data) {
  console.log(
    `  lookup_key=${p.lookup_key ?? "(none)"}  id=${p.id}  ${p.currency} ${p.unit_amount}  livemode=${p.livemode}`
  );
}

console.log("\nExpected lookup keys check:");
for (const k of expected) {
  const p = byKey.get(k);
  console.log(`  ${p ? "OK  " : "MISSING"}  ${k}${p ? `  -> ${p.id}` : ""}`);
}
