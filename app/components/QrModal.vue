<!-- app/components/QrModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="qrModalOpen" class="modal-overlay" @click.self="closeQrModal">
        <div class="modal-box">
          <button class="modal-close" @click="closeQrModal" aria-label="Fermer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="modal-icon">📱</div>
          <h3>Télécharger Tôswè Africa</h3>
          <p>Scannez le QR code avec votre téléphone pour télécharger l'application.</p>

          <!-- QR code placeholder — remplacer par un vrai QR -->
          <div class="qr-wrap">
            <div class="qr-placeholder">
              <div class="qr-grid">
                <div v-for="i in 49" :key="i" :class="['qr-cell', qrPattern.includes(i) ? 'on' : 'off']" />
              </div>
              <div class="qr-logo">
                <span>Nɔ</span>
              </div>
            </div>
          </div>

          <div class="store-links">
            <a :href="PLAY_STORE" target="_blank" class="store-btn android">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76a2 2 0 01-1.18-1.8V2.04A2 2 0 013.18.28l12.04 11.74-12.04 11.74zm14.16-13.5l2.76-1.6a1 1 0 010 1.68l-2.76-1.6-2.1-2.04 2.1-2.04zm-1.4 1.26L4.38 22.84l9.84-5.68 1.72-1.64zM4.38 1.16l11.56 11.32-1.72-1.64L4.38 1.16z"/></svg>
              Google Play
            </a>
            <a :href="APP_STORE" target="_blank" class="store-btn ios">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              App Store
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const { qrModalOpen, closeQrModal } = useDownload()

const PLAY_STORE = 'https://play.google.com/store/apps/details?id=africa.toswe.app'
const APP_STORE  = 'https://apps.apple.com/app/toswe-africa/id000000000'

// Pattern décoratif pour simuler un QR
const qrPattern = [1,2,3,4,5,6,7,9,13,15,21,22,23,24,25,26,27,29,33,35,
  36,38,40,43,44,45,46,47,48,49,2,6,8,14,20,28,34,37,39,42,16,17,18,19,30,31,32,10,11,12]
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 999;
  background: rgba(26, 15, 10, 0.6);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.modal-box {
  background: var(--beige);
  border-radius: var(--r-xl);
  padding: 40px 36px;
  width: 100%; max-width: 400px;
  text-align: center;
  position: relative;
  box-shadow: 0 40px 80px rgba(0,0,0,0.25);
}
.modal-close {
  position: absolute; top: 16px; right: 16px;
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--beige2); border: none;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-mid); transition: background 0.2s;
}
.modal-close:hover { background: var(--border); }
.modal-icon { font-size: 2.5rem; margin-bottom: 14px; }
h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem; font-weight: 800;
  color: var(--text); margin-bottom: 8px;
}
p { font-size: 0.88rem; color: var(--text-light); line-height: 1.65; margin-bottom: 24px; }

/* QR placeholder */
.qr-wrap {
  display: flex; justify-content: center; margin-bottom: 24px;
}
.qr-placeholder {
  width: 160px; height: 160px;
  border: 2px solid var(--border);
  border-radius: 14px; padding: 12px;
  position: relative; background: white;
}
.qr-grid {
  display: grid; grid-template-columns: repeat(7, 1fr);
  gap: 2px; width: 100%; height: 100%;
}
.qr-cell { border-radius: 1px; }
.qr-cell.on  { background: var(--brown-deep); }
.qr-cell.off { background: transparent; }
.qr-logo {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.qr-logo span {
  background: var(--terra);
  color: white;
  font-family: 'Playfair Display', serif;
  font-size: 0.85rem; font-weight: 900;
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  border: 3px solid white;
}

/* Store buttons */
.store-links { display: flex; gap: 10px; justify-content: center; }
.store-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px; border-radius: 12px;
  font-size: 0.82rem; font-weight: 700;
  transition: transform 0.2s, box-shadow 0.2s;
}
.store-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.store-btn.android {
  background: var(--terra); color: white;
}
.store-btn.ios {
  background: var(--text); color: white;
}

/* Transitions */
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s, transform 0.25s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-box, .modal-leave-to .modal-box {
  transform: scale(0.92) translateY(16px);
}
</style>