const datosDespacho = {
  nombre: "nombre despacho",
  direccion: "dirección del despacho", 
}

/**
 * Brito Abogados — main.js
 * Principios: KISS · DRY · YAGNI · a11y
 * Variables con let (nunca var)
 */
 
'use strict';
 
/* ================================================================
   UTILIDADES
   ================================================================ */
 
/**
 * Shortcut querySelector
 * @param {string} sel
 * @param {Element} [ctx=document]
 * @returns {Element|null}
 */
const getEl = (sel, ctx = document) => ctx.querySelector(sel);
 
/**
 * Shortcut querySelectorAll
 * @param {string} sel
 * @param {Element} [ctx=document]
 * @returns {NodeList}
 */
const getAllEl = (sel, ctx = document) => ctx.querySelectorAll(sel);
 
/* ================================================================
   AÑO FOOTER
   ================================================================ */
const yearEl = getEl('#currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
 
/* ================================================================
   NAVBAR SCROLL
   ================================================================ */
const navbar = getEl('#navbar');
 
const handleNavScroll = () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
};
 
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();
 
/* ================================================================
   SIDE PANEL — PERGAMINO (expand / collapse)
   ================================================================ */
const colBar    = getEl('#colBar');
const sidePanel = getEl('#sidePanel');
const overlay   = getEl('#panelOverlay');
 
let isPanelOpen = false;
 
/**
 * Abre el panel con animación de pergamino que se despliega
 */
const openPanel = () => {
  isPanelOpen = true;
 
  colBar.classList.add('open');
  colBar.setAttribute('aria-expanded', 'true');
 
  sidePanel.classList.add('open');
  sidePanel.setAttribute('aria-hidden', 'false');
 
  overlay.classList.add('open');
 
  document.body.style.overflow = 'hidden';
};
 
/**
 * Cierra el panel con animación de pergamino que se recoge
 */
const closePanel = () => {
  isPanelOpen = false;
 
  colBar.classList.remove('open');
  colBar.setAttribute('aria-expanded', 'false');
 
  sidePanel.classList.remove('open');
  sidePanel.setAttribute('aria-hidden', 'true');
 
  overlay.classList.remove('open');
 
  document.body.style.overflow = '';
};
 
const togglePanel = () => isPanelOpen ? closePanel() : openPanel();
 
if (colBar) {
  colBar.addEventListener('click', togglePanel);
  colBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePanel();
    }
  });
}
 
if (overlay) overlay.addEventListener('click', closePanel);
 
// Cerrar al hacer click en enlaces del panel
getAllEl('.sp-link', sidePanel).forEach((link) => {
  link.addEventListener('click', closePanel);
});
 
// Cerrar con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isPanelOpen) closePanel();
});
 
/* ================================================================
   BURGER MENU (móvil)
   ================================================================ */
const burgerBtn  = getEl('#burgerBtn');
const mobileMenu = getEl('#mobileMenu');
 
let isMobileOpen = false;
 
const openMobile = () => {
  isMobileOpen = true;
  burgerBtn.classList.add('open');
  burgerBtn.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
};
 
const closeMobile = () => {
  isMobileOpen = false;
  burgerBtn.classList.remove('open');
  burgerBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
};
 
const toggleMobile = () => isMobileOpen ? closeMobile() : openMobile();
 
if (burgerBtn) {
  burgerBtn.addEventListener('click', toggleMobile);
}
 
// Cerrar menú móvil al navegar
getAllEl('.mm-link', mobileMenu).forEach((link) => {
  link.addEventListener('click', closeMobile);
});
 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMobileOpen) closeMobile();
});
 
/* ================================================================
   SCROLL REVEAL (IntersectionObserver)
   ================================================================ */
const revealEls = getAllEl('.reveal, .reveal-left');
 
if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
 
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  // Fallback: mostrar todos sin animación
  revealEls.forEach((el) => el.classList.add('visible'));
}
 
/* ================================================================
   FORMULARIO DE PRESUPUESTO
   ================================================================ */
const budgetForm = getEl('#budgetForm');
const submitBtn  = getEl('#submitBtn');
 
