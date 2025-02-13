<template>
  <div class="not-found">
    <div class="content">
      <h1 class="glitch" data-text="404">404</h1>
      <p class="anime-text">
        Oops! The page you are looking for is lost in another dimension.
      </p>
      <router-link to="/" class="home-button">Return to Home</router-link>
    </div>
    <img
      src="https://i.imgur.com/qIufhof.png"
      alt="Anime 404"
      class="anime-image"
    />
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  background: url("/404.gif") no-repeat center center/cover;
  color: #fff;
  padding: 20px;
  position: relative;
}

.content h1 {
  font-size: 6rem;
  margin: 0;
  text-shadow: 4px 4px 10px rgba(255, 255, 255, 0.2);
  font-family: "Press Start 2P", cursive;
}

.anime-text {
  font-size: 1.5rem;
  font-family: "Press Start 2P", cursive;
  margin: 10px 0;
  /* margin-bottom: 2px; */
  padding-bottom: 5px;
}

.home-button {
  text-decoration: none;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1.2rem;
  color: #fff;
  background: #ff4b5c;
  border-radius: 5px;
  transition: 0.3s;
  font-family: "Press Start 2P", cursive;
}

.home-button:hover {
  background: #e63946;
}

.anime-image {
  width: 300px;
  max-width: 100%;
  margin-top: 20px;
  animation: float 3s infinite ease-in-out;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.glitch {
  position: relative;
  display: inline-block;
  color: #fff;
}

.glitch:before,
.glitch:after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.75;
}

.glitch:before {
  animation: glitch-anim 0.3s infinite alternate-reverse;
  color: #ff00ff;
  left: 2px;
  top: -2px;
}

.glitch:after {
  animation: glitch-anim 0.3s infinite alternate;
  color: #00ffff;
  left: -2px;
  top: 2px;
}

@keyframes glitch-anim {
  0% {
    transform: translate(0);
  }
  50% {
    transform: translate(-2px, 2px);
  }
  100% {
    transform: translate(2px, -2px);
  }
}

@media (max-width: 768px) {
  .content h1 {
    font-size: 4rem;
  }
  .anime-text {
    font-size: 1.2rem;
  }
  .anime-image {
    width: 250px;
  }
}
</style>
