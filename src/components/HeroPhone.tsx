"use client";

import { useRef } from "react";
import { Phone } from "./Devices";
import { QrCode } from "./brand";
import { usePauseOffscreen } from "./usePauseOffscreen";

/** Real organiser dashboard on a phone, with the QR ticket a buyer receives beside it. */
export function HeroPhone() {
  const ref = useRef<HTMLDivElement>(null);
  usePauseOffscreen(ref);
  return (
    <div ref={ref} className="relative mx-auto w-[250px] sm:w-[290px]">
      <div className="absolute -inset-16 -z-10 rounded-full bg-brand/40 blur-[90px]" />
      <Phone
        src="/screens/app/dashboard.jpg"
        alt="Smooth Tickets organiser dashboard listing an upcoming event"
        priority
        className="rotate-[2deg]"
      />

      {/* ticket preview */}
      <div
        className="ticket absolute -bottom-8 -left-10 w-44 animate-float rounded-2xl bg-white p-3 text-night [animation-delay:-3s] sm:-left-28 sm:w-52"
        style={{ ["--r" as string]: "-6deg", ["--notch" as string]: "9px", ["--notch-y" as string]: "38px" }}
        role="img"
        aria-label="Example QR ticket"
      >
        <div className="flex items-center justify-between px-1 text-[10px]">
          <span className="font-bold">Regular</span>
          <span className="text-night/50">Admit 1</span>
        </div>
        <div className="perf-x my-2.5 text-night/15" />
        <QrCode seed="ticket" className="mx-auto aspect-square w-28 sm:w-32" />
        <p className="mt-2 text-center text-[10px] font-semibold text-night/50">Show at the door</p>
      </div>
    </div>
  );
}
