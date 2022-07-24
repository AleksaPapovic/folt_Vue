import userMutations from "./mutations.js";
import userActions from "./actions.js";
import userGetters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      module: "korisnik",
      user: {
        username: "",
        password: "",
        name: "",
        surname: "",
        gender: "",
        dateOfBirth: "",
        role: null,
        restaurantId: null,
        cartId: null,
      },
      logged: false,
      users: [],
    };
  },
  mutations: userMutations,
  actions: userActions,
  getters: userGetters,
};
