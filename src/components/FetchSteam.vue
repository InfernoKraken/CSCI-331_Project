<template>
  <div>
    <button @click="fetchSteamSales">Fetch Steam Sales</button>
    <div v-html="markdownContent"></div>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  data() {
    return {
      markdownContent: '', // Stores the Markdown content converted to HTML
    };
  },
  methods: {
    async fetchSteamSales() {
      try {
        const response = await fetch('http://localhost:3000/fetch-steam-sales');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const markdownText = await response.text();

        console.log('Markdown Text:', markdownText); // Debug: check the fetched content

        // Convert Markdown to HTML
        this.markdownContent = marked(markdownText);

        console.log('Converted HTML:', this.markdownContent); // Debug: check the HTML conversion
      } catch (error) {
        console.error('Error fetching or converting Markdown:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any custom styles for Markdown elements here */
</style>
