<!-- app/components/TheNavbar.vue -->
<template>
  <header :class="['navbar', { scrolled: isScrolled }]">
    <div class="navbar-inner">
      <!-- Logo -->
      <NuxtLink to="/" class="logo">
        <div class="logo-mark">
          <img src="/images/logo.png" alt="Tôswè Africa Logo" srcset="">
        </div>
        <div class="logo-text">
          <span class="logo-name">Tôswè</span>
          <span class="logo-sub">Africa</span>
        </div>
      </NuxtLink>

      <!-- Nav links -->
      <nav class="nav-links" :class="{ open: menuOpen }">
        <NuxtLink to="/" @click="menuOpen = false">Accueil</NuxtLink>
        <NuxtLink to="/marketplace" @click="menuOpen = false">Marketplace</NuxtLink>
        <a href="/#nehanda" @click="menuOpen = false">Nehanda</a>
        <a href="/#how" @click="menuOpen = false">Comment ça marche</a>
        <button class="btn-dl mobile-only" @click="download">
          <Download :size="16" />
          Télécharger l'app
        </button>
      </nav>

      <!-- CTA + hamburger -->
      <div class="nav-right">
        <button class="btn-dl desktop-only" @click="download">
          <Download :size="16" />
          Télécharger l'app
        </button>
        <!-- et dans nav-links -->
        <button class="hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Menu">
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Overlay mobile -->
    <div class="nav-overlay" :class="{ active: menuOpen }" @click="menuOpen = false" />
  </header>
</template>

<script setup>
import { useDownload } from '~/composables/useDownload'
import { Download } from 'lucide-vue-next'

const isScrolled = ref(false)
const menuOpen   = ref(false)
const { download } = useDownload()

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 40
  }, { passive: true })
})
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
}

.navbar.scrolled {
  background: rgba(253, 248, 245, 0.88);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 rgba(125, 38, 15, 0.08);
}

.navbar-inner {
  max-width: 1280px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 40px;
  gap: 32px;
}

/* Logo */
.logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.logo-mark {
  width: 38px; height: 38px; border-radius: 12px;
 /* background: var(--terra);*/
  display: flex; align-items: center; justify-content: center;
  /*box-shadow: 0 4px 14px rgba(198, 90, 46, 0.35);*/
}
.logo-mark span {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; font-weight: 900; color: white;
}
.logo-text { display: flex; flex-direction: column; line-height: 1; }
.logo-name {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; font-weight: 700; color: var(--terra);
}
.logo-sub { font-size: 0.65rem; font-weight: 500; color: var(--text-light); }

/* Nav links */
.nav-links {
  display: flex; align-items: center; gap: 36px;
  flex: 1; justify-content: center;
}
.nav-links a {
  font-size: 0.88rem; font-weight: 500; color: var(--text-mid);
  position: relative; transition: color 0.2s;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
  height: 1.5px; background: var(--terra);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.25s;
}
.nav-links a:hover, .nav-links a.router-link-active { color: var(--terra); }
.nav-links a.router-link-active::after, .nav-links a:hover::after { transform: scaleX(1); }

/* CTA button */
.btn-dl {
  display: flex; align-items: center; gap: 7px;
  background: var(--terra); color: white;
  border: none; padding: 10px 20px;
  border-radius: 50px;
  font-size: 0.85rem; font-weight: 700;
  box-shadow: 0 4px 14px rgba(198, 90, 46, 0.28);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  flex-shrink: 0;
}
.btn-dl:hover {
  background: var(--terra-dark);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(198, 90, 46, 0.35);
}

.nav-right { display: flex; align-items: center; gap: 16px; }

/* Hamburger */
.hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; padding: 4px; width: 32px;
}
.hamburger span {
  display: block; height: 2px; border-radius: 2px;
  background: var(--text-mid); transition: all 0.3s;
}
.hamburger span:nth-child(1) { width: 24px; }
.hamburger span:nth-child(2) { width: 18px; }
.hamburger span:nth-child(3) { width: 24px; }
.hamburger span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 24px; }
.hamburger span.open:nth-child(2) { opacity: 0; }
.hamburger span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 24px; }

.nav-overlay {
  display: none; position: fixed; inset: 0; z-index: -1;
  background: rgba(0,0,0,0.3);
}

.mobile-only { display: none !important; }

/* Responsive */
@media (max-width: 900px) {
  .navbar-inner { padding: 14px 20px; }
  .desktop-only { display: none !important; }
  .mobile-only  { display: flex !important; }
  .hamburger    { display: flex; }

  .nav-links {
    position: fixed; top: 0; right: -100%; bottom: 0;
    width: min(320px, 80vw);
    flex-direction: column; align-items: flex-start;
    background: var(--beige); z-index: 199;
    padding: 80px 32px 40px;
    gap: 28px; justify-content: flex-start;
    box-shadow: -10px 0 40px rgba(0,0,0,0.1);
    transition: right 0.35s cubic-bezier(0.77, 0, 0.175, 1);
  }
  .nav-links.open { right: 0; }
  .nav-links a { font-size: 1.1rem; }
  .nav-overlay.active { display: block; }
  .btn-dl.mobile-only {
    margin-top: 16px; width: 100%; justify-content: center;
    padding: 14px 20px; font-size: 1rem;
  }
}
</style>