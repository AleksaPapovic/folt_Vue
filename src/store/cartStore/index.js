import cartMutations from "./mutations.js";
import cartActions from "./actions.js";
import cartGetters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      module: "cart",
      articles: [],
      cartPrice:0,
      cart: null,
      activeCartId: -1,
    };
  },
  mutations: cartMutations,
  actions: cartActions,
  getters: cartGetters,
};
