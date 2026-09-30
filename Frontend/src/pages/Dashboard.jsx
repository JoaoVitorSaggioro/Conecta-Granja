import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layers3, Skull, Warehouse, Scale } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import { http } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({
    lotes: [],
    galpoes: [],
    mortalidades: [],
    pesagens: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      http.get("/lotes"),
      http.get("/galpoes"),
      http.get("/mortalidades"),
      http.get("/pesagens"),
    ])
      .then(([lotes, galpoes, mortalidades, pesagens]) => {
        setData({ lotes, galpoes, mortalidades, pesagens });
      })
      .catch((err) => setError(err.message));
  }, []);

  const ativos = data.lotes.filter((lote) => lote.status === "Ativo").length;
  const mortalidadeTotal = data.mortalidades.reduce(
    (sum, item) => sum + Number(item.total_mortalidade || 0),
    0
  );

  return (
    <>
      <PageHeader
        eyebrow="Visão geral"
        title={`Olá, ${user?.nome?.split(" ")[0] || "equipe"}`}
        description="Resumo operacional da granja com base nos registros já persistidos na API."
      />

      {error && (
        <p className="mb-6 rounded-2xl bg-clay-500/10 px-4 py-3 text-sm text-clay-600">{error}</p>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Lotes ativos" value={ativos} hint={`${data.lotes.length} no histórico`} icon={Layers3} />
        <StatCard label="Galpões" value={data.galpoes.length} hint="Estrutura cadastrada" icon={Warehouse} />
        <StatCard label="Mortalidade" value={mortalidadeTotal} hint="Soma das baixas lançadas" icon={Skull} />
        <StatCard label="Pesagens" value={data.pesagens.length} hint="Amostras de peso médio" icon={Scale} />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="font-serif text-2xl text-pine-900">Lotes recentes</h2>
            <Link to="/lotes" className="text-sm text-pine-700 hover:underline">
              Ver todos
            </Link>
          </div>
          <table className="min-w-full text-sm">
            <thead className="bg-pine-50 text-pine-800">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Lote</th>
                <th className="px-5 py-3 text-left font-medium">Linhagem</th>
                <th className="px-5 py-3 text-left font-medium">Entrada</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.lotes.slice(0, 6).map((lote) => (
                <tr key={lote.id} className="border-t border-pine-100">
                  <td className="px-5 py-3">
                    <Link className="font-medium text-pine-800 hover:underline" to={`/lotes/${lote.id}`}>
                      #{lote.id}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{lote.linhagem}</td>
                  <td className="px-5 py-3">{lote.data_entrada}</td>
                  <td className="px-5 py-3">
                    <Badge value={lote.status} />
                  </td>
                </tr>
              ))}
              {!data.lotes.length && (
                <tr>
                  <td className="px-5 py-8 text-ink-500" colSpan={4}>
                    Ainda não há lotes. Cadastre um galpão e, em seguida, o primeiro lote.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card p-5">
          <h2 className="font-serif text-2xl text-pine-900">Ordem sugerida</h2>
          <ol className="mt-4 space-y-3 text-sm text-ink-500">
            <li>1. Cadastre o galpão e a capacidade.</li>
            <li>2. Abra o lote (Cobb ou Ross) naquele galpão.</li>
            <li>3. Lance a entrada logística e as matrizes.</li>
            <li>4. Acompanhe ração, luz, pesagem e mortalidade.</li>
            <li>5. Encerre o lote quando o ciclo terminar.</li>
          </ol>
        </div>
      </section>
    </>
  );
}
