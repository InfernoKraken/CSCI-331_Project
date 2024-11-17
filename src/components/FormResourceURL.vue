<script setup>
import { ref } from 'vue';

const inputUrl = ref('');

// Emit events to the parent
const emit = defineEmits(['update-url', 'go-button-click']);

// emit URL to the Parent
// const emitUrl = () => {
//   emit('update-url', inputUrl.value);
// };

// emit Go button click event
const handleGoButtonClick = () => {
  emit('update-url', inputUrl.value); // The URL needs to be emitted first
  emit('go-button-click');
}
</script>

<template>
  <form @submit.prevent="handleGoButtonClick">
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