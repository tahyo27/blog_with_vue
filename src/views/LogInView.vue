
<script setup>
import { ref } from 'vue'

// 사용자 입력을 위한 반응형 변수들
const username = ref('')
const password = ref('')

// 로그인 처리 함수 (단순 폼 제출 처리만)
const handleLogin = () => {
  // 로그인 처리 부분 (실제 동작 없음)
  console.log('Form submitted:', username.value, password.value)
}
</script>

<template>
    <main class="login-main">
        <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
            <label for="username">Name</label>
            <input
                type="text"
                id="username"
                v-model="username"
                placeholder="Enter your username"
                required
            />
            </div>
    
            <div class="form-group">
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Enter your password"
                required
            />
            </div>
    
            <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </main>
</template>
  

<style scoped>
.login-main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

input {
  width: 100%;
  padding-left:6px;
  padding-top:12px;
  padding-bottom: 12px;

  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  background-color: #fff;
}

button {
  width: 100%;
  padding: 12px;
  margin-left: 4px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>