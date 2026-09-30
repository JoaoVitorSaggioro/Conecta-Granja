import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@conectagranja.com");
  const [senha, setSenha] = useState("Admin@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, senha);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="grain relative hidden overflow-hidden bg-pine-950 text-wheat-50 lg:flex">
        <div className="relative z-10 flex flex-col justify-between p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-wheat-300">Sistema de gestão avícola</p>
          <div>
            <h1 className="max-w-md font-serif text-6xl leading-[1.05]">
              O lote inteiro, com a precisão do campo.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-pine-100/80">
              Conecta Granja concentra galpão, alojamento, ração, pesagem, luz, vacina e mortalidade
              em um único fluxo operacional — do pintinho ao encerramento do lote.
            </p>
          </div>
          <dl className="grid max-w-lg grid-cols-3 gap-6 text-sm">
            <div>
              <dt className="text-wheat-300">Registros</dt>
              <dd className="mt-1 font-serif text-2xl">14 módulos</dd>
            </div>
            <div>
              <dt className="text-wheat-300">Acesso</dt>
              <dd className="mt-1 font-serif text-2xl">JWT + perfil</dd>
            </div>
            <div>
              <dt className="text-wheat-300">Foco</dt>
              <dd className="mt-1 font-serif text-2xl">Frango de corte</dd>
            </div>
          </dl>
        </div>
        <svg className="absolute -right-16 bottom-0 h-[28rem] w-[28rem] text-pine-800" viewBox="0 0 400 400" fill="currentColor">
          <circle cx="200" cy="210" r="150" opacity="0.35" />
          <path d="M70 260c40-90 90-140 160-150 40 30 70 90 55 150-50 10-120 20-215 0z" className="text-pine-700" />
          <path d="M150 170c20-40 70-55 110-20-10 40-50 55-110 20z" className="text-wheat-400" opacity="0.7" />
        </svg>
      </section>

      <section className="flex items-center justify-center px-6 py-16">
        <form onSubmit={onSubmit} className="w-full max-w-md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-wheat-600">
            Acesso restrito
          </p>
          <h2 className="mt-3 font-serif text-4xl text-pine-900">Entrar na granja</h2>
          <p className="mt-3 text-sm text-ink-500">
            Use a conta administrativa inicial ou um usuário criado pelo administrador.
          </p>

          <div className="mt-8 space-y-4">
            <label className="block">
              <span className="label">E-mail</span>
              <input className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label className="block">
              <span className="label">Senha</span>
              <input className="field" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </label>
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-clay-500/10 px-3 py-2 text-sm text-clay-600">{error}</p>
          )}

          <button type="submit" className="btn-primary mt-6 w-full" disabled={loading}>
            {loading ? "Autenticando..." : "Entrar"}
          </button>

          <p className="mt-6 text-xs leading-5 text-ink-500">
            Credencial padrão de desenvolvimento: <strong>admin@conectagranja.com</strong> /{" "}
            <strong>Admin@123</strong>. Altere a senha antes de qualquer ambiente real.
          </p>
        </form>
      </section>
    </div>
  );
}
