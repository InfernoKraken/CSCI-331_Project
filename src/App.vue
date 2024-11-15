<script setup>
import { ref } from 'vue';
import FetchSteam from './components/FetchSteam.vue';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
import Test from './components/Test.vue';
import LoadFromUrl from './components/LoadFromUrl.vue';
import ButtonCapture from './components/ButtonCapture.vue';
import FormLoadVideo from './components/FormLoadVideo.vue';

// Toggle header visibility
const showVueHeader = ref(true);
const toggleVueHeader = () => {
  showVueHeader.value = !showVueHeader.value;
};

// Reactive state for video URL
const videoUrl = ref('');

const updateVideoUrl = (newUrl) => {
  videoUrl.value = newUrl;
};
</script>

<template>
  <div class="controls">
    <!-- Pass updateVideoUrl as a prop to FormLoadVideo -->
    <FormLoadVideo @update-url="updateVideoUrl" />
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
        <LoadFromUrl v-if="!showVueHeader" :src="videoUrl" />
      </div>
    </header>

    <main>
      <TheWelcome />
      <Test />
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