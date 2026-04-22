// app/composables/useDownload.ts

export function useDownload() {
  const PLAY_STORE  = 'https://play.google.com/store/apps/details?id=africa.toswe.app'
  const APP_STORE   = 'https://apps.apple.com/app/toswe-africa/id000000000'
  const FALLBACK    = 'https://play.google.com/store/apps/details?id=africa.toswe.app'

  function getStoreUrl(): string {
    if (typeof navigator === 'undefined') return FALLBACK
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) return APP_STORE
    if (/android/.test(ua))          return PLAY_STORE
    // Desktop → show modal or redirect to Play Store as default
    return FALLBACK
  }

  function isDesktop(): boolean {
    if (typeof navigator === 'undefined') return true
    const ua = navigator.userAgent.toLowerCase()
    return !/android|iphone|ipad|ipod|mobile/.test(ua)
  }

  function download() {
    if (isDesktop()) {
      // On desktop, show QR modal
      showQrModal()
    } else {
      window.open(getStoreUrl(), '_blank')
    }
  }

  // Global modal state
  const qrModalOpen = useState<boolean>('qrModalOpen', () => false)

  function showQrModal()  { qrModalOpen.value = true  }
  function closeQrModal() { qrModalOpen.value = false }

  return { download, showQrModal, closeQrModal, qrModalOpen, isDesktop }
}