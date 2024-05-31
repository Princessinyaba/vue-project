<template>
  <div class="repo-box">
    <router-view></router-view>
    <Search @onSearchRepo="searchRepos" />
    <div class="repo-section">
      <div v-for="repo in repos" :key="repo.id" class="repo-hold">
        <p>
          <b
            >Project id: <router-link :to="`/repo/${repo.name}`">{{ repo.name }}</router-link></b
          >
        </p>
        <hr />
        <p><b>Project name:</b> {{ repo.name }}</p>
        <p>{{ repo.description || 'No description' }}</p>
        <a :href="repo.html_url" target="_blank" rel="noopener noreferrer"> View on GitHub </a>
      </div>
    </div>
    <button @click="toggleModal">Create Repo</button>
    <div class="button-box">
      <button @click="prevPage" :disabled="page === 1">Previous Page</button>
      <button @click="nextPage">Next Page</button>
    </div>
    <p v-if="loading">Loading...</p>
    <ul>
      <li v-for="repos in repos2" :key="repos.id">
        <a :href="repos.html_url" target="_blank" rel="noopener noreferrer">{{
          repos.full_name
        }}</a>
      </li>
    </ul>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="toggleModal">&times;</span>
        <h2>Create a New Repository</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-form">
            <label for="repoName">Repository Name:</label>
            <input type="text" id="repoName" v-model="repoName" required />
          </div>
          <div class="text-area-form">
            <label for="repoDescription">Description:</label>
            <textarea id="repoDescription" v-model="repoDescription"></textarea>
          </div>
          <button type="submit" class="repo-button">Create Repository</button>
        </form>
        <p v-if="responseMessage">{{ responseMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TheSearch from './TheSearch.vue'

export default {
  name: 'TheRepo',
  components: TheSearch,

  data() {
    return {
      repos: [],
      repos2: [],
      loading: false,
      page: 1,
      repoName: '',
      repoDescription: '',
      responseMessage: '',
      isModalOpen: false
    }
  },
  mounted() {
    this.fetchRepos()

    // Event listeners for modal
    window.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    async fetchRepos() {
      const perPage = 5
      try {
        const response = await fetch(
          `https://api.github.com/users/Princessinyaba/repos?page=${this.page}&per_page=${perPage}`
        )

        if (response.ok) {
          const data = await response.json()
          this.repos = data
        } else {
          console.error('Failed to fetch repositories')
        }
      } catch (error) {
        console.error('Error fetching repositories:', error)
      }
    },
    async searchRepos(query) {
      this.loading = true
      try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        this.repos2 = data.items
      } catch (error) {
        console.error('Error searching repositories:', error)
      } finally {
        this.loading = false
      }
    },
    async handleSubmit() {
      const data = {
        name: this.repoName,
        description: this.repoDescription,
        private: false,
        auto_init: true
      }

      const token = import.meta.env.VITE_GITHUB_TOKEN

      const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }

      try {
        const response = await axios.post('https://api.github.com/user/repos', data, { headers })

        if (response.status === 201) {
          this.responseMessage = 'Repository created successfully.'
          this.isModalOpen = false
        }
      } catch (error) {
        this.responseMessage = `Failed to create repository: ${error.message}`
      }
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
    nextPage() {
      this.page++
      this.fetchRepos()
    },
    prevPage() {
      if (this.page > 1) {
        this.page--
        this.fetchRepos()
      }
    },
    handleOutsideClick(event) {
      const modal = this.$el.querySelector('.modal')
      if (event.target === modal) {
        this.toggleModal()
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

.repo-box {
  padding: 20px;
}

.repo-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.repo-hold {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(33.333% - 40px);
  box-sizing: border-box;
}

.button-box {
  margin-top: 20px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.input-form,
.text-area-form {
  margin-bottom: 20px;
}

.repo-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.repo-button:hover {
  background-color: #0056b3;
}
</style>
