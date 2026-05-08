<!-- app/pages/index.vue -->
<template>
  <main class="landing">
    <QrModal />

    <!-- ═══════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════ -->
    <section class="hero">
      <!-- Background decorations -->
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-grain" />

      <div class="hero-inner">
        <!-- Left: Copy -->
        <div class="hero-copy">
          <div class="hero-badge">
            <span class="badge-dot" />
            Propulsé par l'Intelligence Artificielle ✦
          </div>

          <h1 class="hero-title">
            L'e-commerce<br>
            africain assisté<br>
            <em>par Nehanda</em>
          </h1>

          <p class="hero-sub">
            Discutez avec Nehanda pour trouver, comparer et commander
            vos produits locaux en toute simplicité. Du Bénin pour toute l'Afrique.
          </p>

          <div class="hero-trust">
            <div class="trust-avatars">
              <div v-for="(av, i) in trustAvatars" :key="i" class="trust-av" :style="{ background: av }"><img :src="trustEmojis[i]" alt="Nehanda" height="27" width="26" style="border-radius: 50%;"/><!--{{ trustEmojis[i] }}--></div>
            </div>
            <div class="trust-text">
              <strong>+4 200</strong> commandes ce mois
              <span class="trust-sep">·</span>
              <strong>4.9★</strong> satisfaction
            </div>
          </div>

          <!-- Hero CTAs -->
          <div class="hero-ctas">
            <button class="cta-primary" @click="download">
              <Download :size="18" />
              Télécharger l'app
            </button>
            <NuxtLink to="/marketplace" class="cta-secondary">
              Explorer le marketplace
              <ArrowRight :size="16" />
            </NuxtLink>
          </div>

          <div class="store-badges">
            <a href="#" class="store-pill">
              <Smartphone :size="15" />
              Google Play
            </a>
            <a href="#" class="store-pill">
              <MessageCircle :size="15" />
              Messenger
            </a>
          </div>
        </div>

        <!-- Right: Phone mockup -->
        <div class="hero-visual">
          <div class="phone-glow" />
          <div class="phone-wrap animate-float">
            <div class="phone">
              <div class="phone-notch" />
              <div class="phone-screen">
                <img
                  src="/images/nehanda-screen.jpg"
                  alt="Nehanda en action"
                  class="phone-screenshot"
                />
              </div>
            </div>
          </div>

          <!-- Float badges — inchangés -->
          <div class="float-badge float-badge-1">
            <Package :size="20" />
            <div>
              <div class="fb-label">Commandes</div>
              <div class="fb-val">+2 400/mois</div>
            </div>
          </div>
          <div class="float-badge float-badge-2">
            <Star :size="20" />
            <div>
              <div class="fb-label">Satisfaction</div>
              <div class="fb-val">4.9 / 5.0</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Proof bar -->
     <section class="proof-bar">
      <div class="proof-inner">
        <p class="proof-label">Disponible via</p>
    <div class="proof-logos">
      <div class="proof-logo"><MessageCircle :size="16" /> WhatsApp</div>
      <div class="proof-sep">·</div>
      <div class="proof-logo"><MessageCircle :size="16" /> Messenger</div>
      <div class="proof-sep">·</div>
      <div class="proof-logo"><Smartphone :size="16" /> App Mobile</div>
      <div class="proof-sep">·</div>
      <div class="proof-logo"><Globe :size="16" /> Web</div>
    </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         NEHANDA SECTION
    ═══════════════════════════════════════════ -->
    <section id="nehanda" class="nehanda-section">
      <div class="section-inner">
        <div class="nehanda-text">
          <div class="section-tag">Votre assistante IA</div>
          <h2>Rencontrez <em>Nehanda</em></h2>
          <p class="nehanda-desc">
            Nehanda est l'intelligence artificielle au cœur de Tôswè Africa.
            Elle comprend vos besoins en français, et bientôt en langues locales,
            pour vous proposer les meilleurs produits locaux au meilleur prix.
          </p>
          <!-- Nehanda features (remplace feat.icon dans le v-for) -->
          <div class="nehanda-features">
            <div class="neh-feat">
              <div class="neh-feat-icon"><MessageCircle :size="20" /></div>
              <div>
                <div class="neh-feat-title">Conversation naturelle</div>
                <div class="neh-feat-desc">Parlez en français ou en langues locales.</div>
              </div>
            </div>
            <div class="neh-feat">
              <div class="neh-feat-icon"><Target :size="20" /></div>
              <div>
                <div class="neh-feat-title">Recommandations IA</div>
                <div class="neh-feat-desc">Suggestions personnalisées basées sur vos préférences.</div>
              </div>
            </div>
            <div class="neh-feat">
              <div class="neh-feat-icon"><Zap :size="20" /></div>
              <div>
                <div class="neh-feat-title">Commande en secondes</div>
                <div class="neh-feat-desc">Commandez directement depuis la conversation.</div>
              </div>
            </div>
            <div class="neh-feat">
              <div class="neh-feat-icon"><Lock :size="20" /></div>
              <div>
                <div class="neh-feat-title">Paiement sécurisé</div>
                <div class="neh-feat-desc">Mobile Money.</div>
              </div>
            </div>
          </div>
          <button class="cta-primary" @click="download" style="margin-top: 32px;">
            Essayer Nehanda gratuitement
          </button>
        </div>

        <div class="nehanda-visual">
          <div class="neh-card-main">
            <div class="neh-avatar-big">
              <img src="/images/logo-neh.png" alt="Nehanda" height="53" width="50"/>
            </div>
            <div class="neh-name">Nehanda</div>
            <div class="neh-tagline">Votre assistante shopping IA</div>
            <div class="neh-chips">
              <div v-for="c in nehandaChips" :key="c" class="neh-chip">{{ c }}</div>
            </div>
            <div class="neh-stats">
              <div v-for="s in nehandaStats" :key="s.label" class="neh-stat">
                <div class="neh-stat-val">{{ s.val }}</div>
                <div class="neh-stat-lbl">{{ s.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         HOW IT WORKS
    ═══════════════════════════════════════════ -->
    <section id="how" class="how-section">
      <div class="section-inner center">
        <div class="section-tag" style="justify-content: center;">Comment ça marche</div>
        <h2>En 3 étapes simples</h2>
        <p class="section-sub">De la conversation à la livraison, Nehanda s'occupe de tout.</p>
      </div>

      <!-- Steps (remplace step.icon dans le v-for) -->
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num">1</div>
          <div class="step-icon"><MessageCircle :size="32" /></div>
          <h3 class="step-title">Discutez avec Nehanda</h3>
          <p class="step-desc">Décrivez ce que vous cherchez en langage naturel.</p>
          <div class="step-arrow"><ArrowRight :size="16" /></div>
        </div>
        <div class="step-card">
          <div class="step-num">2</div>
          <div class="step-icon"><Target :size="32" /></div>
          <h3 class="step-title">Découvrez les produits</h3>
          <p class="step-desc">Nehanda analyse et vous présente une sélection personnalisée.</p>
          <div class="step-arrow"><ArrowRight :size="16" /></div>
        </div>
        <div class="step-card">
          <div class="step-num">3</div>
          <div class="step-icon"><Truck :size="32" /></div>
          <h3 class="step-title">Recevez votre commande</h3>
          <p class="step-desc">Payez via Mobile Money et recevez votre commande chez vous.</p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         FEATURES
    ═══════════════════════════════════════════ -->
    <section class="features-section">
      <div class="section-inner center">
        <div class="section-tag" style="justify-content: center;">Pourquoi Tôswè</div>
        <h2>Conçu pour l'Afrique,<br>par des Africains</h2>
      </div>
      <!-- Features (remplace feat.icon dans le v-for) -->
      <div class="features-grid">
        <div class="feat-card">
          <div class="feat-icon"><Globe :size="28" /></div>
          <h3>Produits 100% locaux</h3>
          <p>Alimentaires, artisanaux, cosmétiques — tous vérifiés et sourcés localement.</p>
        </div>
        <div class="feat-card wide">
          <div class="feat-icon"><Zap :size="28" /></div>
          <h3>IA de pointe</h3>
          <p>Nehanda utilise les derniers modèles de langage pour comprendre vos besoins.</p>
        </div>
        <div class="feat-card">
          <div class="feat-icon"><Smartphone :size="28" /></div>
          <h3>Multi-canal</h3>
          <p>WhatsApp, Messenger, application mobile ou web.</p>
        </div>
        <div class="feat-card">
          <div class="feat-icon"><Wallet :size="28" /></div>
          <h3>Prix transparents</h3>
          <p>Pas de frais cachés. Comparez les prix entre vendeurs.</p>
        </div>
        <div class="feat-card">
          <div class="feat-icon"><Truck :size="28" /></div>
          <h3>Livraison rapide</h3>
          <p>Réseau de livreurs locaux fiables. Livraison en 2h à Cotonou.</p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         VENDOR CTA
    ═══════════════════════════════════════════ -->
    <section class="vendor-section">
      <div class="vendor-inner">
        <div class="vendor-text">
          <div class="section-tag" style="color: var(--gold-light);">Pour les vendeurs</div>
          <h2 style="color: white;">Vendez facilement<br>avec Tôswè</h2>
          <p>Rejoignez des milliers de vendeurs africains qui développent leur activité. Gérez vos produits, recevez vos commandes et atteignez de nouveaux clients.</p>
          <!-- Vendor stats -->
          <div class="vendor-stats">
            <div class="vs-item">
              <div class="vs-val">500+</div>
              <div class="vs-lbl">vendeurs actifs</div>
            </div>
            <div class="vs-item">
              <div class="vs-val">85k</div>
              <div class="vs-lbl">FCFA/mois en moyenne</div>
            </div>
            <div class="vs-item">
              <div class="vs-val">98%</div>
              <div class="vs-lbl">taux de satisfaction</div>
            </div>
          </div>
          <button class="cta-vendor" @click="download">
            Devenir vendeur <ArrowRight :size="16" />
          </button>
        </div>
        <div class="vendor-card-wrap">
          <!-- Vendor card -->
          <div class="vendor-card">
            <div class="vendor-avatar"><img src="/images/kk.png" alt="Kally Kakpo" style="width: 100%; height: 100%; object-fit: cover;" /></div>
            <div class="vendor-card-name">Kally Kakpo</div>
            <div class="vendor-card-loc">
              <MapPin :size="13" /> Cotonou, Bénin <!-- import MapPin -->
            </div>
            <div class="vendor-card-stats">
              <div class="vc-stat"><strong>340</strong><span>Commandes</span></div>
              <div class="vc-stat"><strong>4.9★</strong><span>Note</span></div>
              <div class="vc-stat"><strong>85k</strong><span>FCFA/mois</span></div>
            </div>
            <div class="vendor-card-tag">
              <CheckCircle :size="13" /> Boutique vérifiée
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         DOWNLOAD CTA
    ═══════════════════════════════════════════ -->
    <section class="download-section">
      <div class="dl-inner">
        <div class="dl-text">
          <div class="section-tag" style="justify-content: center;">Disponible maintenant</div>
          <h2>Téléchargez Nehanda</h2>
          <p>Gratuit sur Android. Commencez à découvrir les meilleurs produits locaux dès aujourd'hui.</p>
          <div class="dl-btns">
            <!-- Download CTA -->
            <button class="cta-primary large" @click="download">
              <Download :size="20" />
              Télécharger maintenant
            </button>
            <NuxtLink to="/marketplace" class="cta-secondary large">
              Voir le marketplace <ArrowRight :size="16" />
            </NuxtLink>
          </div>
        </div>
        <div class="dl-visual">
          <div class="dl-phone-stack">
            <div class="dl-phone" />
            <div class="dl-phone dl-phone-front"><div class="dl-phone-screen">
                <ShoppingBag :size="28" stroke-width="1.5" style="color: var(--terra); margin-bottom: 12px;" />
                <div style="font-weight: 800; color: var(--text); margin-bottom: 6px; font-family: 'Playfair Display', serif;">Nehanda</div>
                <div style="font-size: 0.75rem; color: var(--text-light);">L'app est disponible !</div>
                <div style="margin-top: 16px;">
                  <div class="dl-rating">
                    <Star v-for="i in 5" :key="i" :size="13" :fill="'#C9963A'" style="color: #C9963A;" />
                  </div>
                  <div style="font-size: 0.7rem; color: var(--text-light); margin-top: 4px;">4.9 (1 200 avis)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import {
  Download, ArrowRight, MessageCircle, Smartphone,
  Globe, Target, Zap, Lock, Truck, Users,
  Star, Package, Wallet, CheckCircle,
  Store, TrendingUp, MapPin, ShoppingBag
} from 'lucide-vue-next'

const { download } = useDownload()

const trustAvatars = ['#f5c842', '#7bc47e', '#ffaaaa', '#c084fc']
const trustEmojis  = ['/images/client_1.png', '/images/client_2.png', '/images/client_3.png', '/images/client_4.png']

const phonePreviews = [
  { emoji: '🫒', name: 'Huile Palme', price: '1 500 F' },
  { emoji: '🍅', name: 'Tomate Bio', price: '800 F' },
]

const nehandaFeatures = [
  { icon: '💬', title: 'Conversation naturelle', desc: 'Parlez en français ou en langues locales. Nehanda vous comprend.' },
  { icon: '🎯', title: 'Recommandations IA', desc: 'Suggestions personnalisées basées sur vos préférences et votre localisation.' },
  { icon: '⚡', title: 'Commande en secondes', desc: 'Commandez directement depuis la conversation, en quelques secondes.' },
  { icon: '🔒', title: 'Paiement sécurisé', desc: 'Mobile Money — paiements sécurisés et vérifiés.' },
]

const nehandaChips = ['Produits locaux', 'Livraison rapide', 'IA intégrée', 'Mobile Money']

const nehandaStats = [
  { val: '4 200+', label: 'commandes/mois' },
  { val: '98%',   label: 'satisfaction' },
  { val: '2h',    label: 'délai moyen' },
]

const steps = [
  {
    icon: '💬',
    title: 'Discutez avec Nehanda',
    desc: 'Décrivez ce que vous cherchez en langage naturel. Nehanda comprend vos besoins et vos préférences.',
  },
  {
    icon: '🔍',
    title: 'Découvrez les produits',
    desc: 'Nehanda analyse des milliers d\'offres et vous présente une sélection personnalisée avec comparaison.',
  },
  {
    icon: '🚴',
    title: 'Recevez votre commande',
    desc: 'Payez via Mobile Money et recevez votre commande directement chez vous ou au point relais.',
  },
]

const features = [
  { icon: '🌍', title: 'Produits 100% locaux', desc: 'Alimentaires, artisanaux, cosmétiques — tous vérifiés et sourcés localement au Bénin et en Afrique de l\'Ouest.', wide: false },
  { icon: '🤖', title: 'IA de pointe', desc: 'Nehanda utilise les derniers modèles de langage pour comprendre vos besoins et vous proposer les meilleures offres en temps réel.', wide: true },
  { icon: '📱', title: 'Multi-canal', desc: 'WhatsApp, Messenger, application mobile ou web — commandez de partout, sur n\'importe quel appareil.', wide: false },
  { icon: '💰', title: 'Prix transparents', desc: 'Pas de frais cachés. Comparez les prix entre vendeurs et choisissez la meilleure offre en toute confiance.', wide: false },
  { icon: '🚀', title: 'Livraison rapide', desc: 'Réseau de livreurs locaux fiables. Livraison en 2h à Cotonou, 24h dans les autres villes.', wide: false },
]

const vendorStats = [
  { val: '500+', label: 'vendeurs actifs' },
  { val: '85k',  label: 'FCFA/mois en moyenne' },
  { val: '98%',  label: 'taux de satisfaction' },
]
</script>

<style scoped>
/* ── HERO ─────────────────────────────────────────────── */
.hero {
  min-height: 100vh;
  padding: 120px 40px 80px;
  position: relative; overflow: hidden;
  background: var(--beige);
}

.hero-blob {
  position: absolute; border-radius: 50%; pointer-events: none;
}
.hero-blob-1 {
  width: 700px; height: 700px;
  top: -200px; right: -200px;
  background: radial-gradient(circle, rgba(201,150,58,0.1) 0%, transparent 70%);
}
.hero-blob-2 {
  width: 500px; height: 500px;
  bottom: -100px; left: -150px;
  background: radial-gradient(circle, rgba(198,90,46,0.07) 0%, transparent 70%);
}
.hero-grain {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

.hero-inner {
  max-width: 1280px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: center;
  position: relative; z-index: 1;
}

/* Badge */
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(201,150,58,0.1);
  border: 1px solid rgba(201,150,58,0.25);
  color: var(--gold); padding: 6px 16px; border-radius: 50px;
  font-size: 0.76rem; font-weight: 700; letter-spacing: 0.04em;
  margin-bottom: 22px;
  animation: fadeUp 0.6s ease both;
}
.badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 0 2px rgba(74,222,128,0.3);
}

/* Title */
.hero-title {
  font-size: clamp(2.6rem, 4.5vw, 4rem);
  font-weight: 900; line-height: 1.1;
  color: var(--text); margin-bottom: 22px;
  animation: fadeUp 0.6s 0.1s ease both;
}
.hero-title em {
  font-style: italic; color: var(--terra);
}

.hero-sub {
  font-size: 1.05rem; line-height: 1.75; color: var(--text-mid);
  max-width: 480px; margin-bottom: 28px;
  animation: fadeUp 0.6s 0.2s ease both;
}

/* Trust */
.hero-trust {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 32px;
  animation: fadeUp 0.6s 0.25s ease both;
}
.trust-avatars { display: flex; }
.trust-av {
  width: 30px; height: 30px; border-radius: 50%;
  border: 2px solid white;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; margin-left: -8px;
}
.trust-av:first-child { margin-left: 0; }
.trust-text { font-size: 0.8rem; color: var(--text-mid); }
.trust-text strong { color: var(--text); }
.trust-sep { margin: 0 4px; }

/* CTAs */
.hero-ctas {
  display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 24px;
  animation: fadeUp 0.6s 0.3s ease both;
}

.cta-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--terra); color: white; border: none;
  padding: 14px 26px; border-radius: 50px;
  font-size: 0.95rem; font-weight: 700;
  box-shadow: 0 6px 20px rgba(198,90,46,0.3);
  transition: all 0.2s;
}
.cta-primary:hover {
  background: var(--terra-dark); transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(198,90,46,0.38);
}
.cta-primary.large { padding: 16px 32px; font-size: 1.05rem; }

