import Badge from "./Badge";

function formatValue(column, value) {
  if (value == null || value === "") return "—";
  if (column.format === "date") {
    return new Date(value).toLocaleString("pt-BR");
  }
  return String(value);
}

export default function DataTable({ columns, rows, onEdit, onDelete, onOpen, extra }) {
  if (!rows.length) {
    return (
      <div className="card px-8 py-16 text-center">
        <p className="font-serif text-2xl text-pine-900">Nenhum registro ainda</p>
        <p className="mt-2 text-sm text-ink-500">
          Os dados desta tela vêm da API. Cadastre o primeiro item para começar o histórico da granja.
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-pine-950 text-pine-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-medium">
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id ?? index} className="border-t border-pine-100/80 transition-colors duration-150 hover:bg-pine-50/40">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 align-middle">
                    {column.badge ? (
                      <Badge value={row[column.key]} />
                    ) : (
                      formatValue(column, row[column.key])
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    {onOpen && (
                      <button type="button" className="btn-ghost" onClick={() => onOpen(row)}>
                        Abrir
                      </button>
                    )}
                    {extra?.(row)}
                    {onEdit && (
                      <button type="button" className="btn-secondary" onClick={() => onEdit(row)}>
                        Editar
                      </button>
                    )}
                    {onDelete && (
                      <button type="button" className="btn-ghost text-clay-600" onClick={() => onDelete(row)}>
                        Excluir
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
