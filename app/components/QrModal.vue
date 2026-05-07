<!-- app/components/QrModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="qrModalOpen" class="modal-overlay" @click.self="closeQrModal">
        <div class="modal-box">
          <button class="modal-close" @click="closeQrModal" aria-label="Fermer">
            <X :size="16" stroke-width="2.5" />
          </button>

          <div class="modal-icon">
            <Smartphone :size="28" stroke-width="1.5" />
          </div>
          <h3>Télécharger Tôswè Africa</h3>
          <p>Scannez le QR code pour télécharger l'app, ou discutez directement avec Nehanda sur Messenger.</p>

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
              <Smartphone :size="18" stroke-width="2" />
              sur Google Play
            </a>
            <a :href="MESSENGER" target="_blank" class="store-btn messenger">
              <MessageCircle :size="18" stroke-width="2" />
              sur Messenger
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { Smartphone, MessageCircle, X } from 'lucide-vue-next'
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
.modal-icon {
  width: 56px; height: 56px;
  border-radius: var(--r-md);
  background: var(--terra-light);
  color: var(--terra);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}
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
  background: var(--terra);
  color: white;
}

.store-btn.messenger {
  background: var(--text);
  color: white;
}

/* Transitions */
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s, transform 0.25s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-box, .modal-leave-to .modal-box {
  transform: scale(0.92) translateY(16px);
}
</style>