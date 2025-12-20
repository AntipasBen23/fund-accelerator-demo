import DemoShell from "@/components/demo/DemoShell";

export default function DemoPage() {
  return (
    <section className="container-page py-10 md:py-14">
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight md:text-4xl">
          PitchDeckAI Demo
        </h1>
        <p className="mt-2 max-w-3xl text-brand-ink/70">
          Full product flow, zero backend. This simulates uploads, async processing, scoring,
          rewrites, benchmarks, and pitch practice—so you can demo the idea like it’s already real.
        </p>
      </div>

      <DemoShell />
    </section>
  );
}
