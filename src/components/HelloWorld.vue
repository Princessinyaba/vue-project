<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="navbar">
    <nav>
      <router-link to="/">HOME</router-link>
      <router-link to="/about">ABOUT</router-link>
      <router-link to="/repo">REPOSITORIES</router-link>
      <router-link to="/errorpage">ERROR PAGE</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.navbar {
  width: 100%;
  height: 100px;
  line-height: 5;
  font-size: larger;
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: darkblue;
  font-family: 'Times New Roman', Times, serif;
}
.navbar nav {
  color: white;
  text-decoration: none;
}
</style>
