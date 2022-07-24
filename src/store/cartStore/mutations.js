export default {
  setCartArticles(state, payload) {
    state.articles = new Map(Object.entries(payload));
  },
  setCart(state, payload) {
    state.cart = payload;
  },
  setActiveCart(state, payload) {
    state.activeCartId = payload;
  },
};