.cta-secondary {
  display: inline-flex; align-items: center;
  color: var(--terra); border: 1.5px solid rgba(198,90,46,0.3);
  padding: 14px 26px; border-radius: 50px;
  font-size: 0.95rem; font-weight: 600;
  transition: all 0.2s; background: transparent;
}
.cta-secondary:hover { border-color: var(--terra); background: var(--terra-light); }
.cta-secondary.large { padding: 16px 32px; font-size: 1.05rem; }

/* Store badges */
.store-badges {
  display: flex; gap: 10px;
  animation: fadeUp 0.6s 0.35s ease both;
}
.store-pill {
  display: flex; align-items: center; gap: 7px;
  background: var(--beige2); border: 1px solid var(--border);
  padding: 8px 16px; border-radius: 50px;
  font-size: 0.8rem; font-weight: 600; color: var(--text-mid);
  transition: all 0.2s;
}
.store-pill:hover { border-color: var(--terra); color: var(--terra); }

/* Phone mockup */
.hero-visual {
  position: relative; display: flex; justify-content: center; align-items: center;
  animation: fadeUp 0.8s 0.15s ease both;
}
.phone-glow {
  position: absolute; width: 320px; height: 320px; border-radius: 50%;
  background: radial-gradient(circle, rgba(198,90,46,0.18) 0%, transparent 70%);
  pointer-events: none;
}
.phone-wrap { position: relative; z-index: 1; }
.phone {
  width: 260px; height: 520px;
  background: #1a0f0a; border-radius: 42px;
  padding: 10px;
  box-shadow:
    0 50px 100px rgba(26,15,10,0.4),
    0 20px 40px rgba(198,90,46,0.2),
    inset 0 0 0 1px rgba(255,255,255,0.06);
}
.phone-notch {
  width: 80px; height: 24px; border-radius: 0 0 16px 16px;
  background: #1a0f0a; margin: 0 auto 8px;
}
.phone-screen {
  border-radius: 33px;
  height: calc(100% - 32px);
  overflow: hidden;
}

