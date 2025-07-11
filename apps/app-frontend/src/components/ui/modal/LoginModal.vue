<template>
  <ModalWrapper
    ref="loginModal"
    header="Sign In"
    :closable="true"
    :show-ad-on-close="false"
  >
    <div class="login-modal-body">
      <div class="login-header">
        <h2>Choose your login method</h2>
        <p>Select how you'd like to authenticate with Minecraft</p>
      </div>

      <div class="login-options">
        <div class="login-option microsoft" @click="loginMicrosoft">
          <div class="option-icon">
            <LogInIcon />
          </div>
          <div class="option-content">
            <h3>Microsoft Account</h3>
            <p>Sign in with your Microsoft account to access online features</p>
            <ul class="features-list">
              <li>✓ Access to online servers</li>
              <li>✓ Minecraft Realms</li>
              <li>✓ Official skins and capes</li>
              <li>✓ Cross-platform play</li>
            </ul>
          </div>
        </div>

        <div class="divider">
          <span>OR</span>
        </div>

        <div class="login-option offline" @click="loginOffline">
          <div class="option-icon">
            <UserIcon />
          </div>
          <div class="option-content">
            <h3>Offline Mode</h3>
            <p>Play without an internet connection or Microsoft account</p>
            <ul class="features-list">
              <li>✓ Single-player worlds</li>
              <li>✓ LAN multiplayer</li>
              <li>✓ Mod support</li>
              <li data-warning="true">⚠ Limited to offline play only</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Offline Login Form -->
      <div v-if="showOfflineForm" class="offline-form">
        <h3>Create Offline Profile</h3>
        <div class="input-group">
          <label for="offline-username">Username</label>
          <input
            id="offline-username"
            v-model="offlineUsername"
            type="text"
            placeholder="Enter your username"
            maxlength="16"
            pattern="\w+"
            @input="validateUsername"
          />
          <span v-if="usernameError" class="error">{{ usernameError }}</span>
        </div>
        <div class="form-actions">
          <Button color="primary" :disabled="!isUsernameValid" @click="createOfflineAccount">
            <UserIcon />
            Create Offline Account
          </Button>
          <Button @click="showOfflineForm = false">
            <XIcon />
            Cancel
          </Button>
        </div>
      </div>

      <div v-if="isLoading" class="loading-state">
        <SpinnerIcon class="animate-spin" />
        <p>{{ loadingMessage }}</p>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup>
import { ref, computed } from 'vue'
import { LogInIcon, UserIcon, XIcon, SpinnerIcon } from '@modrinth/assets'
import { Button } from '@modrinth/ui'
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'
import { login as login_flow, login_offline } from '@/helpers/auth'
import { handleError } from '@/store/state.js'
import { handleSevereError } from '@/store/error.js'
import { trackEvent } from '@/helpers/analytics'

const emit = defineEmits(['login-success', 'login-cancelled'])

const loginModal = ref(null)
const showOfflineForm = ref(false)
const offlineUsername = ref('')
const usernameError = ref('')
const isLoading = ref(false)
const loadingMessage = ref('')

const isUsernameValid = computed(() => {
  return offlineUsername.value.length >= 3 && 
         offlineUsername.value.length <= 16 && 
         /^\w+$/.test(offlineUsername.value) &&
         !usernameError.value
})

function show() {
  loginModal.value?.show()
  showOfflineForm.value = false
  offlineUsername.value = ''
  usernameError.value = ''
  isLoading.value = false
}

function hide() {
  loginModal.value?.hide()
  emit('login-cancelled')
}

async function loginMicrosoft() {
  try {
    isLoading.value = true
    loadingMessage.value = 'Opening Microsoft login...'
    
    trackEvent('LoginAttempt', { method: 'microsoft' })
    
    const loggedIn = await login_flow().catch(handleSevereError)
    
    if (loggedIn) {
      trackEvent('LoginSuccess', { method: 'microsoft' })
      emit('login-success', loggedIn)
      hide()
    } else {
      trackEvent('LoginCancelled', { method: 'microsoft' })
    }
  } catch (error) {
    trackEvent('LoginError', { method: 'microsoft', error: error.message })
    handleError(error)
  } finally {
    isLoading.value = false
  }
}

function loginOffline() {
  showOfflineForm.value = true
}

function validateUsername() {
  const username = offlineUsername.value
  
  if (username.length < 3) {
    usernameError.value = 'Username must be at least 3 characters long'
  } else if (username.length > 16) {
    usernameError.value = 'Username must be 16 characters or less'
  } else if (!/^\w+$/.test(username)) {
    usernameError.value = 'Username can only contain letters, numbers, and underscores'
  } else {
    usernameError.value = ''
  }
}

async function createOfflineAccount() {
  try {
    isLoading.value = true
    loadingMessage.value = 'Creating offline account...'
    
    trackEvent('LoginAttempt', { method: 'offline' })
    
    const offlineAccount = await login_offline(offlineUsername.value)
    
    trackEvent('LoginSuccess', { method: 'offline' })
    emit('login-success', offlineAccount)
    hide()
  } catch (error) {
    trackEvent('LoginError', { method: 'offline', error: error.message })
    handleError(error)
  } finally {
    isLoading.value = false
  }
}

defineExpose({
  show,
  hide
})
</script>

<style scoped lang="scss">
.login-modal-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  padding: 0.5rem;
}

.login-header {
  text-align: center;
  
  h2 {
    margin: 0 0 0.5rem 0;
    color: var(--color-contrast);
    font-size: 1.5rem;
  }
  
  p {
    margin: 0;
    color: var(--color-secondary);
  }
}

.login-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-option {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px solid var(--color-button-bg);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-raised-bg);
  
  &:hover {
    border-color: var(--color-brand);
    background: var(--color-brand-highlight);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &.microsoft {
    &:hover {
      border-color: #0078d4;
    }
  }
  
  &.offline {
    &:hover {
      border-color: var(--color-orange);
    }
  }
}

.option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-brand);
  color: white;
  flex-shrink: 0;
  
  .microsoft & {
    background: #0078d4;
  }
  
  .offline & {
    background: var(--color-orange);
  }
}

.option-content {
  flex: 1;
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: var(--color-contrast);
    font-size: 1.2rem;
  }
  
  p {
    margin: 0 0 0.75rem 0;
    color: var(--color-secondary);
    font-size: 0.9rem;
  }
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    font-size: 0.85rem;
    color: var(--color-base);
    padding: 0.1rem 0;
  }
  
  li[data-warning="true"] {
    color: var(--color-orange);
  }
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--color-button-bg);
  }
  
  span {
    padding: 0 1rem;
    color: var(--color-secondary);
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.offline-form {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--color-button-bg);
  
  h3 {
    margin: 0 0 1rem 0;
    color: var(--color-contrast);
  }
}

.input-group {
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-contrast);
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--color-button-bg);
    border-radius: var(--radius-md);
    background: var(--color-raised-bg);
    color: var(--color-contrast);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--color-brand);
      box-shadow: 0 0 0 2px var(--color-brand-highlight);
    }
    
    &:invalid {
      border-color: var(--color-red);
    }
  }
  
  .error {
    display: block;
    margin-top: 0.25rem;
    color: var(--color-red);
    font-size: 0.85rem;
  }
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  
  p {
    margin: 0;
    color: var(--color-secondary);
  }
}
</style>
