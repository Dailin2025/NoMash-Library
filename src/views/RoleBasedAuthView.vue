<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Role-Based Authentication System</h3>
          </div>
          <div class="card-body">
            <!-- Current User Status -->
            <div v-if="currentUser" class="alert alert-info">
              <h5>Welcome, {{ currentUser.email }}!</h5>
              <p><strong>Role:</strong> {{ userRole }}</p>
              <p><strong>UID:</strong> {{ currentUser.uid }}</p>
              <button @click="handleLogout" class="btn btn-warning">Logout</button>
            </div>

            <!-- Login Form -->
            <div v-if="!currentUser">
              <h4 class="mb-3">Sign In with Role</h4>
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="email" 
                    required
                  >
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    v-model="password" 
                    required
                  >
                </div>
                <div class="mb-3">
                  <label for="role" class="form-label">Select Role</label>
                  <select class="form-select" id="role" v-model="selectedRole" required>
                    <option value="">Choose a role...</option>
                    <option value="admin">Admin</option>
                    <option value="librarian">Librarian</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                  {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>
              </form>
            </div>

            <!-- Role-Based Content -->
            <div v-if="currentUser" class="mt-4">
              <h4>Role-Based Dashboard</h4>
              
              <!-- Admin Content -->
              <div v-if="userRole === 'admin'" class="card bg-primary text-white">
                <div class="card-body">
                  <h5>Admin Dashboard</h5>
                  <p>You have full access to all library functions:</p>
                  <ul>
                    <li>Manage all users and roles</li>
                    <li>Add/remove books and resources</li>
                    <li>View all borrowing history</li>
                    <li>System configuration</li>
                  </ul>
                </div>
              </div>

              <!-- Librarian Content -->
              <div v-else-if="userRole === 'librarian'" class="card bg-success text-white">
                <div class="card-body">
                  <h5>Librarian Dashboard</h5>
                  <p>You can manage library operations:</p>
                  <ul>
                    <li>Check in/out books</li>
                    <li>Manage book inventory</li>
                    <li>Help students with requests</li>
                    <li>Generate reports</li>
                  </ul>
                </div>
              </div>

              <!-- Student Content -->
              <div v-else-if="userRole === 'student'" class="card bg-info text-white">
                <div class="card-body">
                  <h5>Student Dashboard</h5>
                  <p>You can access student services:</p>
                  <ul>
                    <li>Search and borrow books</li>
                    <li>View your borrowing history</li>
                    <li>Request book reservations</li>
                    <li>Access online resources</li>
                  </ul>
                </div>
              </div>

              <!-- Role Switch (for demonstration) -->
              <div class="mt-3">
                <h5>Switch Role (Demo)</h5>
                <div class="btn-group" role="group">
                  <button 
                    @click="switchRole('admin')" 
                    :class="['btn', userRole === 'admin' ? 'btn-primary' : 'btn-outline-primary']"
                  >
                    Admin
                  </button>
                  <button 
                    @click="switchRole('librarian')" 
                    :class="['btn', userRole === 'librarian' ? 'btn-success' : 'btn-outline-success']"
                  >
                    Librarian
                  </button>
                  <button 
                    @click="switchRole('student')" 
                    :class="['btn', userRole === 'student' ? 'btn-info' : 'btn-outline-info']"
                  >
                    Student
                  </button>
                </div>
              </div>
            </div>

            <!-- Error/Success Messages -->
            <div v-if="message" :class="['alert mt-3', messageType === 'error' ? 'alert-danger' : 'alert-success']">
              {{ message }}
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
  signOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { getAuth } from 'firebase/auth'

const auth = getAuth()

// Form data
const email = ref('')
const password = ref('')
const selectedRole = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref('')
const currentUser = ref(null)
const userRole = ref('')

// Demo users for testing different roles
const demoUsers = {
  'admin@library.com': { password: 'admin123', role: 'admin' },
  'librarian@library.com': { password: 'librarian123', role: 'librarian' },
  'student@library.com': { password: 'student123', role: 'student' }
}

// Handle login
const handleLogin = async () => {
  loading.value = true
  message.value = ''
  
  try {
    // Check if it's a demo user
    if (demoUsers[email.value]) {
      const demoUser = demoUsers[email.value]
      if (password.value === demoUser.password && selectedRole.value === demoUser.role) {
        // Simulate successful login for demo
        currentUser.value = {
          email: email.value,
          uid: `demo-${Date.now()}`,
          role: selectedRole.value
        }
        userRole.value = selectedRole.value
        message.value = `Successfully signed in as ${selectedRole.value}!`
        messageType.value = 'success'
        console.log('Demo user signed in:', currentUser.value)
      } else {
        throw new Error('Invalid credentials for demo user')
      }
    } else {
      // Real Firebase authentication (you'll need to set up Firebase properly)
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      currentUser.value = userCredential.user
      userRole.value = selectedRole.value
      message.value = 'Login successful!'
      messageType.value = 'success'
      console.log('Current user:', currentUser.value)
    }
  } catch (error) {
    message.value = `Login failed: ${error.message}`
    messageType.value = 'error'
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

// Handle logout
const handleLogout = async () => {
  try {
    if (currentUser.value && currentUser.value.uid.startsWith('demo-')) {
      // Demo user logout
      currentUser.value = null
      userRole.value = ''
      message.value = 'Logged out successfully!'
      messageType.value = 'success'
    } else {
      // Real Firebase logout
      await signOut(auth)
      currentUser.value = null
      userRole.value = ''
      message.value = 'Logged out successfully!'
      messageType.value = 'success'
    }
    console.log('User logged out')
  } catch (error) {
    message.value = `Logout failed: ${error.message}`
    messageType.value = 'error'
    console.error('Logout error:', error)
  }
}

// Switch role (for demonstration)
const switchRole = (role) => {
  userRole.value = role
  message.value = `Role switched to ${role}`
  messageType.value = 'success'
  console.log('Role switched to:', role)
}

// Listen for auth state changes
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user && !currentUser.value) {
      currentUser.value = user
      console.log('User is signed in:', user)
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

.btn-group .btn {
  margin-right: 5px;
}
</style> 