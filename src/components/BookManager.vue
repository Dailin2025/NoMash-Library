<template>
  <div class="book-manager">
    <h2>Book Manager - Update & Delete</h2>
    <!--图书列表 -->
    <div class="book-list">
      <div v-for="book in books" :key="book.id" class="book-item">
        <div class="book-info">
          <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
        </div>
        <!-- 编辑模式-->
        <div v-if="editingBook === book.id" class="edit-form">
          <input v-model="editForm.name" placeholder="Book name" />
          <input v-model.number="editForm.isbn" type="number" placeholder="ISBN" />
          <button @click="saveEdit(book.id)" class="btn-save">Save</button>
          <button @click="cancelEdit" class="btn-cancel">Cancel</button>
        </div>
        <!-- 操作按钮 -->
        <div v-else class="book-actions">
          <button @click="startEdit(book)" class="btn-edit">Edit</button>
          <button @click="deleteBook(book.id)" class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const editingBook = ref(null);
    const editForm = ref({ name: '', isbn: null });

    // 获取所有图书
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    // 开始编辑
    const startEdit = (book) => {
      editingBook.value = book.id;
      editForm.value = { name: book.name, isbn: book.isbn };
    };

    // 保存编辑
    const saveEdit = async (bookId) => {
      try {
        const bookRef = doc(db, 'books', bookId);
        await updateDoc(bookRef, { 
          name: editForm.value.name, 
          isbn: editForm.value.isbn 
        });
        editingBook.value = null;
        await fetchBooks(); //重新获取数据
        alert('Book updated successfully!');
      } catch (error) {
        console.error('Error updating book: ', error);
        alert('Error updating book');
      }
    };

    // 取消编辑
    const cancelEdit = () => {
      editingBook.value = null;
      editForm.value = { name: '', isbn: null };
    };

    // 删除图书
    const deleteBook = async (bookId) => {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          const bookRef = doc(db, 'books', bookId);
          await deleteDoc(bookRef);
          await fetchBooks(); //重新获取数据
          alert('Book deleted successfully!');
        } catch (error) {
          console.error('Error deleting book: ', error);
          alert('Error deleting book');
        }
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      editingBook,
      editForm,
      startEdit,
      saveEdit,
      cancelEdit,
      deleteBook
    };
  }
};
</script>

<style scoped>
.book-manager {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.book-item {
  background-color: white;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-actions {
  display: flex;
  gap: 10px;
}

.edit-form {
  display: flex;
  gap: 10px;
  align-items: center;
}

.edit-form input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.btn-edit, .btn-save {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
</style> 