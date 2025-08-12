<template>
  <div class="book-management">
    <h1>Book Management System</h1>
    
    <!-- 标签页切换 -->
    <div class="tabs">
      <button 
        @click="activeTab = 'manager'" 
        :class="{ active: activeTab === 'manager' }"
        class="tab-btn"
      >
        Update & Delete
      </button>
      <button 
        @click="activeTab = 'query'" 
        :class="{ active: activeTab === 'query' }"
        class="tab-btn"
      >
        Advanced Query
      </button>
    </div>
    
    <!-- 内容区域 -->
    <div class="tab-content">
      <BookManager v-if="activeTab === 'manager'" />
      <AdvancedBookQuery v-if="activeTab === 'query'" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import BookManager from '../components/BookManager.vue';
import AdvancedBookQuery from '../components/AdvancedBookQuery.vue';

export default {
  components: {
    BookManager,
    AdvancedBookQuery
  },
  setup() {
    const activeTab = ref('manager');
    
    return { activeTab };
  }
};
</script>

<style scoped>
.book-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
}

.tab-btn {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.tab-btn.active {
  border-bottom-color: #007bff;
  color: #007bff;
  font-weight: bold;
}

.tab-btn:hover {
  background-color: #f8f9fa;
}

.tab-content {
  min-height: 400px;
}
</style> 