// Carga los datos iniciales (server/data/*.json) a Firestore.
// Uso:
//   1) Descarga una clave de servicio desde la consola de Firebase y guárdala
//      como functions/service-account.json (NO la subas a git).
//   2) node functions/seed.js
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const KEY = path.join(__dirname, 'service-account.json')

if (!fs.existsSync(KEY)) {
  console.error('Falta functions/service-account.json (clave de servicio de Firebase).')
  process.exit(1)
}

initializeApp({ credential: cert(JSON.parse(fs.readFileSync(KEY, 'utf-8'))) })
const db = getFirestore()
const DATA_DIR = path.join(__dirname, '..', 'server', 'data')

const RESOURCES = ['services', 'projects', 'clients']

for (const resource of RESOURCES) {
  const items = JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${resource}.json`), 'utf-8'))
  const batch = db.batch()
  for (const item of items) {
    batch.set(db.collection(resource).doc(item.id), item)
  }
  await batch.commit()
  console.log(`✓ ${resource}: ${items.length} documentos cargados`)
}
console.log('Seed completado.')
process.exit(0)
