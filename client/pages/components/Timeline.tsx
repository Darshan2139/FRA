export const Timeline = () => {
  const items = [
    { phase: "Q1", title: "Project Initiation", desc: "Requirements & stakeholder onboarding" },
    { phase: "Q2", title: "OCR & Atlas", desc: "Digitization pipeline and base WebGIS" },
    { phase: "Q3", title: "AI & DSS", desc: "Asset detection and rule engine" },
    { phase: "Q4", title: "Rollout", desc: "Training, monitoring, and enhancements" },
  ];
  return (
    <ol className="relative border-s pl-6">
      {items.map((it, idx) => (
        <li key={idx} className="mb-8 ms-6">
          <span className="absolute -start-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {idx + 1}
          </span>
          <h3 className="font-semibold">{it.phase} — {it.title}</h3>
          <p className="text-sm text-muted-foreground">{it.desc}</p>
        </li>
      ))}
    </ol>
  );
};
