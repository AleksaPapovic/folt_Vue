import managerMutations from "./mutations.js";
import managerActions from "./actions.js";
import managerGetters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      freeManagers: [],
      module: "manager",
    };
  },
  mutations: managerMutations,
  actions: managerActions,
  getters: managerGetters,
};