if (budgetForm) {
 
  /**
   * Limpia el error de un campo
   * @param {Element} field
   * @param {Element} errEl
   */
  const clearError = (field, errEl) => {
    field.classList.remove('err');
    if (errEl) errEl.textContent = '';
  };
 
  /**
   * Muestra un error en un campo
   * @param {Element} field
   * @param {Element} errEl
   * @param {string}  msg
   */
  const showError = (field, errEl, msg) => {
    field.classList.add('err');
    if (errEl) errEl.textContent = msg;
  };
 
  /**
   * Valida el formulario completo
   * @returns {boolean} válido o no
   */
  const validateForm = () => {
    let valid = true;
 
    // Nombre
    const fname   = getEl('#fname');
    const fnameErr = getEl('#fname-err');
    clearError(fname, fnameErr);
    if (!fname.value.trim()) {
      showError(fname, fnameErr, 'El nombre es obligatorio.');
      valid = false;
    }
 
    // Teléfono
    const ftel    = getEl('#ftel');
    const ftelErr  = getEl('#ftel-err');
    clearError(ftel, ftelErr);
    if (!ftel.value.trim()) {
      showError(ftel, ftelErr, 'El teléfono es obligatorio.');
      valid = false;
    } else if (!/^[+\d\s\-()]{7,20}$/.test(ftel.value.trim())) {
      showError(ftel, ftelErr, 'Introduzca un teléfono válido.');
      valid = false;
    }
 
    // Email
    const femail   = getEl('#femail');
    const femailErr = getEl('#femail-err');
    clearError(femail, femailErr);
    if (!femail.value.trim()) {
      showError(femail, femailErr, 'El correo electrónico es obligatorio.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(femail.value.trim())) {
      showError(femail, femailErr, 'Introduzca un correo válido.');
      valid = false;
    }
 
    // Servicios (al menos uno)
    const checkboxes = getAllEl('input[name="servicios"]:checked', budgetForm);
    const fservErr   = getEl('#fserv-err');
    const firstCheck = getEl('input[name="servicios"]', budgetForm);
    if (firstCheck) clearError(firstCheck, fservErr);
    if (checkboxes.length === 0) {
      if (firstCheck) firstCheck.classList.add('err');
      if (fservErr)   fservErr.textContent = 'Seleccione al menos un servicio de interés.';
      valid = false;
    }
 
    return valid;
  };
 
  /**
   * Construye el cuerpo del correo con los datos del formulario
   * @returns {string}
   */
  const buildMailBody = () => {
    const data     = new FormData(budgetForm);
    const nombre   = data.get('nombre')   || '';
    const tel      = data.get('telefono') || '';
    const email    = data.get('email')    || '';
    const mensaje  = data.get('mensaje')  || '';
    const servicios = data.getAll('servicios').join(', ') || 'No especificado';
 
    return `Nombre: ${nombre}%0ATelefono: ${tel}%0AEmail: ${email}%0AServicios de interes: ${servicios}%0AMensaje: ${mensaje}`;
  };
 
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
 
    if (!validateForm()) return;
 
    // Deshabilitar botón durante "envío"
    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled    = true;
    submitBtn.style.opacity = '.6';
 
    // Construir mailto
    const data     = new FormData(budgetForm);
    const nombre   = encodeURIComponent(data.get('nombre') || '');
    const body     = buildMailBody();
    const mailto   = `mailto:mgbrito@jmbrito.com?subject=Solicitud%20de%20presupuesto%20-%20${nombre}&body=${body}`;
 
    // Abrir cliente de correo
    window.location.href = mailto;
 
    // Mostrar confirmación tras breve retardo
    setTimeout(() => {
      const fcnt = getEl('#fcnt');
      const fok  = getEl('#fok');
      if (fcnt) fcnt.style.display = 'none';
      if (fok)  fok.classList.add('show');
    }, 1100);
  });
 
  // Limpiar errores al interactuar
  getAllEl('.fg input, .fg select, .fg textarea', budgetForm).forEach((field) => {
    field.addEventListener('input', () => {
      const errId  = field.id ? `${field.id}-err` : null;
      const errEl  = errId ? getEl(`#${errId}`) : null;
      clearError(field, errEl);
    });
  });
 
  getAllEl('input[name="servicios"]', budgetForm).forEach((cb) => {
    cb.addEventListener('change', () => {
      const fservErr = getEl('#fserv-err');
      if (fservErr) fservErr.textContent = '';
      cb.classList.remove('err');
    });
  });
}
 
/* ================================================================
   SMOOTH SCROLL para anclas internas
   ================================================================ */
getAllEl('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
 
    const target = getEl(href);
    if (!target) return;
 
    e.preventDefault();
 
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--NAV') || '76', 10);
 
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
 
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
 
/* ================================================================
   ACTIVE NAV LINK (scrollspy)
   ================================================================ */
const sections  = getAllEl('section[id]');
const navLinks  = getAllEl('.navl a');
 
const setActiveLink = () => {
  let current = '';
  const offset = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--NAV') || '76', 10
  );
 
  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;
    if (top <= offset + 40) current = sec.id;
  });
 
  navLinks.forEach((link) => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === current);
    link.setAttribute('aria-current', href === current ? 'page' : 'false');
  });
};
 
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();