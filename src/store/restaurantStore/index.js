import restaurantMutations from "./mutations.js";
import restaurantActions from "./actions.js";
import restaurantGetters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      module: "restaurant",
      restaurant: null,
    };
  },
  mutations: restaurantMutations,
  actions: restaurantActions,
  getters: restaurantGetters,
};
