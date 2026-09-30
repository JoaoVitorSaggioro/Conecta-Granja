import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Field from "../components/Field";
import { http } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { crudModules } from "../config/modules";

const relationMap = {
  galpoes: { path: "/galpoes", label: (item) => item.descritivo },
  lotes: { path: "/lotes", label: (item) => `#${item.id} · ${item.linhagem}` },
  categorias: { path: "/categorias", label: (item) => item.descritivo },
  matrizes: { path: "/matriz", label: (item) => `Matriz #${item.id}` },
  vacinas: { path: "/vacinas", label: (item) => item.produto },
};

function toInputValue(field, value) {
  if (value == null || value === "") return "";
  if (field.type === "datetime-local") {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  if (field.type === "date") return String(value).slice(0, 10);
  return value;
}

function toPayload(fields, form, isEdit) {
  const body = {};
  for (const field of fields) {
    let value = form[field.name];
    if (value === "" || value === undefined || value === null) {
      if (field.requiredOnCreate && isEdit) continue;
      continue;
    }
    if (field.type === "number" || field.type === "relation") {
      value = Number(value);
    }
    if (field.type === "datetime-local") {
      value = new Date(value).toISOString();
    }
    body[field.name] = value;
  }
  return body;
}

export default function CrudPage({ moduleKey }) {
  const config = crudModules.find((item) => item.key === moduleKey);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const canWrite = config.writeRoles.includes(user?.perfil);
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [removing, setRemoving] = useState(null);
  const [relations, setRelations] = useState({});

  const relationKeys = useMemo(
    () => [...new Set(config.fields.filter((field) => field.relation).map((field) => field.relation))],
    [config]
  );

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const list = await http.get(config.endpoint);
      setRows(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    Promise.all(
      relationKeys.map(async (key) => {
        const spec = relationMap[key];
        const items = await http.get(spec.path);
        return [key, items.map((item) => ({ value: item.id, label: spec.label(item) }))];
      })
    )
      .then((entries) => setRelations(Object.fromEntries(entries)))
      .catch(() => {});
  }, [config.endpoint]);

  const filtered = rows.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(query.toLowerCase())
  );

  const openCreate = () => {
    setEditing(null);
    setForm({});
    setOpenForm(true);
  };

  const openEdit = (row) => {
    const next = {};
    config.fields.forEach((field) => {
      next[field.name] = toInputValue(field, row[field.name]);
    });
    setEditing(row);
    setForm(next);
    setOpenForm(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const body = toPayload(config.fields, form, Boolean(editing));
      if (editing) {
        await http.put(`${config.endpoint}/${editing.id}`, body);
      } else {
        await http.post(config.endpoint, body);
      }
      setOpenForm(false);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmDelete = async () => {
    try {
      await http.del(`${config.endpoint}/${removing.id}`);
      setRemoving(null);
      await load();
    } catch (err) {
      setError(err.message);
      setRemoving(null);
    }
  };

  const encerrarLote = async (row) => {
    try {
      await http.patch(`/lotes/${row.id}/encerrar`);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow={config.group}
        title={config.title}
        description={config.description}
        actions={
          <>
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-pine-700/50" />
              <input
                className="field max-w-xs pl-9"
                placeholder="Buscar nesta tela"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            {canWrite && (
              <button type="button" className="btn-primary" onClick={openCreate}>
                Novo registro
              </button>
            )}
          </>
        }
      />

      {error && <p className="mb-4 rounded-2xl bg-clay-500/10 px-4 py-3 text-sm text-clay-600">{error}</p>}
      {loading ? (
        <div className="card overflow-hidden">
          <div className="animate-pulse divide-y divide-pine-100/80">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 px-5 py-4">
                <div className="h-4 w-1/5 rounded bg-pine-100" />
                <div className="h-4 w-1/4 rounded bg-pine-100" />
                <div className="h-4 w-1/6 rounded bg-pine-100" />
                <div className="ml-auto h-4 w-16 rounded bg-pine-100" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DataTable
          columns={config.columns}
          rows={filtered}
          onEdit={canWrite ? openEdit : undefined}
          onDelete={canWrite ? setRemoving : undefined}
          onOpen={moduleKey === "lotes" ? (row) => navigate(`/lotes/${row.id}`) : undefined}
          extra={
            moduleKey === "lotes" && isAdmin
              ? (row) =>
                  row.status === "Ativo" ? (
                    <button type="button" className="btn-secondary" onClick={() => encerrarLote(row)}>
                      Encerrar
                    </button>
                  ) : null
              : undefined
          }
        />
      )}

      {openForm && (
        <Modal
          title={editing ? `Editar ${config.title}` : `Novo ${config.title}`}
          description="Os campos abaixo espelham o contrato da API REST. Campos obrigatórios são validados também no servidor."
          onClose={() => setOpenForm(false)}
        >
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
            {config.fields.map((field) => (
              <Field
                key={field.name}
                field={field}
                isEdit={Boolean(editing)}
                value={form[field.name]}
                relationOptions={relations[field.relation] || []}
                onChange={(name, value) => setForm((current) => ({ ...current, [name]: value }))}
              />
            ))}
            <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
              <button type="button" className="btn-secondary" onClick={() => setOpenForm(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {removing && (
        <ConfirmDialog
          title="Excluir registro"
          message="Esta ação remove o item no banco de dados. Relacionamentos podem impedir a exclusão."
          confirmLabel="Excluir"
          onClose={() => setRemoving(null)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
