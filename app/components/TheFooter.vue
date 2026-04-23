<!-- app/components/TheFooter.vue -->
<template>
  <footer class="footer">
    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <div class="logo-pill">
          <div class="logo-mark">
            <img src="/images/logo.png" alt="Tôswè Africa Logo" srcset="">
          </div>
          <div>
            <div class="logo-name">Tôswè Africa</div>
            <div class="logo-sub">L'e-commerce africain par l'IA</div>
          </div>
        </div>
        <p class="brand-desc">
          Tôswè Africa connecte clients et vendeurs locaux grâce à Nehanda,
          une assistante intelligente conçue pour l'Afrique.
        </p>
        <div class="socials">
          <a href="#" aria-label="Facebook" class="social-btn">
            <Facebook :size="15" />
          </a>
          <a href="#" aria-label="X/Twitter" class="social-btn">
            <Twitter :size="15" />
          </a>
          <a href="#" aria-label="WhatsApp" class="social-btn">
            <MessageCircle :size="15" />
          </a>
        </div>
      </div>

      <!-- Links -->
      <div class="footer-col">
        <h5>Plateforme</h5>
        <ul>
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/marketplace">Marketplace</NuxtLink></li>
          <li><a href="/#nehanda">Nehanda AI</a></li>
          <li><a href="/#how">Comment ça marche</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Pour les vendeurs</h5>
        <ul>
          <li><a href="#">Devenir vendeur</a></li>
          <li><a href="#">Tableau de bord</a></li>
          <li><a href="#">Promotions</a></li>
          <li><a href="#">Support vendeur</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Légal & Support</h5>
        <ul>
          <li><a href="#">À propos</a></li>
          <li><a href="#">CGU</a></li>
          <li><a href="#">Confidentialité</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2025 Tôswè Africa. Tous droits réservés.</p>
      <p class="made">Fait avec ❤️ au Bénin 🇧🇯</p>
    </div>
  </footer>
</template>

<script setup>
import { Facebook, Twitter, MessageCircle } from 'lucide-vue-next'
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
 /* background: var(--terra);
  display: flex; align-items: center; justify-content: center;*/
  flex-shrink: 0;
}
.logo-mark span {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; font-weight: 900; color: white;
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
  font-size: 0.82rem; font-weight: 700;
  color: rgba(255,255,255,0.6);
  transition: background 0.2s, color 0.2s;
}
.social-btn:hover { background: var(--terra); color: white; }

.footer-col h5 {
  font-size: 0.72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.9); margin-bottom: 18px;
}
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.footer-col a {
  font-size: 0.84rem; color: rgba(255,255,255,0.5);
  transition: color 0.2s;
}
.footer-col a:hover { color: var(--gold-light); }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.07);
  max-width: 1280px; margin: 0 auto;
  padding: 24px 40px;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-bottom p { font-size: 0.8rem; }
.made { color: rgba(255,255,255,0.3); }

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