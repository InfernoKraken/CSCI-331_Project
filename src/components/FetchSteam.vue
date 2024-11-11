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
      alert("Fetching current Steam sales by using Playwright. Please wait ~30 seconds.");
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
.markdown-content {
  max-width: 600px; /* Limit the width of the content for readability */
  margin: 0 auto; /* Center the content container */
  word-wrap: break-word; /* Wrap long words or URLs */
  overflow-wrap: break-word; /* Wrap long words or URLs */
  white-space: pre-wrap; /* Preserve line breaks and wrap content */
  line-height: 1.6; /* Improve readability */
  text-align: left; /* Left-align text content */
}

.markdown-content a {
  color: #1e90ff; /* Customize link color */
  text-decoration: underline; /* Style links with an underline */
}
</style>
