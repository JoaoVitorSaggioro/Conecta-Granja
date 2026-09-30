export default function Field({ field, value, onChange, relationOptions = [], isEdit }) {
  const required = field.required || (field.requiredOnCreate && !isEdit);
  const options = field.options || relationOptions;

  return (
    <label className="block">
      <span className="label">
        {field.label}
        {required ? " *" : ""}
      </span>
      {field.type === "select" || field.type === "relation" ? (
        <select
          className="field"
          required={required}
          value={value ?? ""}
          onChange={(event) => onChange(field.name, event.target.value)}
        >
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="field"
          type={field.type === "datetime-local" ? "datetime-local" : field.type}
          step={field.step}
          required={required}
          placeholder={field.placeholder}
          value={value ?? ""}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      )}
    </label>
  );
}
