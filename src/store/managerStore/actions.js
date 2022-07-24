import axios from "axios";

export default {
  getFreeManagers(context) {
    axios
      .get("rest/manager/free")
      .then((response) => {
        console.log("\n\n ------- Slobodni menadzeri -------\n");
        console.log(response.data);
        context.state.freeManagers = response.data;
        context.commit("setFreeManagers", response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
};
