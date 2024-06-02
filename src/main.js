import './assets/main.css'
import TheHome from './components/ThePages/TheHome.vue'
import TheAbout from './components/ThePages/TheAbout.vue'
import TheRepo from './components/ThePages/TheRepo.vue'
import TheErrorPage from './components/ThePages/TheErrorPage.vue'
import TheErrorBoundary from './components/ThePages/TheErrorBoundary.vue'
import TheSuccessPage from './components/ThePages/TheSuccessPage.vue'
import EditRepositoryModal from './components/ThePages/EditRepositoryModal.vue'
import TheSearch from './components/ThePages/TheSearch.vue'
import TheSingleRepo from './components/ThePages/TheSingleRepo.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TheHome },
    { path: '/about', component: TheAbout },
    { path: '/repo', component: TheRepo },
    { path: '/errorpage', component: TheErrorPage },
    { path: '/repo', component: TheErrorBoundary, props: { component: TheRepo } },
    { path: '/successpage', component: TheSuccessPage },
    { path: '/search', component: TheSearch },
    { path: '/editrepository', component: EditRepositoryModal },
    { path: '/repo/:reponame', component: TheSingleRepo }
  ]
})
const app = createApp(App)

app.use(router)
app.mount('#app')
