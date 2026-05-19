function OnboardingLayout({
  sidebar,
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f1115] text-white">
      {/* Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%)]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden w-[380px] border-r border-white/5 bg-[#141922] lg:block">
          {sidebar}
        </div>

        {/* Main */}
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default
  OnboardingLayout;