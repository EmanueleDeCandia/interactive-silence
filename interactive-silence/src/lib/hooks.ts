import { useEffect, useRef, useState } from "react";

/** Rispetta prefers-reduced-motion */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Osserva l'ingresso nel viewport (una sola volta) */
export function useInView<T extends HTMLElement>(
  threshold = 0.18,
  rootMargin = "0px 0px -8% 0px",
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, inView];
}

/** Contatore animato (ease-out) verso il target, rianima ad ogni cambio */
export function useCountUp(target: number, start: boolean, duration = 1300): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    const from = fromRef.current;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      setValue(v);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, start, duration, reduced]);

  return value;
}

const GLYPHS = "ABCDEFGHILMNOPQRSTUVZ0123456789·—#%€";

/** Effetto scramble/decode su un testo */
export function useScramble(text: string, start: boolean, speed = 28): string {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  const frame = useRef(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setOut(text);
      return;
    }
    frame.current = 0;
    const total = text.length;
    const id = window.setInterval(() => {
      frame.current += 1;
      const locked = Math.floor(frame.current / 2.2);
      let s = "";
      for (let i = 0; i < total; i++) {
        const ch = text[i];
        if (ch === " " || ch === "\n") {
          s += ch;
        } else if (i < locked) {
          s += ch;
        } else if (i < locked + 6) {
          s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          s += "\u00A0";
        }
      }
      setOut(s);
      if (locked >= total) {
        setOut(text);
        window.clearInterval(id);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, start, speed, reduced]);

  return out;
}

/** Progresso di lettura della pagina 0..1 */
export function useScrollProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/** Valore di scroll Y (per parallassi) */
export function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}
