import { ImageResponse } from "next/og";

export const alt = "Smooth Tickets: create your event, sell more tickets, make it happen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered to a PNG on the server, where CSS isn't available, so the colours are written out here.
// They mirror the tokens in globals.css: night, brand-deep, brand. Keep them in sync.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #050b1f 0%, #0654B0 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, display: "flex" }}>
          smooth<span style={{ color: "#007aff" }}>tickets</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
          <span>Create your event.</span>
          <span style={{ color: "#007aff" }}>Sell more tickets.</span>
          <span>Make it happen.</span>
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,.75)" }}>Online event ticketing for African organisers</div>
      </div>
    ),
    size,
  );
}
