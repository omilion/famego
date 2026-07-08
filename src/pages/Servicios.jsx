import { useEffect, useState } from 'react'
import Seo, { breadcrumbJsonLd } from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { getServices } from '../lib/api.js'

const CRUMB = [
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
]

export default function Servicios() {
  const [services, setServices] = useState([])
  useEffect(() => { getServices().then(setServices) }, [])

  return (
    <>
      <Seo
        title="Servicios de construcción, obras civiles y mantenimiento"
        description="Diseño y arquitectura, edificación, mantenimiento, obras civiles, urbanización e infraestructura y proyectos industriales. Constructora con inscripción SERVIU y MOP en Chile."
        path="/servicios"
        keywords="servicios constructora, obras civiles, edificación, mantenimiento comercial, urbanización, proyectos industriales EPC"
        jsonLd={breadcrumbJsonLd(CRUMB)}
      />
      <PageHeader
        eyebrow="Qué hacemos"
        title="Servicios de ingeniería y construcción"
        subtitle="Cubrimos el ciclo completo del proyecto: diseño, edificación, obras civiles, urbanización, mantenimiento y obras industriales para clientes corporativos, comerciales e industriales."
        breadcrumb={CRUMB}
      />
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => <ServiceCard key={s.id} service={s} index={idx} />)}
          </div>
        </div>
      </section>
      <CtaBanner title="¿Tienes un requerimiento en mente?" subtitle="Cuéntanos el alcance y coordinamos una revisión técnica sin costo. Te acompañamos desde el levantamiento hasta la entrega." />
    </>
  )
}
