const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
const themeToggle = document.querySelector('.theme-toggle');

if (menu && nav) {
  menu.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
    if (menu) menu.setAttribute('aria-expanded', 'false');
  });
});

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
document.body.classList.toggle('dark-mode', initialDark);

function syncThemeToggle() {
  if (!themeToggle) return;
  const darkMode = document.body.classList.contains('dark-mode');
  themeToggle.setAttribute('aria-pressed', String(darkMode));
  themeToggle.classList.toggle('active', darkMode);
  const label = themeToggle.querySelector('.toggle-label');
  if (label) label.textContent = darkMode ? 'Dark' : 'Light';
}

syncThemeToggle();

themeToggle?.addEventListener('click', () => {
  const darkMode = !document.body.classList.contains('dark-mode');
  document.body.classList.toggle('dark-mode', darkMode);
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  syncThemeToggle();
});

const galleryTrack = document.querySelector('.gallery-track');
const galleryCards = Array.from(document.querySelectorAll('.card'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let galleryIndex = 0;

function getSlideWidth() {
  if (!galleryTrack || !galleryCards.length) return 0;
  const gap = parseFloat(getComputedStyle(galleryTrack).gap || '22');
  return galleryCards[0].getBoundingClientRect().width + gap;
}

function updateGallery() {
  if (!galleryTrack || !galleryCards.length) return;

  const step = getSlideWidth();
  galleryTrack.style.transition = 'transform 0.45s ease';
  galleryTrack.style.transform = `translateX(-${galleryIndex * step}px)`;
}

function moveGallery(direction) {
  if (!galleryCards.length) return;

  galleryIndex = (galleryIndex + direction + galleryCards.length) % galleryCards.length;
  updateGallery();
}

prevBtn?.addEventListener('click', () => moveGallery(-1));
nextBtn?.addEventListener('click', () => moveGallery(1));

window.addEventListener('resize', updateGallery);
window.addEventListener('load', updateGallery);
setTimeout(updateGallery, 50);

const aboutImages = Array.from(document.querySelectorAll('.about-image'));
let aboutIndex = 0;

function updateAboutImages() {
  if (!aboutImages.length) return;
  aboutImages.forEach((img, index) => {
    img.classList.toggle('active', index === aboutIndex);
  });
  aboutIndex = (aboutIndex + 1) % aboutImages.length;
}

if (aboutImages.length > 1) {
  setInterval(updateAboutImages, 2400);
  updateAboutImages();
}

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const lightboxTitle = lightbox.querySelector('h2');
  const lightboxText = lightbox.querySelector('p');

  document.querySelectorAll('.art').forEach((artButton) => {
    artButton.addEventListener('click', () => {
      if (!lightboxImage || !lightboxTitle || !lightboxText) return;

      lightboxImage.src = artButton.dataset.image || '';
      lightboxImage.alt = artButton.dataset.title || '';
      lightboxTitle.textContent = artButton.dataset.title || '';
      lightboxText.textContent = artButton.dataset.description || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  const closeButton = lightbox.querySelector('.close');
  closeButton?.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
}

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

