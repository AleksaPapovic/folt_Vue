export default {
  setCartArticles(state, payload) {
    state.articles = payload;
  },
  setCart(state, payload) {
    state.cart = payload;
  },
  setCartPrice(state, payload) {
    state.cartPrice += payload;
  },
  setActiveCart(state, payload) {
    state.activeCartId = payload;
  },
};
