import axios from "axios";

export default {
  setCurrentUser(context) {
    axios
      .get("rest/edit/profileUser")
      .then((response) => {
        console.log("\n\n ------- Ulogovani -------\n");
        console.log(response.data);
        context.state.user = response.data;
        context.commit("setUser", context.state.user);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  editUser(context, payload) {
    axios
      .post("rest/edit/saveUserChanges", {
        username: payload.username,
        password: payload.password,
        name: payload.name,
        surname: payload.surname,
        gender: payload.gender,
        dateOfBirth: payload.dateOfBirth,
        role: payload.role,
      })
      .then((response) => {
        this.message = response.data;
        console.log("\n\n -------Izmenjeni PODACI -------\n");
        console.log(response.data);
        context.state.user = response.data;
        context.commit("setUser", context.state.user);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  getUsers(context) {
    axios
      .get("rest/user")
      .then((response) => {
        console.log("\n\n ------- Korisnici -------\n");
        console.log(response.data);
        context.state.users = response.data;
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  getUser(context, payload) {
    axios
      .get("rest/users/" + payload.userId)
      .then((response) => {
        console.log("\n\n ------- Korisnik -------\n");
        context.state.user = response.data;
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
};
