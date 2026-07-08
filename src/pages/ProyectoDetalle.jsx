import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo, { breadcrumbJsonLd } from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import SmartImage from '../components/SmartImage.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { getProjects } from '../lib/api.js'
import NotFound from './NotFound.jsx'

export default function ProyectoDetalle() {
  const { id } = useParams()
  const [project, setProject] = useState(undefined)
  const [others, setOthers] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    setProject(undefined)
    getProjects().then((all) => {
      setProject(all.find((p) => p.id === id) ?? null)
      setOthers(all.filter((p) => p.id !== id).slice(0, 3))
    })
  }, [id])

  if (project === undefined) {
    return <div className="flex min-h-screen items-center justify-center text-ink-500">Cargando…</div>
  }
  if (project === null) return <NotFound />

  const gallery = Array.isArray(project.gallery) ? project.gallery : []
  const crumb = [
    { name: 'Inicio', path: '/' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: project.title, path: `/proyectos/${project.id}` },
  ]

  return (
    <>
      <Seo
        title={`${project.title} — ${project.client}`}
        description={project.description}
        path={`/proyectos/${project.id}`}
        jsonLd={breadcrumbJsonLd(crumb)}
      />
      <PageHeader eyebrow={project.category} title={project.title} subtitle={project.client} breadcrumb={crumb} />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-3">
            <SmartImage src={project.image} alt={project.imageAlt || project.title} className="aspect-16/10 w-full rounded-2xl shadow-lg" eager />
            <h2 className="mt-8 text-2xl font-800 tracking-tight text-ink-900">Sobre el proyecto</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">{project.description}</p>

            {gallery.length > 0 && (
              <>
                <h3 className="mt-10 text-xl font-700 text-ink-900">Galería</h3>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {gallery.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setLightbox(src)}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-ink-800/10 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <SmartImage src={src} alt={`${project.title} — imagen ${i + 1}`} className="h-full w-full transition-transform duration-300 group-hover:scale-105" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="lg:col-span-2">
            <dl className="rounded-2xl border border-ink-800/10 p-6" style={{ background: '#f9fafb' }}>
              <Row label="Cliente / mandante" value={project.client} />
              <Row label="Categoría" value={project.category} />
              <Row label="Periodo" value={project.period} />
              <Row label="Detalle" value={project.meta} />
            </dl>
            <div className="mt-6 rounded-2xl bg-ink-950 p-7 text-white">
              <h3 className="text-lg font-700">¿Un proyecto similar?</h3>
              <p className="mt-2 text-sm text-white/70">Coordinamos una revisión técnica de tu requerimiento.</p>
              <Link to="/contacto" className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-700 text-ink-950 hover:bg-brand-400">
                Solicitar propuesta
              </Link>
            </div>

            {others.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-700 uppercase tracking-wide text-ink-500">Otros proyectos</h3>
                <ul className="space-y-2">
                  {others.map((o) => (
                    <li key={o.id}>
                      <Link to={`/proyectos/${o.id}`} className="flex items-center justify-between rounded-lg border border-ink-800/8 px-4 py-3 text-sm font-600 text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600">
                        <span className="truncate">{o.title}</span>
                        <svg className="h-4 w-4 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
      <CtaBanner />
    </>
  )
}

function Row({ label, value }) {
  if (!value) return null
  return (
    <div className="border-b border-ink-800/8 py-3 last:border-0">
      <dt className="text-xs font-700 uppercase tracking-wide text-brand-600">{label}</dt>
      <dd className="mt-0.5 font-600 text-ink-900">{value}</dd>
    </div>
  )
}
