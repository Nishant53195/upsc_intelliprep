import { Bell, Search, Menu } from "lucide-react";

function Topbar({ setMobileMenuOpen }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6 md:px-8 md:py-6">
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition-colors hover:bg-slate-50 md:hidden"
        >
          <Menu size={20} />
        </button>
        
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Dashboard
          </h1>
          <p className="mt-0.5 hidden text-sm font-medium text-slate-500 sm:block">
            Your intelligent UPSC workspace
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button className="rounded-full bg-slate-100 p-2.5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800 sm:p-3">
          <Search size={18} />
        </button>

        <button className="relative rounded-full bg-slate-100 p-2.5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800 sm:p-3">
          <Bell size={18} />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 sm:h-11 sm:w-11">
          N
        </div>
      </div>
    </header>
  );
}

export default Topbar;