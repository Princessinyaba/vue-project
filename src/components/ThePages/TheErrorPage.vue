<template>
  <TheErrorBoundary>
    <div class="error-page">
      <h1>Error Page {{ errorCode }}</h1>
      <p>{{ errorMessage }}</p>
      <router-link to="/">Back to Home</router-link>
    </div>
  </TheErrorBoundary>
</template>

<script>
import TheErrorBoundary from './TheErrorBoundary.vue'

export default {
  name: 'ErrorPage',
  components: {
    TheErrorBoundary
  },
  props: {
    errorCode: {
      type: Number,
      default: 404
    },
    errorMessage: {
      type: String,
      default: 'Page Not Found'
    }
  }
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
