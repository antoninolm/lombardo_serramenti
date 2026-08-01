import { Link } from 'react-router-dom'

const variants = {
  accent:
    'bg-ember-500 text-ember-ink hover:brightness-110 border border-transparent',
  outline:
    'border border-iron-400 text-cream-50 hover:bg-iron-600',
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
