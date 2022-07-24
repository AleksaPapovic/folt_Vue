import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import Restaurant from "./pages/RestaurantPage";
import Administrator from "./pages/AdministratorPage";
import CreateArticle from "./pages/CreateArticlePage";
import ShowUsers from "./pages/ShowUsersPage";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/Profil",
    name: "Profil",
    component: Profile,
  },
  {
    path: "/Restaurant/:id",
    name: "Restaurant",
    component: Restaurant,
  },
  {
    path: "/AdministratorCrud",
    name: "AdministratorCrud",
    component: Administrator,
  },
  //     {
  //     path: '/CreateRestaurant',
  //     name: 'CreateRestaurant',
  //       component: CreateRestaurantComponent,
  //       children: [
  //       { name:'create-manager-for-restaurant', path: ':manager', component: AdministratorCrudComponent , props: true}
  //     ]
  //   },
  {
    path: "/CreateArticle",
    name: "CreateArticle",
    component: CreateArticle,
  },
  {
    path: "/ShowUsers",
    name: "ShowUsers",
    component: ShowUsers,
  },
  //       {
  //     path: '/UpdateArticle/:idArticle',
  //     name: 'UpdateArticle',
  //     component: UpdateArticleComponent
  //   } ,
  //   {
  //     path: '/Cart/:id',
  //     name: 'Cart',
  //     component: CartComponent
  //   },
  //   {
  //     path: '/Orders',
  //     name: 'Orders',
  //     component: OrdersComponent
  //   },
  //   {
  //     path: '/NotApprovedComments',
  //     name: 'NotApprovedComments',
  //     component: ManagerCommentsComponent
  //   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
