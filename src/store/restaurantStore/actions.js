import axios from "axios";

export default {
  getRestaurant(context, payload) {
    axios
      .get("restaurant/" + payload.restaurantId)
      .then((response) => {
        this.message = response.data;
        console.log("\n\n -------Izmenjeni PODACI -------\n");
        context.commit("setRestaurant", response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  addRestaurantUpdateManager(context, payload) {
    axios
      .post("restaurant/addRestaurant/" + payload.manager, {
        restaurant: {
          name: payload.name,
          type: payload.type,
          location: payload.location,
        },
        image: payload.logoId,
      })
      .then((response) => {
        this.message = response.data;
        console.log("\n\n -------Izmenjeni PODACI -------\n");
        context.dispatch("managerModule/getFreeManagers", {}, { root: true });
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  addArticle(context, payload) {
    axios
      .post("articles/addArticle", {
        name: payload.articleName,
        price: payload.articlePrice,
        type: payload.articleType,
        restaurantId: payload.articleRestaurantId,
        quantity: payload.articleQuantity,
        description: payload.articleDescription,
        image: payload.articleImage,
      })
      .then((response) => {
        this.message = response.data;
        console.log("\n\n -------Dodat novi artikal -------\n");
        console.log(response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  updateArticle(context, payload) {
    axios
      .put("articles/updateArticle/" + payload.id, {
        name: payload.articleName,
        price: payload.articlePrice,
        type: payload.articleType,
        restaurantId: payload.articleRestaurantId,
        quantity: payload.articleQuantity,
        description: payload.articleDescription,
        image: payload.articleImage,
      })
      .then((response) => {
        this.message = response.data;
        console.log("\n\n -------Update artikla -------\n");
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
