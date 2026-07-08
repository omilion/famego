# Guía de imágenes — Sitio FAMEGO

Todas las imágenes van en la carpeta **`public/images/`** con el **nombre de archivo exacto** indicado.
Mientras un archivo no exista, el sitio muestra un *placeholder* gráfico con el nombre esperado
(no se rompe el layout), así que puedes ir subiéndolas de a una.

## Estilo visual común (aplica a TODAS)

> **Paleta de marca:** naranja constructor `#f57f17`, grises grafito/carbón `#14161a`–`#3d4350`, blanco.
> **Ambiente:** fotografía profesional, realista, luz natural, tono corporativo y técnico, limpio.
> **Evitar:** texto incrustado, logos de otras marcas, watermarks, gente mirando a cámara, HDR exagerado, aspecto de stock genérico.
> **Formato:** JPG optimizado. Hero a 1920×1080; tarjetas de servicio/proyecto a 1200×900 (4:3) o 1280×800 (16:10).

Puedes pegar el bloque de estilo al final de cada prompt para mantener coherencia.

## Ya incluidas (no generar)

Estas imágenes reales ya están colocadas en `public/images/` y el logo oficial ya está integrado:

- ✅ `logo-famego.png` — logo oficial FAMEGO (usado en navbar, footer, admin y apple-touch-icon).
- ✅ `proyecto-nielseniq.jpg` — foto real de las oficinas GFK/NielsenIQ (lamas curvas de madera).
- ✅ `proyecto-metlife.jpg` — foto real de la torre corporativa MetLife.
- ✅ `proyecto-provida-fachada.jpg` — foto real de la remodelación de fachada con brazo articulado.

Faltan por generar las **13** de abajo.

---

## 1. Hero principal — `hero-construccion.jpg`  (1920×1080, horizontal)
**Ubicación:** portada, fondo de la cabecera principal.
**Prompt:**
> Fotografía cinematográfica de una obra de construcción moderna en Chile al atardecer: estructura de hormigón armado en ejecución, grúa torre en silueta, cielo cálido anaranjado y grafito. Trabajadores con casco naranja de fondo, en escala pequeña. Composición amplia con espacio negativo a la izquierda para texto. Tono corporativo, profesional, atmósfera de ingeniería seria. Iluminación dramática pero limpia. *(añadir estilo común)*

## 2. Equipo / quiénes somos — `equipo-famego.jpg`  (1200×900, 4:3)
**Ubicación:** sección "Quiénes somos" en la portada.
**Prompt:**
> Fotografía profesional de un equipo de ingenieros y arquitectos chilenos en terreno, revisando planos sobre una mesa portátil o tablet, con casco de seguridad y chaleco reflectante. Fondo de obra corporativa desenfocado. Ambiente colaborativo, luz natural de día. Diversidad realista, actitud técnica y confiada. *(añadir estilo común)*

## 3. Nosotros / obra — `nosotros-obra.jpg`  (1200×900, 4:3)
**Ubicación:** página Nosotros, bloque "Respaldo técnico y humano".
**Prompt:**
> Fotografía de un supervisor de obra con casco naranja señalando una estructura mientras sostiene planos, en una obra de edificación en altura con andamios y hormigón visto. Luz de mañana, tono grafito y naranja. Profesional y aspiracional. *(añadir estilo común)*

## 4. Imagen social / Open Graph — `og-famego.jpg`  (1200×630, para compartir en redes)
**Ubicación:** metadatos Open Graph (al compartir el sitio en WhatsApp/LinkedIn).
**Prompt:**
> Composición corporativa horizontal: obra de construcción moderna a la derecha (grúa, hormigón, tono grafito), lado izquierdo en color grafito sólido `#14161a` con espacio limpio para sobreponer el logo. Franja naranja `#f57f17` de acento. Aspecto de tarjeta de presentación premium de una constructora. *(añadir estilo común)*

---

## Imágenes de SERVICIOS (6) — carpeta `public/images/`

Editable también desde el panel `/admin` (campo "Imagen"). Formato 4:3 (1200×900).

### 5. `servicio-diseno-arquitectura.jpg`
> Arquitecto revisando planos técnicos y renders de una habilitación de oficina comercial, con maqueta o pantalla mostrando coordinación de especialidades (eléctrica, sanitaria, clima). Escritorio ordenado, luz natural, tono profesional. *(estilo común)*

### 6. `servicio-edificacion.jpg`
> Obra de edificación en altura con grúa torre, estructura de hormigón armado y enfierradura a la vista, cielo despejado. Escala grande, sensación de proyecto EPC llave en mano. Tono grafito y naranja. *(estilo común)*

### 7. `servicio-mantenimiento.jpg`
> Técnico de mantenimiento con chaleco reflectante trabajando en instalaciones de un recinto comercial o retail (tablero eléctrico, climatización o cielo técnico). Ambiente limpio, operación en marcha. *(estilo común)*

### 8. `servicio-obras-civiles.jpg`
> Faena de obras civiles: moldajes de hormigón estructural, enfierradura y fundaciones, trabajadores vertiendo hormigón. Detalle técnico, luz de día, tono industrial. *(estilo común)*

### 9. `servicio-urbanizacion.jpg`
> Obra de urbanización y pavimentación urbana: maquinaria pesada pavimentando una calzada, soleras y aceras nuevas, señalización de tránsito y trabajadores. Contexto de infraestructura pública SERVIU/MOP. *(estilo común)*

### 10. `servicio-industrial.jpg`
> Interior de planta industrial con estructuras metálicas, líneas de piping y estanques, iluminación técnica. Sensación de mantenimiento y montaje industrial de precisión. *(estilo común)*

---

## Imágenes de PROYECTOS (6) — carpeta `public/images/`

Formato 16:10 (1280×800). Son casos reales; usar imágenes representativas (no falsear marcas).

### 11. `proyecto-nielseniq.jpg` — ✅ YA INCLUIDA (foto real)

### 12. `proyecto-merck.jpg`
> Planta de producción industrial farmacéutica/química, equipos de proceso de acero inoxidable y pasillos técnicos limpios. Ambiente controlado, profesional. *(estilo común)*

### 13. `proyecto-metlife.jpg` — ✅ YA INCLUIDA (foto real)

### 14. `proyecto-provida-fachada.jpg` — ✅ YA INCLUIDA (foto real)

### 15. `proyecto-schneider.jpg`
> Laboratorio-oficina corporativa técnica con mesones de trabajo, iluminación LED lineal, acabados grises y detalles de color de acento. Diseño funcional y ordenado. *(estilo común)*

### 16. `proyecto-metlife-pavimentacion.jpg`
> Obra de pavimentación y redes junto a una torre corporativa: excavación con redes sanitarias, movimiento de tierra, maquinaria, señalización. Contexto urbano exigente. *(estilo común)*

---

## Checklist de subida
- [ ] Colocar cada archivo en `public/images/` con el nombre exacto.
- [ ] Optimizar (TinyPNG / Squoosh) — objetivo < 250 KB por imagen, hero < 400 KB.
- [ ] Verificar que el `alt` (definido en el código y en el panel admin) describe la imagen real.
- [ ] Revisar en el sitio que el placeholder desapareció y la foto se ve nítida en móvil y desktop.
