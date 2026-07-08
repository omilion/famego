import { Link } from 'react-router-dom'

// Cabecera oscura reutilizable para páginas interiores, con breadcrumb SEO.
export default function PageHeader({ eyebrow, title, subtitle, breadcrumb = [] }) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pt-28 pb-14">
      <div className="bg-blueprint absolute inset-0 opacity-50" />
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumb.length > 0 && (
          <nav aria-label="Ruta de navegación" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-white/50">
            {breadcrumb.map((b, i) => (
              <span key={b.path} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-white/30">/</span>}
                {i === breadcrumb.length - 1 ? (
                  <span className="text-brand-400">{b.name}</span>
                ) : (
                  <Link to={b.path} className="hover:text-white">{b.name}</Link>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="mb-2 text-sm font-700 uppercase tracking-widest text-brand-400">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-900 leading-tight tracking-tight text-white sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">{subtitle}</p>}
      </div>
    </section>
  )
}
