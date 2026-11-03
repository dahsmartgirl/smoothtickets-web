import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Social preview images (opengraph-image.tsx in each route): one template, so every link shared from the site
 * looks like the site. Navy with the hero's blue glow, the logomark and wordmark, a headline in Unbounded, and
 * the torn ticket edge along the bottom. The homepage has its own headline; every other page uses
 * pageOgImage: just the logo and the page title, identical in size and position.
 *
 * Rendered to PNG on the server, where CSS isn't available, so colours are written out. They mirror the tokens
 * in globals.css (night, brand, on-dark-muted, sticker-lime, gold): keep them in sync.
 * Fonts are TTF copies in lib/og-fonts (the renderer can't read woff2), both under the SIL Open Font License.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const NIGHT = "#050b1f";
const BRAND = "#007aff";
const MUTED = "rgba(255,255,255,0.72)";

type Line = string | { text: string; color: string };

const asset = (...p: string[]) => readFile(join(process.cwd(), ...p));

export async function ogImage({
  lines,
  sub,
  size = 88,
}: {
  /** The headline, one entry per line; an object colours that line. */
  lines: Line[];
  sub?: string;
  size?: number;
}) {
  const [unbounded, inter, interSemi, logo] = await Promise.all([
    asset("src/lib/og-fonts/Unbounded-Black.ttf"),
    asset("src/lib/og-fonts/Inter-Regular.ttf"),
    asset("src/lib/og-fonts/Inter-SemiBold.ttf"),
    asset("public/logo.svg"),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: NIGHT,
          backgroundImage: "radial-gradient(ellipse 70% 110% at 10% 0%, rgba(0,122,255,0.38), transparent)",
          color: "white",
          fontFamily: "Inter",
          padding: "64px 72px 84px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
            <img src={logoSrc} width={52} height={52} alt="" />
            <span style={{ fontFamily: "Unbounded", fontSize: 34, letterSpacing: -1 }}>smoothtickets</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Unbounded", fontSize: size, lineHeight: 1.02, letterSpacing: size * -0.03 }}>
              {lines.map((l) => {
                const { text, color } = typeof l === "string" ? { text: l, color: "white" } : l;
                return (
                  <span key={text} style={{ color }}>
                    {text}
                  </span>
                );
              })}
            </div>
            {sub && <span style={{ marginTop: 28, fontSize: 30, color: MUTED, lineHeight: 1.35 }}>{sub}</span>}
          </div>
        </div>

        {/* The torn ticket edge, as on the site's headers: white bites along the bottom */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -10, display: "flex", gap: 6 }}>
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} style={{ width: 18, height: 18, borderRadius: 999, background: "white", flexShrink: 0 }} />
          ))}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Unbounded", data: unbounded, weight: 900, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Inter", data: interSemi, weight: 600, style: "normal" },
      ],
    },
  );
}

export const BRAND_COLOR = BRAND;

/** Every page but the homepage: the logo and the page title, nothing else, so the previews read as one set. */
export function pageOgImage(title: string) {
  return ogImage({ lines: [title], size: 96 });
}
