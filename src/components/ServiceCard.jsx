import { Link } from 'react-router-dom'
import ServiceIcon from './ServiceIcon.jsx'

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/servicios/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-ink-800/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl hover:shadow-ink-900/5"
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" />
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
        <ServiceIcon slug={service.slug} />
      </div>
      <h3 className="text-xl font-700 tracking-tight text-ink-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{service.shortDescription}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-700 text-brand-600">
        Ver detalle
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </Link>
  )
}
