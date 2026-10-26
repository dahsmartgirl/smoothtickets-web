import { API_URL, shiftTime } from "./api";

/** One ticket category, as the event page and checkout need it. */
export type Tier = {
  id: number;
  name: string;
  description: string;
  /** Face value in naira, before the service fee. */
  price: number;
  /** Fee = price × commission% + flatFee (same formula as the main app). */
  commission: number;
  flatFee: number;
  /** null = unlimited */
  stock: number | null;
  admits: number;
  /** The organiser has a coupon running for this category. */
  couponActive: boolean;
};

export type EventDetail = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  startDate: string;
  endDate: string;
  host: string | null;
  communityLink: string | null;
  location: { venue: string; address: string; city: string; state: string } | null;
  /** The organiser lets any affiliate promote it (affiliate_access_type "public"), not just invited ones. */
  openToAffiliates: boolean;
  tiers: Tier[];
};

type ApiTicket = {
  id: number;
  name: string;
  description?: string | null;
  price: string;
  stock_count?: number | null;
  admits?: number | null;
  commission?: number | string | null;
  flat_fee?: number | string | null;
  coupon_is_active?: boolean | null;
};

type ApiResponse = {
  status?: boolean;
  meta?: { utc_offset?: number };
  data?: {
    event?: {
      id: number;
      name: string;
      slug: string;
      description?: string | null;
      image?: { link?: string } | null;
      start_date: string;
      end_date?: string | null;
      host_name?: string | null;
      organized_by?: string | null;
      community_link?: string | null;
      location?: { venue?: string; address?: string; city?: string; state?: string } | null;
      affiliate_access_type?: string | null;
    };
    tickets?: ApiTicket[];
    active_coupon_ids?: (number | string)[];
  };
};

/**
 * Everything the event page shows, from the same public endpoint the main app's event page uses.
 * That response also carries the organiser's email and scanner details: only the fields below leave the server.
 */
export async function getEvent(slug: string): Promise<EventDetail | null> {
  try {
    const res = await fetch(`${API_URL}/ticket/whitelist?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse;
    const e = json.data?.event;
    if (!json.status || !e) return null;

    // Same rule as the main app: active_coupon_ids decides when it's sent (even empty), else each ticket's own flag.
    const ids = json.data?.active_coupon_ids;
    const couponIds = Array.isArray(ids) ? new Set(ids.map(Number)) : null;
    const loc = e.location;
    const venue = loc?.venue?.trim() ?? "";
    const city = loc?.city?.trim() ?? "";

    return {
      id: e.id,
      name: e.name.trim(),
      slug: e.slug,
      description: e.description?.trim() ?? "",
      image: e.image?.link ?? null,
      startDate: shiftTime(e.start_date, json.meta?.utc_offset),
      endDate: shiftTime(e.end_date ?? e.start_date, json.meta?.utc_offset),
      host: e.host_name?.trim() || e.organized_by?.trim() || null,
      communityLink: /^https?:\/\//.test(e.community_link ?? "") ? e.community_link! : null,
      location:
        venue || city
          ? { venue, city, address: loc?.address?.trim() ?? "", state: loc?.state?.trim() ?? "" }
          : null,
      openToAffiliates: e.affiliate_access_type === "public",
      tiers: (json.data?.tickets ?? []).map((t) => ({
        id: t.id,
        name: t.name.trim(),
        description: t.description?.trim() ?? "",
        price: Number(t.price) || 0,
        commission: Number(t.commission) || 0,
        flatFee: Number(t.flat_fee) || 0,
        stock: t.stock_count ?? null,
        admits: t.admits ?? 1,
        couponActive: couponIds ? couponIds.has(t.id) : !!t.coupon_is_active,
      })),
    };
  } catch {
    return null;
  }
}
