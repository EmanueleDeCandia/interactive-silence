/* ————————————————————————————————————————————————
   CORPUS STRATEGICO FORMALIZZATO — OCS ILLIRIA
   Progetto Pilota Regione Marche · Segmento OCS
   ———————————————————————————————————————————————— */

export const TICKER_ITEMS = [
  "Silenzio-Assenso",
  "Scope 3 Abatement",
  "−50% passaggi veicolari",
  "Order Consolidation",
  "Monti Azzurri · Km 0",
  "Tiering ESG",
  "Drop-size ×2",
  "WhatsApp Business API",
  "Green Loyalty Program",
  "Bilancio di Sostenibilità",
  "Unione Montana dei Monti Azzurri",
  "Customer Acquisition & Service Cost ↓",
];

export const EXEC_SUMMARY = {
  ambito: "Progetto Pilota Regione Marche — Segmento OCS (Office Coffee Service).",
  obiettivo:
    "Efficientamento operativo della Supply Chain dell'ultimo miglio, riduzione del Customer Acquisition & Service Cost (CAC/CSC), transizione verso un modello logistico sostenibile e valorizzazione dell'asset reputazionale territoriale (ESG).",
  scopo:
    "Silenzio Assenso è una estremizzazione. Anche nella opzione più soft, il cliente deve sempre compiere una scelta: confermare l'ordine precedente.",
};

export const ASSI = [
  {
    id: "asse-1",
    num: "01",
    titolo: "Reingegnerizzazione dei Flussi d'Ordine",
    sintesi:
      "Process automation «Silenzio-Assenso» e batching logistico «Order Consolidation»: dal contact center labour-intensive al default fulfillment omnicanale.",
  },
  {
    id: "asse-2",
    num: "02",
    titolo: "Dispositivi Abilitanti e Certificazioni ESG",
    sintesi:
      "Carbon Footprint Reduction Certificate (Scope 3) e Territorial Stewardship Certificate per convertire il cambio comportamentale in valore rendicontabile.",
  },
  {
    id: "asse-3",
    num: "03",
    titolo: "Sistema Integrato di Incentivazione",
    sintesi:
      "Loyalty & Reward Matrix: value proposition ibrida su due vettori — brand equity (visibilità, PR, eventi) e benefici in-kind a impatto margine neutro.",
  },
  {
    id: "asse-4",
    num: "04",
    titolo: "Go-To-Market & Packaging dell'Offerta",
    sintesi:
      "Green Loyalty Program a obiettivi di rendicontazione: catalogo interattivo per «Livelli di Virtuosità» con crediti in tempo reale.",
  },
] as const;

/* ———— Asse 1 · 1.1 Flussi As-Is / To-Be ———— */

export const FLOW_ASIS = [
  {
    label: "Cliente OCS",
    detail: "Deve ricordarsi di riordinare e contattare attivamente il fornitore.",
  },
  {
    label: "Contact Center",
    detail: "Gestione outbound labour-intensive ad elevata frizione operativa.",
  },
  {
    label: "Rincorsa del lead",
    detail: "Time-to-order dilatato, solleciti telefonici ripetuti.",
  },
  {
    label: "Scheduling sub-ottimale",
    detail: "Forza vendita e consegne pianificate su volumi frammentati.",
  },
  {
    label: "Consegna frammentata",
    detail: "Ordini quindicinali di piccolo taglio: il costo fisso di recapito erode il margine.",
  },
];

export const FLOW_TOBE = [
  {
    label: "Dispatching Predittivo",
    detail:
      "Proposta d'ordine pre-calcolata sui consumi storici (ciclo mensile) via WhatsApp Business API, SMS Gateway, Dem transazionale.",
  },
  {
    label: "Call-to-Action su Eccezione",
    detail:
      "Finestra temporale circoscritta per rettificare il mix merceologico o posticipare il rifornimento.",
  },
  {
    label: "Default Trigger · Conferma-Variazione",
    detail:
      "In assenza di cambiamenti di preferenze, il cliente conferma automaticamente l'ordine precedentemente fatto nell'applicazione.",
  },
  {
    label: "ERP / WMS",
    detail: "Trasmissione automatica per pianificazione e routing della consegna.",
  },
  {
    label: "Consegna programmata",
    detail: "Finestra settimanale standard, carichi di consegna saturati in modo programmabile.",
  },
];

export const CANALI = ["WhatsApp Business API", "SMS Gateway", "Dem transazionale"];

export const BENEFICI_11 = [
  { k: "Costi telefonici / operatore", v: "Drastico abbattimento", icon: "phone" },
  { k: "Tempi morti", v: "Azzeramento", icon: "timer" },
  { k: "Carichi di consegna", v: "Saturazione programmabile", icon: "truck" },
] as const;

/* ———— Asse 1 · 1.2 Order Consolidation ———— */

export const RAZIONALE_12 = [
  "Abbattimento emissioni Scope 1 e Scope 3",
  "−50% passaggi veicolari della flotta",
  "Ottimizzazione del drop-size",
  "Riduzione dell'impronta carbonica per singola capsula consegnata",
];

