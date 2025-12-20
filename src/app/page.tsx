import DemoShell from "@/components/demo/DemoShell";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "2.5rem 1rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
        The Fundraising Accelerator feature demo
      </h1>
      <p style={{ opacity: 0.75, maxWidth: "52rem", marginBottom: "2rem" }}>
        Demo-only: simulated end-to-end deck review (no backend). Diagnose → Fix →
        Rehearse.
      </p>

      <DemoShell />
    </main>
  );
}
