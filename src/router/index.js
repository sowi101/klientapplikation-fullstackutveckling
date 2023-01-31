import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import HomeView from "../views/HomeView.vue"
import DashboardView from "../views/DashboardView.vue";
import BrandView from "../views/BrandView.vue";
import CategoryView from "../views/CategoryView.vue";
import BrandListView from "../views/BrandListView.vue";
import CategoryListView from "../views/CategoryListView.vue";
import AddProductView from "../views/AddProductView.vue";
import ProductListView from "../views/ProductListView.vue";
import UpdateProductView from "../views/UpdateProductView.vue";
import UpdateCategoryView from "../views/UpdateCategoryView.vue";
import UpdateBrandView from "../views/UpdateBrandView.vue";
import ProductView from "../views/ProductView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inloggning",
      component: LoginView,
    },
    {
      path: "/registrering",
      name: "registrering",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          // Redirection to HomeView
          next();
        } else {
          // Redirection to LoginView
          next('/'); 
          
        }
      },
      children: [
      {
        path: "",
        name: "start",
        component: HomeView,
      },
      {
        path: "produkter",
        name: "produkter",
        component: ProductListView,
      },
      {
        path: "produkter/uppdatera/:id",
        name: "uppdatera produkt",
        component: UpdateProductView,
      },
      {
        path: "produkter/:id",
        name: "enskild produkt",
        component: ProductView,
      },
      {
        path: "lagg-till-produkt",
        name: "lägg till produkt",
        component: AddProductView,
      },
      {
        path: "marken",
        name: "märken",
        component: BrandListView,
      },
      {
        path: "marke/:id",
        name: "märke",
        component: BrandView,
      },
      {
        path: "marke/uppdatera/:id",
        name: "uppdatera märke",
        component: UpdateBrandView,
      },
      {
        path: "kategorier",
        name: "kategorier",
        component: CategoryListView,
      },
      {
        path: "kategori/:id",
        name: "kategori",
        component: CategoryView,
      },
      {
        path: "kategori/uppdatera/:id",
        name: "uppdatera kategori",
        component: UpdateCategoryView,
      },
    ]
  }
  ],
});

export default router;
