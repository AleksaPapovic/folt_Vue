export default {
  module(state) {
    return state.module;
  },
  isLoginActive(state) {
    return state.loginActive;
  },
  getUsernameError(state) {
    return state.usernameError;
  },
  getPasswordError(state) {
    return state.passwordError;
  },
};
