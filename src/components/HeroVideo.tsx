"use client";

import { useEffect, useState } from "react";

/**
 * The hero's background loop: the party photo smeared into a slow, dragged-shutter blur.
 * Two cuts, picked once on load: landscape for wide screens, portrait for phones (the photo is portrait,
 * so phones get more of the crowd than a cropped landscape clip would show). WebM first, MP4 for Safari.
 * The still photo sits underneath; the clip fades in over it once it is actually playing.
 * Reduced-motion users never load it.
 */
const CLIPS = {
  landscape: "/videos/hero-landscape",
  portrait: "/videos/hero-portrait",
};

export function HeroVideo() {
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSrc(matchMedia("(orientation: portrait)").matches ? CLIPS.portrait : CLIPS.landscape);
  }, []);

  if (!src) return null;
  return (
    <video
      className="hero-media hero-video"
      data-playing={playing || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      onPlaying={() => setPlaying(true)}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
