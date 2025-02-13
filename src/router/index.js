import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import AnimeDetail from "../views/AnimeDetail.vue";
import SearchResults from "../pages/SearchResults.vue";
import AnimePlayer from "../pages/AnimePlayer.vue";
// import AnimePlayer from "../pages/AnimePlayer.vue";
import PageNotFound from "../pages/PageNotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    //SLug
    {
      path: "/samehadaku/anime/:slug",
      name: "AnimeDetail",
      component: AnimeDetail,
    },
    // {
    //   path: "/samehadaku/episode/:slug",
    //   name: "AnimeDetail",
    //   component: AnimeDetail,
    // },
    {
      path: "/samehadaku/episode/:episodeId",
      name: "AnimePlayer",
      component: AnimePlayer,
    },
    {
      path: "/samehadaku/search",
      name: "SearchResults",
      component: SearchResults,
    },

    //404
    {
      path: "/:pathMatch(.*)",
      component: PageNotFound,
    },
  ],
});

export default router;
