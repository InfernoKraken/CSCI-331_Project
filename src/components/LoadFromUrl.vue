<script setup>
import { defineProps } from 'vue';

// Define the props
const props = defineProps({
  src: {
    type: String,
    required: false,
    default: 'https://www.youtube.com/embed/ANwf8AE3_d0?si=NQ1SP-KXt_alQQdL',
  },
});

// Access the prop (mark it as used)
const videoSrc = props.src;
</script>

<template>
  <div v-if="videoSrc">
    <iframe
      :src="videoSrc"
      width="600"
      height="400"
      frameborder="0"
      title="YouTube Video Player"
      class="iframe"
    ></iframe>
  </div>
  <div v-else>
    <p>There is no video to display. Enter a URL in the header controls to add a YouTube video.</p>
  </div>
</template>

<style scoped>
.iframe {
  border: none;
}
</style>