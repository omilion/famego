import Seo, { breadcrumbJsonLd } from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SmartImage from '../components/SmartImage.jsx'
import { getProjects } from '../lib/api.js'
import { INDUSTRIES, HISTORY } from '../data/projects.js'

const CRUMB = [
  { name: 'Inicio', path: '/' },
  { name: 'Proyectos', path: '/proyectos' },
]

export default function Proyectos() {
  const [projects, setProjects] = useState([])
  useEffect(() => { getProjects().then(setProjects) }, [])

  return (
    <>
      <Seo
        title="Proyectos y experiencia"
        description="Casos destacados de Famego: NielsenIQ, Merck Group, Codelco, Pandora, MetLife, Provida, Schneider y más. Experiencia en retail, corporativo, industrial, infraestructura y educacional."
        path="/proyectos"
        keywords="proyectos constructora Chile, casos de éxito construcción, experiencia edificación industrial, mantenimiento retail"
        jsonLd={breadcrumbJsonLd(CRUMB)}
      />
      <PageHeader
        eyebrow="Experiencia comprobada"
        title="Proyectos y clientes"
        subtitle="Proyectos desarrollados en áreas comerciales, industriales, infraestructura, educación y habitacional para mandantes corporativos de primer nivel."
        breadcrumb={CRUMB}
      />

      {/* Casos destacados */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-900 tracking-tight text-ink-900 sm:text-3xl">Casos destacados</h2>
          <p className="mt-2 text-ink-600">Proyectos recientes y contratos vigentes informados por la empresa.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, idx) => {
              const delays = [
                'animation-delay-100',
                'animation-delay-200',
                'animation-delay-300',
                'animation-delay-400',
                'animation-delay-500',
                'animation-delay-600',
              ]
              const delayClass = delays[idx % delays.length]
              return (
                <Link
                  key={p.id}
                  to={`/proyectos/${p.id}`}
                  className={`animate-fade-in-up ${delayClass} group flex flex-col overflow-hidden rounded-xl border border-ink-800/10 bg-white shadow-sm transition-shadow hover:shadow-xl`}
                >
                <div className="relative aspect-16/10 overflow-hidden">
                  <SmartImage src={p.image} alt={p.imageAlt} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded bg-brand-500 px-2.5 py-1 text-[11px] font-700 uppercase tracking-wide text-ink-950">{p.category}</span>
                  {Array.isArray(p.gallery) && p.gallery.length > 0 && (
                    <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-[11px] font-600 text-white">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0 0 21.75 19.5V4.5A1.5 1.5 0 0 0 20.25 3H3.75A1.5 1.5 0 0 0 2.25 4.5v15A1.5 1.5 0 0 0 3.75 21Z" /></svg>
                      {p.gallery.length}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-700 uppercase tracking-wide text-brand-600">{p.client}</p>
                  <h3 className="mt-2 text-lg font-700 leading-snug text-ink-900">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-600">{p.description}</p>
                  <p className="mt-3 text-xs text-ink-500">{p.period} · {p.meta}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-700 text-brand-600">
                    Ver proyecto
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </span>
                </div>
              </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experiencia por industria */}
      <section className="py-16 lg:py-20" style={{ background: '#f7f8f9' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-900 tracking-tight text-ink-900 sm:text-3xl">Experiencia por industria</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, idx) => {
              const delays = [
                'animation-delay-100',
                'animation-delay-200',
                'animation-delay-300',
              ]
              const delayClass = delays[idx % delays.length]
              return (
                <div
                  key={ind.name}
                  className={`animate-fade-in-up ${delayClass} rounded-xl border-l-4 border-brand-500 bg-white p-6 shadow-sm`}
                >
                <h3 className="text-lg font-700 text-ink-900">{ind.name}</h3>
                <p className="mt-2 text-sm font-600 text-brand-700">{ind.clients}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{ind.detail}</p>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Historial */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-900 tracking-tight text-ink-900 sm:text-3xl">Historial complementario</h2>
          <p className="mt-2 text-ink-600">Otras obras ejecutadas por Sociedad Constructora Famego SpA.</p>
          <div className="mt-8 divide-y divide-ink-800/8">
            {HISTORY.map((h) => (
              <div key={h.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-6">
                <span className="w-32 flex-none text-xs font-700 uppercase tracking-wide text-brand-600">{h.tag}</span>
                <div>
                  <h3 className="font-700 text-ink-900">{h.title}</h3>
                  <p className="mt-1 text-sm text-ink-600">{h.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Sumemos tu proyecto a esta lista" />
    </>
  )
}
