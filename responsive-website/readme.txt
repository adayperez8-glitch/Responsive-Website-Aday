# Brito Abogados
**Despacho Jurídico & Administración de Comunidades · Las Palmas de Gran Canaria**
 
Landing page estática para un despacho familiar dirigido por José Miguel y Miguel Brito. Sin frameworks, sin dependencias, sin build tools.
 
---
 
## Estructura
 
```
/
├── index.html     # Marcado semántico y accesible
├── style.css      # Variables, componentes, responsive
├── main.js        # Interactividad vanilla (sin dependencias)
└── assets/        # Logo e imágenes
```
 
---
 
## Secciones
 
| # | Sección | Contenido |
|---|---------|-----------|
| 1 | **Hero** | Foto del despacho, lema corporativo, datos de los abogados |
| 2 | **Quiénes somos** | Historia, valores, estadísticas de trayectoria |
| 3 | **Servicios — Despacho** | 6 áreas jurídicas en grid interactivo |
| 4 | **Servicios — Comunidades** | Dirigido a administradores y propietarios |
| 5 | **Presupuesto** | Formulario con validación, checkboxes custom y envío mailto |
| 6 | **Contacto** | Mapa, horario y datos completos |
 
> La separación entre *Despacho* y *Comunidades* es intencionada: son dos targets distintos.
 
---
 
## Diseño
 
**Paleta** — carmesí `#8B1A1A` como color principal, sobre fondos crema (`#faf8f5`, `#f3f0ea`). Evoca autoridad jurídica sin resultar agresivo.
 
**Tipografía** — Oswald (titulares) + Cormorant Garamond (cuerpo). Combinación editorial que actualiza la estética clásica de despacho.
 
**Columna griega** — el menú lateral se despliega como un pergamino (`scaleY(0→1)`) con SVGs decorativos de fuste y capitel. Metáfora visual para reforzar la identidad del bufete.
 
**Checkboxes custom** — cada opción del formulario muestra el logo «B» en SVG con fondo carmesí al activarse.
 
---
 
## Funcionalidades JS
 
- **Scroll Reveal** — `IntersectionObserver` activa animaciones `.reveal` al entrar en viewport
- **ScrollSpy** — marca el enlace de nav activo según sección visible (`aria-current="page"`)
- **Burger menu** — visible en ≤ 768 px, cierra con `Escape` o click fuera
- **Formulario** — validación accesible con `aria-live`, construye `mailto:` y envía a `mgbrito@jmbrito.com`
- **Navbar scrolled** — cambia estilos al superar 60 px de scroll
 
---
 
## Accesibilidad
 
WCAG 2.1 AA como objetivo: skip link, landmarks semánticos, jerarquía de headings, `aria-expanded/controls/live/current`, `:focus-visible`, `prefers-reduced-motion` y contraste carmesí/blanco > 4.5:1.
 
---
 
## Responsive
 
| Breakpoint | Cambio principal |
|------------|-----------------|
| > 1024 px | Layout completo con columna griega |
| ≤ 1024 px | Hero 1 columna, grids apilados |
| ≤ 768 px | Burger menu, todo a 1 columna |
| ≤ 480 px | Fuentes con `clamp()`, layout ultra-compacto |
 
---
 
## Lo que aprendí
 
La IA genera código, pero no sabe lo que quiere el cliente. El diseño parte de una idea humana; la IA es la herramienta, no el autor. Revisar el código generado es tan importante como prompearlo bien.