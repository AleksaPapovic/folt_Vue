export default {
  setUser(state, payload) {
    state.user = payload;
    console.log("userr", state.user);
    if(state.user !== ""){
    state.logged = true;
    }
    console.log(state.user);
  },
  loggedOut(state) {
    state.user = {
      username: "",
      password: "",
      name: "",
      surname: "",
      gender: "",
      dateOfBirth: "",
      role: null,
      restaurantId: null,
      cartId: null,
    };
    state.logged = false;
    console.log("odjavio se");
  },
};
