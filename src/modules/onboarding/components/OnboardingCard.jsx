function OnboardingCard({
  title,
  description,
  children,
}) {
  return (
    <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#161a22] p-8 shadow-2xl">
      <h1 className="text-4xl font-bold tracking-tight text-white">
        {title}
      </h1>

      <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
        {description}
      </p>

      <div className="mt-10">
        {children}
      </div>
    </div>
  );
}

export default
  OnboardingCard;