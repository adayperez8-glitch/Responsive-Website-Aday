Brito Abogados — Landing Page
Despacho Jurídico & Administración de Comunidades · Las Palmas de Gran Canaria

Estructura del proyecto
/
├── index.html      # Marcado semántico y accesible
├── style.css       # Todos los estilos (variables, componentes, responsive)
├── main.js         # Comportamiento interactivo (sin dependencias externas)
├── logotipo.png    # Logo del despacho
├── abogados-en-santander-acuerdo.jpg
├── ahorro_comunidad-1.webp
├── derecho_guias.jpg
└── f_elconfidencial_com_original_...jpg

Decisiones de diseño
Paleta cromática
TokenColorUso--R#8B1A1A (carmesí)CTA, acentos, foco--Rd#6B1212Hover en botones--Rl#B52020Gradientes de acento--N#0d0d0dTexto principal--N2#161616Fondo sección contacto--G#5c5c5cTexto secundario--W#fffFondo base--C#faf8f5Fondo cálido--F#f3f0eaFondo cremoso (formularios)
El carmesí oscuro conecta visualmente con el logo y evoca autoridad,
confianza y tradición jurídica sin resultar agresivo.
Tipografía

Oswald — titulares y etiquetas. Condensado, rotundo, institucional.
Cormorant Garamond — cuerpo y citas. Elegancia serif con historia.
EB Garamond — textos secundarios, labels. Legibilidad en tamaños pequeños.

La combinación serif + condensed da un carácter editorial y de despacho
clásico actualizado.
Arquitectura CSS
Se aplica CSS Custom Properties (variables) para toda la paleta, espaciados
y sombras. Esto garantiza coherencia y facilita el mantenimiento (DRY).
No hay ningún framework CSS externo: el peso final es mínimo.
Los componentes están organizados en bloques con comentarios separadores,
siguiendo la metodología BEM ligera (sin prefijos de namespace).
Separación de archivos (3 archivos)
ArchivoResponsabilidadindex.htmlSemántica, contenido, ARIAstyle.cssPresentación, responsive, animacionesmain.jsComportamiento, validación, accesibilidad dinámica
Esto respeta el principio de separación de responsabilidades y
facilita mantenimiento independiente.

Funcionalidades
Columna griega / Pergamino
La columna de la derecha actúa como trigger. Al hacer clic:

Expand — el panel lateral se despliega con scaleY(0) → scaleY(1) con
transform-origin: center, simulando el desenrollado de un pergamino.
Los rollos superior e inferior (SVG con gradiente dorado/amarillento) refuerzan
la metáfora visual.
Collapse — la misma transición inversa recoge el panel como un pergamino
que se enrolla.

El botón gestiona correctamente aria-expanded y aria-controls para AT.
Burger menu (móvil)
Visible solo en viewports ≤ 768 px. Tres barras que se transforman en ×
con CSS transitions. Abre un menú desplegable con translateY + opacity.
Se cierra con Escape, con click fuera (via blur), o navegando.
Scroll Reveal
IntersectionObserver con threshold: 0.12 y rootMargin negativo para
activar las animaciones .reveal y .reveal-left solo cuando el elemento
entra en pantalla. Tiene fallback para navegadores sin soporte.
Navbar scrolled
Cambia background y box-shadow al superar 60 px de scroll mediante
classList.toggle.
ScrollSpy
Marca el enlace de navegación activo basándose en la sección visible
(comprobando getBoundingClientRect en cada evento scroll).
Añade aria-current="page" al enlace activo.
Formulario de presupuesto
Selección múltiple de servicios — <fieldset> con <input type="checkbox">
individuales. Cada uno es independiente; se puede marcar uno o varios.
La validación exige al menos uno.
Validación accesible:

Mensajes de error asociados a campos con aria-live="polite" y role="alert".
aria-required="true" en campos obligatorios.
novalidate en el <form> para controlar la validación vía JS.
aria-describedby implícito mediante IDs de error.

Envío: construye un mailto: con todos los datos del formulario y abre
el cliente de correo del usuario, dirigido a mgbrito@jmbrito.com.
Tras 1.1 s muestra la confirmación visual.
Reset: botón de tipo reset nativo que limpia todos los campos.

Accesibilidad (a11y)
TécnicaImplementaciónSkip link<a href="#main-content"> visible al recibir focoLandmarks<header>, <main>, <footer>, <nav>, <section>, <article>HeadingsJerarquía h1 → h2 → h3 sin saltosARIAaria-label, aria-expanded, aria-controls, aria-hidden, aria-live, aria-currentFoco:focus-visible con outline visible de 2 px en carmesíImágenes decorativasalt="" en imágenes que no aportan contenidoReduced motion@media (prefers-reduced-motion: reduce) anula transicionesContrasteCarmesí sobre blanco supera ratio 4.5:1 para texto normalFormulario<label> asociado, <fieldset>/<legend> para grupo de checkboxesRolesrole="list" en grids de tarjetas, role="listitem" en cada artículo

Responsive
BreakpointCambios principales> 1024 pxLayout completo, columna griega visible≤ 1024 pxHero a 1 columna, foto oculta, grids apilados≤ 768 pxNavbar solo logo + burger, grids a 1 col, checkboxes a 1 col≤ 600 pxBotones a ancho completo, padding reducido≤ 480 pxFuentes escalonadas con clamp()≤ 420 pxLayout ultra-compacto, footer apilado
La variable --CW (ancho de columna griega) también se reduce en móvil para
no ocupar espacio innecesario.

Principios aplicados
KISS (Keep It Simple)

Sin frameworks de JS (vanilla puro).
Sin preprocesadores CSS (CSS nativo con custom properties).
Funciones pequeñas con una sola responsabilidad.

DRY (Don't Repeat Yourself)

Variables CSS para todos los tokens de diseño.
Funciones getEl / getAllEl reutilizadas en todo el JS.
Clases CSS generales (.btn-r, .btn-n, .slbl, .sttl) compartidas entre secciones.

YAGNI (You Aren't Gonna Need It)

No se incluye ninguna librería de animación (Framer, GSAP…) porque
las transiciones CSS son suficientes para las necesidades actuales.
No hay router ni SPA: es una landing page estática.
No se añaden dependencias de build (webpack, vite) innecesarias.

a11y
Detallado en la sección anterior. El objetivo es WCAG 2.1 AA como mínimo.

Variables JS — let en lugar de var
Todas las declaraciones de variables usan let o const:

const para referencias inmutables (elementos DOM, funciones).
let para estados que cambian (isPanelOpen, isMobileOpen, etc.).
var no se utiliza en ningún punto del código.


Correos configurados
FunciónDirecciónDestino del formulario de presupuestomgbrito@jmbrito.comEmail visible en sección Contactojmbrito@jmbrito.com + mgbrito@jmbrito.com

CTAs de la página

Hero — "Solicitar presupuesto" → ancla #presupuesto
Sección Despacho — "Consultar su caso →" → ancla #contacto
Sección Contacto — "Solicitar presupuesto ahora →" → ancla #presupuesto


Brito Abogados · Francisco Gourié nº6 · 35002 Las Palmas de Gran Canaria