.phone-screenshot {
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  object-position: top;
  display: block;
}
.chat-header {
  background: var(--terra); padding: 12px 14px;
  display: flex; align-items: center; gap: 9px;
}
.chat-ava {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 0.75rem; font-weight: 900; color: white;
}
.chat-name { font-size: 0.8rem; font-weight: 700; color: white; }
.chat-status {
  font-size: 0.62rem; color: rgba(255,255,255,0.75);
  display: flex; align-items: center; gap: 4px;
}
.online-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
}
.chat-body { flex: 1; padding: 10px; display: flex; flex-direction: column; gap: 8px; overflow: hidden; }
.msg { padding: 8px 11px; border-radius: 14px; font-size: 0.68rem; line-height: 1.5; max-width: 90%; }
.msg-bot {
  background: white; color: var(--text); border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06); align-self: flex-start;
}
.msg-user {
  background: var(--terra); color: white;
  border-bottom-right-radius: 4px; align-self: flex-end;
}
.product-cards { display: flex; gap: 7px; }
.product-mini {
  background: white; border-radius: 10px; padding: 7px;
  flex: 1; box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.product-mini-img { font-size: 1.4rem; margin-bottom: 4px; }
.product-mini-name { font-size: 0.58rem; font-weight: 600; color: var(--text); }
.product-mini-price { font-size: 0.58rem; color: var(--terra); font-weight: 700; }
.chat-input-bar {
  padding: 8px 10px;
  background: white; display: flex; align-items: center; gap: 7px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
.chat-input-field {
  flex: 1; font-size: 0.65rem; color: var(--text-light);
  background: var(--beige2); border-radius: 10px; padding: 6px 9px;
}
.chat-send-btn {
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--terra);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* Float badges */
.float-badge {
  position: absolute;
  background: white; border-radius: 14px;
  padding: 10px 14px; display: flex; align-items: center; gap: 9px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  font-size: 0.72rem; font-weight: 600; color: var(--text);
  white-space: nowrap;
}
.float-badge span { font-size: 1.2rem; }
.fb-label { font-size: 0.62rem; color: var(--text-light); font-weight: 500; }
.fb-val { color: var(--terra); }
.float-badge-1 { top: 40px; right: -20px; animation: float 3.5s ease-in-out infinite; }
.float-badge-2 { bottom: 80px; left: -30px; animation: float 3.5s 1.2s ease-in-out infinite; }

/* ── PROOF BAR ─────────────────────────────────────── */
.proof-bar {
  background: var(--beige2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 20px 40px;
}
.proof-inner {
  max-width: 1280px; margin: 0 auto;
  display: flex; align-items: center; gap: 24px;
  flex-wrap: wrap;
}
.proof-label {
  font-size: 0.75rem; font-weight: 700; color: var(--text-light);
  text-transform: uppercase; letter-spacing: 0.08em; flex-shrink: 0;
}
.proof-logos { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.proof-logo { font-size: 0.88rem; font-weight: 600; color: var(--text-mid); }
.proof-sep { color: var(--border); font-size: 1.2rem; }

/* ── SECTION COMMONS ─────────────────────────────── */
.section-inner {
  max-width: 1280px; margin: 0 auto;
  padding: 0 40px;
}
.section-inner.center { text-align: center; }
.section-inner.center .section-tag { justify-content: center; }
.section-inner.center .section-tag::before { display: none; }
.section-inner h2 {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 900; color: var(--text); margin-bottom: 14px;
}
.section-sub {
  font-size: 1rem; color: var(--text-light); max-width: 520px;
  margin: 0 auto 52px; line-height: 1.7;
}

/* ── NEHANDA SECTION ─────────────────────────────── */
.nehanda-section {
  padding: 100px 40px;
  background: var(--beige);
}
.nehanda-section .section-inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 70px; align-items: center; padding: 0 40px;
}
.nehanda-text .section-tag { margin-bottom: 16px; }
.nehanda-text h2 {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 900; margin-bottom: 18px;
}
.nehanda-text h2 em { font-style: italic; color: var(--terra); }
.nehanda-desc {
  font-size: 1rem; line-height: 1.75; color: var(--text-mid);
  margin-bottom: 32px; max-width: 460px;
}
.nehanda-features { display: flex; flex-direction: column; gap: 18px; }
.neh-feat { display: flex; gap: 14px; align-items: flex-start; }
.neh-feat-icon {
  width: 40px; height: 40px; border-radius: 12px;
  background: var(--terra-light); font-size: 1.2rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.neh-feat-title { font-size: 0.92rem; font-weight: 700; color: var(--text); margin-bottom: 3px; }
.neh-feat-desc  { font-size: 0.82rem; color: var(--text-light); line-height: 1.6; }

/* Nehanda card */
.neh-card-main {
  background: white; border-radius: var(--r-xl);
  padding: 40px; text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
}
.neh-avatar-big {
  width: 90px; height: 90px; border-radius: 50%;
  /*background: var(--terra);*/
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 10px 30px rgba(198,90,46,0.35);
}
.neh-avatar-big span {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem; font-weight: 900; color: white;
}
.neh-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem; font-weight: 800; color: var(--text); margin-bottom: 6px;
}
.neh-tagline { font-size: 0.85rem; color: var(--text-light); margin-bottom: 20px; }
.neh-chips { display: flex; flex-wrap: wrap; gap: 7px; justify-content: center; margin-bottom: 28px; }
.neh-chip {
  background: var(--terra-light); color: var(--terra);
  border-radius: 50px; padding: 5px 13px;
  font-size: 0.75rem; font-weight: 600;
}
.neh-stats { display: flex; justify-content: center; gap: 30px; }
.neh-stat-val { font-size: 1.2rem; font-weight: 900; color: var(--terra); }
.neh-stat-lbl { font-size: 0.68rem; color: var(--text-light); margin-top: 2px; }

/* ── HOW SECTION ─────────────────────────────────── */
.how-section { padding: 100px 40px; background: var(--beige2); }
.how-section .section-inner { margin-bottom: 56px; }
.steps-grid {
  max-width: 1280px; margin: 0 auto; padding: 0 40px;
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 0; position: relative;
}
.step-card {
  background: white; border-radius: var(--r-lg);
  padding: 36px 28px; position: relative;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s;
}
.step-card:not(:first-child) { border-left: none; border-radius: 0 var(--r-lg) var(--r-lg) 0; }
.step-card:first-child { border-radius: var(--r-lg) 0 0 var(--r-lg); }
.step-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); z-index: 1; }
.step-num {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--terra); color: white;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(198,90,46,0.3);
  margin-bottom: 16px;
}
.step-icon { font-size: 2.2rem; margin-bottom: 14px; }
.step-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 10px;
}
.step-desc { font-size: 0.85rem; color: var(--text-light); line-height: 1.7; }
.step-arrow {
  position: absolute; right: -16px; top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem; color: var(--terra);
  z-index: 2; background: white;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

/* ── FEATURES ─────────────────────────────────────── */
.features-section { padding: 100px 40px; background: var(--beige); }
.features-section .section-inner { margin-bottom: 52px; }
.features-grid {
  max-width: 1280px; margin: 0 auto; padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
}
.feat-card {
  background: white; border-radius: var(--r-lg);
  padding: 32px 28px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative; overflow: hidden;
}
.feat-card::after {
  content: ''; position: absolute;
  bottom: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--terra), var(--gold));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s;
}
.feat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.feat-card:hover::after { transform: scaleX(1); }
.feat-card.wide { grid-column: span 2; }
.feat-icon { font-size: 2rem; margin-bottom: 14px; }
.feat-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem; font-weight: 700; color: var(--text); margin-bottom: 10px;
}
.feat-card p { font-size: 0.84rem; color: var(--text-light); line-height: 1.7; }

