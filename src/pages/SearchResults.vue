<template>
  <Header />
  <div class="search-results-container">
    <h2 v-if="route.query.q">
      Hasil Pencarian untuk:
      <span class="query-text">"{{ route.query.q }}"</span>
    </h2>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Memuat...
    </div>

    <!-- Daftar Anime -->
    <div v-if="animeList.length > 0" class="anime-grid">
      <div v-for="anime in animeList" :key="anime.id" class="anime-card">
        <router-link :to="`/samehadaku/anime/${anime.animeId}`">
          <img :src="anime.poster" :alt="anime.title" class="anime-img" />
          <div class="anime-info">
            <h3 class="anime-title">{{ anime.title }}</h3>
            <div class="anime-genre">
              <span
                v-for="genre in anime.genreList"
                :key="genre.genreId"
                class="genre-badge"
              >
                {{ genre.title }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Jika Tidak Ada Hasil -->
    <div v-else-if="!isLoading" class="no-results">
      <i class="fas fa-exclamation-circle"></i> Tidak ada hasil ditemukan.
    </div>
  </div>
  <div class="back mb-2">
    <a class="btn btn-sm btn-primary" href="/samehadaku"
      ><i class="bi bi-arrow-left"></i
    ></a>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Header from "../components/Header.vue";

export default {
  name: "SearchReults",
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    const animeList = ref([]);
    const isLoading = ref(false);

    const fetchAnime = async () => {
      const query = route.query.q || "";
      if (!query.trim()) return;

      isLoading.value = true;
      try {
        const response = await axios.get(
          "https://wajik-anime-api.vercel.app/samehadaku/search",
          {
            params: { q: query },
          }
        );
        console.log(response.data.data.animeList);

        animeList.value = response.data.data.animeList || [];
      } catch (error) {
        console.error("Error fetching anime search results:", error);
      } finally {
        isLoading.value = false;
      }
    };

    watch(() => route.query.q, fetchAnime);
    onMounted(fetchAnime);

    return { route, animeList, isLoading };
  },
};
</script>

<style scoped>
/* Kontainer utama */
.search-results-container {
  padding: 20px;
  text-align: center;
  max-width: 1200px;
  margin: auto;
}

/* Judul pencarian */
h2 {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 15px;
}
.query-text {
  font-weight: bold;
  color: #0056b3;
}

/* Loading */
.loading {
  font-size: 18px;
  color: #007bff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.loading i {
  font-size: 24px;
}

/* Grid anime */
.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
  justify-items: center;
}

/* Kartu anime */
.anime-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 180px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.anime-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
}

/* Gambar anime */
.anime-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

/* Info anime */
.anime-info {
  padding: 10px;
  text-align: center;
}
.anime-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
.anime-genre {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
}

/* Jika tidak ada hasil */
.no-results {
  font-size: 18px;
  color: #dc3545;
  margin-top: 20px;
}
.no-results i {
  font-size: 24px;
}
.back {
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 25px;
}
</style>
