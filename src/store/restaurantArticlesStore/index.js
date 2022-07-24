import restaurantArticlesMutations from "./mutations.js";
import restaurantArticlesActions from "./actions.js";
import restaurantArticlesGetters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      module: "restaurantArticles",
      articles: [],
    };
  },
  mutations: restaurantArticlesMutations,
  actions: restaurantArticlesActions,
  getters: restaurantArticlesGetters,
};
