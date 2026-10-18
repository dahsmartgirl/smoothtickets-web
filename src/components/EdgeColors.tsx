"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps mobile Safari's status bar and bottom toolbar the same color as whatever is showing at the
 * top and bottom edges of the page. Each update reads both colors once, then writes that one pair
 * to the edge strips, the html/body backgrounds and the theme-color meta tag.
 */

const TOP = "--edge-top-background";
const BOTTOM = "--edge-bottom-background";

// Normalize any CSS color (rgb, oklab, color-mix…) to bytes by painting one pixel.
let ctx: CanvasRenderingContext2D | null = null;
const cache = new Map<string, string | null>();
function opaque(color: string): string | null {
  if (cache.has(color)) return cache.get(color)!;
  ctx ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", {
    willReadFrequently: true,
  });
  let out: string | null = null;
  if (ctx) {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#000";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    if (a === 255) out = `rgb(${r}, ${g}, ${b})`;
  }
  cache.set(color, out);
  return out;
}

/** First full-width, opaque background under the left edge at height y. */
function colorAt(y: number, page: HTMLElement): string {
  const minWidth = window.innerWidth * 0.9;
  for (const el of document.elementsFromPoint(1, y)) {
    if (el === page) break;
    if (el === document.body || el === document.documentElement) continue;
    // Narrow things (cards, posters, buttons) passing the edge shouldn't recolor the browser chrome.
    if (el.getBoundingClientRect().width < minWidth) continue;
    const c = opaque(getComputedStyle(el).backgroundColor);
    if (c) return c;
  }
  return opaque(getComputedStyle(page).backgroundColor) ?? "rgb(255, 255, 255)";
}

export function EdgeColors() {
  const pathname = usePathname();

  useEffect(() => {
    const page = document.getElementById("page");
    const root = document.documentElement;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = Object.assign(document.createElement("meta"), { name: "theme-color" });
      document.head.append(meta);
    }
    if (!page) return;

    // Remember shared document state so leaving the page puts it back.
    const prev = {
      top: root.style.getPropertyValue(TOP),
      bottom: root.style.getPropertyValue(BOTTOM),
      meta: meta.content,
    };

    let applied = { top: "", bottom: "" };
    let frame = 0;

    const update = () => {
      frame = 0;
      const top = colorAt(0, page);
      const bottom = colorAt(window.innerHeight - 1, page);
      if (top === applied.top && bottom === applied.bottom) return;
      applied = { top, bottom };
      root.style.setProperty(TOP, top);
      root.style.setProperty(BOTTOM, bottom);
      meta.content = top;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const vv = window.visualViewport;
    const winEvents = ["scroll", "resize", "orientationchange", "pageshow", "load"] as const;
    winEvents.forEach((e) => window.addEventListener(e, schedule, { passive: true }));
    // Safari's toolbar expanding/collapsing resizes the visual viewport.
    vv?.addEventListener("resize", schedule);
    vv?.addEventListener("scroll", schedule);
    // Theme toggle (class on <html>) and layout shifts (images, fonts, restored scroll) change what's at the edges.
    const themeObserver = new MutationObserver(schedule);
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
    const sizeObserver = new ResizeObserver(schedule);
    sizeObserver.observe(page);

    update();
    // Scroll position may be restored after mount.
    const late = window.setTimeout(schedule, 300);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(late);
      winEvents.forEach((e) => window.removeEventListener(e, schedule));
      vv?.removeEventListener("resize", schedule);
      vv?.removeEventListener("scroll", schedule);
      themeObserver.disconnect();
      sizeObserver.disconnect();
      if (prev.top) root.style.setProperty(TOP, prev.top);
      else root.style.removeProperty(TOP);
      if (prev.bottom) root.style.setProperty(BOTTOM, prev.bottom);
      else root.style.removeProperty(BOTTOM);
      if (createdMeta) meta.remove();
      else meta.content = prev.meta;
    };
  }, [pathname]);

  return (
    <>
      <div aria-hidden className="edge-top" />
      <div aria-hidden className="edge-bottom" />
    </>
  );
}
