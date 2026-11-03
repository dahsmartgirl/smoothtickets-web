import { OG_SIZE, pageOgImage } from "@/lib/og";

export const alt = "Smooth Tickets Terms of Service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return pageOgImage("Terms of Service");
}
