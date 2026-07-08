import { COMPANY } from '../lib/company.js'

// React 19 hoista <title>/<meta>/<link>/<script> al <head> automáticamente.
export default function Seo({ title, description, path = '/', jsonLd, keywords }) {
  const url = `${COMPANY.site}${path}`
  const fullTitle = title
    ? `${title} | FAMEGO Ingeniería y Construcción`
    : 'FAMEGO Ingeniería y Construcción | Constructora en Santiago, Chile'
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${COMPANY.site}/images/og-famego.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </>
  )
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: COMPANY.site,
    logo: `${COMPANY.site}/images/logo-famego.png`,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    taxID: COMPANY.rut,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Juan Fernández #549',
      addressLocality: 'La Florida',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    areaServed: 'Chile',
    foundingDate: '2012',
    knowsAbout: [
      'Edificación', 'Obras civiles', 'Mantenimiento de recintos comerciales',
      'Urbanización e infraestructura', 'Proyectos industriales', 'Proyectos EPC',
    ],
  }
}

export function serviceJsonLd(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: { '@type': 'GeneralContractor', name: COMPANY.legalName, url: COMPANY.site },
    areaServed: 'Chile',
    url: `${COMPANY.site}/servicios/${service.slug}`,
  }
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${COMPANY.site}${item.path}`,
    })),
  }
}
