const personas = ['it', 'ece'];
let currentPersona = 'it';

function switchPersona(type) {
  if (type === currentPersona) return;
  currentPersona = type;

  // Update hero container class
  const hero = document.querySelector('.hero');
  personas.forEach(p => hero.classList.remove(p));
  hero.classList.add(type);

  // Update body class for global theming
  personas.forEach(p => document.body.classList.remove(p));
  document.body.classList.add(type);

  // Update profile image slots
  document.querySelectorAll('.profile-img-slot').forEach(slot => {
    slot.classList.toggle('active', slot.classList.contains(type));
  });

  // Toggle hero text blocks
  document.querySelectorAll('.hero-text-block').forEach(block => {
    block.classList.add('hidden');
    block.classList.remove('active');
  });
  const activeHero = document.getElementById(`hero-text-${type}`);
  if (activeHero) {
    activeHero.classList.remove('hidden');
    activeHero.classList.add('active');
  }

  // Toggle persona content sections
  document.querySelectorAll('.persona-content').forEach(content => {
    content.classList.add('hidden');
    content.classList.remove('active');
  });
  const activeContent = document.getElementById(`persona-${type}`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
    activeContent.classList.add('active');
  }
}

function nextPersona() {
  const nextIndex = (personas.indexOf(currentPersona) + 1) % personas.length;
  switchPersona(personas[nextIndex]);
}

function prevPersona() {
  const prevIndex = (personas.indexOf(currentPersona) - 1 + personas.length) % personas.length;
  switchPersona(personas[prevIndex]);
}

// Scroll reveal
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Set initial body class
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('it');

  // Wire ECE gallery lightbox clicks
  document.querySelectorAll('.gallery-thumb').forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.dataset.caption, img.dataset.desc);
    });
  });
});

// Lightbox (ECE photo gallery zoom)
function openLightbox(src, caption, desc) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption || '';
  document.getElementById('lightbox-desc').textContent = desc || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    document.getElementById('lightbox-img').src = '';
  }, 300);
}

// Close lightbox on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
