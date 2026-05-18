/* ============================================================
   Sri Hanuman Temple — Official Website Scripts
   Sri Hanuman Youth Association (SHYA) | Regd. No: 873/82
   Golconda Fort, Hyderabad, Telangana – 500008
   srihanumantemple500008@gmail.com
   ============================================================
   HOW TO USE:
   Place this script tag at the bottom of <body>:
   <script src="temple-scripts.js"></script>
   ============================================================ */

function sp(page) {

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  // Show selected page
  const selectedPage = document.getElementById(page);

  if (selectedPage) {
    selectedPage.classList.add('active');
  }

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Reinitialize animations/effects
  if (typeof ir === 'function') {
    setTimeout(ir, 100);
  }

  // Close mobile menu
  const mm = document.getElementById('mm');

  if (mm) {
    mm.classList.remove('open');
    mm.style.display = 'none';
  }

  // Remove scroll lock
  document.documentElement.classList.remove('menu-open');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  // Update active navbar state
  if (typeof updateNavActive === 'function') {
    updateNavActive(page);
  }
}

function tm() {
  const mm = document.getElementById('mm');
  if (!mm) return;

  const isOpen = mm.classList.contains('open');

  if (isOpen) {
    mm.classList.remove('open');
    mm.style.display = 'none';

    document.documentElement.classList.remove('menu-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  } else {
    mm.style.display = 'flex';

    // Use requestAnimationFrame to ensure display: flex applies before adding 'open' for transitions
    requestAnimationFrame(() => {
      mm.classList.add('open');
    });

    document.documentElement.classList.add('menu-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
}
window.addEventListener('scroll', () => { document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60); });

// Particles
(function () {
  const c = document.getElementById('pc');
  if (!c) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 6 + 2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 8 + 6}s;animation-delay:${Math.random() * 8}s;`;
    c.appendChild(p);
  }
})();

// Reveal
function ir() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); } });
  }, { threshold: .1 });
  document.querySelectorAll('.rv:not(.visible)').forEach(el => obs.observe(el));
}
ir();

// Counters
const co = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target, t = +el.dataset.t, dur = 2000;
      let curr = 0; const inc = t / (dur / (1000 / 60));
      const timer = setInterval(() => { curr += inc; if (curr >= t) { curr = t; clearInterval(timer); } el.textContent = Math.floor(curr).toLocaleString(); }, 1000 / 60);
      co.unobserve(e.target);
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.stat-num[data-t]').forEach(el => co.observe(el));

// Countdown
function cd() {
  const tgt = new Date('2026-07-15T06:00:00'), now = new Date(), diff = tgt - now;
  if (diff <= 0) return;
  const pad = n => String(n).padStart(2, '0');
  const d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
  const g = id => document.getElementById(id);
  if (g('cdd')) { g('cdd').textContent = pad(d); g('cdh').textContent = pad(h); g('cdm').textContent = pad(m); g('cds').textContent = pad(s); }
}
cd(); setInterval(cd, 1000);

// Amount selector
function sa(btn, amt) { document.querySelectorAll('.amt-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); const d = document.getElementById('da'); if (d) d.value = amt; }

/* ============================================================
   ADDITIONAL UTILITY FUNCTIONS
   ============================================================ */

/**
 * Show a toast notification
 * Usage: showToast("Donation submitted! Jai Shri Hanuman 🙏")
 */
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, #FF6B00, #D4AF37);
    color: #1A0A00; padding: 14px 28px; border-radius: 30px;
    font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700;
    z-index: 9999; box-shadow: 0 8px 30px rgba(212,175,55,0.5);
    animation: fadeIn 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/**
 * Smooth scroll to a section within a page
 * Usage: scrollToSection('donation')
 */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Copy UPI ID to clipboard
 * Usage: copyUPI()
 */
function copyUPI() {
  navigator.clipboard.writeText('krk326.2010-3@oksbi').then(() => {
    showToast('UPI ID copied! 🙏 krk326.2010-3@oksbi');
  });
}

/**
 * Simple form validator
 * Usage: validateForm(formElement)
 */
function validateForm(form) {
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#FF4444';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  return valid;
}

/**
 * Festival countdown — reusable
 * Usage: startFestivalCountdown('2026-10-01', 'Dussehra')
 */
function startFestivalCountdown(dateStr, festivalName) {
  const target = new Date(dateStr + 'T06:00:00');
  function update() {
    const diff = target - new Date();
    if (diff <= 0) return;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    console.log(`${festivalName}: ${pad(d)}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`);
  }
  update();
  return setInterval(update, 1000);
}

/**
 * Lazy-load images for performance
 * Add data-src attribute to img tags instead of src, then call this
 */
function initLazyLoad() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}
initLazyLoad();

/**
 * Temple Bell Sound Effect (Web Audio API)
 * Usage: playBell()
 */
function playBell() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 2);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.5);
  } catch (e) {
    console.log('Audio not supported');
  }
}

/**
 * WhatsApp share for donations/events
 * Usage: shareOnWhatsApp("Support Sri Hanuman Temple Annadanam!")
 */
function shareOnWhatsApp(message) {
  const url = `https://wa.me/?text=${encodeURIComponent(message + '\n\nSri Hanuman Temple, Golconda Fort, Hyderabad\n📞 +91 9885964448')}`;
  window.open(url, '_blank');
}

/* ============================================================
   FESTIVAL CALENDAR DATA (2026-2030)
   Use this array to populate a calendar or upcoming events section
   ============================================================ */
const FESTIVAL_CALENDAR = [
  // 2026
  { name: "Hanuman Jayanti", date: "2026-04-12", type: "major", telugu: "హనుమాన్ జయంతి" },
  { name: "Bonalu Mahotsavam", date: "2026-07-15", type: "major", telugu: "బోనాలు మహోత్సవం" },
  { name: "Nagula Panchami", date: "2026-08-08", type: "regular", telugu: "నాగుల పంచమి" },
  { name: "Ganesh Chaturthi", date: "2026-08-22", type: "major", telugu: "గణేశ చతుర్థి" },
  { name: "Bathukamma", date: "2026-10-01", type: "major", telugu: "బతుకమ్మ" },
  { name: "Durga Mata Festival", date: "2026-10-05", type: "major", telugu: "దుర్గా నవరాత్రి" },
  { name: "Maha Shivaratri", date: "2027-02-17", type: "major", telugu: "మహా శివరాత్రి" },
  { name: "Bhogi", date: "2027-01-13", type: "regular", telugu: "భోగి" },
  { name: "Sankranti", date: "2027-01-14", type: "major", telugu: "సంక్రాంతి" },
  { name: "Holi", date: "2027-03-02", type: "regular", telugu: "హోళీ" },
  // 2027
  { name: "Hanuman Jayanti", date: "2027-04-01", type: "major", telugu: "హనుమాన్ జయంతి" },
  { name: "Bonalu Mahotsavam", date: "2027-07-04", type: "major", telugu: "బోనాలు మహోత్సవం" },
  { name: "Ganesh Chaturthi", date: "2027-09-11", type: "major", telugu: "గణేశ చతుర్థి" },
  { name: "Bathukamma", date: "2027-09-21", type: "major", telugu: "బతుకమ్మ" },
  { name: "Durga Mata Festival", date: "2027-09-24", type: "major", telugu: "దుర్గా నవరాత్రి" },
];

/* Export for module use */
if (typeof module !== 'undefined') {
  module.exports = { showToast, scrollToSection, copyUPI, validateForm, FESTIVAL_CALENDAR };
}

/* Donation 

let selectedAmount = "";

function sa(btn, amount) {

  document.querySelectorAll(".amt-btn").forEach(b => {
    b.classList.remove("active");
  });

  btn.classList.add("active");

  selectedAmount = amount;

  document.getElementById("otherAmountBox").style.display = "none";
}

function showOtherAmount(btn) {

  document.querySelectorAll(".amt-btn").forEach(b => {
    b.classList.remove("active");
  });

  btn.classList.add("active");

  document.getElementById("otherAmountBox").style.display = "block";
}

function showQR() {

  const customAmount =
    document.getElementById("customAmount")?.value;

  const finalAmount =
    customAmount || selectedAmount || "1";

  document.getElementById("qrSection").style.display = "block";

  const upiLink =
    `upi://pay?pa=krk326.2010-3@oksbi&pn=Sri Hanuman Temple&am=${finalAmount}&cu=INR`;

  document.getElementById("upiPayBtn").href = upiLink;

  document.getElementById("qrSection")
    .scrollIntoView({ behavior: "smooth" });
} */

/* Festival Slider 

const festivalSlides = document.querySelectorAll(".festival-slide");

let festivalIndex = 0;

function showFestival(index) {

  festivalSlides.forEach(slide => {
    slide.classList.remove("active");
  });

  festivalSlides[index].classList.add("active");
}

function nextFestival() {

  festivalIndex++;

  if (festivalIndex >= festivalSlides.length) {
    festivalIndex = 0;
  }

  showFestival(festivalIndex);
}

function prevFestival() {

  festivalIndex--;

  if (festivalIndex < 0) {
    festivalIndex = festivalSlides.length - 1;
  }

  showFestival(festivalIndex);
} */
