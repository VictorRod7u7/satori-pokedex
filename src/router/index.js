import { createRouter, createWebHistory } from "vue-router";

// importamos los componentes para usarlos en nuestro objeto de rutas
import Pokedex from "@/pages/PokedexPage.vue";
import Home from "@/pages/WelcomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/pokedex",
    name: "pokedex",
    component: Pokedex,
  },
];

const router = createRouter({
  //eslint-disable-next-line
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
