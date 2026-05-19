function HubTabs({ tabs }) {
  return (
    <div className="mb-6 w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden md:mb-8">
      <div className="flex gap-2.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            className="whitespace-nowrap rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 md:px-5"
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HubTabs;