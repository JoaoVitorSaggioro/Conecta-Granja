const tones = {
  Ativo: "bg-pine-100 text-pine-800",
  Encerrado: "bg-ink-500/10 text-ink-700",
  admin: "bg-wheat-100 text-wheat-600",
  funcionario: "bg-pine-50 text-pine-700",
  BOA: "bg-pine-100 text-pine-800",
  REGULAR: "bg-wheat-100 text-wheat-600",
  RUIM: "bg-clay-500/15 text-clay-600",
  SIM: "bg-pine-100 text-pine-800",
  NÃO: "bg-clay-500/15 text-clay-600",
};

export default function Badge({ value }) {
  return <span className={`chip ${tones[value] || "bg-pine-50 text-pine-800"}`}>{value}</span>;
}
