<template>
  <div class="success-page">
    <h1>Success</h1>
    <p>{{ successMessage }}</p>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  props: {
    successMessage: {
      type: String,
      default: 'Operation Successful'
    }
  },
  name: 'SuccessPage'
}
</script>

<style scoped>
.success-page {
  text-align: center;
  padding: 50px;
}
h1 {
  font-size: 4em;
  margin: 0.5em 0;
  color: green;
}
p {
  font-size: 1.5em;
  color: #666;
}
</style>
