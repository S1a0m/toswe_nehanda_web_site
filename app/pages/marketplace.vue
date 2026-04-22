<!-- app/pages/marketplace.vue -->
<template>
  <main class="marketplace">
    <QrModal />

    <!-- ── HERO ──────────────────────────────────────── -->
    <section class="mp-hero">
      <div class="mp-hero-inner">
        <div class="section-tag">Marketplace</div>
        <h1>Tous vos produits<br><em>locaux au même endroit</em></h1>
        <p class="mp-sub">
          Des milliers de produits vérifiés, directement depuis les vendeurs locaux.
          Trouvez ce dont vous avez besoin, livré chez vous.
        </p>
        <!-- Search bar -->
        <div class="search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un produit, une boutique…"
            @input="debouncedSearch"
          />
          <button v-if="searchQuery" class="search-clear" @click="clearSearch">✕</button>
        </div>
      </div>
    </section>

    <!-- ── CATEGORIES ─────────────────────────────────── -->
    <section class="cats-section">
      <div class="cats-inner">
        <div class="cats-scroll">
          <button
            v-for="cat in allCategories"
            :key="cat.id"
            :class="['cat-chip', { active: selectedCat === cat.id }]"
            @click="selectCategory(cat.id)"
          >
            {{ cat.icon }} {{ cat.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- ── PRODUCTS ───────────────────────────────────── -->
    <section class="products-section">
      <div class="products-inner">
        <!-- Header -->
        <div class="products-header">
          <div>
            <h2>
              {{ currentCatName }}
              <span v-if="!loadingProducts" class="count-badge">{{ filteredProducts.length }} produits</span>
            </h2>
          </div>
          <div class="sort-row">
            <select v-model="sortBy" class="sort-select">
              <option value="recent">Plus récents</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loadingProducts" class="grid-loading">
          <div v-for="i in 8" :key="i" class="product-skel" />
        </div>

        <!-- Empty -->
        <div v-else-if="filteredProducts.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Aucun produit trouvé</h3>
          <p>Essayez une autre catégorie ou modifiez votre recherche.</p>
          <button class="cta-primary" @click="clearSearch(); selectCategory(null)">
            Voir tous les produits
          </button>
        </div>

        <!-- Grid -->
        <div v-else class="products-grid">
          <div
            v-for="product in sortedProducts"
            :key="product.id"
            class="product-card"
            @click="onProductClick(product)"
          >
            <!-- Badge -->
            <div v-if="product.badge" class="product-badge" :class="product.badge.type">
              {{ product.badge.label }}
            </div>
            <!-- Image -->
            <div class="product-img" :style="{ background: product.gradient }">
              <img
                v-if="product.main_image?.image"
                :src="product.main_image.image"
                :alt="product.name"
                loading="lazy"
                @error="(e) => e.target.style.display = 'none'"
              />
              <span v-else class="product-emoji">{{ product.emoji || '📦' }}</span>
            </div>
            <!-- Info -->
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-desc">{{ product.short_description }}</div>
              <div class="product-footer">
                <div class="product-price">
                  {{ formatPrice(product.price) }}
                  <span>FCFA</span>
                </div>
                <div v-if="product.total_rating?.count > 0" class="product-rating">
                  ⭐ {{ product.total_rating.average }}
                </div>
              </div>
              <button class="btn-order" @click.stop="onProductClick(product)">
                Commander
              </button>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <div v-if="canLoadMore && !loadingProducts" class="load-more">
          <button class="btn-load" :disabled="loadingMore" @click="loadMore">
            <span v-if="loadingMore" class="spinner" />
            <span v-else>Charger plus de produits</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ── VENDORS ────────────────────────────────────── -->
    <section class="vendors-section">
      <div class="vendors-inner">
        <div class="vendors-header">
          <div class="section-tag">Boutiques</div>
          <h2>Vendeurs populaires</h2>
          <p class="vendors-sub">Découvrez les boutiques les plus appréciées de notre plateforme.</p>
        </div>

        <!-- Loading -->
        <div v-if="loadingVendors" class="vendors-loading">
          <div v-for="i in 4" :key="i" class="vendor-skel" />
        </div>

        <div v-else class="vendors-grid">
          <div
            v-for="vendor in vendors"
            :key="vendor.id"
            class="vendor-card"
            @click="onVendorClick(vendor)"
          >
            <div class="vendor-header-row">
              <div class="vendor-avatar">
                <img
                  v-if="vendor.logo"
                  :src="vendor.logo"
                  :alt="vendor.shop_name"
                  @error="(e) => e.target.style.display = 'none'"
                />
                <span v-else class="vendor-initial">{{ vendor.shop_name?.[0] || '🏪' }}</span>
              </div>
              <div class="vendor-info">
                <div class="vendor-name">{{ vendor.shop_name }}</div>
                <div class="vendor-loc">📍 {{ vendor.city || 'Bénin' }}</div>
              </div>
              <div class="vendor-verified">✓</div>
            </div>
            <div class="vendor-products">
              <div class="vendor-products-grid">
                <div
                  v-for="(p, pi) in (vendor.preview_products || []).slice(0, 3)"
                  :key="pi"
                  class="vendor-product-thumb"
                  :style="{ background: gradients[pi % gradients.length] }"
                >
                  <img v-if="p.main_image?.image" :src="p.main_image.image" :alt="p.name" />
                  <span v-else>{{ p.emoji || '📦' }}</span>
                </div>
              </div>
            </div>
            <div class="vendor-footer">
              <div class="vendor-stats-row">
                <div class="vendor-stat">
                  <strong>{{ vendor.product_count || '—' }}</strong>
                  <span>produits</span>
                </div>
                <div class="vendor-stat">
                  <strong>{{ vendor.rating || '4.8' }}★</strong>
                  <span>note</span>
                </div>
              </div>
              <button class="btn-shop">Voir la boutique</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── DOWNLOAD CTA ───────────────────────────────── -->
    <section class="mp-cta">
      <div class="mp-cta-inner">
        <div class="mp-cta-icon">📱</div>
        <h2>Commandez via l'application</h2>
        <p>
          Obtenez une meilleure expérience avec l'app Tôswè Africa.
          Discutez avec Nehanda, suivez vos commandes et payez en un clic.
        </p>
        <div class="mp-cta-btns">
          <button class="cta-primary large" @click="download">
            Télécharger l'app gratuitement
          </button>
          <NuxtLink to="/" class="cta-secondary large">
            En savoir plus sur Tôswè →
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const { download } = useDownload()

// ── Config ─────────────────────────────────────────────
const API_BASE = 'http://127.0.0.1:8000/api'

const gradients = [
  'linear-gradient(135deg,#ffecd2,#ffcba0)',
  'linear-gradient(135deg,#ffd6d6,#f5a0a0)',
  'linear-gradient(135deg,#fff0c0,#f5c842)',
  'linear-gradient(135deg,#d4f5e8,#7bc47e)',
  'linear-gradient(135deg,#dde8ff,#93b4fc)',
  'linear-gradient(135deg,#f5e8d4,#d4a870)',
]

const emojiByCategory = {
  'huile': '🫒', 'épice': '🌶️', 'légume': '🥬', 'tomate': '🍅',
  'arachide': '🥜', 'poisson': '🐟', 'volaille': '🍗', 'cosmétique': '🧴',
  'artisanat': '🧶', 'vêtement': '👗', 'default': '📦',
}

function getEmoji(name = '') {
  const n = name.toLowerCase()
  for (const [key, em] of Object.entries(emojiByCategory)) {
    if (n.includes(key)) return em
  }
  return emojiByCategory.default
}

function getBadge(product) {
  if (product.is_sponsored) return { type: 'sponsored', label: '✦ Sponsorisé' }
  if (product.status === 'promo') return { type: 'promo',     label: '🔥 Promo'     }
  if (product.status === 'new')   return { type: 'new',       label: '🆕 Nouveau'   }
  if (product.status === 'popular') return { type: 'popular', label: '⭐ Populaire' }
  return null
}

function formatPrice(p) {
  return Number(p).toLocaleString('fr-FR')
}

// ── State ──────────────────────────────────────────────
const searchQuery    = ref('')
const selectedCat    = ref(null)
const sortBy         = ref('recent')
const products       = ref([])
const categories     = ref([])
const vendors        = ref([])
const loadingProducts= ref(true)
const loadingVendors = ref(true)
const loadingMore    = ref(false)
const page           = ref(1)
const canLoadMore    = ref(false)

// ── Computed ───────────────────────────────────────────
const allCategories = computed(() => [
  { id: null, name: 'Tout', icon: '🛒' },
  ...categories.value,
])

const currentCatName = computed(() => {
  if (!selectedCat.value) return 'Tous les produits'
  const c = categories.value.find(c => c.id === selectedCat.value)
  return c ? c.name : 'Produits'
})

const filteredProducts = computed(() => {
  let list = products.value
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.short_description || '').toLowerCase().includes(q)
    )
  }
  return list
})

