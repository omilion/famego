import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo, { organizationJsonLd } from '../components/Seo.jsx'
import Stat from '../components/Stat.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ClientsMarquee from '../components/ClientsMarquee.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { getServices, getProjects } from '../lib/api.js'
import { COMPANY } from '../lib/company.js'

const VALUES = [
  { title: 'Plazo', desc: 'Ejecutamos con foco en cumplimiento de plazos, integrándonos tempranamente al requerimiento.' },
  { title: 'Seguridad', desc: 'Respetamos normas de seguridad y medioambientales en cada faena, cuidando la operación del cliente.' },
  { title: 'Calidad', desc: 'Entregamos productos de calidad con coordinación transversal de todas las especialidades.' },
  { title: 'Continuidad', desc: 'Mantenemos la operación del mandante como prioridad, especialmente en edificios habitados.' },
]

export default function Home() {
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])
  useEffect(() => {
    getServices().then(setServices)
    getProjects().then(setProjects)
  }, [])

  return (
    <>
      <Seo
        title=""
        description="Sociedad Constructora Famego SpA: más de 13 años en edificación, obras civiles, mantenimiento, urbanización e infraestructura y proyectos industriales. Inscripción SERVIU y MOP. Proyectos EPC llave en mano en Santiago y todo Chile."
        path="/"
        keywords="constructora Chile, empresa constructora Santiago, obras civiles, edificación, mantenimiento comercial, proyectos EPC, urbanización SERVIU MOP"
        jsonLd={organizationJsonLd()}
      />

      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden bg-ink-950">
        <SmartImage
          src="/images/hero-construccion.jpg"
          alt="Faena de construcción de Famego con estructura de hormigón y grúa al atardecer"
          eager
          className="absolute inset-0 h-full w-full opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/40" />
        <div className="bg-blueprint absolute inset-0 opacity-40" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-600 text-brand-300">
              Ingeniería · Construcción · Obras Civiles · Mantenimiento
            </p>
            <h1 className="animate-fade-in-up text-4xl font-900 leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Ejecución integral para{' '}
              <span className="text-brand-400">proyectos exigentes</span>
            </h1>
            <p className="animate-fade-in-up animation-delay-150 mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Constructora orientada a proyectos corporativos, industriales, comerciales e
              infraestructura, con experiencia en habilitaciones, remodelaciones, mantenimiento y
              soluciones EPC llave en mano.
            </p>
            <div className="animate-fade-in-up animation-delay-300 mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-8 py-4 text-base font-700 text-ink-950 transition-colors hover:bg-brand-400"
              >
                Cotizar mi proyecto
              </a>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-8 py-4 text-base font-600 text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Ver servicios
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:max-w-2xl sm:grid-cols-4">
            <div className="animate-fade-in-up animation-delay-300"><Stat value="13+" label="Años" sub="de trayectoria" /></div>
            <div className="animate-fade-in-up animation-delay-400"><Stat value="24+" label="Años exp." sub="profesional" /></div>
            <div className="animate-fade-in-up animation-delay-500"><Stat value="EPC" label="Llave" sub="en mano" /></div>
            <div className="animate-fade-in-up animation-delay-600"><Stat value="MOP" label="Inscripción" sub="SERVIU / MOP" /></div>
          </div>
        </div>
      </section>

      {/* CLIENTES */}
      <section className="border-b border-ink-800/10 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-center text-xs font-700 uppercase tracking-widest text-ink-600/60">
            Clientes y mandantes que han confiado en Famego
          </p>
          <ClientsMarquee />
        </div>
      </section>

      {/* INTRO / POSICIONAMIENTO */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-sm font-700 uppercase tracking-widest text-brand-600">Quiénes somos</p>
            <h2 className="text-3xl font-900 tracking-tight text-ink-900 sm:text-4xl">
              Una constructora con base técnica y experiencia transversal
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              Sociedad Constructora Famego SpA cuenta con trayectoria en proyectos comerciales de
              retail, obras civiles sanitarias, edificación, urbanizaciones, proyectos EPC, obras
              habitacionales, educacionales, industriales, de mantenimiento y logísticos.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Nos integramos tempranamente al requerimiento, coordinamos especialidades y ejecutamos
              con foco en plazo, seguridad y calidad, manteniendo la operación del cliente como
              prioridad.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/nosotros" className="inline-flex items-center gap-2 rounded-lg bg-ink-900 px-6 py-3 text-sm font-700 text-white transition-colors hover:bg-ink-800">
                Conócenos
              </Link>
              <Link to="/proyectos" className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-6 py-3 text-sm font-700 text-ink-900 transition-colors hover:border-brand-500 hover:text-brand-600">
                Ver proyectos
              </Link>
            </div>
          </div>
          <div className="relative">
            <SmartImage
              src="/images/equipo-famego.jpg"
              alt="Equipo de profesionales de Famego coordinando especialidades en terreno"
              className="aspect-4/3 w-full rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl bg-brand-500 px-6 py-4 shadow-lg sm:block">
              <div className="font-display text-3xl font-900 text-ink-950">+13</div>
              <div className="text-xs font-700 uppercase tracking-wide text-ink-950/80">años construyendo</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-ink-50/40 py-20" style={{ background: '#f7f8f9' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-700 uppercase tracking-widest text-brand-600">Qué hacemos</p>
            <h2 className="text-3xl font-900 tracking-tight text-ink-900 sm:text-4xl">Nuestros servicios</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Diseño, edificación, mantenimiento y obras civiles para recintos comerciales,
              corporativos e industriales en todo Chile.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => <ServiceCard key={s.id} service={s} index={idx} />)}
          </div>
        </div>
      </section>

      {/* VALORES / COMPROMISO */}
      <section className="bg-ink-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-700 uppercase tracking-widest text-brand-400">Compromiso de trabajo</p>
            <h2 className="text-3xl font-900 tracking-tight text-white sm:text-4xl">Cómo trabajamos</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div key={v.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 font-display text-2xl font-900 text-brand-400">0{i + 1}</div>
                <h3 className="text-lg font-700 text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-700 uppercase tracking-widest text-brand-600">Casos destacados</p>
              <h2 className="text-3xl font-900 tracking-tight text-ink-900 sm:text-4xl">Proyectos recientes y contratos vigentes</h2>
            </div>
            <Link to="/proyectos" className="inline-flex items-center gap-2 text-sm font-700 text-brand-600 hover:underline">
              Ver todos los proyectos
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, idx) => {
              const delays = [
                'animation-delay-100',
                'animation-delay-200',
                'animation-delay-300',
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
                  </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-700 uppercase tracking-wide text-brand-600">{p.client}</p>
                  <h3 className="mt-2 text-lg font-700 leading-snug text-ink-900">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-600">{p.description}</p>
                  <p className="mt-3 text-xs text-ink-500">{p.period} · {p.meta}</p>
                </div>
              </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
