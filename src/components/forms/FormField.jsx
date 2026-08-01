export default function FormField({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-display text-sm font-medium text-cream-200">{label}</span>
      {children}
      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </label>
  )
}