/* ── VENDOR ────────────────────────────────────────── */
.vendor-section {
  padding: 100px 40px;
  background: linear-gradient(135deg, var(--brown-deep) 0%, var(--brown) 60%, var(--terra-dark) 100%);
}
.vendor-inner {
  max-width: 1280px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 64px; align-items: center;
}
.vendor-text .section-tag { margin-bottom: 14px; }
.vendor-text h2 { margin-bottom: 16px; font-size: clamp(1.8rem, 3vw, 2.4rem); }
.vendor-text p {
  font-size: 1rem; line-height: 1.75;
  color: rgba(255,255,255,0.65); margin-bottom: 32px; max-width: 420px;
}
.vendor-stats { display: flex; gap: 36px; margin-bottom: 36px; }
.vs-item { }
.vs-val {
  font-size: 1.6rem; font-weight: 900; color: var(--gold-light);
  font-family: 'Playfair Display', serif;
}
.vs-lbl { font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 3px; }
.cta-vendor {
  background: var(--gold); color: white; border: none;
  padding: 14px 28px; border-radius: 50px;
  font-size: 0.95rem; font-weight: 700;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  transition: all 0.2s;
}
.cta-vendor:hover { background: var(--gold-light); color: var(--brown-deep); transform: translateY(-2px); }

