import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion, useScramble } from "../lib/hooks";
import { EXEC_SUMMARY, TICKER_ITEMS } from "../lib/data";
import { Eyebrow, Reveal, Ticker, IcCheck } from "./ui";

/* ————————————————— Demo interattiva: flusso Silenzio-Assenso ————————————————— */

type Phase =
  | "boot"
  | "sent"
  | "window"
  | "defaulted"
  | "erp"
  | "edit"
  | "amended"
  | "postponed";

const WINDOW_MS = 6000; // 48h compresse in 6s (demo accelerata)

function fmtFakeClock(remainingMs: number) {
  const fakeSec = Math.round((remainingMs / WINDOW_MS) * 48 * 3600);
  const h = Math.floor(fakeSec / 3600);
  const m = Math.floor((fakeSec % 3600) / 60);
  const s = fakeSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function StatusChip({ tone, children }: { tone: "ok" | "warn" | "info"; children: React.ReactNode }) {
  const map = {
    ok: "border-leaf/40 bg-leaf/10 text-mint",
    warn: "border-bronze/40 bg-bronze/10 text-brass",
    info: "border-cream/20 bg-cream/5 text-cream/80",
  } as const;
  const dot = { ok: "bg-leaf", warn: "bg-bronze", info: "bg-smoke" } as const;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${map[tone]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[tone]} ${tone !== "ok" ? "blink-soft" : ""}`} />
      {children}
    </span>
  );
}

export function PhoneDemo() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [remaining, setRemaining] = useState(WINDOW_MS);
  const [mix, setMix] = useState({ intenso: 64, lungo: 40, deca: 16 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const t = (ms: number, next: Phase) => window.setTimeout(() => setPhase(next), ms);
    let id: number | undefined;
    let iv: number | undefined;
    switch (phase) {
      case "boot":
        id = t(reduced ? 600 : 1500, "sent");
        break;
      case "sent":
        id = t(reduced ? 500 : 900, "window");
        break;
      case "window":
        setRemaining(WINDOW_MS);
        iv = window.setInterval(() => {
          setRemaining((r) => {
            if (r <= 120) {
              window.clearInterval(iv);
              setPhase("defaulted");
              return 0;
            }
            return r - 100;
          });
        }, 100);
        break;
      case "defaulted":
        id = t(1700, "erp");
        break;
      case "erp":
        id = t(4200, "boot");
        break;
      case "amended":
        id = t(2000, "erp");
        break;
      case "postponed":
        id = t(2600, "boot");
        break;
      default:
        break;
    }
    return () => {
      if (id) window.clearTimeout(id);
      if (iv) window.clearInterval(iv);
    };
  }, [phase, reduced]);

  const total = mix.intenso + mix.lungo + mix.deca;
  const step = (k: keyof typeof mix, d: number) =>
    setMix((m) => ({ ...m, [k]: Math.max(0, m[k] + d) }));

  const restart = () => {
    setMix({ intenso: 64, lungo: 40, deca: 16 });
    setPhase("boot");
  };

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* aloni ambientali */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-moss/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-6 -top-8 floaty">
        <StatusChip tone="warn">Dispatching predittivo</StatusChip>
      </div>
      <div className="pointer-events-none absolute -left-4 bottom-16 floaty" style={{ animationDelay: "1.4s" }}>
        <StatusChip tone="ok">Default Fulfillment</StatusChip>
      </div>

      <div className="relative rounded-[2.4rem] border border-cream/15 bg-bean/90 p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
        <div className="relative overflow-hidden rounded-[1.9rem] border border-cream/8 bg-gradient-to-b from-forest to-espresso">
          {/* notch */}
          <div className="flex items-center justify-between px-6 pt-3 font-mono text-[9px] uppercase tracking-widest text-cream/40">
            <span>OCS · CRM</span>
            <span className="rounded-full bg-espresso px-3 py-0.5 text-cream/50">demo</span>
            <span>48h → 6s</span>
          </div>

          {/* header conversazione */}
          <div className="flex items-center gap-3 border-b border-cream/10 px-5 py-4">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-moss font-display text-sm font-bold text-cream">
              I
            </div>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-cream">
                ILLIRIA OCS
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-leaf">
                  <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.25" />
                  <path d="m7.5 12.5 3 3 6-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
              <p className="truncate font-mono text-[10px] tracking-wide text-smoke">
                WhatsApp Business API · automatizzato
              </p>
            </div>
          </div>

          {/* corpo */}
          <div className="min-h-[340px] space-y-3 px-5 py-5">
            {phase === "boot" && (
              <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-sm bg-cream/10 px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="typing-dot h-1.5 w-1.5 rounded-full bg-brass"
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                ))}
              </div>
            )}

            {phase !== "boot" && (
              <div className="pop-in max-w-[92%] rounded-2xl rounded-tl-sm border border-cream/10 bg-cream/10 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                  Proposta d'ordine n. 2481
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream/90">
                  <strong className="font-semibold text-cream">{total} capsule</strong> — mix
                  pre-calcolato dai consumi storici (ciclo mensile). Consegna in{" "}
                  <em className="font-display italic">finestra settimanale standard</em>.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-cream/55">
                  Nessuna azione richiesta: in assenza di risposta, l'ordine sarà trasmesso
                  automaticamente.
                </p>
              </div>
            )}

            {phase === "window" && (
              <div className="pop-in space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setPhase("edit")}
                    className="flex-1 rounded-xl border border-bronze/50 bg-bronze/15 px-3 py-2.5 text-xs font-semibold text-brass transition hover:bg-bronze/25 active:scale-95"
                  >
                    Modifica mix
                  </button>
                  <button
                    onClick={() => setPhase("postponed")}
                    className="flex-1 rounded-xl border border-cream/15 bg-cream/5 px-3 py-2.5 text-xs font-semibold text-cream/80 transition hover:bg-cream/10 active:scale-95"
                  >
                    Posticipa
                  </button>
                </div>
                <p className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-smoke">
                  <span className="h-1.5 w-1.5 rounded-full bg-bronze blink-soft" />
                  Finestra d'eccezione · <span className="tabular text-brass">{fmtFakeClock(remaining)}</span>
                </p>
              </div>
            )}

            {phase === "edit" && (
              <div className="pop-in rounded-2xl border border-bronze/30 bg-espresso/70 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                  Rettifica mix merceologico
                </p>
                {(
                  [
                    ["intenso", "Espresso Intenso"],
                    ["lungo", "Lungo Classico"],
                    ["deca", "Deca Notte"],
                  ] as const
                ).map(([k, nome]) => (
                  <div key={k} className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-xs text-cream/80">{nome}</span>
                    <span className="flex items-center gap-2">
                      <button
                        onClick={() => step(k, -8)}
                        className="grid h-7 w-7 place-items-center rounded-full border border-cream/20 text-cream/70 transition hover:border-bronze hover:text-brass active:scale-90"
                        aria-label={`Riduci ${nome}`}
                      >
                        −
                      </button>
                      <span className="tabular w-8 text-center font-mono text-xs text-cream">
                        {mix[k]}
                      </span>
                      <button
                        onClick={() => step(k, 8)}
                        className="grid h-7 w-7 place-items-center rounded-full border border-cream/20 text-cream/70 transition hover:border-bronze hover:text-brass active:scale-90"
                        aria-label={`Aumenta ${nome}`}
                      >
                        +
                      </button>
                    </span>
                  </div>
                ))}
                <button
                  onClick={() => setPhase("amended")}
                  className="mt-4 w-full rounded-xl bg-moss px-3 py-2.5 text-xs font-bold text-cream transition hover:bg-leaf/80 active:scale-95"
                >
                  Trasmetti rettifica · {total} capsule
                </button>
              </div>
            )}

            {phase === "defaulted" && (
              <div className="pop-in">
                <StatusChip tone="warn">Nessuna interazione → Silenzio-Assenso</StatusChip>
              </div>
            )}

            {phase === "erp" && (
              <div className="pop-in space-y-2">
                <StatusChip tone="ok">Ordine → ERP/WMS · routing pianificato</StatusChip>
                <button
                  onClick={restart}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-smoke underline decoration-bronze/50 underline-offset-4 transition hover:text-brass"
                >
                  ↻ Riavvia la demo
                </button>
              </div>
            )}

            {phase === "amended" && (
              <div className="pop-in">
                <StatusChip tone="info">Eccezione gestita · mix rettificato ({total})</StatusChip>
              </div>
            )}

            {phase === "postponed" && (
              <div className="pop-in">
                <StatusChip tone="info">Rifornimento posticipato di 7 giorni</StatusChip>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
        Prova i pulsanti — o lascia correre il silenzio
      </p>
    </div>
  );
}

/* ————————————————— Rotta logistica animata (sfondo) ————————————————— */

function RouteBackdrop() {
  const [ref, inView] = useInView<HTMLDivElement>(0.1);
  const reduced = usePrefersReducedMotion();
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg viewBox="0 0 1440 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {/* vecchia rotta frammentata */}
        <path
          id="oldRoute"
          d="M-40 620 C 160 560, 220 700, 340 640 S 520 480, 620 560 S 800 700, 900 600 S 1080 460, 1180 540 S 1360 620, 1500 560"
          fill="none"
          stroke="#8a5a3b"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="5 9"
        />
        {/* nuova rotta consolidata */}
        <path
          id="newRoute"
          d="M-40 300 C 240 260, 420 340, 640 300 S 1020 220, 1240 280 S 1420 320, 1500 300"
          fill="none"
          stroke="#6fa97e"
          strokeOpacity="0.4"
          strokeWidth="2"
          className={inView && !reduced ? "dash-draw" : ""}
          style={inView ? undefined : { strokeDasharray: 1400, strokeDashoffset: reduced ? 0 : 1400 }}
        />
        {/* fermate */}
        {[
          [220, 596], [340, 640], [470, 540], [620, 560], [760, 640], [900, 600],
          [1040, 500], [1180, 540], [1300, 590],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#8a5a3b" fillOpacity="0.45" />
        ))}
        {[
          [240, 268], [640, 300], [1020, 232],
        ].map(([x, y], i) => (
          <g key={`s${i}`}>
            <circle cx={x} cy={y} r="5" fill="none" stroke="#c08b3e" strokeOpacity="0.8" strokeWidth="1.4" />
            <circle cx={x} cy={y} r="2" fill="#e3b878" />
          </g>
        ))}
        {!reduced && (
          <circle r="4" fill="#e3b878">
            <animateMotion dur="14s" repeatCount="indefinite">
              <mpath href="#newRoute" />
            </animateMotion>
          </circle>
        )}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-transparent to-espresso" />
    </div>
  );
}

/* ————————————————— Apertura ————————————————— */

export function Hero() {
  const [ref, inView] = useInView<HTMLDivElement>(0.1);
  const title = useScramble("SILNZIO-ASSENSO.", inView, 26);

  return (
    <section className="relative overflow-hidden bg-espresso pt-28 sm:pt-32">
      <RouteBackdrop />
      {/* watermark */}
      <div
        aria-hidden
        className="text-outline-cream pointer-events-none absolute -right-8 top-16 select-none font-display text-[26vw] font-black leading-none lg:text-[19rem]"
      >
        OCS
      </div>

      <div ref={ref} className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-10 lg:pb-28">
        {/* colonna narrativa */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <Eyebrow num="§0">Executive Summary · Piano di Ottimizzazione Strategica</Eyebrow>
          </Reveal>

          <h1 className="mt-7 font-display text-[13.5vw] font-semibold leading-[0.94] tracking-[-0.02em] text-cream sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
            {title || "\u00A0"}
          </h1>

          <Reveal delay={250}>
            <p className="mt-6 max-w-xl font-display text-xl font-light italic leading-relaxed text-brass sm:text-2xl">
              Il riordino OCS che si conclude da solo — mentre l'ultimo miglio smette di bruciare
              margine e CO₂.
            </p>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-10 max-w-xl border-l-2 border-bronze pl-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">
                Ambito di applicazione
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-cream/85">{EXEC_SUMMARY.ambito}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">
                Obiettivo primario
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-cream/85">{EXEC_SUMMARY.obiettivo}</p>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <ul className="mt-9 flex flex-wrap gap-2.5">
              {["Last-mile efficiente", "CAC / CSC ↓", "Logistica sostenibile", "Asset reputazionale ESG"].map(
                (t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/75 transition-colors duration-300 hover:border-bronze/60 hover:text-brass"
                  >
                    <IcCheck size={12} className="text-leaf" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </Reveal>

          <Reveal delay={620}>
            <a
              href="#indice"
              className="group mt-12 flex w-fit items-center gap-4 font-mono text-[11px] uppercase tracking-[0.26em] text-smoke transition-colors hover:text-brass"
            >
              <span className="relative h-10 w-px overflow-hidden bg-cream/20">
                <span className="absolute inset-x-0 top-0 h-4 animate-[steam-rise_1.8s_ease-in-out_infinite] bg-bronze" />
              </span>
              Scorri il piano — 4 assi strategici
            </a>
          </Reveal>
        </div>

        {/* colonna demo */}
        <div className="flex items-center">
          <Reveal variant="right" delay={200} className="w-full">
            <PhoneDemo />
          </Reveal>
        </div>
      </div>

      <Ticker items={TICKER_ITEMS} />
    </section>
  );
}
