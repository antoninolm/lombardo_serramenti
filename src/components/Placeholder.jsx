export default function Placeholder({ alt, caption, ratio = '4 / 3', fill = false, className = '' }) {
  const box = fill ? 'absolute inset-0' : 'relative w-full'
  return (
    <div
      role="img"
      aria-label={alt}
      style={fill ? undefined : { aspectRatio: ratio }}
      className={`${box} flex items-end overflow-hidden bg-[repeating-linear-gradient(45deg,var(--color-iron-500),var(--color-iron-500)_10px,var(--color-iron-600)_10px,var(--color-iron-600)_20px)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="m-3 rounded bg-black/40 px-2 py-1 font-mono text-[11px] text-cream-50"
      >
        {caption ?? alt}
      </span>
    </div>
  )
}
