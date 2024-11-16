<script setup>
  import html2canvas from 'html2canvas';
  
  const captureFullPage = () => {
    html2canvas(document.body).then((canvas) => {
      const link=document.createElement('a');
      link.download = 'screenshot.png';
      link.href=canvas.toDataURL();
      link.click();
    });
  };

</script>

<template>
  <button @click="captureFullPage">
    Capture Full Page
  </button>
</template>

<style>

</style>