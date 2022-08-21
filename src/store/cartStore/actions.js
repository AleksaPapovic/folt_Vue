import axios from "axios";

export default {
  getCartArticles(context) {
    axios
      .get("order/inCart",{
        headers: { "Content-type": "application/json",'Authorization': localStorage.getItem("token") },
        
      })
      .then((response) => {
        console.log("\n\n -------Artikli kolica-------\n");
        context.commit("setCartArticles", response.data);
        console.log(response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  getCartRestaurantId(context) {
    axios
      .get("rest/carts/getCartRestaurantID/")
      .then((response) => {
        console.log("\n\n -------Cart Id Restorana-------\n");
        context.commit("setActiveCart", response.data);
        console.log(response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  addToCart(context, payload) {
    let articleIdsWithQuantity = new Map();
    articleIdsWithQuantity = payload.map;
    console.log("token je",localStorage.getItem("token"));
    axios
      .post("order", { orderQuantities: articleIdsWithQuantity }, {
        headers: { "Content-type": "application/json",'Authorization': localStorage.getItem("token") },
        
      })
      .then((response) => {
        this.message = response.data;
        console.log("\n\n -------Dodata korpa -------\n");
        //console.log(response.data);
        context.commit("setCartArticles", response.data);
        context.commit("setActiveCart", payload.id);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  changeCart(context, payload) {
    axios
      .post(
        "rest/carts/updateArticleQuantity/" + payload.id,
        payload.quantity,
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((response) => {
        this.message = response.data;
        console.log("\n\n -------Dodata korpa -------\n");
        console.log("prazni kart" + response.data);
        //   if (response.data === null) {
        //   context.commit('setActiveCart', -1);
        //   }
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
};
