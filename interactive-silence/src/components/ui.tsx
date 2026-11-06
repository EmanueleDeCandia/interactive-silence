import { type ReactNode, type CSSProperties } from "react";
import { useInView, useCountUp, usePrefersReducedMotion } from "../lib/hooks";

/* ————— Reveal on scroll ————— */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const v = variant === "up" ? "" : `reveal-${variant}`;
  return (
    <div
      ref={ref}
      className={`reveal ${v} ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ————— Line-mask reveal per titoli ————— */
export function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className={`mask-line ${inView ? "in" : ""} ${className}`}>
      <span style={{ transitionDelay: `${delay}ms` }}>{children}</span>
    </span>
  );
}

/* ————— Etichetta mono con filetto ————— */
export function Eyebrow({
  children,
  num,
  tone = "bronze",
  className = "",
}: {
  children: ReactNode;
  num?: string;
  tone?: "bronze" | "moss";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.28em] ${
        tone === "bronze" ? "text-bronze" : "text-moss"
      } ${className}`}
    >
      <span
        className={`inline-block h-px w-10 ${tone === "bronze" ? "bg-bronze" : "bg-moss"}`}
      />
      {num && <span className="text-brass">{num}</span>}
      {children}
    </p>
  );
}

/* ————— Big stat con count-up ————— */
export function Stat({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  sub,
  active = true,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sub?: string;
  active?: boolean;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const v = useCountUp(value, inView && active, 1200);
  const shown = v.toLocaleString("it-IT", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <div ref={ref} className={className}>
      <p className="tabular font-display text-4xl font-light leading-none text-cream sm:text-5xl">
        {prefix}
        {shown}
        <span className="text-bronze">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">{label}</p>
      {sub && <p className="mt-1 text-sm leading-snug text-cream/60">{sub}</p>}
    </div>
  );
}

/* ————— Testata di sezione ————— */
export function SectionHead({
  num,
  kicker,
  title,
  lead,
  tone = "dark",
}: {
  num: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
}) {
  const ink = tone === "dark";
  return (
    <div className="max-w-4xl">
      <Eyebrow num={num} tone={ink ? "bronze" : "moss"}>
        {kicker}
      </Eyebrow>
      <h2
        className={`mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-6xl ${
          ink ? "text-cream" : "text-ink"
        }`}
      >
        <MaskLine>{title}</MaskLine>
      </h2>
      {lead && (
        <Reveal delay={200}>
          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${
              ink ? "text-cream/70" : "text-ink/70"
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ————— Ticker a scorrimento ————— */
export function Ticker({ items, dark = true }: { items: string[]; dark?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center"
    >
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`px-6 font-mono text-xs uppercase tracking-[0.24em] sm:text-[13px] ${
              dark ? "text-cream/70" : "text-ink/70"
            }`}
          >
            {t}
          </span>
          <svg
            width="7"
            height="7"
            viewBox="0 0 8 8"
            className={dark ? "text-bronze" : "text-moss"}
            aria-hidden
          >
            <rect x="1" y="1" width="6" height="6" fill="currentColor" transform="rotate(45 4 4)" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={`ticker-fade overflow-hidden border-y py-3.5 ${
        dark ? "border-cream/10 bg-espresso" : "border-ink/10 bg-paper"
      }`}
    >
      <div
        className="marquee-track"
        style={reduced ? undefined : ({ "--marquee-dur": `${items.length * 4.2}s` } as CSSProperties)}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ————— Slider con label e valore ————— */
export function RangeInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  light = false,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (v: number) => void;
  light?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="mb-3 flex items-baseline justify-between gap-4">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
            light ? "text-ink/60" : "text-smoke"
          }`}
        >
          {label}
        </span>
        <span
          className={`tabular font-display text-2xl font-medium leading-none ${
            light ? "text-ink" : "text-brass"
          }`}
        >
          {value.toLocaleString("it-IT")}
          <span className={`ml-1 font-mono text-[10px] tracking-widest ${light ? "text-ink/50" : "text-smoke"}`}>
            {unit}
          </span>
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={light ? "range-light" : ""}
        style={{ "--fill": `${pct}%` } as CSSProperties}
      />
    </label>
  );
}

/* ————— Toggle switch ————— */
export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="group flex w-full items-center justify-between gap-4 text-left"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke group-hover:text-cream/80">
        {label}
      </span>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-300 ${
          on ? "border-bronze bg-moss" : "border-cream/20 bg-cream/10"
        }`}
      >
        <span
          className={`absolute h-4 w-4 rounded-full transition-all duration-300 ${
            on ? "left-6 bg-brass" : "left-1 bg-cream/50"
          }`}
        />
      </span>
    </button>
  );
}

/* ————— Icone SVG custom (stroke) ————— */
type IconProps = { className?: string; size?: number };
const S = ({ size = 20, className = "", children }: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {children}
  </svg>
);

export const IcPhone = (p: IconProps) => (
  <S {...p}>
    <path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    <path d="M14.5 5.5 19 3" strokeDasharray="2 2.4" />
  </S>
);
export const IcChat = (p: IconProps) => (
  <S {...p}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
    <path d="M8 9h8M8 12h5" />
  </S>
);
export const IcTimer = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l3 2M9 2h6" />
  </S>
);
export const IcChip = (p: IconProps) => (
  <S {...p}>
    <rect x="7" y="7" width="10" height="10" rx="1" />
    <rect x="10" y="10" width="4" height="4" />
    <path d="M9 7V3M15 7V3M9 21v-4M15 21v-4M7 9H3M7 15H3M21 9h-4M21 15h-4" />
  </S>
);
export const IcTruck = (p: IconProps) => (
  <S {...p}>
    <path d="M2 6h11v10H2zM13 9h5l3 3v4h-8" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="16.5" cy="17.5" r="1.8" />
  </S>
);
export const IcLeaf = (p: IconProps) => (
  <S {...p}>
    <path d="M5 19C5 9 12 4 20 4c0 9-5 15-13 15" />
    <path d="M5 19c3-5 6-8 10-10" />
  </S>
);
export const IcSeal = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <circle cx="12" cy="9" r="2.4" />
    <path d="m8.5 13.5-2 7 5.5-3 5.5 3-2-7" />
  </S>
);
export const IcGift = (p: IconProps) => (
  <S {...p}>
    <rect x="4" y="9" width="16" height="11" rx="1" />
    <path d="M4 9h16M12 9v11M12 9C9 9 6.5 8 6.5 5.8 6.5 4.2 8 3.5 9.2 4.2 11 5.2 12 9 12 9Zm0 0c3 0 5.5-1 5.5-3.2 0-1.6-1.5-2.3-2.7-1.6C13 5.2 12 9 12 9Z" />
  </S>
);
export const IcCapsule = (p: IconProps) => (
  <S {...p}>
    <path d="M6 4h12l-1.5 4h-9L6 4Z" />
    <path d="M7.5 8 9 20h6l1.5-12" />
    <path d="M9.5 12h5" strokeDasharray="2 2" />
  </S>
);
export const IcMic = (p: IconProps) => (
  <S {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
  </S>
);
export const IcSignal = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="2" />
    <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" />
  </S>
);
export const IcLoop = (p: IconProps) => (
  <S {...p}>
    <path d="M20 12a8 8 0 1 1-2.3-5.6" />
    <path d="M20 3v4h-4" />
  </S>
);
export const IcArrow = (p: IconProps) => (
  <S {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </S>
);
export const IcCheck = (p: IconProps) => (
  <S {...p}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </S>
);
export const IcMountain = (p: IconProps) => (
  <S {...p}>
    <path d="m2 19 6.5-11 4 6.5L15 11l7 8H2Z" />
    <circle cx="17.5" cy="6" r="1.6" />
  </S>
);
export const IcBox = (p: IconProps) => (
  <S {...p}>
    <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" />
    <path d="M3 7.5 12 12l9-4.5M12 12v9" />
  </S>
);

export const ICONS: Record<string, (p: IconProps) => ReactNode> = {
  phone: IcPhone,
  chat: IcChat,
  timer: IcTimer,
  chip: IcChip,
  truck: IcTruck,
  leaf: IcLeaf,
  seal: IcSeal,
  gift: IcGift,
  capsule: IcCapsule,
  mic: IcMic,
  signal: IcSignal,
  loop: IcLoop,
  box: IcBox,
  mountain: IcMountain,
};
