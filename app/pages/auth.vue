<template>
  <main class="auth-page">
    <div class="auth-card">

      <!-- Loading -->
      <div v-if="status === 'loading'" class="auth-state">
        <div class="spinner" />
        <p>Connexion en cours…</p>
      </div>

      <!-- Choisir un pseudo -->
      <div v-else-if="status === 'choose_username'" class="auth-state">
        <div class="auth-icon success">
          <CheckCircle :size="36" />
        </div>
        <h2>Bienvenue sur Tôswè 🎉</h2>
        <p>Choisis un pseudo avant de continuer.</p>
        <input
          v-model="username"
          type="text"
          placeholder="Ton pseudo..."
          class="username-input"
          maxlength="20"
        />
        <button
          class="btn btn-primary"
          :disabled="username.trim().length < 3"
          @click="confirmUsername"
        >
          Continuer
        </button>
      </div>

      <!-- Succès -->
      <div v-else-if="status === 'success'" class="auth-state">
        <div class="auth-icon success">
          <CheckCircle :size="36" />
        </div>
        <h2>Connexion réussie !</h2>
        <p>Vous allez être redirigé vers l'application.</p>
        <p class="auth-hint">
          Si l'app ne s'ouvre pas automatiquement,
          <a :href="deepLink">cliquez ici</a>.
        </p>
      </div>

      <!-- Erreur -->
      <div v-else-if="status === 'error'" class="auth-state">
        <div class="auth-icon error">
          <XCircle :size="36" />
        </div>
        <h2>Lien invalide ou expiré</h2>
        <p>{{ errorMessage }}</p>
        <NuxtLink to="/" class="btn btn-primary" style="margin-top: 20px;">
          Retour à l'accueil
        </NuxtLink>
      </div>

    </div>
  </main>
</template>

<script setup>
definePageMeta({ ssr: false })

const status       = ref('loading')
const username     = ref('')
const tokenTemp    = ref('')
const userTemp     = ref(null)
const deepLink     = ref('')
const errorMessage = ref('')

const API_BASE = 'https://toswe-africa.store/api/user'

onMounted(async () => {
  // ✅ Bypass total de route.query — on lit l'URL brute directement
  // Nuxt peut ne pas avoir hydraté route.query à ce stade après un 301
  const params = new URLSearchParams(window.location.search)
  const email  = params.get('email')
  const otp    = params.get('otp')

  console.log("window.location.href:", window.location.href)
  console.log("window.location.search:", window.location.search)
  console.log("Email:", email, "OTP:", otp)

  if (!email || !otp) {
    status.value       = 'error'
    errorMessage.value = 'Lien incomplet ou malformé.'
    return
  }

  try {
    const data = await $fetch(`${API_BASE}/confirm_connexion/`, {
      method: 'POST',
      body: { email, otp },
    })

    tokenTemp.value = data.access
    userTemp.value  = data.user

    if (!data.user.username) {
      status.value = 'choose_username'
    } else {
      _redirect(data.access, data.user)
    }

  } catch (err) {
    console.error("Erreur API:", err)
    status.value       = 'error'
    errorMessage.value = err?.data?.detail || 'Code incorrect ou expiré.'
  }
})

function _redirect(token, user) {
  console.log("User encodé dans deep link:", JSON.stringify(user))
  const encoded  = encodeURIComponent(JSON.stringify(user))
  deepLink.value = `toswe://auth?token=${token}&user=${encoded}`
  status.value   = 'success'
  setTimeout(() => { window.location.href = deepLink.value }, 1000)
}

async function confirmUsername() {
  if (username.value.trim().length < 3) return
  try {
    await $fetch(`${API_BASE}/update_me/`, {
      method:  'POST',
      headers: { Authorization: `Bearer ${tokenTemp.value}` },
      body:    { username: username.value.trim() },
    })
    userTemp.value.username = username.value.trim()
  } catch (_) {}
  _redirect(tokenTemp.value, userTemp.value)
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--beige);
  padding: 24px;
}

.auth-card {
  background: white;
  border-radius: var(--r-xl);
  padding: 48px 40px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
}

.auth-state { display: flex; flex-direction: column; align-items: center; gap: 12px; }

.auth-icon {
  width: 72px; height: 72px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 8px;
}
.auth-icon.success { background: var(--success-light); color: var(--success); }
.auth-icon.error   { background: var(--error-light);   color: var(--error);   }

h2 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text);
}

p { font-size: 0.92rem; color: var(--text-light); line-height: 1.6; }

.auth-hint { font-size: 0.8rem; }
.auth-hint a { color: var(--terra); font-weight: 600; }

.spinner {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 3px solid var(--border);
  border-top-color: var(--terra);
  animation: spin 0.7s linear infinite;
}

.username-input {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}
.username-input:focus {
  border-color: var(--terra);
}
</style>