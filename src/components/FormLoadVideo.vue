<script setup>
import { ref } from 'vue';

const inputUrl = ref('');

const emitUrl = (emit) => {
  emit('update-url', inputUrl.value);
};
</script>

<template>
  <form @submit.prevent="emitUrl($emit)">
    <label for="video-url"></label>
    <input
      id="video-url"
      type="text"
      v-model="inputUrl"
      placeholder="Enter a URL"
    />
    <button type="submit" >Go</button>
  </form>
</template>

<style scoped>
form {
  display: inline-block;
}
input {
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-right: 1rem;
  padding: 10px 2rem;
}
</style>