const sortedProducts = computed(() => {
  const list = [...filteredProducts.value]
  if (sortBy.value === 'price_asc')  return list.sort((a,b) => a.price - b.price)
  if (sortBy.value === 'price_desc') return list.sort((a,b) => b.price - a.price)
  return list // recent = API order
})

// ── Data fetching ──────────────────────────────────────
async function fetchCategories() {
  try {
    const data = await $fetch(`${API_BASE}/category/`)
    const list = Array.isArray(data) ? data : (data.results || [])
    categories.value = list.map(c => ({ ...c, icon: '📦' }))
  } catch { categories.value = [] }
}

async function fetchProducts(reset = true) {
  if (reset) {
    loadingProducts.value = true
    page.value = 1
  } else {
    loadingMore.value = true
  }
  try {
    const params = new URLSearchParams()
    if (selectedCat.value) params.set('category', selectedCat.value)
    params.set('page', page.value)

    const data = await $fetch(`${API_BASE}/product/suggestions/?${params}`)
    const list  = Array.isArray(data) ? data : (data.results || [])
    const next  = Array.isArray(data) ? null : (data.next || null)

    const enriched = list.map((p, i) => ({
      ...p,
      emoji:    getEmoji(p.name),
      gradient: gradients[i % gradients.length],
      badge:    getBadge(p),
    }))

    if (reset) {
      products.value = enriched
    } else {
      products.value = [...products.value, ...enriched]
    }
    canLoadMore.value = !!next
  } catch {
    if (reset) products.value = []
  } finally {
    loadingProducts.value = false
    loadingMore.value = false
  }
}

