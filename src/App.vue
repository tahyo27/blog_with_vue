<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from '../src/components/HeaderComponent.vue';
import FooterComponent from '../src/components/FooterComponent.vue';

</script>

<template>
  <div>
    <HeaderComponent />
    <RouterLink to="/"></RouterLink>
    <RouterView />
    <FooterComponent />
  </div>

  
</template>

