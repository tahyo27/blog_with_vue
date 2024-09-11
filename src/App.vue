<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './views/HeaderComponent.vue';
</script>

<template>
  <header>
    <div>
      <HeaderComponent />
      <RouterLink to="/"></RouterLink>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>

</style>
