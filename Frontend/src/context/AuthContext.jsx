import { createContext, useContext, useMemo, useState } from "react";
import { http } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("cg_token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("cg_user");
    return raw ? JSON.parse(raw) : null;
  });

  const value = useMemo(() => {
    const login = async (email, senha) => {
      const data = await http.post("/usuarios/login", { email, senha });
      localStorage.setItem("cg_token", data.token);
      localStorage.setItem("cg_user", JSON.stringify(data.usuario));
      setToken(data.token);
      setUser(data.usuario);
      return data.usuario;
    };

    const logout = () => {
      localStorage.removeItem("cg_token");
      localStorage.removeItem("cg_user");
      setToken(null);
      setUser(null);
    };

    return {
      token,
      user,
      isAuthenticated: Boolean(token),
      isAdmin: user?.perfil === "admin",
      login,
      logout,
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