.vendor-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--r-xl); padding: 36px;
  text-align: center;
}
.vendor-avatar { font-size: 3.5rem; margin-bottom: 12px; }
.vendor-card-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem; font-weight: 700; color: white; margin-bottom: 4px;
}
.vendor-card-loc { font-size: 0.8rem; color: rgba(255,255,255,0.55); margin-bottom: 24px; }
.vendor-card-stats {
  display: flex; justify-content: center; gap: 28px; margin-bottom: 20px;
}
.vc-stat { text-align: center; }
.vc-stat strong {
  display: block; font-size: 1.2rem; font-weight: 800;
  color: var(--gold-light);
}
.vc-stat span { font-size: 0.7rem; color: rgba(255,255,255,0.5); }
.vendor-card-tag {
  font-size: 0.75rem; font-weight: 700; color: #4ade80;
  background: rgba(74,222,128,0.1);
  padding: 5px 14px; border-radius: 50px; display: inline-block;
}

/* ── DOWNLOAD ─────────────────────────────────────── */
.download-section {
  padding: 100px 40px;
  background: var(--beige2);
}
.dl-inner {
  max-width: 1280px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr auto;
  gap: 64px; align-items: center;
}
.dl-text { text-align: center; }
.dl-text h2 {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 900; margin-bottom: 14px;
}
.dl-text p {
  font-size: 1rem; color: var(--text-light); line-height: 1.7;
  margin-bottom: 32px; max-width: 440px; margin-left: auto; margin-right: auto;
}
.dl-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.dl-text .section-tag { justify-content: center; }
.dl-text .section-tag::before { display: none; }

