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
  async getAllSuggestions(context,payload) {
    const userDetails =  await axios
      .post("order/suggestion/all",{orderItemsIds: payload},{
        headers: {
           'Authorization': localStorage.getItem("token")
        }
      });
      console.log("UPAO",userDetails);
      return userDetails;
  },
  async getPersonalSuggestions(context,payload) {
    const userDetails =  await axios
      .post("order/suggestion/personal",{orderItemsIds: payload},{
        headers: {
           'Authorization': localStorage.getItem("token")
        }
      });
      console.log("UPAO2",userDetails);
      return userDetails;
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
  addProduct(context, payload) {
    axios
      .post("/order/add", payload,{
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
  removeProduct(context, payload) {
    axios
      .post("/order/remove", payload,{
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
