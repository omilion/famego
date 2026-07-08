import servicesFallback from '../data/services-fallback.json'
import projectsFallback from '../data/projects-fallback.json'
import clientsFallback from '../data/clients-fallback.json'

const FALLBACKS = {
  services: servicesFallback,
  projects: projectsFallback,
  clients: clientsFallback,
}

const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999)

// Obtiene una lista desde la API; si el backend no está disponible
// usa la copia estática para que el sitio siga funcionando.
export async function getAll(resource) {
  try {
    const res = await fetch(`/api/${resource}`)
    if (!res.ok) throw new Error('API no disponible')
    return await res.json()
  } catch {
    return [...(FALLBACKS[resource] || [])].sort(byOrder)
  }
}

export const getServices = () => getAll('services')
export const getProjects = () => getAll('projects')
export const getClients = () => getAll('clients')

export async function getService(slug) {
  try {
    const res = await fetch(`/api/services/${slug}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error('API no disponible')
    return await res.json()
  } catch {
    return servicesFallback.find((s) => s.slug === slug) ?? null
  }
}

// --- Admin ---
function headers(token) {
  return { 'Content-Type': 'application/json', 'x-admin-token': token }
}

export async function adminLogin(token) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
  return res.ok
}

export async function saveItem(resource, item, token) {
  const res = await fetch(`/api/${resource}/${item.id}`, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify(item),
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Error al guardar')
  return res.json()
}

export async function createItem(resource, item, token) {
  const res = await fetch(`/api/${resource}`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify(item),
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Error al crear')
  return res.json()
}

// Sube uno o varios archivos de imagen y devuelve sus rutas públicas.
export async function uploadImages(files, token) {
  const form = new FormData()
  for (const file of files) form.append('images', file)
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'x-admin-token': token },
    body: form,
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Error al subir la imagen')
  return (await res.json()).urls
}

export async function deleteItem(resource, id, token) {
  const res = await fetch(`/api/${resource}/${id}`, {
    method: 'DELETE',
    headers: headers(token),
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Error al eliminar')
  return res.json()
}
