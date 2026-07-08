import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo, { serviceJsonLd, breadcrumbJsonLd } from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import SmartImage from '../components/SmartImage.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { getService, getServices } from '../lib/api.js'
import NotFound from './NotFound.jsx'

export default function ServicioDetalle() {
  const { slug } = useParams()
  const [service, setService] = useState(undefined)
  const [others, setOthers] = useState([])

  useEffect(() => {
    setService(undefined)
    getService(slug).then(setService)
    getServices().then((all) => setOthers(all.filter((s) => s.slug !== slug)))
  }, [slug])

  if (service === undefined) {
    return <div className="flex min-h-screen items-center justify-center text-ink-500">Cargando…</div>
  }
  if (service === null) return <NotFound />

  const crumb = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: service.title, path: `/servicios/${service.slug}` },
  ]

  return (
    <>
      <Seo
        title={service.title}
        description={service.shortDescription}
        path={`/servicios/${service.slug}`}
        keywords={service.keywords}
        jsonLd={[serviceJsonLd(service), breadcrumbJsonLd(crumb)]}
      />
      <PageHeader eyebrow="Servicio" title={service.title} subtitle={service.shortDescription} breadcrumb={crumb} />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-3">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <ServiceIcon slug={service.slug} className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-800 tracking-tight text-ink-900">¿En qué consiste?</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">{service.description}</p>

            {service.features?.length > 0 && (
              <>
                <h3 className="mt-10 text-xl font-700 text-ink-900">Qué incluye</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 rounded-lg border border-ink-800/8 bg-ink-50/50 p-4" style={{ background: '#f9fafb' }}>
                      <svg className="mt-0.5 h-5 w-5 flex-none text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="text-sm leading-relaxed text-ink-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="lg:col-span-2">
            <SmartImage src={service.image} alt={service.imageAlt} className="aspect-4/3 w-full rounded-2xl shadow-lg" />
            <div className="mt-6 rounded-2xl border border-ink-800/10 bg-ink-950 p-7 text-white">
              <h3 className="text-lg font-700">¿Necesitas este servicio?</h3>
              <p className="mt-2 text-sm text-white/70">Coordinamos una revisión técnica de tu requerimiento y te entregamos una propuesta.</p>
              <Link to="/contacto" className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-700 text-ink-950 hover:bg-brand-400">
                Solicitar propuesta
              </Link>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-700 uppercase tracking-wide text-ink-500">Otros servicios</h3>
              <ul className="space-y-2">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link to={`/servicios/${o.slug}`} className="flex items-center justify-between rounded-lg border border-ink-800/8 px-4 py-3 text-sm font-600 text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600">
                      {o.title}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
