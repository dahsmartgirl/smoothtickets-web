import { OG_SIZE, ogImage, BRAND_COLOR } from "@/lib/og";

export const alt = "Smooth Tickets: make it happen.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ lines: [{ text: "Make it happen.", color: BRAND_COLOR }], size: 96 });
}
