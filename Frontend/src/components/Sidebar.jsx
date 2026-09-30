import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Feather, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { modules } from "../config/modules";

const groups = ["Produção", "Manejo", "Sanidade", "Qualidade", "Sistema"];

export default function Sidebar({ open = false, onClose = () => {} }) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const visible = modules.filter((item) => item.inMenu && (!item.adminOnly || isAdmin));

  return (
    <>
      {/* Overlay: só existe em telas pequenas, quando o menu está aberto */}
      <button
        type="button"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-pine-950/60 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-white/10 bg-pine-950 text-pine-50 transition-transform duration-300 ease-out lg:static lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between px-6 pb-6 pt-7">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-wheat-400 text-pine-950">
              <Feather size={22} />
            </span>
            <div>
              <p className="font-serif text-xl leading-none">Conecta</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-wheat-300">Granja</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="rounded-lg p-1.5 text-pine-200 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                isActive ? "bg-white/10 text-white" : "text-pine-100/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <LayoutIcon />
            Painel
          </NavLink>

          {groups.map((group) => {
            const items = visible.filter((item) => item.group === group);
            if (!items.length) return null;
            return (
              <div key={group}>
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-pine-300/70">
                  {group}
                </p>
                <div className="space-y-1">
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.key}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-pine-100/70 hover:bg-white/5 hover:text-white"
                          }`
                        }
                      >
                        <Icon size={16} />
                        {item.title}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-xl bg-white/5 px-3 py-3">
            <p className="truncate text-sm font-medium">{user?.nome}</p>
            <p className="truncate text-xs text-pine-200/70">{user?.email}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-wheat-300">
              {user?.perfil}
            </p>
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-pine-100/80 transition-colors duration-150 hover:bg-white/5"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}

function LayoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}
