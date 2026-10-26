/** Date windows for the discovery filters, in Lagos time (UTC+1 all year, no daylight saving). */

const LAGOS_OFFSET = 60 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

/** Midnight in Lagos, as a UTC timestamp, for the day containing `t`. */
function lagosMidnight(t: number) {
  return Math.floor((t + LAGOS_OFFSET) / DAY) * DAY - LAGOS_OFFSET;
}

export type When = "weekend" | "week" | "month";

/** [from, to) for each window. "Weekend" is Friday to Sunday: this one, or the next if it's Monday–Thursday. */
export function windowFor(when: When, now = Date.now()): [number, number] {
  const today = lagosMidnight(now);
  if (when === "week") return [now, today + 7 * DAY];
  if (when === "month") return [now, today + 31 * DAY];
  const weekday = new Date(today + LAGOS_OFFSET).getUTCDay(); // 0 Sun … 6 Sat
  const toFriday = weekday === 0 ? -2 : weekday === 6 ? -1 : 5 - weekday;
  const friday = today + toFriday * DAY;
  return [Math.max(now, friday), friday + 3 * DAY];
}

/** True if the event is on at any point inside the window. */
export function overlaps(startIso: string, endIso: string, [from, to]: [number, number]) {
  return +new Date(startIso) < to && +new Date(endIso) >= from;
}
