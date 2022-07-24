import registrationMutations from "./mutations.js";
import registrationActions from "./actions.js";
import registrationGetters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      module: "registracija",
    };
  },
  mutations: registrationMutations,
  actions: registrationActions,
  getters: registrationGetters,
};
