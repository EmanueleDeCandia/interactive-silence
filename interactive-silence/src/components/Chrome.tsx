import { useEffect, useState } from "react";
import { useScrollProgress } from "../lib/hooks";
import { ASSI, CHIUSURA } from "../lib/data";
import { Eyebrow, MaskLine, Reveal, IcArrow, IcCheck } from "./ui";

/* ————— Marchio ————— */
export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="3" y="11" width="26" height="13" rx="6.5" stroke="#c08b3e" strokeWidth="1.8" />
      <path d="M10 11v13M16 11v13" stroke="#c08b3e" strokeWidth="1.2" strokeDasharray="2 2.4" />
      <circle cx="9" cy="6.5" r="2" fill="#6fa97e" />
      <circle cx="16" cy="5" r="2" fill="#e3b878" />
      <circle cx="23" cy="6.5" r="2" fill="#c96f4a" />
    </svg>
  );
}

/* ————— Navigazione fissa + progresso di lettura ————— */
export function Nav() {
  const progress = useScrollProgress();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-cream/10 bg-espresso/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5 lg:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span className="transition-transform duration-500 group-hover:rotate-[-8deg]">
            <Mark />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight text-cream">
              OCS ILLIRIA
            </span>
            <span className="mt-1 block font-mono text-[8.5px] uppercase tracking-[0.3em] text-bronze">
              Piano Strategico
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          <a
            href="#indice"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 transition-colors hover:text-brass"
          >
            Sommario
          </a>
          {ASSI.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="group font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 transition-colors hover:text-brass"
            >
              <span className="text-bronze/70 group-hover:text-bronze">{a.num}</span>{" "}
              <span className="hidden lg:inline">{a.titolo.split(" ").slice(0, 2).join(" ")}</span>
              <span className="lg:hidden">Asse</span>
            </a>
          ))}
        </nav>

        <a
          href="#chiusura"
          className="hidden rounded-full border border-bronze/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brass transition-all duration-300 hover:bg-bronze hover:text-espresso sm:block"
        >
          Pilota Marche
        </a>
      </div>
      {/* barra di progresso */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-cream/5">
        <div
          className="h-full bg-gradient-to-r from-bronze via-brass to-leaf"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}

