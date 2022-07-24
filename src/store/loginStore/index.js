import loginMutations from "./mutations.js";
import loginActions from "./actions.js";
import loginGetters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      module: "logovanje",
      loginActive: false,
      usernameError: false,
      passwordError: false,
      user: {},
    };
  },
  mutations: loginMutations,
  actions: loginActions,
  getters: loginGetters,
};
