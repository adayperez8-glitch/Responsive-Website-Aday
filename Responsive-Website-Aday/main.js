/* ================================================================
   BRITO ABOGADOS — main.js
   Navbar · Scroll reveal · Form validation
   ================================================================ */
 
/* ── Navbar scroll shadow ── */
var nb = document.getElementById('navbar');
window.addEventListener('scroll', function(){
  nb.classList.toggle('scrolled', window.scrollY > 30);
});
 
/* ── Intersection Observer — reveal on scroll ── */
var revEls = document.querySelectorAll('.reveal,.reveal-left');
if ('IntersectionObserver' in window) {
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revEls.forEach(function(el){ obs.observe(el); });
} else {
  revEls.forEach(function(el){ el.classList.add('visible'); });
}
 
/* ── Form validation ── */
var FIELDS = [
  { id:'fn',  err:'efn'  },
  { id:'fe',  err:'efe'  },
  { id:'ft',  err:'eft'  },
  { id:'fca', err:'efca' },
  { id:'fco', err:'efco' },
  { id:'fv',  err:'efv'  },
  { id:'fve', err:'efve' },
  { id:'fse', err:'efse' }
];
 
FIELDS.forEach(function(f){
  var el = document.getElementById(f.id);
  if (!el) return;
  el.addEventListener('input',  function(){ clrE(f); });
  el.addEventListener('change', function(){ clrE(f); });
});
 
function clrE(f){
  var el = document.getElementById(f.id);
  var er = document.getElementById(f.err);
  if (el) el.classList.remove('err');
  if (er) er.textContent = '';
}
 
function setE(f, m){
  var el = document.getElementById(f.id);
  var er = document.getElementById(f.err);
  if (el) el.classList.add('err');
  if (er) er.textContent = m;
}
 
function okEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function okPhone(v){ return /^[\d\s+\-()\u0020]{7,}$/.test(v.trim()); }
 
var tf = document.getElementById('theForm');
if (tf){
  tf.addEventListener('submit', function(e){
    e.preventDefault();
    FIELDS.forEach(clrE);
    var ok = true;
 
    FIELDS.forEach(function(f){
      var el = document.getElementById(f.id);
      if (!el) return;
      var v = el.value.trim();
      if (!v){
        setE(f, 'Recuerde rellenar este campo.');
        ok = false;
        return;
      }
      if (f.id === 'fe'  && !okEmail(v)){ setE(f, 'Correo electrónico no válido.'); ok = false; }
      if (f.id === 'ft'  && !okPhone(v)){ setE(f, 'Teléfono no válido.');           ok = false; }
      if (f.id === 'fv'  && parseInt(v, 10) < 1){ setE(f, 'Indique al menos 1 vivienda.'); ok = false; }
      if (f.id === 'fve' && parseInt(v, 10) < 1){ setE(f, 'Indique al menos 1 vecino.');   ok = false; }
    });
 
    if (!ok){
      var fe = tf.querySelector('input.err,select.err,textarea.err');
      if (fe) fe.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
 
    /* Simulate send */
    var btn = document.getElementById('subBtn');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    btn.style.opacity = '.6';
 
    setTimeout(function(){
      var fcnt = document.getElementById('fcnt');
      var fok  = document.getElementById('fok');
      if (fcnt) fcnt.style.display = 'none';
      if (fok)  fok.classList.add('show');
    }, 1100);
  });
}