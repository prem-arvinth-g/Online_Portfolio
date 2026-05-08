let currentPersona = 'it';
let swiperInstance = null;
const personas = ['it', 'design', 'ece'];

function switchPersona(type) {
  if (type === currentPersona) return;
  currentPersona = type;

  // Update hero container for dynamic styles
  const hero = document.querySelector('.hero');
  personas.forEach(p => hero.classList.remove(p));
  hero.classList.add(type);

  // Also update body for global per-persona theming
  personas.forEach(p => document.body.classList.remove(p));
  document.body.classList.add(type);

  // Update Profile Images
  document.querySelectorAll('.profile-img-slot').forEach(slot => {
    slot.classList.toggle('active', slot.classList.contains(type));
  });

  // Toggle Hero Text Blocks
  document.querySelectorAll('.hero-text-block').forEach(block => {
    block.classList.add('hidden');
    block.classList.remove('active');
  });
  const activeHero = document.getElementById(`hero-text-${type}`);
  if (activeHero) {
    activeHero.classList.remove('hidden');
    activeHero.classList.add('active');
  }

  // Toggle Persona Content
  document.querySelectorAll('.persona-content').forEach(content => {
    content.classList.add('hidden');
    content.classList.remove('active');
  });
  const activeContent = document.getElementById(`persona-${type}`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
    activeContent.classList.add('active');
  }

  // Specific Logic for Photography Swiper
  if (type === 'design' && swiperInstance) {
    setTimeout(() => {
      swiperInstance.update();
      if (swiperInstance.autoplay) swiperInstance.autoplay.start();
    }, 300);
  }
}

function nextPersona() {
  const currentIndex = personas.indexOf(currentPersona);
  const nextIndex = (currentIndex + 1) % personas.length;
  switchPersona(personas[nextIndex]);
}

function prevPersona() {
  const currentIndex = personas.indexOf(currentPersona);
  const prevIndex = (currentIndex - 1 + personas.length) % personas.length;
  switchPersona(personas[prevIndex]);
}


const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => observer.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();

// Photo Gallery Injection & Swiper Initialization
const photos = [
  "22.jpg", "44.jpg", "IMG_20241013_061434.jpg", "IMG_20241013_063720.jpg",
  "IMG_20241016_005409.jpg", "IMG_20241020_061113.jpg", "IMG_20241029_181949.jpg",
  "IMG_20241101_063100.jpg", "IMG_20241101_194642.jpg", "IMG_20241104_055804.jpg",
  "IMG_20250227_172317.jpg", "IMG_20250307_173212.jpg", "IMG_20250308_182742.jpg",
  "IMG_20250308_182827.jpg", "IMG_20250420_071327.jpg", "IMG_20250420_071831.jpg",
  "IMG_20250420_072249.jpg", "IMG_20250421_103258.jpg", "IMG_20250421_103836.jpg",
  "IMG_20250421_113859.jpg", "IMG_20250421_130842.jpg", "IMG_20250603_063603.jpg",
  "IMG_20250603_064959.jpg", "IMG_20250608_181525.jpg", "IMG_20250608_182316.jpg",
  "IMG_20250608_183244.jpg", "IMG_20250608_184204.jpg", "IMG_20250621_184314.jpg",
  "IMG_20250705_190134.jpg", "IMG_20250822_182740.jpg", "IMG_20250822_182955.jpg",
  "IMG_20250824_060730.jpg", "IMG_20250830_180142.jpg", "IMG_20250830_180338.jpg",
  "IMG_20250830_181121.jpg", "IMG_20250830_181133.jpg", "IMG_20250929_175108.jpg",
  "IMG_20251016_062928.jpg", "IMG_20251016_062932.jpg", "IMG_20251016_063327.jpg",
  "IMG_20251016_063519.jpg", "IMG_20251016_063914.jpg", "gg.jpg", "hh.jpg",
  "re edit.jpg", "sad.jpg", "ss.jpg"
];

