import { OG_SIZE, pageOgImage } from "@/lib/og";

export const alt = "The Smooth Tickets golden ticket";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return pageOgImage("Golden Ticket");
}
