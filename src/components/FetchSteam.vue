<template>
  <div>
    <button @click="fetchSteamSales">Fetch Steam Sales</button>
    <!-- Container for Steam sales content -->
    <div id="steam-sales-content" v-html="markdownContent"></div>
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
      alert("Fetching current Steam sales by using Playwright. Please close this alert and then wait ~30 seconds.");
      try {
        const response = await fetch('https://your-render-url.onrender.com/fetch-steam-sales');
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

<style>
/* Ensure #app or main container is positioned relatively */
#app {
  position: relative;
}

#steam-sales-content {
  position: absolute;
  top: 120px; /* Adjust as needed for placement */
  left: -100px; /* Adjust as needed */
  width: 705px; /* Set the desired width */
  max-height: 90vh; /* Limit height to avoid overflowing the screen */
  overflow-y: auto; /* Add scrolling if the content exceeds the container height */
  z-index: 999; /* High z-index to ensure it overlays other content */
  background-color: rgba(0, 0, 0);
  color: #fff; /* Text color for readability */
  border-radius: 5px; /* Optional rounded corners */
  text-align: left; /* Align text to the left */
}


</style>