const sliderWrapper = document.getElementById('photo-slider-wrapper');
if (sliderWrapper) {
  // Shuffle the photos array
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photos[i], photos[j]] = [photos[j], photos[i]];
  }

  photos.forEach(photo => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<img src="assets/Photos/${photo}" alt="Photography work" loading="lazy" />`;
    sliderWrapper.appendChild(slide);
  });

  swiperInstance = new Swiper('.photography-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 1.5,
      slideShadows: true,
    },
  });
}

// ---------------------------------------------------------
// DYNAMIC VIDEO & REEL INJECTION
// ---------------------------------------------------------

const clientYouTubeVideos = [
  { id: 'cjuXBGQ9K4o', label: '🍲 Cooking Vlog Edit' },
  { id: 'SU8nDx1NG8k', label: '🍲 Recipe Video Edit' },
  { id: 'XP14IOfp8q8', label: '🍲 Cooking Tutorial Edit' },
  { id: 'FgkS-ScUm1g', label: '🍲 Kitchen Vlog Edit' },
  { id: '8LChbyuowoo', label: '🍲 Special Recipe Edit' }
];

const instagramReels = [
  "C-mzjsGJYJM", "C-afyv2JqOD", "C7tVuilp5fS", "C7ecF_cpi8k", 
  "C7az4w_peCg", "C7CFHy1ra4T", "C6jku-ZLAMZ", "C53HG3yrlQ3", 
  "C5vS_uULrPm", "C4aO_sbLiN3", "C4SG4C5LSa6", "C3ei6NTLUVH"
];

const clientWorksReels = [
  "DE4bJ6ovpA7", "DE19ODgvif5", "DEuVyEjv-eF", "DEpNMP3vvub", 
  "DEmzS--PsIO", "DEkB68cPj9a", "DEhaUwYvQfa", "DEe2PcRPvcx"
];

const blender3DProjects = [
  { id: 'C57V4G7swWH', emoji: '🎲' },
  { id: 'C6An_7oCDIK', emoji: '⚡' },
  { id: 'C6JTrUFsCfz', emoji: '🌌' },
  { id: 'C6aSOQ3MpPE', emoji: '🔮' }
];

// Inject YouTube Client Works
const ytWrapper = document.getElementById('youtube-client-wrapper');
if (ytWrapper) {
  clientYouTubeVideos.forEach(v => {
    ytWrapper.innerHTML += `
      <div class="swiper-slide video-card" onclick="openVideoModal('${v.id}', 'Client YouTube Edit — Ramya Veetu Samayal')">
        <div class="video-thumb-wrap">
          <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="Client Video" loading="lazy" />
          <div class="play-btn">▶</div>
        </div>
        <p class="video-label">${v.label}</p>
      </div>`;
  });
}

// Inject Instagram Reels
const instaWrapper = document.getElementById('instagram-reels-wrapper');
if (instaWrapper) {
  instagramReels.forEach(id => {
    instaWrapper.innerHTML += `
      <a class="swiper-slide reel-card" href="https://www.instagram.com/p/${id}/" target="_blank" rel="noreferrer">
        <div class="reel-thumb"><div class="reel-placeholder">▶</div></div>
        <p class="video-label">🎬 Instagram Reel</p>
      </a>`;
  });
}

// Inject Client Works Reels
const clientWorksWrapper = document.getElementById('client-works-wrapper');
if (clientWorksWrapper) {
  clientWorksReels.forEach(id => {
    clientWorksWrapper.innerHTML += `
      <a class="swiper-slide reel-card" href="https://www.instagram.com/reel/${id}/" target="_blank" rel="noreferrer">
        <div class="reel-thumb"><div class="reel-placeholder">▶</div></div>
        <p class="video-label">🤝 Client Edit</p>
      </a>`;
  });
}

// Inject 3D Projects
const blenderWrapper = document.getElementById('blender-3d-wrapper');
if (blenderWrapper) {
  blender3DProjects.forEach(p => {
    blenderWrapper.innerHTML += `
      <a class="swiper-slide reel-card" href="https://www.instagram.com/p/${p.id}/" target="_blank" rel="noreferrer">
        <div class="reel-thumb reel-3d"><div class="reel-placeholder">${p.emoji}</div></div>
        <p class="video-label">🟣 3D Project</p>
      </a>`;
  });
}

// Initialize Video & Reel Sliders
const videoSliders = document.querySelectorAll('.video-slider, .reel-slider');
videoSliders.forEach(slider => {
  new Swiper(slider, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    grabCursor: true,
    freeMode: true,
  });
});

// Set initial body persona class on load
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('it');

  // Wire up gallery lightbox clicks
  document.querySelectorAll('.gallery-thumb').forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.dataset.caption, img.dataset.desc);
    });
  });
});

// Lightbox functions
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
  // Clear src after animation
  setTimeout(() => {
    document.getElementById('lightbox-img').src = '';
  }, 300);
}

// Video Modal functions
function openVideoModal(videoId, title) {
  const modal = document.getElementById('video-modal');
  document.getElementById('video-modal-iframe').src =
    'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
  document.getElementById('video-modal-title').textContent = title || '';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  // Stop video by clearing src
  setTimeout(() => {
    document.getElementById('video-modal-iframe').src = '';
  }, 250);
}

// Close either modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeVideoModal();
  }
});