async function fetchVendors() {
  loadingVendors.value = true
  try {
    // Utilise l'endpoint products avec seller pour reconstruire les vendeurs
    const data = await $fetch(`${API_BASE}/product/suggestions/?page_size=20`)
    const list  = Array.isArray(data) ? data : (data.results || [])

    // Déduplique par seller_id
    const seen = new Set()
    const vendorMap = {}
    list.forEach(p => {
      const sid = p.shop_id || p.seller_id
      if (!seen.has(sid)) {
        seen.add(sid)
        vendorMap[sid] = {
          id: sid,
          shop_name: `Boutique ${sid}`,
          city: 'Bénin',
          rating: '4.8',
          product_count: 0,
          preview_products: [],
          logo: null,
        }
      }
      if (vendorMap[sid].preview_products.length < 3) {
        vendorMap[sid].preview_products.push(p)
      }
      vendorMap[sid].product_count++
    })
    vendors.value = Object.values(vendorMap).slice(0, 8)
  } catch {
    vendors.value = []
  } finally {
    loadingVendors.value = false
  }
}

async function loadMore() {
  page.value++
  await fetchProducts(false)
}

// ── Actions ────────────────────────────────────────────
function selectCategory(id) {
  selectedCat.value = id
  searchQuery.value = ''
  fetchProducts(true)
}

