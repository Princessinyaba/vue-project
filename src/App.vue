<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="app-container">
    <h1>MY GITHUB API PROJECT CONVERTED TO VUE</h1>
    <div class="navbar">
      <router-link to="/">HOME</router-link>
      <router-link to="/about">ABOUT</router-link>
      <router-link to="/repo">REPOS</router-link>
      <router-link to="/errorpage">ERROR PAGE</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <TheFooter />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
body {
  font-family: 'Times New Roman', Times, serif;
  background-color: darkblue;
  color: #333;
  margin: 0;
  padding: 0;
}

.app-container {
  height: auto;
  background-color: darkcyan;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 20px;
}

.navbar {
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
}

.navbar a {
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  font-size: larger;
  font-weight: bolder;
  transition: background-color 0.3s;
}

.navbar a:hover {
  background-color: #575757;
}

.content {
  background-color: #fff;
  font-size: large;

  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 60px;
}
</style>
