import { Link } from 'react-router-dom'

const variants = {
  dark: 'bg-ink-900 text-cream-50 hover:brightness-125 border border-transparent',
  accent:
    'bg-ember-500 text-cream-50 hover:brightness-110 border border-transparent',
  outline:
    'border border-ink-900 text-ink-800 hover:bg-cream-200',
}

export default function Button({ to, href, variant = 'accent', className = '', children, ...props }) {
  const classes = `inline-flex items-center justify-center rounded px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
