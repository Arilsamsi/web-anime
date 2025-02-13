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
      console.log(this.query);
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}
.search-box {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}
.search-btn {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.3s;
}
.search-btn:hover {
  background-color: #0056b3;
}
</style>
