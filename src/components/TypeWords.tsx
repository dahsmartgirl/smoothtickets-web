"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const TYPE_MS = 90; // per letter typed
const DELETE_MS = 50; // per letter deleted
const HOLD_MS = 2200; // a finished word stays up this long
const GAP_MS = 350; // empty pause before the next word

/**
 * Types a word, holds it, deletes it, then types the next one, with a blinking caret.
 * The first word renders fully on the server, so the page opens on it and reduced motion never leaves it.
 * Screen readers only get the first word; the cycling copy is hidden from them.
 */
export function TypeWords({ words, className }: { words: string[]; className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  const word = words[index];

  useEffect(() => {
    if (reduce) return;
    let delay: number;
    let step: () => void;
    if (!deleting && length === word.length) {
      delay = HOLD_MS;
      step = () => setDeleting(true);
    } else if (deleting && length === 0) {
      delay = GAP_MS;
      step = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    } else {
      delay = deleting ? DELETE_MS : TYPE_MS;
      step = () => setLength((l) => l + (deleting ? -1 : 1));
    }
    const t = setTimeout(step, delay);
    return () => clearTimeout(t);
  }, [reduce, deleting, length, word, words.length]);

  // The caret holds solid while letters are moving and blinks while the word rests.
  const moving = !reduce && (deleting || length < word.length);

  return (
    <span className={className}>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden>
        {word.slice(0, length)}
        <span className="type-caret" data-moving={moving || undefined} />
      </span>
    </span>
  );
}
