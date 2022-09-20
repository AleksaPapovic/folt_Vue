export default {
  module(state) {
    return state.module;
  },
  user(state) {
    return state.user;
  },
  logged(state) {
    return state.logged;
  },
  isAdmin(state) {
    if (state.user.role === 3) {
      return true;
    }
  },
  isManager(state) {
    if (state.user.role === 1) {
      return true;
    }
  },
  isCustomer(state) {
    if (state.user.role === 0) {
      return true;
    }
  },
  isDelivery(state) {
    if (state.user.role === 2) {
      return true;
    }
  },
  canSeeOrders(state) {
    if (
      state.user.role === 1 ||
      state.user.role === 2 ||
      state.user.role === 3
    ) {
      return true;
    }
  },
  getterUsers(state) {
    return state.users;
  },
};
