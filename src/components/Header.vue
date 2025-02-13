<template>
  <div class="search-container">
    <input
      v-model="query"
      @keyup.enter="goToSearchResults"
      type="text"
      placeholder="Cari anime..."
      class="search-box"
    />
    <button @click="goToSearchResults" class="search-btn">Cari</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    goToSearchResults() {
      if (!this.query.trim()) return;
      this.$router.push({
        path: "/samehadaku/search",
        query: { q: this.query },
      });
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  margin: auto;
  transition: all 0.3s ease-in-out;
  z-index: 1;
}

.search-box {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  outline: none;
  background: rgba(255, 255, 255, 0.4);
  color: #333;
  transition: all 0.3s;
}
.search-box::placeholder {
  color: rgba(0, 0, 0, 0.5);
}
.search-box:focus {
  background: rgba(255, 255, 255, 0.6);
}

.search-btn {
  padding: 12px 18px;
  cursor: pointer;
  background: linear-gradient(135deg, #007bff, #00c6ff);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}
.search-btn:hover {
  background: linear-gradient(135deg, #0056b3, #0090ff);
  transform: scale(1.05);
}
</style>
