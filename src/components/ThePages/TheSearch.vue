<template>
  <div class="search-box">
    <input
      type="text"
      v-model="query"
      @input="handleInput"
      placeholder="Search for repositories..."
    />
    <button @click="search">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    handleInput() {
      this.$emit('onSearchRepo', this.query)
    },
    search() {
      this.$emit('onSearchRepo', this.query)
    }
  }
}
</script>

<style scoped>
.search-box {
  margin-bottom: 20px;
}
.search-box input {
  padding: 8px;
  margin-right: 10px;
}
.search-box button {
  padding: 8px 16px;
}
</style>
