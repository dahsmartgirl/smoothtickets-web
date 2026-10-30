"use client";

import { useEffect } from "react";

/**
 * Scroll-in stagger for every section below the opening one. Mark a section with `data-stagger`: its children
 * come in one after another (the same rise-and-focus as the first-load intro) when it scrolls into view.
 * A child marked `data-stagger-group` passes the stagger on to its own children instead, so a heading and
 * a grid of cards can share one sequence. Styles: globals.css ([data-stagger]).
 *
 * Mounted once in the root layout. Server components only need the attributes; a MutationObserver picks up
 * sections that arrive later (client navigation, streamed pages).
 */
export function StaggerObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-stagger-in", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-stagger]:not([data-stagger-seen])").forEach((el) => {
        el.setAttribute("data-stagger-seen", "");
        const items = [...el.children].flatMap((c) => (c.hasAttribute("data-stagger-group") ? [...c.children] : [c]));
        // Long lists stop adding delay after the eighth item, so nothing waits too long.
        items.forEach((c, i) => (c as HTMLElement).style.setProperty("--stagger-i", String(Math.min(i, 8))));
        io.observe(el);
      });
    };

    let queued = 0;
    const mo = new MutationObserver(() => {
      if (!queued) queued = requestAnimationFrame(() => ((queued = 0), scan()));
    });
    scan();
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(queued);
    };
  }, []);

  return null;
}
