import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createApp } from './app.js'
import { diskStore, diskUploader, UPLOADS_DIR } from './store-disk.js'

// Servidor local para desarrollo (npm run dev) y para VPS/Node tradicional.
// En Firebase, la lógica corre como Cloud Function (ver functions/).
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3001
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'famego2026'

const app = createApp({ store: diskStore, uploader: diskUploader, adminToken: ADMIN_TOKEN })

// Sirve las imágenes subidas
app.use('/uploads', express.static(UPLOADS_DIR))

// En producción (VPS) sirve el build de Vite
const distDir = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api|\/uploads).*/, (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`API Famego escuchando en http://localhost:${PORT}`)
})
