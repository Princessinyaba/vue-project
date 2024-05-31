import './assets/main.css'
import TheHome from './components/ThePages/TheHome.vue'
import TheAbout from './components/ThePages/TheAbout.vue'
import TheRepo from './components/ThePages/TheRepo.vue'
import TheErrorPage from './components/ThePages/TheErrorPage.vue'
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
    { path: '/search', component: TheSearch },
    { path: '/repo/:reponame', component: TheSingleRepo }
  ]
})
const app = createApp(App)

app.use(router)
app.mount('#app')