<script setup>
import { ref } from 'vue';
import FetchSteam from './components/FetchSteam.vue';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
import ScreenShot from './components/ScreenShot.vue';
import LoadFromUrl from './components/LoadFromUrl.vue';
import ButtonCapture from './components/ButtonCapture.vue';
import FormLoadVideo from './components/FormResourceURL.vue';

// Toggle header visibility
const showVueHeader = ref(true);
// URL for the iframe
const resourceUrl = ref('');

// Event Handlers
// Resrouce URL update
const udpateResourceURL = (newURL) => {
  resourceUrl.value = newURL;
};

// Go Button Click
const handleGoButtonClick = () => {
  if(showVueHeader.value) { 
    showVueHeader.value = false;
  }
};
</script>

<template>
  <div class="controls">
    <!-- Pass updateResourceUrl as a prop to FormLoadResource -->
    <FormLoadVideo 
      @update-url="udpateResourceURL"
      @go-button-click="handleGoButtonClick"
    />
    <ButtonCapture @toggle-visibility="toggleVueHeader" />
    <FetchSteam />
  </div>
  <article>
    <header class="vueHeader">
      <div class="headerWrapper" v-if="showVueHeader">
        <img
          alt="Vue logo"
          class="logo"
          src="./assets/logo.svg"
          width="125"
          height="125"
        />
        <HelloWorld msg="You did it!" />
      </div>
      <div class="iframepage">
        <LoadFromUrl v-if="!showVueHeader" :src="resourceUrl" />
      </div>
    </header>

    <main>
      <TheWelcome />
      <ScreenShot />
    </main>
  </article>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.controls {
  text-align: right;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>