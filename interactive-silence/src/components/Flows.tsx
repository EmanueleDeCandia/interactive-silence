import { useState } from "react";
import { useInView, useCountUp } from "../lib/hooks";
import {
  FLOW_ASIS,
  FLOW_TOBE,
  CANALI,
  BENEFICI_11,
  RAZIONALE_12,
  SIM_CONST,
  fmtInt,
  fmt1,
} from "../lib/data";
import { Reveal, SectionHead, Eyebrow, RangeInput, ICONS, IcLeaf, IcCheck } from "./ui";

/* ————— Diagramma di flusso As-Is / To-Be ————— */

const ASIS_TAGS = [
  "labour-intensive",
  "frizione operativa",
  "time-to-order dilatato",
  "scheduling sub-ottimale",
  "margine disperso",
];

function FlowDiagram() {
  const [mode, setMode] = useState<"asis" | "tobe">("tobe");
  const nodes = mode === "asis" ? FLOW_ASIS : FLOW_TOBE;
  const tobe = mode === "tobe";

  return (
    <div>
      {/* segmented control */}
      <div className="relative grid w-full max-w-sm grid-cols-2 rounded-full border border-cream/15 bg-espresso/60 p-1 font-mono text-[11px] uppercase tracking-[0.18em]">
        <span
          className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            tobe ? "left-1 bg-moss" : "left-[calc(50%+3px)] bg-ember/70"
          }`}
        />
        <button
          onClick={() => setMode("asis")}
          aria-pressed={!tobe}
          className={`relative z-10 rounded-full py-2.5 transition-colors duration-300 ${
            !tobe ? "text-cream" : "text-smoke hover:text-cream/70"
          }`}
        >
          As-Is
        </button>
        <button
          onClick={() => setMode("tobe")}
          aria-pressed={tobe}
          className={`relative z-10 rounded-full py-2.5 transition-colors duration-300 ${
            tobe ? "text-cream" : "text-smoke hover:text-cream/70"
          }`}
        >
          To-Be
        </button>
      </div>

      {/* nodi */}
      <ol className="relative mt-8 space-y-4 before:absolute before:bottom-6 before:left-[13px] before:top-6 before:w-px before:bg-gradient-to-b before:from-transparent before:via-cream/20 before:to-transparent">
        {nodes.map((n, i) => (
          <li
            key={`${mode}-${i}`}
            className="pop-in relative flex gap-5"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span
              className={`z-10 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[10px] ${
                tobe
                  ? "border-bronze/70 bg-forest text-brass"
                  : "border-ember/60 bg-forest text-ember"
              } ${tobe && i === 2 ? "pulse-node" : ""}`}
            >
              {i + 1}
            </span>
            <div
              className={`flex-1 rounded-xl border p-4 transition-colors duration-300 sm:p-5 ${
                tobe
                  ? "border-cream/10 bg-pine/40 hover:border-bronze/40"
                  : "border-cream/10 bg-espresso/50 hover:border-ember/40"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className={`font-semibold ${tobe ? "text-cream" : "text-cream/85"}`}>{n.label}</p>
                {mode === "asis" ? (
                  <span className="rounded-full border border-ember/40 bg-ember/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ember">
                    {ASIS_TAGS[i]}
                  </span>
                ) : (
                  mode === "tobe" &&
                  i === 2 && (
                    <span className="rounded-full border border-bronze/50 bg-bronze/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-brass">
                      cuore del modello
                    </span>
                  )
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/60">{n.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ————— Numero live (reattivo agli slider) ————— */
function LiveStat({
  value,
  decimals = 0,
  suffix,
  label,
  sub,
}: {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  sub?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const v = useCountUp(value, inView, 900);
  return (
    <div ref={ref} className="rounded-xl border border-cream/10 bg-espresso/50 p-5">
      <p className="tabular font-display text-4xl font-light leading-none text-cream sm:text-[2.75rem]">
        {v.toLocaleString("it-IT", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        <span className="ml-1 text-2xl text-bronze">{suffix}</span>
      </p>
      <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">{label}</p>
      {sub && <p className="mt-1 text-xs leading-snug text-cream/55">{sub}</p>}
    </div>
  );
}

/* ————— Simulatore Order Consolidation ————— */
function ConsolidationSim() {
  const [clienti, setClienti] = useState(120);
  const [km, setKm] = useState(18);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);

  const passaggiEvitati = clienti * (SIM_CONST.consegneAnnoAsIs - SIM_CONST.consegneAnnoToBe);
  const co2Kg = passaggiEvitati * km * SIM_CONST.kgCo2PerKm;
  const co2T = co2Kg / 1000;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-bronze/25 bg-forest/80 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-8"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-bronze/10 blur-3xl" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Eyebrow>Simulatore di scenario · stime di piano</Eyebrow>
        <span className="rounded-full border border-leaf/40 bg-leaf/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-mint">
          Ricalcolo in tempo reale
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-9">
          <RangeInput
            label="Clienti OCS aderenti al consolidamento"
            value={clienti}
            min={20}
            max={400}
            step={10}
            unit="clienti"
            onChange={setClienti}
          />
          <RangeInput
            label="Km medi per tratta di consegna"
            value={km}
            min={6}
            max={40}
            unit="km"
            onChange={setKm}
          />

          {/* confronto passaggi */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="mb-1.5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                <span>As-Is · quindicinale piccolo taglio</span>
                <span className="tabular text-ember">{SIM_CONST.consegneAnnoAsIs} passaggi/anno</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-cream/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-ember/80 to-ember transition-[width] duration-1000 ease-out"
                  style={{ width: inView ? "100%" : "8%" }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                <span>To-Be · volumi d'ordine raddoppiati</span>
                <span className="tabular text-leaf">{SIM_CONST.consegneAnnoToBe} passaggi/anno (−50%)</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-cream/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-moss to-leaf transition-[width] duration-1000 ease-out"
                  style={{ width: inView ? "50%" : "8%", transitionDelay: "200ms" }}
                />
              </div>
            </div>
            <p className="text-xs leading-relaxed text-cream/50">
              Per singolo cliente: da {SIM_CONST.consegneAnnoAsIs} a {SIM_CONST.consegneAnnoToBe}{" "}
              recapiti annui a parità di prodotto erogato — il drop-size raddoppia, i passaggi
              veicolari si dimezzano.
            </p>
          </div>
        </div>

        <div className="grid content-start gap-4 sm:grid-cols-2">
          <LiveStat value={passaggiEvitati} suffix="" label="Passaggi veicolari evitati / anno" sub={`flotta di ${clienti} clienti consolidati`} />
          <LiveStat
            value={co2T}
            decimals={1}
            suffix="t"
            label="CO₂ evitata / anno"
            sub={`≈ ${fmtInt(co2Kg)} kg · ${fmt1(SIM_CONST.kgCo2PerKm)} kg CO₂/km per furgone`}
          />
          <LiveStat value={2} suffix="×" label="Drop-size" sub="volumi per singolo recapito" />
          <LiveStat value={-50} suffix="%" label="Costo di recapito per capsula" sub="incidenza fissa dimezzata a parità di erogato" />
        </div>
      </div>
    </div>
  );
}

/* ————— Asse 1 ————— */
export function Flows() {
  return (
    <section id="asse-1" className="relative scroll-mt-24 overflow-hidden bg-forest py-24 sm:py-32">
      <div
        aria-hidden
        className="text-outline-cream pointer-events-none absolute -left-6 top-10 select-none font-display text-[11rem] font-black leading-none opacity-70 sm:text-[17rem]"
      >
        01
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_10%,rgba(44,89,67,0.5),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          num="§1"
          kicker="Asse Strategico 01"
          title="Reingegnerizzazione dei Flussi d'Ordine"
          lead="Due leve gemelle: automatizzare il riordino fino al default fulfillment e consolidare i volumi di consegna per dimezzare i passaggi della flotta."
        />

        {/* 1.1 */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <h3 className="font-display text-2xl font-semibold leading-snug text-cream sm:text-3xl">
                1.1 · Process Automation &amp; Frictionless Reordering
              </h3>
              <p className="mt-1 font-display text-lg italic text-brass">Modello «Conferma-Variazione»</p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-cream/75">
                <p>
                  <span className="mr-2 rounded bg-ember/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ember">
                    As-Is
                  </span>
                  Gestione outbound labour-intensive via Contact Center: elevata frizione
                  operativa, rincorsa del lead, time-to-order dilatato e scheduling
                  sub-ottimale della forza vendita e di consegna.
                </p>
                <p>
                  <span className="mr-2 rounded bg-leaf/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
                    To-Be
                  </span>
                  Protocollo di <strong className="text-cream">Automated Notification &amp; Default
                  Fulfillment</strong> attraverso canali omnicanale istantanei.
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-7 flex flex-wrap gap-2">
                {CANALI.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-cream/15 bg-espresso/60 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70 transition-colors hover:border-bronze/50 hover:text-brass"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <ul className="mt-9 space-y-4 border-t border-cream/10 pt-7">
                {BENEFICI_11.map((b) => {
                  const Icon = ICONS[b.icon];
                  return (
                    <li key={b.k} className="group flex items-center gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-bronze/30 bg-espresso/60 text-bronze transition-all duration-300 group-hover:border-bronze group-hover:bg-bronze group-hover:text-espresso">
                        <Icon size={18} />
                      </span>
                      <p className="text-sm text-cream/75">
                        <span className="font-semibold text-cream">{b.k}:</span>{" "}
                        <span className="font-display italic text-brass">{b.v}</span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="right" delay={150}>
            <FlowDiagram />
          </Reveal>
        </div>

        {/* 1.2 */}
        <div className="mt-28">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <Reveal>
                <h3 className="font-display text-2xl font-semibold leading-snug text-cream sm:text-3xl">
                  1.2 · Batching Logistico &amp; Drop-Size Optimization
                </h3>
                <p className="mt-1 font-display text-lg italic text-brass">
                  Modello «Order Consolidation»
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-cream/75">
                  <p>
                    <span className="mr-2 rounded bg-ember/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ember">
                      As-Is
                    </span>
                    Frammentazione degli ordini — frequenza quindicinale di piccolo taglio — con
                    dispersione dei margini per l'incidenza fissa del costo di recapito
                    (Last-Mile Logistics Cost).
                  </p>
                  <p>
                    <span className="mr-2 rounded bg-leaf/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
                      To-Be
                    </span>
                    Conversione della base clienti verso un regime di{" "}
                    <strong className="text-cream">Raddoppio dei Volumi d'Ordine</strong>{" "}
                    (Order Consolidation Program).
                  </p>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-8 rounded-xl border border-leaf/25 bg-espresso/40 p-6">
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mint">
                    <IcLeaf size={15} /> Razionale di sostenibilità
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {RAZIONALE_12.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm leading-snug text-cream/75">
                        <IcCheck size={14} className="mt-0.5 shrink-0 text-leaf" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal variant="right" delay={150} className="order-1 lg:order-2">
              <ConsolidationSim />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