function clearSearch() {
  searchQuery.value = ''
}

let searchTimer = null
function debouncedSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    // Filter is computed locally — no API call needed for search
  }, 300)
}

function onProductClick(product) {
  download()
}

function onVendorClick(vendor) {
  download()
}

// ── Init ───────────────────────────────────────────────
onMounted(async () => {
  await fetchCategories()
  await Promise.all([fetchProducts(true), fetchVendors()])
})
</script>

<style scoped>
.marketplace { background: var(--beige); }

/* ── HERO ─────────────────────────────────────────── */
.mp-hero {
  background: linear-gradient(135deg, var(--brown-deep) 0%, var(--brown) 100%);
  padding: 120px 40px 80px;
  position: relative; overflow: hidden;
}
.mp-hero::before {
  content: ''; position: absolute; top: -100px; right: -100px;
  width: 500px; height: 500px; border-radius: 50%;
  background: rgba(255,255,255,0.04); pointer-events: none;
}
.mp-hero-inner { max-width: 800px; margin: 0 auto; text-align: center; }
.mp-hero-inner .section-tag { justify-content: center; color: var(--gold-light); margin-bottom: 16px; }
.mp-hero-inner .section-tag::before { background: var(--gold-light); }

h1 {
  font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900;
  color: white; margin-bottom: 16px; line-height: 1.1;
}
h1 em { font-style: italic; color: var(--gold-light); }
.mp-sub {
  font-size: 1.05rem; color: rgba(255,255,255,0.65);
  line-height: 1.75; margin-bottom: 36px; max-width: 560px; margin-left: auto; margin-right: auto;
}

/* Search */
.search-bar {
  display: flex; align-items: center; gap: 12px;
  background: white; border-radius: 50px;
  padding: 14px 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  max-width: 600px; margin: 0 auto;
}
.search-bar svg { color: var(--text-light); flex-shrink: 0; }
.search-bar input {
  flex: 1; border: none; outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem; color: var(--text); background: transparent;
}
.search-bar input::placeholder { color: var(--text-light); }
.search-clear {
  background: none; border: none;
  font-size: 0.85rem; color: var(--text-light);
  cursor: pointer; flex-shrink: 0; padding: 2px 6px;
}

/* ── CATEGORIES ─────────────────────────────────── */
.cats-section {
  background: var(--beige2);
  border-bottom: 1px solid var(--border);
  position: sticky; top: 70px; z-index: 50;
}
.cats-inner { max-width: 1280px; margin: 0 auto; padding: 0 40px; }
.cats-scroll {
  display: flex; gap: 8px; overflow-x: auto; padding: 14px 0;
  scrollbar-width: none;
}
.cats-scroll::-webkit-scrollbar { display: none; }
.cat-chip {
  display: flex; align-items: center; gap: 6px;
  background: white; border: 1.5px solid var(--border);
  border-radius: 50px; padding: 8px 16px;
  font-size: 0.82rem; font-weight: 600; color: var(--text-mid);
  white-space: nowrap; flex-shrink: 0;
  cursor: pointer; transition: all 0.2s;
  box-shadow: var(--shadow-sm);
}
.cat-chip.active {
  background: var(--terra); border-color: var(--terra);
  color: white; box-shadow: 0 4px 14px rgba(198,90,46,0.3);
}
.cat-chip:not(.active):hover { border-color: var(--terra); color: var(--terra); }

/* ── PRODUCTS ───────────────────────────────────── */
.products-section { padding: 48px 0 80px; }
.products-inner { max-width: 1280px; margin: 0 auto; padding: 0 40px; }

