import { useRef, useState } from "react";
import { usePrefersReducedMotion, useScrollY } from "../lib/hooks";
import { CERTIFICATI } from "../lib/data";
import { Reveal, SectionHead, ICONS, IcSeal } from "./ui";

/* ————— Tilt 3D al passaggio del mouse ————— */
function Tilt({ children, base = 0 }: { children: React.ReactNode; base?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 7, ry: px * 9 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      style={{
        transform: reduced
          ? `rotate(${base}deg)`
          : `perspective(1100px) rotate(${base}deg) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  );
}

/* ————— Sigillo circolare ————— */
function Seal({ label }: { label: string }) {
  return (
    <svg width="74" height="74" viewBox="0 0 74 74" className="text-bronze" aria-hidden>
      <circle cx="37" cy="37" r="34" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="37" cy="37" r="27" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
      <path
        id="sealArc"
        d="M 37 12 a 25 25 0 1 1 -0.01 0"
        fill="none"
      />
      <text fontSize="7.2" fill="currentColor" fontFamily="IBM Plex Mono, monospace" letterSpacing="2.5">
        <textPath href="#sealArc" startOffset="0">
          {label} · OCS ILLIRIA ·
        </textPath>
      </text>
      <path
        d="M37 28c-4 5-6 8-6 11a6 6 0 0 0 12 0c0-3-2-6-6-11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ————— Documento certificato ————— */
function CertificateDoc({ cert, base }: { cert: (typeof CERTIFICATI)[number]; base: number }) {
  const Icon = ICONS[cert.icon];
  return (
    <Tilt base={base}>
      <article className="group relative rounded-lg border border-ink/20 bg-cream p-2 shadow-[0_30px_70px_-30px_rgba(27,33,27,0.45)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-30px_rgba(27,33,27,0.6)]">
        {/* cornice interna */}
        <div className="relative rounded-md border-2 border-bronze/50 px-6 py-8 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-1.5 rounded-sm border border-bronze/25" />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mocha">
                Attestato ufficiale · rilascio periodico
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-ink/40">
                N. SERIE {cert.code}-{new Date().getFullYear()}/M
              </p>
            </div>
            <div className="shrink-0 transition-transform duration-700 group-hover:rotate-[18deg]">
              <Seal label={cert.code} />
            </div>
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.7rem]">
            {cert.nome}
          </h3>
          <p className="mt-1 font-display text-lg italic text-mocha">{cert.sottotitolo}</p>

          <div className="my-6 flex items-center gap-3 text-bronze/70">
            <span className="h-px flex-1 bg-bronze/30" />
            <Icon size={18} />
            <span className="h-px flex-1 bg-bronze/30" />
          </div>

          <p className="text-[15px] leading-relaxed text-ink/80">{cert.corpo}</p>

          <p className="mt-5 rounded-md border border-moss/30 bg-moss/10 px-4 py-3 text-sm leading-relaxed text-pine">
            <span className="mr-2 font-mono text-[9px] uppercase tracking-[0.2em] text-moss">
              Spendibilità
            </span>
            {cert.spendibilita}
          </p>

          <div className="mt-7 flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-lg italic text-ink/70">OCS Illiria</p>
              <p className="mt-0.5 h-px w-36 bg-ink/30" />
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">
                Direzione Strategica &amp; ESG
              </p>
            </div>
            <p className="text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-ink/45">
              Progetto Pilota<br />Regione Marche
            </p>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

/* ————— Monti Azzurri in parallasse ————— */
function Mountains() {
  const y = useScrollY();
  const reduced = usePrefersReducedMotion();
  const f = (k: number) => (reduced ? 0 : Math.max(-40, Math.min(40, (y - 1800) * k)));
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden sm:h-80" aria-hidden>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 h-full w-full"
        style={{ transform: `translateY(${f(-0.02)}px)` }}
      >
        <path
          d="M0 260 180 130l140 90 160-120 170 130 150-90 180 120 160-80 140 90 160-60v110H0Z"
          fill="#2c5943"
          opacity="0.18"
        />
      </svg>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 h-full w-full"
        style={{ transform: `translateY(${f(-0.045)}px)` }}
      >
        <path
          d="M0 280 220 170l160 70 180-110 190 120 170-80 200 110 160-70 160 90v100H0Z"
          fill="#16382c"
          opacity="0.28"
        />
      </svg>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 h-full w-full"
        style={{ transform: `translateY(${f(-0.075)}px)` }}
      >
        <path
          d="M0 300 260 210l180 60 200-90 210 100 190-70 210 90 190-60v60H0Z"
          fill="#0c241c"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/* ————— Asse 2 ————— */
export function Certificates() {
  return (
    <section id="asse-2" className="relative scroll-mt-24 overflow-hidden bg-paper py-24 text-ink sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-8 select-none font-display text-[10rem] font-black leading-none text-ink/5 sm:text-[16rem]"
      >
        02
      </div>
      <Mountains />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          tone="light"
          num="§2"
          kicker="Asse Strategico 02"
          title={
            <>
              Dispositivi Abilitanti <span className="italic text-mocha">e Certificazioni ESG</span>
            </>
          }
          lead="Per convertire il cambio comportamentale del cliente in valore d'impresa condivisibile, vengono istituiti specifici asset di accreditamento e rendicontazione."
        />

        <div className="relative mt-20 grid items-start gap-12 pb-40 md:grid-cols-2 sm:pb-48">
          {CERTIFICATI.map((c, i) => (
            <Reveal key={c.code} delay={i * 160} variant="scale">
              <CertificateDoc cert={c} base={i === 0 ? -1.6 : 1.6} />
            </Reveal>
          ))}
        </div>

        <Reveal className="relative -mt-24 flex justify-center sm:-mt-28">
          <p className="flex items-center gap-3 rounded-full border border-ink/15 bg-cream px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60 shadow-sm">
            <IcSeal size={16} className="text-bronze" />
            Due attestati, un unico comportamento: consolidare gli ordini e automatizzare il riordino
          </p>
        </Reveal>
      </div>
    </section>
  );
}
