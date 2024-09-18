<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './views/HeaderComponent.vue';
</script>

<template>
  <div>
    
    <HeaderComponent />
    <RouterLink to="/"></RouterLink>
  </div>
  <RouterView />
  <footer class="myblog-footer">
    <h1>Drop Me a Line, Let Me Know What You Think</h1>
    <div class="contact-form">
      <form @submit.prevent="submitForm" >
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" placeholder="Your Name" required>

        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Your Email" required>

        <label for="message">Message</label>
        <textarea id="message" v-model="message" placeholder="Your Message" required></textarea>

        <button type="submit">Submit</button>
      </form>
  </div>

    <div class="footer-info">
      <p>© 2035 by Train of Thoughts. Powered and secured by TH</p>
    </div>
      
  </footer>
</template>

<style scoped>
.myblog-footer {
  margin-top:10rem;
  display: flex;
  flex-direction: column;
  width:100%;
  align-items: center;
}

.contact-form {
  width: 100%;
  max-width: 600px;  /* 최대 너비 설정 */
}

.contact-form form {
  display: flex;
  flex-direction: column;
}

.contact-form label {
  margin-bottom: 5px;
  font-weight: bold;
}

.contact-form input,
.contact-form textarea {
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;  
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact-form textarea {
  height: 10rem; 
}

.contact-form button {
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 70%;
  align-self: center;  
}

.contact-form button:hover {
  background-color: #555;
}

.footer-info {
  margin-top: 10rem;
  background-color: #f0f0f0; 
  color: #000;
  width: 100%;              
  padding: 1rem;            
  text-align: center;       
}
</style>