.products-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px; flex-wrap: wrap; gap: 14px;
}
.products-header h2 {
  font-size: 1.4rem; font-weight: 800; color: var(--text);
  display: flex; align-items: center; gap: 10px;
}
.count-badge {
  background: var(--terra-light); color: var(--terra);
  font-size: 0.72rem; font-weight: 700; font-family: 'DM Sans', sans-serif;
  padding: 3px 10px; border-radius: 50px;
}
.sort-select {
  border: 1.5px solid var(--border); border-radius: 10px;
  padding: 8px 12px; font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem; color: var(--text-mid); background: white;
  cursor: pointer; outline: none;
}

/* Skeleton */
.grid-loading {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
}
.product-skel {
  height: 300px; border-radius: var(--r-lg);
  background: linear-gradient(90deg, var(--beige2) 25%, var(--beige) 50%, var(--beige2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

/* Product grid */
.products-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
}

.product-card {
  background: white; border-radius: var(--r-lg);
  overflow: hidden; cursor: pointer;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s, box-shadow 0.25s;
  position: relative;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.product-badge {
  position: absolute; top: 10px; left: 10px; z-index: 2;
  font-size: 0.65rem; font-weight: 700; padding: 3px 10px;
  border-radius: 50px;
}
.product-badge.sponsored { background: rgba(255,255,255,0.92); color: var(--gold); }
.product-badge.promo     { background: rgba(255,255,255,0.92); color: #e65100; }
.product-badge.new       { background: rgba(255,255,255,0.92); color: var(--terra); }
.product-badge.popular   { background: rgba(255,255,255,0.92); color: #2e7d32; }

.product-img {
  height: 160px; display: flex; align-items: center; justify-content: center;
  overflow: hidden; position: relative;
}
.product-img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.4s;
}
.product-card:hover .product-img img { transform: scale(1.06); }
.product-emoji { font-size: 3rem; }

.product-info { padding: 14px 16px 16px; }
.product-name {
  font-size: 0.9rem; font-weight: 700; color: var(--text);
  margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.product-desc {
  font-size: 0.75rem; color: var(--text-light);
  margin-bottom: 10px; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.product-footer {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 11px;
}
.product-price {
  font-size: 1rem; font-weight: 900; color: var(--terra);
}
.product-price span { font-size: 0.7rem; font-weight: 400; color: var(--text-light); }
.product-rating { font-size: 0.72rem; color: var(--text-light); font-weight: 600; }

.btn-order {
  width: 100%; padding: 9px;
  background: var(--terra); color: white; border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 700;
  transition: background 0.2s;
}
.btn-order:hover { background: var(--terra-dark); }

/* Load more */
.load-more { text-align: center; padding-top: 40px; }
.btn-load {
  background: white; border: 1.5px solid var(--border);
  color: var(--text-mid); padding: 13px 30px;
  border-radius: 50px; font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-load:hover { border-color: var(--terra); color: var(--terra); }
.btn-load:disabled { opacity: 0.6; cursor: not-allowed; }
.spinner {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2px solid var(--border); border-top-color: var(--terra);
  animation: spin 0.7s linear infinite;
}

/* Empty state */
.empty-state { text-align: center; padding: 80px 20px; }
.empty-icon { font-size: 3rem; margin-bottom: 16px; }
.empty-state h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem; font-weight: 700; color: var(--text); margin-bottom: 8px;
}
.empty-state p { font-size: 0.9rem; color: var(--text-light); margin-bottom: 24px; }

/* ── VENDORS ────────────────────────────────────── */
.vendors-section {
  padding: 80px 0;
  background: var(--beige2);
}
.vendors-inner { max-width: 1280px; margin: 0 auto; padding: 0 40px; }
.vendors-header { text-align: center; margin-bottom: 48px; }
.vendors-header .section-tag { justify-content: center; }
.vendors-header .section-tag::before { display: none; }
.vendors-header h2 { font-size: 1.8rem; font-weight: 900; margin-bottom: 10px; }
.vendors-sub { font-size: 0.9rem; color: var(--text-light); }

/* Skeleton */
.vendors-loading { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.vendor-skel {
  height: 240px; border-radius: var(--r-lg);
  background: linear-gradient(90deg, var(--beige) 25%, white 50%, var(--beige) 75%);
  background-size: 200% 100%; animation: shimmer 1.4s infinite;
}

.vendors-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

.vendor-card {
  background: white; border-radius: var(--r-lg);
  padding: 20px; cursor: pointer;
  border: 1px solid var(--border); box-shadow: var(--shadow-sm);
  transition: transform 0.25s, box-shadow 0.25s;
}
.vendor-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }

.vendor-header-row {
  display: flex; align-items: center; gap: 11px; margin-bottom: 16px;
}
.vendor-avatar {
  width: 44px; height: 44px; border-radius: 13px;
  background: var(--terra-light); overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 0.7rem; font-weight: 700; color: var(--terra);
}
.vendor-avatar img { width: 100%; height: 100%; object-fit: cover; }
.vendor-initial { font-size: 1.1rem; }
.vendor-info { flex: 1; min-width: 0; }
.vendor-name { font-size: 0.88rem; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.vendor-loc  { font-size: 0.68rem; color: var(--text-light); margin-top: 2px; }
.vendor-verified {
  width: 20px; height: 20px; border-radius: 50%;
  background: #4ade80; color: white;
  font-size: 0.65rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.vendor-products { margin-bottom: 14px; }
.vendor-products-grid { display: flex; gap: 6px; }
.vendor-product-thumb {
  flex: 1; height: 56px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; font-size: 1.4rem;
}
.vendor-product-thumb img { width: 100%; height: 100%; object-fit: cover; }

.vendor-footer { display: flex; align-items: center; justify-content: space-between; }
.vendor-stats-row { display: flex; gap: 16px; }
.vendor-stat { text-align: center; }
.vendor-stat strong { display: block; font-size: 0.9rem; font-weight: 800; color: var(--text); }
.vendor-stat span { font-size: 0.65rem; color: var(--text-light); }
.btn-shop {
  background: var(--terra-light); color: var(--terra);
  border: none; padding: 7px 14px; border-radius: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 700;
  cursor: pointer; transition: background 0.2s;
}
.btn-shop:hover { background: var(--terra); color: white; }

/* ── DOWNLOAD CTA ────────────────────────────────── */
.mp-cta {
  padding: 100px 40px;
  background: linear-gradient(135deg, var(--brown-deep), var(--terra-dark));
  text-align: center;
}
.mp-cta-inner { max-width: 640px; margin: 0 auto; }
.mp-cta-icon { font-size: 3rem; margin-bottom: 20px; }
.mp-cta-inner h2 {
  font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900;
  color: white; margin-bottom: 14px;
}
.mp-cta-inner p {
  font-size: 1rem; color: rgba(255,255,255,0.65);
  line-height: 1.75; margin-bottom: 36px;
}
.mp-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.mp-cta-btns .cta-secondary { border-color: rgba(255,255,255,0.3); color: rgba(255,255,255,0.85); }
.mp-cta-btns .cta-secondary:hover { background: rgba(255,255,255,0.1); border-color: white; }

/* ── RESPONSIVE ─────────────────────────────────── */
@media (max-width: 1100px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); }
  .grid-loading  { grid-template-columns: repeat(3, 1fr); }
  .vendors-grid  { grid-template-columns: repeat(2, 1fr); }
  .vendors-loading { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .mp-hero { padding: 100px 24px 60px; }
  .cats-inner { padding: 0 24px; }
  .products-inner { padding: 0 24px; }
  .vendors-inner  { padding: 0 24px; }
  .products-grid  { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .grid-loading   { grid-template-columns: repeat(2, 1fr); }
  .mp-cta { padding: 70px 24px; }
}
@media (max-width: 480px) {
  .products-grid { grid-template-columns: 1fr; }
  .grid-loading  { grid-template-columns: 1fr; }
  .vendors-grid  { grid-template-columns: 1fr; }
  .vendors-loading { grid-template-columns: 1fr; }
  .mp-cta-btns   { flex-direction: column; align-items: center; }
}
</style>