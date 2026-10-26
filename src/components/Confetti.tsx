"use client";

import { useEffect, useRef } from "react";

/*
 * Footer art: every few seconds, at a random spot, a burst of confetti shoots up from behind the footer logo.
 * The strongest pieces hit the top of the footer, lose their speed and tumble back down.
 * Pieces are event-themed: ticket stubs, sparkle stars, dots and streamers, drawn in the canvas's CSS `color`
 * (globals.css: .confetti). Canvas, not DOM, so a burst costs no React renders.
 *
 * Off-screen it stops completely; with reduced motion it never starts.
 */

type Kind = "ticket" | "star" | "dot" | "streamer";
type Piece = { x: number; y: number; vx: number; vy: number; rot: number; spin: number; size: number; kind: Kind; age: number; life: number };

const KINDS: Kind[] = ["ticket", "ticket", "ticket", "star", "star", "dot", "streamer"];
const GAP = [1.4, 3.6]; // random seconds between bursts
const STAR = "M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z"; // the site's sparkle, 24x24

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const star = new Path2D(STAR);
    const pieces: Piece[] = [];
    let w = 0;
    let h = 0;
    let originY = 0;
    let frame = 0;
    let last = 0;
    let nextBurst = 0.4; // first burst shortly after it comes on screen

    const measure = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = box.width;
      h = box.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Launch from inside the visible part of the logo, so pieces pop out from behind it.
      const mark = canvas.parentElement?.querySelector(".footer-lockup")?.getBoundingClientRect();
      originY = mark ? Math.min(mark.top - box.top + mark.height * 0.35, h - 8) : h * 0.85;
    };

    const burst = () => {
      const ox = rand(0.08, 0.92) * w;
      const rise = originY; // room above the launch point, up to the footer's top edge
      for (let i = 0, n = Math.round(rand(22, 40)); i < n; i++) {
        const angle = -Math.PI / 2 + rand(-0.6, 0.6);
        // Most peak partway up; about a third have enough to reach the ceiling.
        const speed = Math.sqrt(2 * 1.2 * rise * rise * rand(0.35, 1.5));
        pieces.push({
          x: ox + rand(-24, 24),
          y: originY,
          vx: Math.cos(angle) * speed * 0.55,
          vy: Math.sin(angle) * speed,
          rot: rand(0, Math.PI * 2),
          spin: rand(-7, 7),
          size: rand(6, 11),
          kind: KINDS[Math.floor(Math.random() * KINDS.length)],
          age: 0,
          life: rand(4.5, 7),
        });
      }
    };

    const draw = (p: Piece) => {
      const fade = Math.min(1, (p.life - p.age) / (p.life * 0.35));
      ctx.save();
      ctx.globalAlpha = Math.max(0, fade);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.rot * 1.4)); // tumble, like paper flipping in the air
      ctx.beginPath();
      if (p.kind === "ticket") {
        // A tiny ticket stub with a bite out of each side
        const tw = p.size * 1.7;
        const th = p.size;
        const r = th * 0.24;
        ctx.moveTo(-tw / 2, -th / 2);
        ctx.lineTo(tw / 2, -th / 2);
        ctx.lineTo(tw / 2, -r);
        ctx.arc(tw / 2, 0, r, -Math.PI / 2, Math.PI / 2, true);
        ctx.lineTo(tw / 2, th / 2);
        ctx.lineTo(-tw / 2, th / 2);
        ctx.lineTo(-tw / 2, r);
        ctx.arc(-tw / 2, 0, r, Math.PI / 2, -Math.PI / 2, true);
        ctx.closePath();
        ctx.fill();
      } else if (p.kind === "star") {
        const s = (p.size * 1.3) / 24;
        ctx.scale(s, s);
        ctx.translate(-12, -12);
        ctx.fill(star);
      } else if (p.kind === "dot") {
        ctx.arc(0, 0, p.size * 0.32, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.rect(-1, -p.size * 0.8, 2, p.size * 1.6);
        ctx.fill();
      }
      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      nextBurst -= dt;
      if (nextBurst <= 0) {
        nextBurst = rand(GAP[0], GAP[1]);
        burst();
      }

      const gravity = 1.2 * originY; // px/s², scaled to the art's height
      const fall = originY * 0.22; // paper flutters down slowly
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = getComputedStyle(canvas).color;
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.age += dt;
        if (p.age >= p.life || p.y > h + 20) {
          pieces.splice(i, 1);
          continue;
        }
        p.vy = Math.min(p.vy + gravity * dt, fall);
        p.vx *= Math.pow(0.5, dt);
        p.x += p.vx * dt + Math.sin(p.age * 3 + p.rot) * 12 * dt; // a little side-to-side drift
        p.y += p.vy * dt;
        p.rot += p.spin * dt;
        // Hit the footer's top edge: stop dead, knock it spinning, and let it fall.
        if (p.y < p.size) {
          p.y = p.size;
          p.vy = Math.abs(p.vy) * 0.12;
          p.vx *= 0.6;
          p.spin += rand(-6, 6);
        }
        draw(p);
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="confetti" aria-hidden />;
}
