<template>
  <h1>Create an Account</h1>
  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>
  <p>
    <select v-model="selectedRole">
      <option value="admin">Admin</option>
      <option value="librarian">Librarian</option>
      <option value="student">Student</option>
    </select>
  </p>
  <p>
    <button @click="register">Save to Firebase</button>
  </p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const selectedRole = ref("admin");
const router = useRouter();
const auth = getAuth();

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log("Firebase Register Successful!");
      console.log("User role:", selectedRole.value);
      // 这里可以保存用户角色到Firestore
      router.push("/FireLogin");
    })
    .catch((error) => {
      console.log(error.code);
    });
};
</script> 