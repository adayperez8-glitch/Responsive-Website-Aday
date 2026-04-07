/* ── Navbar scroll ── */
var nb = document.getElementById('navbar');
window.addEventListener('scroll', function(){
  nb.classList.toggle('scrolled', window.scrollY > 30);
});
 
/* ── Side panel toggle ── */
var colBar  = document.getElementById('colBar');
var panel   = document.getElementById('sidePanel');
var overlay = document.getElementById('panelOverlay');
var open    = false;
 
function setPanel(state){
  open = state;
  colBar.classList.toggle('open', state);
  panel.classList.toggle('open', state);
  overlay.classList.toggle('open', state);
  colBar.setAttribute('aria-label', state ? 'Cerrar menú' : 'Abrir menú');
}
 
colBar.addEventListener('click', function(){ setPanel(!open); });
colBar.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); setPanel(!open); } });
overlay.addEventListener('click', function(){ setPanel(false); });
document.addEventListener('keydown', function(e){ if(e.key==='Escape') setPanel(false); });
panel.querySelectorAll('a[href]').forEach(function(a){
  a.addEventListener('click', function(){ setPanel(false); });
});
 
/* ── Scroll reveal ── */
if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal,.reveal-left').forEach(function(el){ io.observe(el); });
} else {
  document.querySelectorAll('.reveal,.reveal-left').forEach(function(el){ el.classList.add('visible'); });
}
 
/* ── Form validation ── */
var FIELDS = [
  {id:'fn',e:'efn'},{id:'fe',e:'efe'},{id:'ft',e:'eft'},
  {id:'fca',e:'efca'},{id:'fco',e:'efco'},{id:'fv',e:'efv'},
  {id:'fve',e:'efve'},{id:'fse',e:'efse'}
];
 
function getEl(id){ return document.getElementById(id); }
function clrE(f){ getEl(f.id) && getEl(f.id).classList.remove('err'); getEl(f.e) && (getEl(f.e).textContent=''); }
function setE(f,m){ getEl(f.id) && getEl(f.id).classList.add('err'); getEl(f.e) && (getEl(f.e).textContent=m); }
 
FIELDS.forEach(function(f){
  var el = getEl(f.id); if(!el) return;
  el.addEventListener('input',  function(){ clrE(f); });
  el.addEventListener('change', function(){ clrE(f); });
});
 
var tf = getEl('theForm');
if(tf){
  tf.addEventListener('submit', function(e){
    e.preventDefault();
    FIELDS.forEach(clrE);
    var ok = true;
    FIELDS.forEach(function(f){
      var el = getEl(f.id); if(!el) return;
      var v  = el.value.trim();
      if(!v){ setE(f,'Recuerde rellenar este campo.'); ok=false; return; }
      if(f.id==='fe' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setE(f,'Correo no válido.'); ok=false; }
      if(f.id==='ft' && !/^[\d\s+\-()]{7,}$/.test(v))           { setE(f,'Teléfono no válido.'); ok=false; }
      if((f.id==='fv'||f.id==='fve') && parseInt(v,10)<1)        { setE(f,'Debe ser al menos 1.'); ok=false; }
    });
    if(!ok){
      var first = tf.querySelector('.err');
      if(first) first.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    var btn = getEl('subBtn');
    btn.textContent='Enviando…'; btn.disabled=true; btn.style.opacity='.6';
    setTimeout(function(){
      var fcnt=getEl('fcnt'), fok=getEl('fok');
      if(fcnt) fcnt.style.display='none';
      if(fok)  fok.classList.add('show');
    }, 1100);
  });
}