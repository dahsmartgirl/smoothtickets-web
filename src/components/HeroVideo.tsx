"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero's background loop: the party photo smeared into a slow, dragged-shutter blur.
 * Two cuts: landscape for wide screens, portrait for phones (the photo is portrait, so phones get more of the
 * crowd than a cropped landscape clip would show). WebM first, MP4 for Safari.
 *
 * In the server HTML, so it starts downloading with the page instead of after hydration (it is the homepage's
 * largest element). The browser picks the cut from each <source>'s media query; ones too old for `media` on
 * video sources take the first, the portrait WebM. The still photo sits underneath and the clip fades in over
 * it once it is actually playing. Reduced motion: hidden (globals.css) and paused here.
 */
const CLIPS = {
  landscape: "/videos/hero-landscape",
  portrait: "/videos/hero-portrait",
};

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    // Autoplay can start before React hydrates and attaches onPlaying, so check once here too.
    if (!video.paused && video.readyState > 2) setPlaying(true);
  }, []);

  return (
    <video
      ref={ref}
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
      <source src={`${CLIPS.portrait}.webm`} type="video/webm" media="(orientation: portrait)" />
      <source src={`${CLIPS.portrait}.mp4`} type="video/mp4" media="(orientation: portrait)" />
      <source src={`${CLIPS.landscape}.webm`} type="video/webm" />
      <source src={`${CLIPS.landscape}.mp4`} type="video/mp4" />
    </video>
  );
}
