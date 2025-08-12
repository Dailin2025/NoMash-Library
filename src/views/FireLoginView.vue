<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">{{ isLogin ? 'Login' : 'Register' }}</h3>
          </div>
          <div class="card-body">
            <!-- Toggle between Login and Register -->
            <div class="text-center mb-3">
              <button 
                @click="isLogin = true" 
                :class="['btn', isLogin ? 'btn-primary' : 'btn-outline-primary']"
              >
                Login
              </button>
              <button 
                @click="isLogin = false" 
                :class="['btn ms-2', !isLogin ? 'btn-primary' : 'btn-outline-primary']"
              >
                Register
              </button>
            </div>

            <!-- Login Form -->
            <form v-if="isLogin" @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="loginEmail" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="loginEmail" 
                  v-model="loginEmail" 
                  required
                >
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="loginPassword" 
                  v-model="loginPassword" 
                  required
                >
              </div>
              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
            </form>

            <!-- Register Form -->
            <form v-else @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="registerEmail" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="registerEmail" 
                  v-model="registerEmail" 
                  required
                >
              </div>
              <div class="mb-3">
                <label for="registerPassword" class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="registerPassword" 
                  v-model="registerPassword" 
                  required
                >
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="confirmPassword" 
                  v-model="confirmPassword" 
                  required
                >
              </div>
              <button type="submit" class="btn btn-success w-100" :disabled="loading">
                {{ loading ? 'Registering...' : 'Register' }}
              </button>
            </form>

            <!-- Error/Success Messages -->
            <div v-if="message" :class="['alert mt-3', messageType === 'error' ? 'alert-danger' : 'alert-success']">
              {{ message }}
            </div>

            <!-- Current User Info -->
            <div v-if="currentUser" class="mt-3 p-3 bg-light rounded">
              <h5>Current User:</h5>
              <p><strong>Email:</strong> {{ currentUser.email }}</p>
              <p><strong>UID:</strong> {{ currentUser.uid }}</p>
              <button @click="handleLogout" class="btn btn-warning">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { getAuth } from 'firebase/auth'

const auth = getAuth()

// Form data
const isLogin = ref(true)
const loginEmail = ref('')
const loginPassword = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref('')
const currentUser = ref(null)

// Handle login
const handleLogin = async () => {
  loading.value = true
  message.value = ''
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    currentUser.value = userCredential.user
    message.value = 'Login successful!'
    messageType.value = 'success'
    console.log('Current user:', currentUser.value)
  } catch (error) {
    message.value = `Login failed: ${error.message}`
    messageType.value = 'error'
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

// Handle registration
const handleRegister = async () => {
  if (registerPassword.value !== confirmPassword.value) {
    message.value = 'Passwords do not match!'
    messageType.value = 'error'
    return
  }

  loading.value = true
  message.value = ''
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
    currentUser.value = userCredential.user
    message.value = 'Registration successful!'
    messageType.value = 'success'
    console.log('Current user:', currentUser.value)
  } catch (error) {
    message.value = `Registration failed: ${error.message}`
    messageType.value = 'error'
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}

// Handle logout
const handleLogout = async () => {
  try {
    await signOut(auth)
    currentUser.value = null
    message.value = 'Logged out successfully!'
    messageType.value = 'success'
    console.log('User logged out')
  } catch (error) {
    message.value = `Logout failed: ${error.message}`
    messageType.value = 'error'
    console.error('Logout error:', error)
  }
}

// Listen for auth state changes
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    if (user) {
      console.log('User is signed in:', user)
    } else {
      console.log('User is signed out')
    }
  })
})
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn {
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.6;
}
</style> 