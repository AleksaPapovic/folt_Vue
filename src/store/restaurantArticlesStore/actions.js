import axios from "axios";

export default {
  getRestaurantArticles(context, payload) {
    axios
      .get("restaurant/" + payload.restaurantId)
      .then((response) => {
        console.log("\n\n -------Artikli -------\n");
        context.commit(
          "setRestaurantArticles",
          response.data.menu._menuArticle
        );
        console.log(response.data.menu._menuArticle);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
};
