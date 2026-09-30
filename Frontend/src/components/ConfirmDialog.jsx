import { useEffect } from "react";

export default function ConfirmDialog({ title, message, confirmLabel = "Confirmar", onConfirm, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="animate-overlay-in absolute inset-0 bg-pine-950/50"
        onClick={onClose}
      />
      <div className="animate-panel-in relative w-full max-w-md rounded-3xl bg-white p-6 shadow-panel">
        <h2 className="font-serif text-2xl text-pine-900">{title}</h2>
        <p className="mt-2 text-sm text-ink-500">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
