// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

// Firebase imports
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// app.component('DataTable', DataTable)
// app.component('Column', Column)

// Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZKzgD9hGNBxaNKPwQ32rtYm5QRAvsELo",
  authDomain: "week7-dailinjiang.firebaseapp.com",
  projectId: "week7-dailinjiang",
  storageBucket: "week7-dailinjiang.firebasestorage.app",
  messagingSenderId: "1039427613509",
  appId: "1:1039427613509:web:b4fa0d02d184bf1026442c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Make auth available globally
app.config.globalProperties.$auth = auth;

app.mount('#app')
