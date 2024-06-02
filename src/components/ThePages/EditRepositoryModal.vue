<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h3>Edit Repository</h3>
      <form @submit.prevent="updateRepository">
        <div class="input-form">
          <label for="repoName">Repository Name:</label>
          <input type="text" id="repoName" v-model="editedRepository.name" required />
        </div>
        <div class="text-area-form">
          <label for="repoDescription">Description:</label>
          <textarea id="repoDescription" v-model="editedRepository.description"></textarea>
        </div>
        <button type="submit" class="repo-button">Update Repository</button>
        <button type="button" class="repo-button delete" @click="deleteRepository">Delete Repository</button>
      </form>
      <div v-if="showSuccessMessage" class="success-message">Changes saved successfully!</div>
      <div v-if="showDeleteSuccessMessage" class="success-message">Repository deleted successfully!</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditRepositoryModal',
  props: {
    repository: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editedRepository: { ...this.repository },
      showSuccessMessage: false,
      showDeleteSuccessMessage: false,
      errorMessage: ''
    }
  },
  methods: {
    async updateRepository() {
      const token = import.meta.env.VITE_GITHUB_TOKEN

      const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }

      try {
        const response = await axios.patch(
          `https://api.github.com/repos/Princessinyaba/${this.repository.name}`,
          this.editedRepository,
          { headers }
        )

        if (response.status === 200) {
          this.showSuccessMessage = true
          this.errorMessage = ''

          setTimeout(() => {
            this.showSuccessMessage = false
          }, 3000)
        }
      } catch (error) {
        this.errorMessage = `Failed to update repository: ${error.message}`
      }
    },
    async deleteRepository() {
      const token = import.meta.env.VITE_GITHUB_TOKEN

      const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }

      try {
        const response = await axios.delete(
          `https://api.github.com/repos/Princessinyaba/${this.repository.name}`,
          { headers }
        )

        if (response.status === 204) {
          this.showDeleteSuccessMessage = true
          this.errorMessage = ''

          setTimeout(() => {
            this.showDeleteSuccessMessage = false
            this.$emit('close')
          }, 3000)
        }
      } catch (error) {
        this.errorMessage = `Failed to delete repository: ${error.message}`
      }
    }
  }
}
</script>

<style scoped>
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
  margin-right: 10px;
}

.repo-button:hover {
  background-color: #0056b3;
}

.repo-button.delete {
  background-color: #dc3545;
}

.repo-button.delete:hover {
  background-color: #c82333;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
}
</style>
