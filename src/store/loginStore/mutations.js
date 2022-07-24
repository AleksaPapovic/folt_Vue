export default {
  login() {},
  openLogin(state) {
    state.loginActive = true;
  },
  closeLogin(state) {
    state.loginActive = false;
  },
};
