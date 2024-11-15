<script setup>
  import { defineEmits } from 'vue';

  const emit = defineEmits(['toggle-visibility']);
</script>

<template>
  <button @click="emit('toggle-visibility')">
    Select Capture Aread
  </button>
</template>

<style>

</style>