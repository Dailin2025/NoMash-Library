<template>
  <div>
    <!-- Login Form (shown when not logged in) -->
    <div v-if="!currentUser">
      <h1>Sign in</h1>
      <p>
        <input type="text" placeholder="Email" v-model="email" />
      </p>
      <p>
        <input type="password" placeholder="Password" v-model="password" />
      </p>
      <p>
        <button @click="signin">Sign in via Firebase</button>
      </p>
    </div>

    <!-- Logged in user info and logout button -->
    <div v-if="currentUser">
      <h1>Welcome!</h1>
      <p><strong>Email:</strong> {{ currentUser.email }}</p>
      <p><strong>User ID:</strong> {{ currentUser.uid }}</p>
      <p>
        <button @click="logout">Log out</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const currentUser = ref(null);
const router = useRouter();
const auth = getAuth();

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Login Successful!");
      currentUser.value = data.user;
      console.log(auth.currentUser);
    })
    .catch((error) => {
      console.log(error.code);
    });
};

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User logged out successfully");
      currentUser.value = null;
    })
    .catch((error) => {
      console.log("Logout error:", error);
    });
};

// Listen for auth state changes
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
    if (user) {
      console.log("User is signed in:", user);
    } else {
      console.log("User is signed out");
    }
  });
});
</script> 