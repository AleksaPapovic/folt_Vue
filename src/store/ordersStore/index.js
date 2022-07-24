import ordersMutations from "./mutations.js";
import ordersActions from "./actions.js";
import ordersGetters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      module: "orders",
      orders: [],
    };
  },
  mutations: ordersMutations,
  actions: ordersActions,
  getters: ordersGetters,
};
