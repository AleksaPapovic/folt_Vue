import { createStore } from "vuex";

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";
import registrationStore from "./modules/registration/index";
import loginStore from "./loginStore/index";
import userStore from "./userStore/index";
import managerStore from "./managerStore/index";
import restaurantStore from "./restaurantStore/index";
import restaurantsStore from "./restaurantsStore/index";
import cartStore from "./cartStore/index";
import ordersStore from "./ordersStore/index";
import restaurantArticlesStore from "./restaurantArticlesStore/index";

const store = createStore({
  state() {
    return {
      registrationActive: false,
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
  modules: {
    registrationModule: registrationStore,
    loginModule: loginStore,
    userModule: userStore,
    managerModule: managerStore,
    restaurantModule: restaurantStore,
    restaurantsModule: restaurantsStore,
    restaurantArticlesModule: restaurantArticlesStore,
    cartModule: cartStore,
    ordersModule: ordersStore,
  },
});

export default store;
