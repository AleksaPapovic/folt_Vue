export default {
  setCartArticles(state, payload) {
    state.articles = payload;
  },
  setCart(state, payload) {
    state.cart = payload;
  },
  setActiveCart(state, payload) {
    state.activeCartId = payload;
  },
};
