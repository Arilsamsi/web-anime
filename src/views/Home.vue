<template>
  <div
    class="container"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <Header />
    <div class="banner">
      <div class="slider" :style="`--quantity: ${limitedAnimes.length}`">
        <a
          v-for="(anime, index) in limitedAnimes"
          :key="index"
          class="item"
          :style="`--position: ${index + 1}`"
          :href="anime.href"
        >
          <img :src="anime.poster" :alt="anime.title" />
        </a>
        <div class="top-anime">
          <h1>Top Anime</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { fetchAnimeData } from "../api/api"; // Gunakan API.js
import Header from "../components/Header.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  setup() {
    const animes = ref([]);
    const backgroundImage = ref("");
    const router = useRouter();
    let intervalId = null;
    const currentIndex = ref(0);

    const fetchAnime = async () => {
      animes.value = await fetchAnimeData();

      if (animes.value.length > 0) {
        backgroundImage.value = animes.value[0].poster;
        // console.log("Background Image:", backgroundImage.value);
        startImageRotation();
      }
    };

    const limitedAnimes = computed(() => animes.value.slice(0, 10));

    const startImageRotation = () => {
      if (intervalId) clearInterval(intervalId);

      intervalId = setInterval(() => {
        if (limitedAnimes.value.length > 0) {
          currentIndex.value =
            (currentIndex.value + 1) % limitedAnimes.value.length;
          backgroundImage.value =
            limitedAnimes.value[currentIndex.value].poster;
          // console.log("Background Changed", backgroundImage.value);
        }
      }, 5000);
    };

    const goToDetail = (anime) => {
      if (!anime.animeId) {
        console.error("animeId tidak ditemukan:", anime);
        return;
      }
      router.push({ name: "AnimeDetail", params: { animeId: anime.animeId } });
    };

    onUnmounted(() => {
      if (intervalId) clearInterval(intervalId);
    });

    onMounted(fetchAnime);
    return { animes, limitedAnimes, backgroundImage, goToDetail };
  },
};
</script>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/ica-rubrik-black");
@import url("https://fonts.cdnfonts.com/css/poppins");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #d2d2d2;
}
.container {
  width: 100%;
  height: 100vh;
  text-align: center;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease-in-out;
  margin: 0;
  padding: 0;
  z-index: 1;
}
.container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: inherit;
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  z-index: -1;
  width: 100%;
  height: 100vh;
}
.banner {
  width: 100%;
  height: 100vh;
  text-align: center;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease-in-out;
  margin: 0;
  padding: 0;
}

.slider {
  position: absolute;
  width: 200px;
  height: 250px;
  top: 10%;
  left: calc(50% - 100px);
  transform-style: preserve-3d;
  transform: perspective(1000px);
  animation: autoRun 20s linear infinite;
  z-index: 2;
}
@keyframes autoRun {
  from {
    transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
  }
  to {
    transform: perspective(1000px) rotateX(-16deg) rotateY(360deg);
  }
}
.item {
  position: absolute;
  inset: 0 0 0 0;
  transform: rotateY(
      calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
    )
    translateZ(550px);
}
.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(1400px, 100vw);
  height: max-content;
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.content h1 {
  font-family: "ICA Rubrik";
  font-size: 16em;
  line-height: 1em;
  color: #25283b;
  position: relative;
}
.content h1::after {
  position: absolute;
  inset: 0 0 0 0;
  content: attr(data-content);
  z-index: 2;
  -webkit-text-stroke: 2px #d2d2d2;
  color: transparent;
}
.author {
  font-family: Poppins;
  text-align: right;
  max-width: 200px;
}
.author h2 {
  font-size: 3em;
}
.top-anime {
  font-size: 1rem;
  font-weight: bold;
  color: #3674b5;
  font-family: Arial, Helvetica, sans-serif;
}
@media screen and (max-width: 1023px) {
  .slider {
    width: 160px;
    height: 200px;
    left: calc(50% - 80px);
  }
  .item {
    transform: rotateY(
        calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
      )
      translateZ(300px);
  }
  .content h1 {
    text-align: center;
    width: 100%;
    text-shadow: 0 10px 20px #000;
    font-size: 7em;
  }
  .author {
    color: #fff;
    padding: 20px;
    text-shadow: 0 10px 20px #000;
    z-index: 2;
    max-width: unset;
    width: 100%;
    text-align: center;
    padding: 0 30px;
  }
}
@media screen and (max-width: 767px) {
  .slider {
    width: 100px;
    height: 150px;
    left: calc(50% - 50px);
  }
  .item {
    transform: rotateY(
        calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
      )
      translateZ(180px);
  }
  .content h1 {
    font-size: 5em;
  }
}
</style>
