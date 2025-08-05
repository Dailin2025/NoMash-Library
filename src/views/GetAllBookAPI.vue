<template>
  <div v-if="apiResponse" class="api-response">
    <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const getAllBooks = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('src/assets/json/authors.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    authors.value = data
    
    // Create API response with all books
    const allBooks = []
    authors.value.forEach(author => {
      author.famousWorks.forEach(book => {
        allBooks.push({
          title: book.title,
          author: author.name,
          year: book.year,
          genres: author.genres
        })
      })
    })
    
    apiResponse.value = {
      success: true,
      data: {
        totalBooks: allBooks.length,
        totalAuthors: authors.value.length,
        books: allBooks
      },
      timestamp: new Date().toISOString()
    }
    
  } catch (err) {
    error.value = `Error loading books data: ${err.message}`
    console.error('Error loading books data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getAllBooks()
})

defineExpose({
  getAllBooks
})
</script>

<style scoped>
.api-response {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 20px;
}

.api-response pre {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style> 