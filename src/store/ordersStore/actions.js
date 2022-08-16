import axios from "axios";

export default {
  getOrders(context) {
    axios
      .get("rest/orders",{
        headers: {
           'Authorization': localStorage.getItem.token
        }
      })
      .then((response) => {
        console.log("\n\n -------Porudzbine -------\n");
        context.commit("setOrders", response.data);
        console.log(response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  updateOrder(context, payload) {
    axios
      .put("rest/orders/updateOrder/" + payload.orderId, payload.order)
      .then((response) => {
        console.log("\n\n -------Porudzbine -------\n");
        context.commit("setOrders", response.data);
        console.log(response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  deleteOrder(context, payload) {
    axios
      .delete("rest/orders/deleteOrder/" + payload.orderId)
      .then((response) => {
        console.log("\n\n -------Porudzbine -------\n");
        context.commit("setOrders", response.data);
        console.log(response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  addOrder(context, payload) {
    axios
      .post("orders/createOrder/" + payload.cartId, payload.cartPrice, {
        headers: { "Content-type": "application/json",'Authorization': localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("\n\n -------Porudzbine -------\n");
        context.commit("setOrders", response.data);
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
