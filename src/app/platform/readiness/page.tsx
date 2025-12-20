import DemoShell from "@/components/demo/DemoShell";

export default function ReadinessPage() {
  return (
    <section
      style={{
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "2.5rem 1rem",
        color: "#17242D",
      }}
    >
      <h1
        style={{
          fontSize: "2.25rem",
          fontWeight: 800,
          marginBottom: "0.5rem",
        }}
      >
        Fundraising Readiness
      </h1>

      <p
        style={{
          maxWidth: "48rem",
          opacity: 0.75,
          marginBottom: "2rem",
        }}
      >
        Simulated end-to-end fundraising readiness review. No backend. Real UX.
      </p>

      <DemoShell />
    </section>
  );
}
