import axios from "axios";

export default {
  getRestaurants(context) {
    axios
      .get("restaurant")
      .then((response) => {
        console.log("\n\n -------Restorani -------\n");
        context.commit("setRestaurants", response.data);
        console.log(response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  filterByType(context) {
    axios
      .get("rest/restaurants/filterByType")
      .then((response) => {
        console.log("\n\n -------Restorani -------\n");
        context.commit("setRestaurants", response.data);
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
