<script setup>
import { defineProps } from 'vue';

// Define the props
defineProps({
  src: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <div>
    <iframe
      v-if="src"  
      :src="src"
      width="600"
      height="400"
      frameborder="0"
      title="External URL Content"
      class="iframe"
    ></iframe>
    <p v-else>There is no content to display. Enter a URL in the header controls to add a resource.</p>
  </div>
</template>

<style scoped>
.iframe {
  border: none;
}
</style>