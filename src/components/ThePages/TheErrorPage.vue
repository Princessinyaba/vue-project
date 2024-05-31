<template>
  <div class="error-page">
    <h1>Error {{ errorCode }}</h1>
    <p>{{ errorMessage }}</p>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  props: {
    errorCode: {
      type: Number,
      default: 404
    },
    errorMessage: {
      type: String,
      default: 'Page Not Found'
    }
  },
  name: 'ErrorPage'
}
</script>

<style scoped>
.error-page {
  text-align: center;
  padding: 50px;
}
h1 {
  font-size: 4em;
  margin: 0.5em 0;
}
p {
  font-size: 1.5em;
  color: #666;
}
</style>
