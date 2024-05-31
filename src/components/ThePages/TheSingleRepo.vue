<template>
  <div class="repo-details">
    <h1>{{ repo ? repo.name : 'Loading...' }}</h1>
    <div v-if="repo">
      <p>Description: {{ repo.description || 'No description' }}</p>
      <p>
        URL:
        <a :href="repo.html_url" target="_blank" rel="noopener noreferrer">
          {{ repo.html_url }}
        </a>
      </p>
      <p>Stars: {{ repo.stargazers_count }}</p>
      <p>Watchers: {{ repo.watchers_count }}</p>
      <p>Forks: {{ repo.forks_count }}</p>
      <!-- Functional back button -->
      <button @click="goBack">Back</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'TheSingleRepo',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const reponame = ref(route.params.reponame)
    const repo = ref(null)

    const fetchRepo = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/Princessinyaba/${reponame.value}`
        )
        repo.value = response.data
      } catch (error) {
        console.error('Error fetching repository details:', error)
      }
    }

    onMounted(fetchRepo)

    watch(
      () => route.params.reponame,
      (newReponame) => {
        reponame.value = newReponame
        fetchRepo()
      }
    )

    // Function to navigate back
    const goBack = () => {
      router.go(-1) // Go back one step in history
    }

    return {
      repo,
      goBack
    }
  }
}
</script>

<style scoped>
.repo-details {
  padding: 20px;
}

.repo-details h1 {
  font-size: 2em;
}

.repo-details p {
  margin: 10px 0;
}
</style>
