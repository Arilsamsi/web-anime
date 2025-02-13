<template>
  <!-- <Header /> -->
  <div class="container">
    <div class="back">
      <a href="/samehadaku">
        <i class="bi bi-arrow-left"></i>
      </a>
    </div>

    <div class="video-wrapper">
      <iframe
        v-if="selectedServerUrl"
        :src="selectedServerUrl"
        frameborder="0"
        allowfullscreen
        sandbox="allow-same-origin allow-scripts allow-popups"
        class="video-player"
      ></iframe>
      <div v-else class="alert alert-warning mt-3">
        Pilih server untuk memutar video.
      </div>
    </div>

    <!-- Dropdown untuk memilih server -->
    <div v-if="filteredQualities.length > 0" class="mt-3">
      <label for="server-select" class="form-label">Pilih Server:</label>
      <select id="server-select" class="form-select" v-model="selectedServer">
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

    <div v-else class="alert alert-warning mt-3">
      Tidak ada server yang tersedia.
    </div>

    <h1 class="title">{{ animeData.title }}</h1>
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
//   import Header from "../components/HeaderSamehadaku.vue";

export default {
  name: "AnimePlayer",
  components: {
    //   Header,
  },
  data() {
    return {
      animeData: {},
      serverData: { qualities: [] }, // Menyimpan daftar server
      selectedServer: "", // Server yang dipilih oleh user
      selectedServerUrl: "", // URL server yang dipilih
    };
  },
  computed: {
    // Hanya menampilkan kualitas yang memiliki server
    filteredQualities() {
      return this.serverData.qualities.filter((q) => q.serverList.length > 0);
    },
  },
  watch: {
    // Ketika server dipilih, update URL video
    selectedServer(newHref) {
      if (newHref) {
        this.fetchServerUrl(newHref);
      }
    },
  },
  async created() {
    try {
      const episodeId = this.$route.params.episodeId;
      console.log("Episode ID:", episodeId);

      if (!episodeId) throw new Error("Episode ID tidak ditemukan!");

      // Fetch episode data
      const response = await axios.get(
        `https://wajik-anime-api.vercel.app/samehadaku/episode/${episodeId}`
      );
      console.log("Episode Data:", response.data);

      if (!response.data.data) throw new Error("Episode data tidak ditemukan!");

      this.animeData = response.data.data;
      this.serverData = this.animeData.server || { qualities: [] };

      console.log("Server Data:", this.serverData);

      // Ambil server pertama yang tersedia (jika ada)
      let fallbackServer = null;
      for (const quality of this.serverData.qualities) {
        if (quality.serverList.length > 0) {
          fallbackServer = quality.serverList[0];
          break;
        }
      }

      if (fallbackServer) {
        this.selectedServer = fallbackServer.href; // Set server pertama sebagai default
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
        console.log("Fetching Server from:", serverUrl);

        const serverResponse = await axios.get(serverUrl);
        console.log("Server Data Response:", serverResponse.data);

        if (!serverResponse.data.data || !serverResponse.data.data.url) {
          throw new Error("Server URL tidak ditemukan!");
        }

        this.selectedServerUrl = serverResponse.data.data.url;
        console.log("Final Streaming URL:", this.selectedServerUrl);
      } catch (error) {
        console.error("Error fetching server URL:", error);
      }
    },
    // Fungsi untuk berpindah ke episode sebelumnya
    goToPrevEpisode() {
      if (this.animeData.hasPrevEpisode) {
        this.$router.push({ path: this.animeData.prevEpisode.href });
      }
    },

    // Fungsi untuk berpindah ke episode berikutnya
    goToNextEpisode() {
      if (this.animeData.hasNextEpisode) {
        this.$router.push({ path: this.animeData.nextEpisode.href });
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  color: #000;
}
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
  border-radius: 10px;
}
.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.title {
  margin-top: 15px;
  font-size: 24px;
  color: #0044cc;
}
.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.nav-button {
  background: #0044cc;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
}
.nav-button:hover {
  background: #002a80;
}
.next {
  margin-left: auto;
}
.form-select {
  width: 100%;
  max-width: 400px;
  margin: auto;
}
.alert {
  padding: 15px;
  background: #ffcc00;
  color: black;
  font-weight: bold;
  border-radius: 5px;
}

/* Responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  .title {
    font-size: 20px;
  }
  .nav-button {
    padding: 8px 15px;
    font-size: 14px;
  }
}
</style>
