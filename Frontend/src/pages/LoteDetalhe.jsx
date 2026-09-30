import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Badge from "../components/Badge";
import { http } from "../lib/api";

const related = [
  { key: "entradas", title: "Entrada", path: "/entrada", match: "lote_id" },
  { key: "matrizes", title: "Matrizes", path: "/matriz", match: "lote_id" },
  { key: "racoes", title: "Rações", path: "/racoes", match: "lote_id" },
  { key: "pesagens", title: "Pesagens", path: "/pesagens", match: "lote_id" },
  { key: "luz", title: "Luz", path: "/luz", match: "lote_id" },
  { key: "mortalidades", title: "Mortalidade", path: "/mortalidades", match: "lote_id" },
  { key: "vacinas", title: "Vacinas", path: "/vacinas", match: "lote_id" },
  { key: "avaliacoes", title: "Avaliações", path: "/avaliacoes", match: "lote_id" },
];

export default function LoteDetalhe() {
  const { id } = useParams();
  const [lote, setLote] = useState(null);
  const [groups, setGroups] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    http
      .get(`/lotes/${id}`)
      .then(setLote)
      .catch((err) => setError(err.message));

    Promise.all(
      related.map(async (item) => {
        const list = await http.get(item.path);
        return [item.key, list.filter((row) => String(row[item.match]) === String(id))];
      })
    )
      .then((entries) => setGroups(Object.fromEntries(entries)))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="rounded-2xl bg-clay-500/10 px-4 py-3 text-sm text-clay-600">{error}</p>;
  }

  if (!lote) {
    return <p className="text-ink-500">Carregando lote...</p>;
  }

  return (
    <>
      <PageHeader
        eyebrow="Ficha do lote"
        title={`Lote #${lote.id} · ${lote.linhagem}`}
        description="Visão consolidada do ciclo produtivo, montada no frontend a partir dos endpoints já existentes."
        actions={
          <Link to="/lotes" className="btn-secondary">
            Voltar aos lotes
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-4">
        <Info label="Status" value={<Badge value={lote.status} />} />
        <Info label="Galpão" value={`#${lote.galpao_id}`} />
        <Info label="Qtd. inicial" value={lote.quantidade_inicial} />
        <Info label="Entrada" value={lote.data_entrada} />
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-2">
        {related.map((item) => (
          <article key={item.key} className="card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-pine-900">{item.title}</h2>
              <span className="text-sm text-ink-500">{groups[item.key]?.length || 0}</span>
            </div>
            <ul className="space-y-2 text-sm text-ink-500">
              {(groups[item.key] || []).slice(0, 5).map((row) => (
                <li key={row.id} className="rounded-xl bg-pine-50/70 px-3 py-2">
                  {summarize(item.key, row)}
                </li>
              ))}
              {!groups[item.key]?.length && <li>Nenhum lançamento neste lote.</li>}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}

function summarize(key, row) {
  const map = {
    entradas: `${row.procedencia} · ${row.placa_caminhao}`,
    matrizes: `${row.linhagem} · ${row.quantidade_alojada} aves`,
    racoes: `${row.tipo} · ${row.quantidade} kg`,
    pesagens: `${row.idade} dias · ${row.peso_medio} kg`,
    luz: `${row.idade_inicial}–${row.idade_final} dias · ${row.horas_escuro}h escuro`,
    mortalidades: `${row.total_mortalidade} baixas em ${row.idade} dias`,
    vacinas: `${row.produto} · ${row.eficiencia}`,
    avaliacoes: `${row.resultado} · valor ${row.valor}`,
  };
  return map[key] || `Registro #${row.id}`;
}

function Info({ label, value }) {
  return (
    <article className="card p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pine-700/70">{label}</p>
      <div className="mt-3 text-lg text-pine-900">{value}</div>
    </article>
  );
}
