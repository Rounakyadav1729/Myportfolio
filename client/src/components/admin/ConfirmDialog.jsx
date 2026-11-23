export default function ConfirmDialog({ open, title, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="card w-full max-w-md p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-mute">This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
