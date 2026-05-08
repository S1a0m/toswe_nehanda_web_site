<!-- app/components/TheFooter.vue -->
<template>
  <footer class="footer">
    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <div class="logo-pill">
          <div class="logo-mark">
            <img src="/images/logo-tsw-foot.png" alt="Tôswè Africa Logo" srcset="">
          </div>
          <div>
            <div class="logo-name">Tôswè Africa</div>
            <div class="logo-sub">Nous vendons pour vous</div>
          </div>
        </div>
        <p class="brand-desc">
          Tôswè Africa connecte clients et vendeurs locaux grâce à Nehanda,
          une assistante intelligente conçue pour l'Afrique.
        </p>
        <div class="socials">
          <a href="#" aria-label="Facebook" class="social-btn"><Facebook :size="15" /></a>
          <a href="#" aria-label="X/Twitter" class="social-btn"><Twitter :size="15" /></a>
          <a href="#" aria-label="WhatsApp" class="social-btn"><MessageCircle :size="15" /></a>
        </div>
      </div>

      <!-- Plateforme -->
      <div class="footer-col">
        <h5>Plateforme</h5>
        <ul>
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/marketplace">Marketplace</NuxtLink></li>
          <li><a href="/#nehanda">Nehanda AI</a></li>
          <li><a href="/#how">Comment ça marche</a></li>
        </ul>
      </div>

      <!-- Pour les vendeurs — app only -->
      <div class="footer-col">
        <h5>Pour les vendeurs</h5>
        <div class="app-only-block" @click="showQrModal">
          <div class="app-only-badge">
            <Smartphone :size="12" stroke-width="2.5" />
            Sur l'app
          </div>
          <ul>
            <li>Devenir vendeur</li>
            <li>Tableau de bord</li>
            <li>Promotions</li>
            <li>Support vendeur</li>
          </ul>
          <span class="app-only-cta">Télécharger l'app <ArrowRight :size="12" /></span>
        </div>
      </div>

      <!-- Légal & Support — app only -->
      <div class="footer-col">
        <h5>Légal & Support</h5>
        <div class="app-only-block" @click="showQrModal">
          <div class="app-only-badge">
            <Smartphone :size="12" stroke-width="2.5" />
            Sur l'app
          </div>
          <ul>
            <li>À propos</li>
            <li>CGU</li>
            <li>Confidentialité</li>
            <li>Contact</li>
          </ul>
          <span class="app-only-cta">Télécharger l'app <ArrowRight :size="12" /></span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2025 Tôswè Africa. Tous droits réservés.</p>
      <p class="made">
        <MapPin :size="14" style="color: rgba(255,255,255,0.4); margin-right: 4px;" />
        Bénin 🇧🇯
      </p>
    </div>
  </footer>
</template>

<script setup>
import { Facebook, Twitter, MessageCircle, MapPin, Smartphone, ArrowRight } from 'lucide-vue-next'
const { showQrModal } = useDownload()
</script>

<style scoped>
.footer {
  background: var(--brown-deep);
  color: rgba(255,255,255,0.65);
  margin-top: 80px;
}
.footer-inner {
  max-width: 1280px; margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 50px;
  padding: 64px 40px 48px;
}
.logo-pill { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.logo-mark {
  width: 40px; height: 40px; border-radius: 12px;
  flex-shrink: 0;
}
.logo-name {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.9);
}
.logo-sub { font-size: 0.7rem; color: rgba(255,255,255,0.45); margin-top: 2px; }
.brand-desc {
  font-size: 0.84rem; line-height: 1.75; margin-bottom: 20px;
  max-width: 280px; color: rgba(255,255,255,0.5);
}
.socials { display: flex; gap: 10px; }
.social-btn {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.6);
  transition: background 0.2s, color 0.2s;
}
.social-btn:hover { background: var(--terra); color: white; }

.footer-col h5 {
  font-size: 0.72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.9); margin-bottom: 18px;
}
.footer-col a {
  font-size: 0.84rem; color: rgba(255,255,255,0.5);
  transition: color 0.2s;
}
.footer-col a:hover { color: var(--gold-light); }

/* App-only block */
.app-only-block {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 14px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  display: flex; flex-direction: column; gap: 12px;
}
.app-only-block:hover {
  background: rgba(255,255,255,0.04);
  border-color: var(--terra);
}
.app-only-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--terra);
  color: white;
  font-size: 0.68rem; font-weight: 700;
  padding: 3px 9px; border-radius: 20px;
  width: fit-content;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.app-only-block ul {
  list-style: none;
  display: flex; flex-direction: column; gap: 8px;
}
.app-only-block ul li {
  font-size: 0.82rem; color: rgba(255,255,255,0.35);
  padding-left: 2px;
}
.app-only-cta {
  display: flex; align-items: center; gap: 5px;
  font-size: 0.75rem; font-weight: 700;
  color: var(--terra);
  margin-top: 2px;
  transition: gap 0.2s;
}
.app-only-block:hover .app-only-cta { gap: 8px; }

/* Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.07);
  max-width: 1280px; margin: 0 auto;
  padding: 24px 40px;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-bottom p { font-size: 0.8rem; }
.made {
  color: rgba(255,255,255,0.3);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
}

@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 36px; padding: 48px 24px 32px;
  }
  .footer-brand { grid-column: 1 / -1; }
  .footer-bottom { padding: 20px 24px; flex-direction: column; gap: 8px; text-align: center; }
}
@media (max-width: 560px) {
  .footer-inner { grid-template-columns: 1fr; }
}
</style>