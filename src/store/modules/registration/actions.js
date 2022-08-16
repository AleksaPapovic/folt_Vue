import axios from "axios";

export default {
  register(context, payload) {
    console.log(payload);

    axios
      .post("user/register", {
        username: payload.username,
        password: payload.password,
        name: payload.name,
        surname: payload.surname,
        gender: parseInt(payload.gender),
        dateOfBirth: payload.dateOfBirth,
        role: 0,
      })
      .then((response) => {
        this.message = response.data;
        console.log("\n\n ------- PODACI -------\n");
        console.log(response.data);
        console.log("\n\n ----------------------\n\n");
      })
      .catch((err) => {
        console.log("\n\n ------- ERROR -------\n");
        console.log(err);
        console.log("\n\n ----------------------\n\n");
      });
  },
  addManagerDeliver(context, payload) {
    console.log(payload);
    axios
      .post("user/addUser", {
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
        console.log("\n\n ------- PODACI Manager Deliver -------\n");
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
