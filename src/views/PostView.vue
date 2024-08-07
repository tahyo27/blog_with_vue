<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      content: '',
      message: ''
    };
  },
  methods: {
    async createPost() {
      try {
        const response = await axios.post('http://localhost:8072/posts', {
          title: this.title,
          content: this.content
        });
        this.message = 'Post created successfully!';
        this.title = '';
        this.content = '';
      } catch (error) {
        this.message = 'Failed to create post.';
      }
    }
  }
};
</script>

<template>
    <div>
    <h1>Create a New Post</h1>
    <form @submit.prevent="createPost">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea id="content" v-model="content"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
  </template>
  
  <style>
  
  </style>
