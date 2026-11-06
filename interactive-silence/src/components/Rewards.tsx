import { useEffect, useRef, useState } from "react";
import { useCountUp, useInView } from "../lib/hooks";
import {
  VETTORE_A,
  VETTORE_B,
  CREDIT_RULES,
  TIERS,
  PREMI_CATALOGO,
  fmtInt,
} from "../lib/data";
import { Reveal, SectionHead, Eyebrow, RangeInput, Toggle, ICONS, IcArrow, IcCheck, IcLoop, IcSeal } from "./ui";

/* ————— Blocco incentivo ————— */
function Blocco({
  nome,
  punti,
  icon,
  accent,
  children,
}: {
  nome: string;
  punti: string[];
  icon: string;
  accent: "bronze" | "moss";
  children?: React.ReactNode;
}) {
  const Icon = ICONS[icon];
  const ring = accent === "bronze" ? "group-hover:border-bronze/50" : "group-hover:border-leaf/50";
  const iconBg =
    accent === "bronze"
      ? "bg-bronze/12 text-brass border-bronze/30"
      : "bg-leaf/10 text-mint border-leaf/30";
  return (
    <div
      className={`group rounded-xl border border-cream/10 bg-bean/60 p-6 transition-all duration-500 hover:-translate-y-1 ${ring}`}
    >
      <div className="flex items-center gap-4">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${iconBg}`}>
          <Icon size={20} />
        </span>
        <h4 className="font-display text-lg font-semibold leading-snug text-cream sm:text-xl">{nome}</h4>
      </div>
      <ul className="mt-5 space-y-2.5">
        {punti.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/70">
            <span
              className={`mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 ${
                accent === "bronze" ? "bg-bronze" : "bg-leaf"
              }`}
            />
            {p}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

/* ————— Mini-diagramma del modello circolare ————— */
function CircularModel() {
  return (
    <div className="mt-6 rounded-lg border border-leaf/20 bg-forest/50 p-5">
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mint">
        <IcLoop size={14} /> Modello di business circolare
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-lg border border-cream/12 bg-espresso/60 px-4 py-3">
          <p className="text-sm font-semibold text-cream">Produttori locali</p>
          <p className="mt-0.5 text-xs text-cream/55">Eccellenze enogastronomiche dei Monti Azzurri</p>
        </div>
        <div className="flex flex-col items-center gap-1 px-2 text-leaf">
          <IcArrow size={18} className="rotate-90 sm:rotate-0" />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mint">asset a costo zero</span>
        </div>
        <div className="rounded-lg border border-bronze/25 bg-espresso/60 px-4 py-3">
          <p className="text-sm font-semibold text-cream">Pacchi consegna OCS</p>
          <p className="mt-0.5 text-xs text-cream/55">Gift box Km 0 per i clienti aderenti</p>
        </div>
      </div>
      <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-cream/55">
        <IcArrow size={14} className="mt-0.5 shrink-0 rotate-180 text-bronze" />
        Ritorno ai produttori: canali di distribuzione privilegiati, visibilità B2B nei pacchi
        consegna e lead generation diretta.
      </p>
    </div>
  );
}

/* ————— Asse 3 ————— */
export function RewardMatrix() {
  return (
    <section id="asse-3" className="relative scroll-mt-24 overflow-hidden bg-espresso py-24 sm:py-32">
      <div
        aria-hidden
        className="text-outline-cream pointer-events-none absolute -right-6 top-10 select-none font-display text-[10rem] font-black leading-none opacity-70 sm:text-[16rem]"
      >
        03
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_15%_15%,rgba(192,139,62,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          num="§3"
          kicker="Asse Strategico 03"
          title={
            <>
              Sistema Integrato di Incentivazione{" "}
              <span className="italic text-brass">— Loyalty &amp; Reward Matrix</span>
            </>
          }
          lead="Il programma supera la dinamica dello sconto di prezzo puro tramite una value proposition ibrida articolata su due vettori complementari."
        />

        {/* Vettore A */}
        <div className="mt-20 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <Reveal variant="left">
            <div className="lg:sticky lg:top-32">
              <p className="font-display text-[7rem] font-black leading-none text-bronze/25 sm:text-[9rem]">A</p>
              <h3 className="-mt-8 font-display text-2xl font-semibold leading-tight text-cream sm:-mt-10 sm:text-3xl">
                {VETTORE_A.titolo}
              </h3>
              <p className="mt-4 inline-block rounded-full border border-bronze/40 bg-bronze/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                {VETTORE_A.tag}
              </p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
                La virtù logística diventa reputazione pubblica: chi consolida viene visto,
                raccontato e premiato davanti a tutta la comunità d'affari del territorio.
              </p>
            </div>
          </Reveal>
          <div className="space-y-6">
            {VETTORE_A.blocchi.map((b, i) => (
              <Reveal key={b.nome} delay={i * 140}>
                <Blocco {...b} accent="bronze" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Vettore B */}
        <div className="mt-24 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div className="order-2 space-y-6 lg:order-1">
            {VETTORE_B.blocchi.map((b, i) => (
              <Reveal key={b.nome} delay={i * 140}>
                <Blocco {...b} accent="moss">{b.nome.startsWith("Zero-Cost") && <CircularModel />}</Blocco>
              </Reveal>
            ))}
          </div>
          <Reveal variant="right" className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-32 lg:text-right">
              <p className="font-display text-[7rem] font-black leading-none text-leaf/20 sm:text-[9rem]">B</p>
              <h3 className="-mt-8 font-display text-2xl font-semibold leading-tight text-cream sm:-mt-10 sm:text-3xl">
                {VETTORE_B.titolo}
              </h3>
              <p className="mt-4 inline-block rounded-full border border-leaf/40 bg-leaf/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mint">
                {VETTORE_B.tag}
              </p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60 lg:ml-auto">
                Benefici reali che non toccano il margine: la filiera locale finanzia il premio,
                il core product consolida il magazzino del cliente.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ————————————————— Asse 4 · Tier Builder ————————————————— */

function ConfettiBurst({ trigger }: { trigger: number }) {
  if (!trigger) return null;
  const colors = ["#c08b3e", "#6fa97e", "#e3b878", "#c96f4a"];
  return (
    <span key={trigger} className="pointer-events-none absolute left-1/2 top-1/2 z-20">
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const dist = 55 + Math.random() * 55;
        return (
          <span
            key={i}
            className="confetti-bit absolute h-1.5 w-1.5"
            style={{
              background: colors[i % colors.length],
              borderRadius: i % 3 === 0 ? "50%" : "1px",
              ["--cx" as string]: `${Math.cos(angle) * dist}px`,
              ["--cy" as string]: `${Math.sin(angle) * dist - 30}px`,
              ["--cr" as string]: `${120 + Math.random() * 240}deg`,
            }}
          />
        );
      })}
    </span>
  );
}

function CreditRing({ progress, crediti }: { progress: number; crediti: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const shown = useCountUp(crediti, inView, 800);
  const C = 2 * Math.PI * 62;
  const p = Math.max(0, Math.min(1, progress));
  return (
    <div ref={ref} className="relative mx-auto h-44 w-44">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r="62" fill="none" stroke="rgba(240,234,219,0.1)" strokeWidth="7" />
        <circle
          cx="70"
          cy="70"
          r="62"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={inView ? C * (1 - p) : C}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c08b3e" />
            <stop offset="100%" stopColor="#6fa97e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="tabular font-display text-4xl font-medium leading-none text-cream">
            {fmtInt(shown)}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-smoke">crediti</p>
        </div>
      </div>
    </div>
  );
}

export function TierBuilder() {
  const [adesione, setAdesione] = useState(true);
  const [ordini, setOrdini] = useState(4);
  const [riscattati, setRiscattati] = useState<string[]>(["cert-co2"]);
  const [burst, setBurst] = useState(0);
  const prevTierRef = useRef(-1);

  const guadagnati = (adesione ? CREDIT_RULES.adesioneAutomazione : 0) + ordini * CREDIT_RULES.perOrdineConsolidato;
  const spesi = riscattati.reduce(
    (s, id) => s + (PREMI_CATALOGO.find((p) => p.id === id)?.costo ?? 0),
    0,
  );
  const disponibili = guadagnati - spesi;

  const tierIdx = TIERS.reduce((acc, t, i) => (guadagnati >= t.soglia ? i : acc), -1);

  useEffect(() => {
    if (tierIdx > prevTierRef.current && prevTierRef.current >= 0) {
      setBurst((b) => b + 1);
    }
    prevTierRef.current = tierIdx;
  }, [tierIdx]);

  /* se i crediti scendono, rilascia i premi più recenti */
  useEffect(() => {
    if (disponibili < 0) {
      setRiscattati((r) => {
        const next = [...r];
        while (
          next.length > 0 &&
          next.reduce((s, id) => s + (PREMI_CATALOGO.find((p) => p.id === id)?.costo ?? 0), 0) > guadagnati
        ) {
          next.pop();
        }
        return next;
      });
    }
  }, [disponibili, guadagnati]);

  const togglePremio = (id: string, costo: number, tier: number) => {
    setRiscattati((r) => {
      if (r.includes(id)) return r.filter((x) => x !== id);
      if (tierIdx + 1 < tier || guadagnati - (r.reduce((s, x) => s + (PREMI_CATALOGO.find((p) => p.id === x)?.costo ?? 0), 0)) < costo) {
        return r;
      }
      return [...r, id];
    });
  };

  const tier = tierIdx >= 0 ? TIERS[tierIdx] : null;
  const next = TIERS[tierIdx + 1];
  const progress = next ? guadagnati / next.soglia : guadagnati / 140;

  return (
    <section id="asse-4" className="relative scroll-mt-24 overflow-hidden bg-forest py-24 sm:py-32">
      <div
        aria-hidden
        className="text-outline-cream pointer-events-none absolute -left-6 bottom-8 select-none font-display text-[10rem] font-black leading-none opacity-60 sm:text-[16rem]"
      >
        04
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_85%_80%,rgba(192,139,62,0.14),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          num="§4"
          kicker="Asse Strategico 04"
          title={
            <>
              Go-To-Market <span className="italic text-brass">&amp; Packaging dell'Offerta</span>
            </>
          }
          lead={
            <>
              Format: <strong className="text-cream">Green Loyalty Program a Obiettivi di Rendicontazione</strong>.
              Un Catalogo Interattivo Digitale strutturato per «Livelli di Virtuosità» (Tiering ESG):
              ogni traguardo di consolidamento ordini e adozione dell'automazione genera crediti
              visualizzati in tempo reale per riscattare certificati, visibilità e premi di filiera.
            </>
          }
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* colonna comandi + ring */}
          <Reveal variant="left">
            <div className="rounded-2xl border border-cream/12 bg-espresso/60 p-6 sm:p-8">
              <Eyebrow>Console del cliente aderente</Eyebrow>

              <div className="mt-8 space-y-8">
                <div className="rounded-xl border border-cream/10 bg-bean/70 p-5">
                  <Toggle
                    on={adesione}
                    onChange={setAdesione}
                    label={`Adesione al modello Silenzio-Assenso · +${CREDIT_RULES.adesioneAutomazione} crediti`}
                  />
                </div>
                <RangeInput
                  label={`Ordini consolidati nel trimestre · +${CREDIT_RULES.perOrdineConsolidato} crediti l'uno`}
                  value={ordini}
                  min={0}
                  max={8}
                  unit="ordini"
                  onChange={setOrdini}
                />
              </div>

              <div className="relative mt-10">
                <ConfettiBurst trigger={burst} />
                <CreditRing progress={progress} crediti={guadagnati} />
                <div className="mt-5 text-center">
                  {tier ? (
                    <p key={tier.nome} className="pop-in font-display text-xl font-semibold text-brass">
                      {tier.nome}
                    </p>
                  ) : (
                    <p className="font-display text-xl italic text-smoke">
                      Nessun livello raggiunto — attiva l'automazione
                    </p>
                  )}
                  <p className="mt-1 text-xs text-cream/55">
                    {tier ? tier.desc : "I crediti si generano con l'adozione del programma."}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                    Disponibili al riscatto:{" "}
                    <span className={`tabular text-base ${disponibili >= 0 ? "text-mint" : "text-ember"}`}>
                      {fmtInt(disponibili)} cr
                    </span>
                  </p>
                </div>
              </div>

              {/* soglie tier */}
              <ol className="mt-9 space-y-2.5 border-t border-cream/10 pt-6">
                {TIERS.map((t) => {
                  const reached = guadagnati >= t.soglia;
                  return (
                    <li
                      key={t.nome}
                      className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 transition-all duration-500 ${
                        reached ? "border-bronze/40 bg-bronze/8" : "border-cream/8 bg-transparent"
                      }`}
                    >
                      <span className={`text-sm ${reached ? "text-cream" : "text-cream/45"}`}>{t.nome}</span>
                      <span className="flex items-center gap-2.5">
                        <span className={`tabular font-mono text-xs ${reached ? "text-brass" : "text-smoke"}`}>
                          {t.soglia} cr
                        </span>
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-full border transition-colors duration-500 ${
                            reached ? "border-bronze bg-bronze text-espresso" : "border-cream/20 text-transparent"
                          }`}
                        >
                          <IcCheck size={11} />
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          {/* catalogo premi */}
          <Reveal variant="right" delay={120}>
            <div className="flex h-full flex-col rounded-2xl border border-bronze/25 bg-pine/30 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Eyebrow>Catalogo Interattivo Digitale</Eyebrow>
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-smoke">
                  <IcSeal size={14} className="text-bronze" /> Livelli di Virtuosità · Tiering ESG
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {PREMI_CATALOGO.map((p) => {
                  const owned = riscattati.includes(p.id);
                  const tierReached = tierIdx + 1 >= p.tier;
                  const affordable = disponibili >= p.costo;
                  const locked = !tierReached;
                  return (
                    <li
                      key={p.id}
                      className={`group flex items-center justify-between gap-4 rounded-xl border p-4 transition-all duration-400 sm:p-5 ${
                        owned
                          ? "border-leaf/50 bg-leaf/10"
                          : locked
                            ? "border-cream/8 bg-espresso/30 opacity-55"
                            : "border-cream/12 bg-espresso/50 hover:border-bronze/40"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className={`truncate text-sm font-semibold sm:text-base ${locked ? "text-cream/50" : "text-cream"}`}>
                          {p.nome}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-smoke">
                          <span className="rounded-full border border-cream/15 px-2 py-0.5">{p.tipo}</span>
                          <span className={locked ? "text-ember/80" : "text-mint"}>
                            {locked ? `Richiede Tier ${p.tier}` : `Tier ${p.tier}`}
                          </span>
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="tabular font-display text-lg font-medium text-brass">{p.costo} cr</span>
                        <button
                          onClick={() => togglePremio(p.id, p.costo, p.tier)}
                          disabled={locked || (!owned && !affordable)}
                          className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 active:scale-95 ${
                            owned
                              ? "bg-moss text-cream hover:bg-ember/80"
                              : locked || !affordable
                                ? "cursor-not-allowed border border-cream/10 text-cream/30"
                                : "bg-bronze text-espresso hover:bg-brass"
                          }`}
                        >
                          {owned ? "Riscattato ✓" : locked ? "Bloccato" : affordable ? "Riscatta" : "Crediti insufficienti"}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 border-t border-cream/10 pt-5 text-xs leading-relaxed text-cream/50">
                I crediti si generano in tempo reale dai traguardi del programma:{" "}
                <span className="text-brass">+{CREDIT_RULES.adesioneAutomazione}</span> con l'adesione
                all'automazione del riordino e <span className="text-brass">+{CREDIT_RULES.perOrdineConsolidato}</span>{" "}
                per ogni ordine consolidato. Prova a riscattare — il saldo si aggiorna all'istante.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
