import restaurantsMutations from "./mutations.js";
import restaurantsActions from "./actions.js";
import restaurantsGetters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      module: "restaurants",
      restaurants: [],
    };
  },
  mutations: restaurantsMutations,
  actions: restaurantsActions,
  getters: restaurantsGetters,
};
