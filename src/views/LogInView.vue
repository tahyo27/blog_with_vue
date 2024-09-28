
<script setup>
import { ref } from 'vue'
import axios from 'axios'

// 사용자 입력을 위한 반응형 변수들
const email = ref('')
const password = ref('')

// 로그인 처리 함수 
const handleLogin = async () => {
  // 로그인 처리 부분 
  try {
    const response = await axios.post('http://localhost:8072/auth/login', {
      email: email.value,
      password: password.value,
    });
    console.log('로그인 성공');
    router.push('/');
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 보냈으나, 응답 상태 코드가 2xx 범위가 아닐 때 (에러 발생)
      const errorMessage = `
        에러 응답: ${JSON.stringify(error.response.data)}\n
        코드: ${error.response.status}\n
        헤더: ${JSON.stringify(error.response.headers)}
        `;
      console.error(errorMessage);
      alert(errorMessage);

    } else if (error.request) {
      // 요청은 보내졌으나, 서버로부터 응답이 없을 때 (네트워크 또는 CORS 문제)
      const noResponseMessage = '요청 보냈지만 응답 없음: ' + error.request;
      console.error(noResponseMessage);
      alert(noResponseMessage);
    } else {
      // 요청을 설정하는 중에 발생한 에러
      const generalErrorMessage = '에러 발생: ' + error.message;
      console.error(generalErrorMessage);
      alert(generalErrorMessage);
    }
  }
  console.log('폼 제출');
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
                v-model="email"
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