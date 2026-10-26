/** The main app's public API. Event data and checkout both go through it. */
export const API_URL = "https://api.smoothballot.com";

/**
 * The API's event times run behind by `meta.utc_offset` hours (an event posted for 9 PM comes back as 8 PM
 * Lagos time); the main app adds the offset back before showing them. Do the same, so times match the posters.
 */
export function shiftTime(iso: string, utcOffset: number | undefined) {
  return utcOffset ? new Date(+new Date(iso) + utcOffset * 60 * 60 * 1000).toISOString() : iso;
}
