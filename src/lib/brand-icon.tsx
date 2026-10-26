import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Rendered on the server without CSS, so white is written out (globals.css: --color-white). The Smooth Tickets logo centered on white, as a PNG (apple-touch-icon; Safari also uses it for tabs). */
export async function brandIcon(size: number) {
  const svg = await readFile(join(process.cwd(), "public/logo.svg"));
  const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  const logo = Math.round(size * 0.72);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={logo} height={logo} alt="" />
      </div>
    ),
    { width: size, height: size },
  );
}
