import { useState } from "react";
import { Menu, Feather } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="lg:sticky lg:top-0 lg:h-screen">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-pine-900/10 bg-wheat-50/90 px-5 py-4 backdrop-blur-sm lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="rounded-xl border border-pine-200 bg-white p-2 text-pine-800 transition-colors hover:bg-pine-50"
          >
            <Menu size={20} />
          </button>
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-wheat-400 text-pine-950">
            <Feather size={16} />
          </span>
          <p className="font-serif text-lg leading-none text-pine-900">Conecta Granja</p>
        </header>

        <main className="min-w-0 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
