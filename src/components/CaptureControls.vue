<script setup>
  import { defineEmits } from 'vue';
  const emit = defineEmits(['toggle-visibility']);
</script>

<template>
    <input class="contorls__url" type="text" placeholder="Load a URL">
    <button @click="emit('toggle-visibility')" class="controls__url-button">GO</button>
    <button class="controls__capture" onClick="captureScreenshot()">Select Catpure Area</button>
</template>

<style>
  .controls {
    padding: 1rem;
    text-align: right;
  }
  input.controls__url{
    margin-right: 0;
  }
  .controls__url-button {
    margin-left: 0; 
    margin-right: 1rem;
  }
  .controls__capture {
    margin-right: 1rem;
  }
</style>