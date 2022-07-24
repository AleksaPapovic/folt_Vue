import axios from "axios";

export default {
  getRestaurantArticles(context, payload) {
    axios
      .get("rest/articles/restaurant/" + payload.restaurantId)
      .then((response) => {
        console.log("\n\n -------Artikli -------\n");
        context.commit("setRestaurantArticles", response.data);
        console.log(response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
};