export const SIM_CONST = {
  consegneAnnoAsIs: 26, // frequenza quindicinale
  consegneAnnoToBe: 13, // raddoppio volumi d'ordine
  kgCo2PerKm: 0.32, // furgone commerciale leggero — stima di piano
};

/* ———— Asse 2 · Certificazioni ———— */

export const CERTIFICATI = [
  {
    code: "CFR-SC3",
    nome: "Carbon Footprint Reduction Certificate",
    sottotitolo: "Scope 3 Abatement",
    corpo:
      "Rilascio periodico di un attestato ufficiale che certifica il volume di CO₂ risparmiata dall'azienda cliente aderente.",
    spendibilita: "Spendibile nel proprio Bilancio di Sostenibilità / Report ESG.",
    icon: "leaf" as const,
  },
  {
    code: "TSC-AMI",
    nome: "Territorial Stewardship Certificate",
    sottotitolo: "Sviluppo Aree Interne",
    corpo:
      "Attestato di partecipazione attiva alla valorizzazione economica e sociale delle comunità interne della Regione Marche.",
    spendibilita:
      "Focus iniziale sulla partnership territoriale con l'Unione Montana dei Monti Azzurri.",
    icon: "mountain" as const,
  },
];

/* ———— Asse 3 · Loyalty & Reward Matrix ———— */

export const VETTORE_A = {
  titolo: "Corporate Visibility & Stakeholder Engagement",
  tag: "Incentivi Immateriali · Brand Equity",
  blocchi: [
    {
      nome: "Campagne Above-The-Line (ATL) & Digital PR",
      punti: [
        "Ranking di virtuosità e badge di sostenibilità per i top-performer su canali media e digital aziendali",
        "Gamification interaziendale: sfide e premi di sostenibilità via contest digitali",
        "Press release di settore dedicate ai risultati del programma",
      ],
      icon: "signal" as const,
    },
    {
      nome: "Live Corporate Events & PR Territoriali",
      punti: [
        "Riconoscimenti pubblici in festival, convention ed eventi istituzionali locali",
        "Interventi on-stage e tavole rotonde sulla green transition",
        "Delegati aziendali inseriti nelle giurie d'onore dei progetti d'area",
      ],
      icon: "mic" as const,
    },
  ],
};

export const VETTORE_B = {
  titolo: "In-Kind & Co-Marketing Benefit",
  tag: "Incentivi Materiali · Impatto Margine Neutro",
  blocchi: [
    {
      nome: "Zero-Cost Local Partnership Network",
      punti: [
        "Gift box enogastronomiche di eccellenze territoriali a Km 0 dei Monti Azzurri",
        "Modello di business circolare: i produttori locali forniscono gli asset a costo zero",
        "In cambio: canali di distribuzione privilegiati, visibilità B2B nei pacchi consegna, lead generation diretta",
      ],
      icon: "gift" as const,
    },
    {
      nome: "Volume Rebate / Product Sampling OCS",
      punti: [
        "Confezioni capsule omaggio a scaglioni di volume — sconto merce sul core product",
        "Effetto fidelizzante e incremento dell'immagazzinamento cliente",
      ],
      icon: "capsule" as const,
    },
  ],
};

/* ———— Asse 4 · Tiering ESG ———— */

export const CREDIT_RULES = {
  adesioneAutomazione: 40, // adesione al modello Silenzio-Assenso
  perOrdineConsolidato: 15, // ogni ordine consolidato nel trimestre
};

export const TIERS = [
  { soglia: 40, nome: "Tier I · Innesco Verde", desc: "Primo consolidamento e adozione dell'automazione" },
  { soglia: 85, nome: "Tier II · Filiera Virtuosa", desc: "Regime di riordino consolidato stabilizzato" },
  { soglia: 140, nome: "Tier III · Ambasciatore del Territorio", desc: "Top-performer del programma pilota" },
];

export const PREMI_CATALOGO = [
  { id: "cert-co2", nome: "Carbon Footprint Reduction Certificate", costo: 40, tipo: "Certificazione", tier: 1 },
  { id: "giftbox", nome: "Gift box Km 0 · Monti Azzurri", costo: 60, tipo: "In-Kind", tier: 1 },
  { id: "badge", nome: "Badge di sostenibilità + ranking ATL", costo: 85, tipo: "Brand Equity", tier: 2 },
  { id: "rebate", nome: "Capsule omaggio · scaglione volume", costo: 100, tipo: "Volume Rebate", tier: 2 },
  { id: "cert-territorio", nome: "Territorial Stewardship Certificate", costo: 120, tipo: "Certificazione", tier: 2 },
  { id: "stage", nome: "On-stage + giuria d'onore progetti d'area", costo: 140, tipo: "PR Territoriali", tier: 3 },
];

export const CHIUSURA = {
  statement: "Dal rumore del contact center al silenzio che fa crescere il territorio.",
  punti: [
    "Ultimo miglio efficiente e a carichi saturi",
    "CAC / CSC in riduzione strutturale",
    "Logistica sostenibile con CO₂ certificata",
    "Reputazione ESG radicata nelle aree interne",
  ],
};

export const fmtInt = (n: number) =>
  Math.round(n).toLocaleString("it-IT", { maximumFractionDigits: 0 });

export const fmt1 = (n: number) =>
  n.toLocaleString("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