.dl-phone-stack { position: relative; width: 200px; height: 340px; }
.dl-phone {
  position: absolute;
  width: 180px; height: 320px;
  background: var(--brown-deep); border-radius: 32px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.3);
}
.dl-phone-front {
  top: 20px; left: 20px; z-index: 1;
  background: white;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 20px 50px rgba(125,38,15,0.2);
}
.dl-phone-screen { text-align: center; padding: 20px; }
.dl-rating { font-size: 1rem; letter-spacing: 2px;   display: flex;
  justify-content: center;
  gap: 2px;}

/* ── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .features-grid { grid-template-columns: 1fr 1fr; }
  .feat-card.wide { grid-column: span 2; }
  .steps-grid { grid-template-columns: 1fr; gap: 16px; }
  .step-card { border-radius: var(--r-lg) !important; border-left: 1px solid var(--border) !important; }
  .step-arrow { display: none; }
}

@media (max-width: 900px) {
  .hero { padding: 100px 24px 60px; }
  .hero-inner { grid-template-columns: 1fr; gap: 50px; }
  .hero-visual { order: -1; }
  .hero-title { font-size: 2.2rem; }
  .nehanda-section { padding: 70px 24px; }
  .nehanda-section .section-inner { grid-template-columns: 1fr; gap: 48px; }
  .how-section { padding: 70px 24px; }
  .how-section .section-inner, .steps-grid { padding: 0 24px; }
  .features-section { padding: 70px 24px; }
  .features-grid { grid-template-columns: 1fr; padding: 0 24px; }
  .feat-card.wide { grid-column: span 1; }
  .vendor-section { padding: 70px 24px; }
  .vendor-inner { grid-template-columns: 1fr; gap: 40px; }
  .download-section { padding: 70px 24px; }
  .dl-inner { grid-template-columns: 1fr; }
  .dl-phone-stack { display: none; }
  .proof-bar { padding: 16px 24px; }
  .float-badge-1 { right: -10px; top: 20px; }
  .float-badge-2 { left: -10px; }
}

@media (max-width: 560px) {
  .hero-ctas { flex-direction: column; }
  .cta-primary, .cta-secondary { width: 100%; justify-content: center; text-align: center; }
  .vendor-stats { gap: 20px; flex-wrap: wrap; }
  .hero-badge { font-size: 0.68rem; }
}
</style>