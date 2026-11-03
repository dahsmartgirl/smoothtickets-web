import { OG_SIZE, pageOgImage } from "@/lib/og";

export const alt = "Smooth Tickets Privacy Policy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return pageOgImage("Privacy Policy");
}
