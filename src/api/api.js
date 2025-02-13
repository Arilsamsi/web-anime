import axios from "axios";

const api = axios.create({
  baseURL: "https://wajik-anime-api.vercel.app/samehadaku",
  timeout: 10000, // Timeout 10 detik
  headers: {
    "Content-Type": "application/json",
  },
});

// Fungsi untuk mengambil daftar anime terbaru
export async function fetchAnimeData() {
  try {
    const response = await api.get("/popular");

    if (response.data?.data?.animeList) {
      return response.data.data.animeList;
    } else {
      console.warn("⚠️ Struktur data API tidak sesuai:", response.data);
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching anime data:", error);
    return [];
  }
}

// Fungsi untuk mengambil detail anime berdasarkan slug (animeId)
export async function fetchAnimeDetail(animeId) {
  try {
    const response = await api.get(`/anime/${animeId}`);

    if (response.data) {
      return response.data.data;
    } else {
      console.warn("⚠️ Struktur data API tidak sesuai:", response.data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching anime detail:", error);
    return null;
  }
}

// Fungsi untuk mengambil server anime
export async function fetchAnimeServer(serverId) {
  try {
    const response = await api.get(`/server/${serverId}`);

    if (response.data) {
      return response.data;
    } else {
      console.warn("⚠️ Struktur data server tidak sesuai:", response.data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching anime server:", error);
    return null;
  }
}
