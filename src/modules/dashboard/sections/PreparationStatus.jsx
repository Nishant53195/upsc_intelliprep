import SectionCard from "../components/SectionCard";

const cards = [
  "Preparation Phase",
  "Days To Prelims",
  "Days To Mains",
  "GS Completion",
  "Optional Completion",
  "Revision Health",
];

function PreparationStatus() {
  return (
    <SectionCard
      title="Preparation Status"
      subtitle="Track your overall UPSC preparation health."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card}
            className="rounded-3xl border border-white/10 bg-[#11151b] p-5"
          >
            <p className="text-sm text-slate-400">
              {card}
            </p>

            <div className="mt-5 h-24 rounded-2xl border border-dashed border-white/10" />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default
  PreparationStatus;