/* ————— Sommario / agenda interattiva ————— */
export function IndexLedger() {
  return (
    <section id="indice" className="relative scroll-mt-24 bg-paper py-24 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow tone="moss">Sommario del piano</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] text-ink sm:text-5xl lg:text-[3.4rem]">
              <MaskLine>Quattro assi,</MaskLine>
              <MaskLine delay={120}>
                <span className="italic text-mocha">un'unica regia.</span>
              </MaskLine>
            </h2>
            <Reveal delay={250}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/70">
                Ogni asse alimenta il successivo: i <strong>flussi</strong> generano il dato
                comportamentale, il dato certifica l'<strong>impatto</strong>, l'impatto finanzia
                il <strong>premio</strong>, il premio consolida il comportamento — e il ciclo
                riparte, più efficiente.
              </p>
            </Reveal>
            <Reveal delay={350}>
              <p className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45">
                <span className="inline-block h-2 w-2 rotate-45 bg-bronze" />
                Piano di ottimizzazione strategica · 8 minuti di lettura
              </p>
            </Reveal>
          </div>

          <div>
            {ASSI.map((a, i) => (
              <Reveal key={a.id} delay={i * 100}>
                <a
                  href={`#${a.id}`}
                  className={`group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 pr-2 transition-colors duration-300 hover:bg-ink/[0.045] sm:gap-8 sm:py-8 ${
                    i === 0 ? "border-t" : ""
                  } border-b border-ink/15`}
                >
                  <span className="font-display text-4xl font-black leading-none text-ink/20 transition-colors duration-300 group-hover:text-bronze sm:text-5xl">
                    {a.num}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-semibold leading-tight text-ink transition-transform duration-500 group-hover:translate-x-1.5 sm:text-2xl">
                      {a.titolo}
                    </span>
                    <span className="mt-2 block max-w-xl text-sm leading-relaxed text-ink/60">
                      {a.sintesi}
                    </span>
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink/50 transition-all duration-300 group-hover:border-bronze group-hover:bg-bronze group-hover:text-paper">
                    <IcArrow size={18} />
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={450}>
              <p className="mt-6 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                Ambito — {`Progetto Pilota Regione Marche · Segmento OCS`}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————— Chiusura + footer ————— */
export function Closing() {
  return (
    <section id="chiusura" className="relative scroll-mt-24 overflow-hidden bg-espresso">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(44,89,67,0.45),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 sm:pt-32 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow num="§∎">In chiusura</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.04] text-cream sm:text-5xl lg:text-6xl">
              <MaskLine>Dal rumore del contact center</MaskLine>
              <MaskLine delay={140}>
                <span className="italic text-brass">{CHIUSURA.statement.replace("Dal rumore del contact center ", "")}</span>
              </MaskLine>
            </h2>

            {/* tazzina con vapore */}
            <Reveal delay={300}>
              <div className="mt-12 flex items-center gap-5">
                <div className="relative">
                  <span className="steam absolute -top-5 left-3 h-4 w-1 rounded-full bg-cream/40 blur-[2px]" />
                  <span className="steam absolute -top-5 left-6 h-4 w-1 rounded-full bg-cream/30 blur-[2px]" style={{ animationDelay: "0.9s" }} />
                  <span className="steam absolute -top-5 left-9 h-4 w-1 rounded-full bg-cream/40 blur-[2px]" style={{ animationDelay: "1.7s" }} />
                  <svg width="52" height="44" viewBox="0 0 52 44" fill="none" aria-hidden>
                    <path d="M6 10h30v14a12 12 0 0 1-12 12h-6A12 12 0 0 1 6 24V10Z" stroke="#c08b3e" strokeWidth="2" />
                    <path d="M36 13h5a5 5 0 0 1 0 10h-5" stroke="#c08b3e" strokeWidth="2" />
                    <path d="M2 41h42" stroke="#6fa97e" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="max-w-sm font-display text-lg italic leading-relaxed text-cream/70">
                  Un caffè che si riordina da solo vale due volte: in margine operativo e in
                  reputazione territoriale.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal variant="right" delay={200}>
            <ul className="space-y-4 rounded-2xl border border-cream/12 bg-bean/60 p-7 sm:p-8">
              <li className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-bronze">
                Obiettivo primario — verifiche di piano
              </li>
              {CHIUSURA.punti.map((p, i) => (
                <li key={p} className="flex items-center gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-leaf/40 bg-leaf/10 text-leaf">
                    <IcCheck size={15} />
                  </span>
                  <p className="text-[15px] text-cream/85">
                    <span className="mr-2 font-mono text-[10px] text-smoke">{String(i + 1).padStart(2, "0")}</span>
                    {p}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* meta */}
        <Reveal delay={150}>
          <div className="mt-20 grid gap-6 border-t border-cream/10 pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-smoke sm:grid-cols-3">
            <p>
              Progetto Pilota <span className="text-brass">Regione Marche</span>
            </p>
            <p>
              Segmento <span className="text-brass">OCS · Office Coffee Service</span>
            </p>
            <p>
              Partnership territoriale{" "}
              <span className="text-brass">Unione Montana dei Monti Azzurri</span>
            </p>
          </div>
        </Reveal>
      </div>

      {/* footer */}
      <footer className="relative border-t border-cream/10 bg-espresso">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row lg:px-10">
          <a href="#top" className="flex items-center gap-3">
            <Mark size={26} />
            <span className="font-display text-base font-bold tracking-tight text-cream">
              OCS ILLIRIA
            </span>
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#indice" className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/50 transition-colors hover:text-brass">
              Sommario
            </a>
            {ASSI.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/50 transition-colors hover:text-brass"
              >
                Asse {a.num}
              </a>
            ))}
          </nav>
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-cream/35 md:text-right">
            Documento strategico interattivo<br />© 2026 · Marche, Italia
          </p>
        </div>
      </footer>
    </section>
  );
}
