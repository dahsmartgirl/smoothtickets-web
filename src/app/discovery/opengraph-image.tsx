import { OG_SIZE, pageOgImage } from "@/lib/og";

export const alt = "Discover Events on Smooth Tickets";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return pageOgImage("Discover Events");
}
