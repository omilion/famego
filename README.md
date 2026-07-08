# FAMEGO — Sitio web

Sitio corporativo de **Sociedad Constructora Famego SpA** en React + Vite + Tailwind CSS v4,
con un backend Express sencillo para editar los servicios.

## Requisitos
- Node.js 18+

## Desarrollo
```bash
npm install
npm run dev
```
Esto levanta:
- **Frontend** (Vite): http://localhost:5173
- **Backend** (Express API): http://localhost:3001 (Vite lo proxya en `/api`)

## Producción
```bash
npm run build     # genera /dist
npm start         # Express sirve /dist + la API en el puerto 3001 (o $PORT)
```

## Estructura
```
server/
  index.js              API Express (CRUD de servicios)
  data/services.json    Fuente editable de los servicios
src/
  pages/                Home, Servicios, Detalle, Proyectos, Nosotros, Contacto, Admin, 404
  components/           Navbar, Footer, Seo, CtaBanner, ServiceCard, SmartImage, etc.
  data/                 projects.js + services-fallback.json (respaldo si la API cae)
  lib/                  company.js (datos corporativos) + api.js (llamadas)
public/                 favicon, robots.txt, sitemap.xml, images/
IMAGENES.md             Prompts para generar cada imagen (para Gema)
```

## Editar los servicios (backend sencillo)
1. Ve a **`/admin`** en el navegador.
2. Ingresa el token. Por defecto es `famego2026`.
   - **Cámbialo en producción** con la variable de entorno `ADMIN_TOKEN`.
3. Crea, edita o elimina servicios. Los cambios se guardan en `server/data/services.json`
   y se reflejan de inmediato en el sitio.

> Alternativa sin panel: editar directamente los JSON en `server/data/`.

El panel tiene **tres pestañas**: Servicios, Proyectos y Clientes.

### Subir imágenes
En Servicios y Proyectos puedes **subir imágenes** directamente desde el panel
(botón "Subir imagen"), sin escribir rutas a mano:
- **Imagen destacada:** una imagen principal por servicio/proyecto.
- **Galería** (solo proyectos): varias imágenes; se muestran en la página de detalle
  del proyecto (`/proyectos/:id`) con visor ampliable.

Las imágenes se guardan en `public/uploads/` (esa carpeta está en `.gitignore`).
Formatos: JPG, PNG, WebP, AVIF · máx. 6 MB. Requiere estar autenticado.

## SEO incluido
- `<title>`, `meta description`, canonical y Open Graph por página (componente `Seo`).
- Datos estructurados JSON-LD (`GeneralContractor`, `Service`, `BreadcrumbList`).
- `sitemap.xml`, `robots.txt`, breadcrumbs visibles e interlinking entre servicios.
- HTML semántico, imágenes con `alt` descriptivo y `lazy-loading`.

## Imágenes
Faltan por generar. Ver **`IMAGENES.md`** con el nombre de archivo y el prompt de cada una.
Colócalas en `public/images/`. Mientras no existan, se muestra un placeholder con el nombre esperado.
