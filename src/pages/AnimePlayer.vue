<template>
  <!-- <Header /> -->
  <div class="anime-player">
    <!-- Tombol Kembali -->
    <div class="back">
      <a href="/"> <i class="bi bi-arrow-left"></i> Kembali </a>
    </div>

    <!-- Video Player -->
    <div class="video-container">
      <iframe
        v-if="selectedServerUrl"
        :src="selectedServerUrl"
        frameborder="0"
        allowfullscreen
        sandbox="allow-same-origin allow-scripts allow-popups"
        class="video-player"
      ></iframe>
      <div v-else class="alert">Pilih server untuk memutar video.</div>
    </div>

    <!-- Pilih Server -->
    <div v-if="filteredQualities.length > 0" class="server-select">
      <label for="server-select">Pilih Server:</label>
      <select id="server-select" v-model="selectedServer">
        <option disabled value="">Pilih Kualitas & Server</option>
        <optgroup
          v-for="(quality, index) in filteredQualities"
          :key="index"
          :label="quality.title"
        >
          <option
            v-for="(server, idx) in quality.serverList"
            :key="idx"
            :value="server.href"
          >
            {{ server.title }}
          </option>
        </optgroup>
      </select>
    </div>

    <div v-else class="alert">Tidak ada server yang tersedia.</div>

    <!-- Judul Anime -->
    <h1 class="title">{{ animeData.title }}</h1>

    <!-- Navigasi Episode -->
    <div class="navigation">
      <button
        v-if="animeData.hasPrevEpisode"
        @click="goToPrevEpisode"
        class="nav-button"
      >
        ⬅ Episode Sebelumnya
      </button>
      <button
        v-if="animeData.hasNextEpisode"
        @click="goToNextEpisode"
        class="nav-button next"
      >
        Episode Berikutnya ➡
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Header from "../components/Header.vue";

export default {
  name: "AnimePlayer",
  components: {
    // Header,
  },
  data() {
    return {
      animeData: {},
      serverData: { qualities: [] },
      selectedServer: "",
      selectedServerUrl: "",
    };
  },
  computed: {
    filteredQualities() {
      return this.serverData.qualities.filter((q) => q.serverList.length > 0);
    },
  },
  watch: {
    selectedServer(newHref) {
      if (newHref) {
        this.fetchServerUrl(newHref);
      }
    },
  },
  async created() {
    try {
      const episodeId = this.$route.params.episodeId;
      if (!episodeId) throw new Error("Episode ID tidak ditemukan!");

      const response = await axios.get(
        `https://wajik-anime-api.vercel.app/samehadaku/episode/${episodeId}`
      );

      if (!response.data.data) throw new Error("Episode data tidak ditemukan!");

      this.animeData = response.data.data;
      this.serverData = this.animeData.server || { qualities: [] };

      let fallbackServer = null;
      for (const quality of this.serverData.qualities) {
        if (quality.serverList.length > 0) {
          fallbackServer = quality.serverList[0];
          break;
        }
      }

      if (fallbackServer) {
        this.selectedServer = fallbackServer.href;
        this.fetchServerUrl(fallbackServer.href);
      }
    } catch (error) {
      console.error("Error fetching episode/server data:", error);
    }
  },
  methods: {
    async fetchServerUrl(serverHref) {
      try {
        const serverUrl = `https://wajik-anime-api.vercel.app${serverHref}`;
        const serverResponse = await axios.get(serverUrl);

        if (!serverResponse.data.data || !serverResponse.data.data.url) {
          throw new Error("Server URL tidak ditemukan!");
        }

        this.selectedServerUrl = serverResponse.data.data.url;
      } catch (error) {
        console.error("Error fetching server URL:", error);
      }
    },
    goToPrevEpisode() {
      if (this.animeData.hasPrevEpisode) {
        this.$router.push({ path: this.animeData.prevEpisode.href });
      }
    },
    goToNextEpisode() {
      if (this.animeData.hasNextEpisode) {
        this.$router.push({ path: this.animeData.nextEpisode.href });
      }
    },
  },
};
</script>

<style scoped>
/* Background & Container */
.anime-player {
  background: #121826;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  /* width: 100%; */
}

/* Tombol Kembali */
.back {
  width: 100%;
  max-width: 800px;
  text-align: left;
  margin-bottom: 15px;
}

.back a {
  color: #ffcc00;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.back i {
  margin-right: 8px;
}

/* Video Container */
.video-container {
  width: 90%;
  max-width: 800px;
  position: relative;
  background: black;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 10px 25px rgba(255, 255, 255, 0.1);
}

.video-container::after {
  content: "";
  display: block;
  padding-bottom: 56.25%;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Pilihan Server */
.server-select {
  margin-top: 15px;
  width: 90%;
  max-width: 400px;
}

.server-select label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #ffcc00;
}

.server-select select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
}

/* Judul Anime */
.title {
  margin-top: 15px;
  font-size: 24px;
  font-weight: bold;
  color: #ffcc00;
}

/* Navigasi Episode */
.navigation {
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 800px;
  margin-top: 20px;
}

.nav-button {
  background: linear-gradient(135deg, #ffcc00, #ff9900);
  color: black;
  padding: 12px 20px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
}

.nav-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.next {
  margin-left: auto;
}

/* Alert */
.alert {
  margin-top: 15px;
  padding: 15px;
  background: rgba(255, 204, 0, 0.1);
  color: #ffcc00;
  font-weight: bold;
  border-radius: 8px;
}

/* Responsiveness */
@media (max-width: 768px) {
  .title {
    font-size: 20px;
  }

  .nav-button {
    padding: 10px 15px;
    font-size: 14px;
  }
}
</style>
d
