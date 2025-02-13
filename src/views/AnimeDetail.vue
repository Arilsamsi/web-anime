<template>
  <Header />
  <div class="anime-detail">
    <div class="background-container">
      <img :src="animeData.poster" class="background" />
      <div class="overlay"></div>
    </div>

    <div class="content">
      <h1 class="title">{{ animeData.title }}</h1>

      <div class="synopsis-container">
        <p class="synopsis">{{ animeData.synopsis.paragraphs?.join(" ") }}</p>
      </div>

      <button class="season-btn">Season {{ animeData.season }}</button>

      <div class="episode-list">
        <router-link
          v-for="(episode, index) in animeData.episodeList"
          :key="index"
          :to="`${episode.href}`"
          class="episode-card"
        >
          <img :src="animeData.poster" class="episode-thumbnail" />
          <p class="episode-title">Episode {{ episode.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
export default {
  name: "AnimeDetail",
  components: { Header },
  data() {
    return { animeData: {} };
  },
  async created() {
    try {
      const slug = this.$route.params.slug;
      const response = await axios.get(
        `https://wajik-anime-api.vercel.app/samehadaku/anime/${slug}`
      );
      this.animeData = response.data.data;
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  },
};
</script>

<style scoped>
h1,
p,
span {
  font-family: Arial, Helvetica, sans-serif;
}

/* --- Container Styling --- */
.anime-detail {
  background: #0a0a0a;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
}

/* --- Background & Overlay --- */
.background-container {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(6px) brightness(0.5);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

/* --- Content Section --- */
.content {
  width: 90%;
  max-width: 800px;
  text-align: center;
  margin-top: -80px;
  background: rgba(0, 0, 0, 0.75);
  padding: 20px;
  border-radius: 12px;
  z-index: 1;
}

.title {
  font-size: 22px;
  font-weight: bold;
}

/* --- Synopsis Container (Auto Scroll) --- */
.synopsis-container {
  max-height: 120px;
  overflow-y: auto;
  text-align: justify;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-top: 10px;
}

.synopsis {
  font-size: 14px;
  line-height: 1.5;
}

/* --- Season Button --- */
.season-btn {
  background: #ffcc00;
  color: black;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  margin-top: 15px;
}

/* --- Episode List --- */
.episode-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.episode-card {
  background: #222;
  border-radius: 8px;
  text-align: center;
  padding: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.episode-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}

.episode-thumbnail {
  width: 100%;
  height: 75px;
  object-fit: cover;
  border-radius: 5px;
}

.episode-title {
  font-size: 12px;
  margin-top: 6px;
}

/* --- Responsive Styling --- */
@media (max-width: 768px) {
  .background-container {
    height: 180px;
  }

  .content {
    width: 95%;
    margin-top: -70px;
    padding: 15px;
  }

  .title {
    font-size: 18px;
  }

  .synopsis-container {
    max-height: 100px;
    font-size: 12px;
  }

  .episode-list {
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  }

  .episode-thumbnail {
    height: 65px;
  }
}
</style>
