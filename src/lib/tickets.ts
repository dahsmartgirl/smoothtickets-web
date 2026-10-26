/** Price maths shared by the ticket panel and checkout. Matches the main app, so buyers see the same totals. */

export type Priced = { price: number; commission: number; flatFee: number };

/** Service fee on one ticket: price × commission% + flat fee. */
export function feeFor(t: Priced, price = t.price) {
  return (price * t.commission) / 100 + t.flatFee;
}

/** What the buyer pays for one ticket, fee included. `price` overrides the face value (a coupon). */
export function totalFor(t: Priced, price = t.price) {
  return price + feeFor(t, price);
}

export function isSoldOut(t: { stock: number | null }) {
  return t.stock !== null && t.stock <= 0;
}
