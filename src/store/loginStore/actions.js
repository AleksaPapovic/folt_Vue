import axios from "axios";

export default {
  login(context, payload) {
    axios
      .post("users/login", {
        username: "" + payload.loginUsername,
        password: "" + payload.loginPassword,
      })
      .then((response) => {
        this.message = response.data;
        console.log("\n\n ------- PODACI -------\n");
        console.log(response.data);
        this.user = response.data;
        context.commit("userModule/setUser", this.user, { root: true });
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        context.state.usernameError = true;
        context.state.passwordError = true;
        console.log("\n\n ----------------------\n\n");
      });
    // this.$store.commit('userModule/setUser', this.user);
    //console.log(context.mutations['userModule/setUser']);
  },
  logout(context) {
    axios
      .post("users/logout")
      .then((response) => {
        console.log(response);
        context.commit("userModule/loggedOut", this.user, { root: true });
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
};
