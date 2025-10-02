import { createRouter, createWebHistory } from 'vue-router'
import AtletaList from '../views/AtletaList.vue'
import CiudadList from '../views/CiudadList.vue'
import Home from '../views/Home.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/ciudades', component: CiudadList },
  { path: '/atletas', component: AtletaList },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
