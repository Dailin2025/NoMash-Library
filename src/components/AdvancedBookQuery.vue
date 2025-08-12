<template>
  <div class="advanced-query">
    <h2>Advanced Book Query</h2>
    
    <!-- 查询控制面板-->
    <div class="query-controls">
      <div class="control-group">
        <label>ISBN Range:</label>
        <input v-model.number="queryParams.minIsbn" type="number" placeholder="Min ISBN" />
        <span>to</span>
        <input v-model.number="queryParams.maxIsbn" type="number" placeholder="Max ISBN" />
      </div>
      
      <div class="control-group">
        <label>Sort by:</label>
        <select v-model="queryParams.sortBy">
          <option value="isbn">ISBN</option>
          <option value="name">Name</option>
        </select>
        <select v-model="queryParams.sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      
      <div class="control-group">
        <label>Limit:</label>
        <input v-model.number="queryParams.limit" type="number" placeholder="Number of results" min="1" max="50" />
      </div>
      
      <button @click="executeQuery" class="btn-query">Execute Query</button>
    </div>
    
    <!-- 查询结果显示 -->
    <div class="query-results">
      <h3>Query Results ({{ books.length }} books found)</h3>
      <div class="book-list">
        <div v-for="book in books" :key="book.id" class="book-item">
          <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
        </div>
      </div>
      
      <div v-if="books.length === 0" class="no-results">
        No books found matching your criteria.
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const queryParams = reactive({
      minIsbn: null,
      maxIsbn: null,
      sortBy: 'isbn',
      sortOrder: 'asc',
      limit: 10
    });

    const executeQuery = async () => {
      try {
        let q = collection(db, 'books');
        const constraints = [];
        
        // 添加 where 条件
        if (queryParams.minIsbn !== null && queryParams.minIsbn !== '') {
          constraints.push(where('isbn', '>=', queryParams.minIsbn));
        }
        
        if (queryParams.maxIsbn !== null && queryParams.maxIsbn !== '') {
          constraints.push(where('isbn', '<=', queryParams.maxIsbn));
        }
        
        // 添加 orderBy
        constraints.push(orderBy(queryParams.sortBy, queryParams.sortOrder));
        
        // 添加 limit
        if (queryParams.limit && queryParams.limit > 0) {
          constraints.push(limit(queryParams.limit));
        }
        
        // 构建查询
        q = query(q, ...constraints);
        
        // 执行查询
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
        console.log('Query executed successfully:', constraints);
      } catch (error) {
        console.error('Error executing query:', error);
        alert('Error executing query: ' + error.message);
      }
    };

    return { books, queryParams, executeQuery };
  }
};
</script>

<style scoped>
.advanced-query {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.query-controls {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.control-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group label {
  font-weight: bold;
  min-width: 80px;
}

.control-group input, .control-group select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.btn-query {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-query:hover {
  background-color: #218838;
}

.query-results {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.book-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.book-item:last-child {
  border-bottom: none;
}

.no-results {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
}
</style> 