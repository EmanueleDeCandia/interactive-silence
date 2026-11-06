import { Nav, IndexLedger, Closing } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { Flows } from "./components/Flows";
import { Certificates } from "./components/Certificates";
import { RewardMatrix, TierBuilder } from "./components/Rewards";

export default function App() {
  return (
    <div id="top" className="relative min-h-screen bg-espresso font-body text-cream">
      <div className="noise-overlay" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <IndexLedger />
        <Flows />
        <Certificates />
        <RewardMatrix />
        <TierBuilder />
        <Closing />
      </main>
    </div>
  );
}
