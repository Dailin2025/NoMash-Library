<template>
  <h1>Add Book</h1>
  <form @submit.prevent="addBook">
    <div>
      <label for="isbn">ISBN: </label>
      <input type="text" v-model="isbn" id="isbn" required />
    </div>
    <div>
      <label for="name">Name: </label>
      <input type="text" v-model="name" id="name" required />
    </div>
    <button type="submit">Add Book</button>
  </form>
  
  <!-- BookList component loaded directly under AddBook page -->
  <BookList />
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import db from '../firebase/init.js'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  try {
    // Convert ISBN to number and validate
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }
    
    // Add data to Firestore collection called "books"
    await addDoc(collection(db, 'books'), { 
      isbn: isbnNumber, 
      name: name.value 
    })
    
    // Clear form fields
    isbn.value = ''
    name.value = ''
    
    alert('Book added successfully!')
  } catch (error) {
    console.error('Error adding book:', error)
  }
}
</script> 