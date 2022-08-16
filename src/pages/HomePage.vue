<template>
  <div class="container-fluid p-0">
    <the-online-restaurants></the-online-restaurants>
    <section class="mt-5 cards-section">
      <div class="container">
        <h2>Istraži gradove u kojima ćeš naći MFOOD</h2>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-sm-12">
            <h2 class="pt-5">
              🇷🇸 Srbija <br />
              <button class="showCountries">Prikaži sve zemlje</button>
            </h2>
          </div>
          <div class="col-lg-8 col-sm-2">
            <city
              v-for="city in cities"
              :key="city.id"
              :id="city.id"
              :name="city.name"
            ></city>
          </div>
        </div>
      </div>
    </section>
    <base-dialog v-if="isRegistration">
      <template v-slot:header>
        <h5 class="modal-title" id="exampleModalLabel">Create Account</h5>
        <button
          type="button"
          class="text-center close"
          data-dismiss="modal"
          aria-label="Close"
          @click="closeRegistration"
        >
          X
        </button>
      </template>
      <template v-slot:body>
        <keep-alive>
          <form>
            <div class="modal-body">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="username"
                  class="form-control"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username"
                  v-model="username"
                />
              </div>
              <div class="mb-3">
                <label for="password1" class="form-label">Password </label>
                <input
                  type="password"
                  class="form-control"
                  id="password1"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div class="mb-3">
                <label for="password1" class="form-label"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="password2"
                  placeholder="Confirm Password"
                  v-model="confirmPassword"
                />
              </div>
              <div class="mb-3">
                <label for="firstname" class="form-label">Name</label>
                <input
                  type="firstname"
                  class="form-control"
                  id="firstname"
                  aria-describedby="firstnameHelp"
                  placeholder="Enter name"
                  v-model="firstname"
                />
                <small id="firstnameHelp" class="form-text text-muted"
                  >Your information is safe with us.</small
                >
              </div>
              <div class="mb-3">
                <label for="surname" class="form-label">Surname </label>
                <input
                  type="surname"
                  class="form-control"
                  id="surname"
                  placeholder="Enter surname"
                  v-model="surname"
                />
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label pt-2">Pol</label>
                <input
                  class="radioRegistration"
                  type="radio"
                  v-model="gender"
                  value="0"
                />MALE
                <input
                  class="radioRegistration"
                  type="radio"
                  v-model="gender"
                  value="1"
                />FEMALE
                <br />
              </div>
              <div class="mb-3">
                <label for="dateofbirth" class="form-label pt-4"
                  >Datum rodjenja </label
                ><br />
                <input
                  type="date"
                  name="dateofbirth"
                  id="dateofbirth"
                  v-model="dateofbirth"
                />
              </div>
            </div>
            <div
              class="modal-footer border-top-0 d-flex justify-content-center"
            >
              <button
                type="submit"
                class="btn btn-success"
                @click.prevent="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </keep-alive>
      </template>
    </base-dialog>

    <base-dialog v-if="isLogin">
      <template v-slot:header>
        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
        <button
          type="button"
          class="text-center close"
          data-dismiss="modal"
          aria-label="Close"
          @click="closeLogin"
        >
          X
        </button>
      </template>
      <template v-slot:body>
        <keep-alive>
          <form>
            <div class="modal-body">
              <div class="mb-3">
                <label for="loginUsername" class="form-label">Username</label>
                <input
                  type="username"
                  class="form-control"
                  id="loginUsername"
                  aria-describedby="loginUsernameHelp"
                  placeholder="Enter username"
                  v-model="loginUsername"
                />
                <span class="loginError" v-if="usernameEmpty"
                  >Morate uneti vase korisnicko ime</span
                >
                <span class="loginError" v-if="usernameError"
                  >Pogresno korisnicko ime</span
                >
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="loginPassword"
                  placeholder="Password"
                  v-model="loginPassword"
                />
                <span class="loginError" v-if="passwordEmpty"
                  >Morate uneti vasu sifru</span
                >
                <span class="loginError" v-if="passwordError"
                  >Pogresna sifra</span
                >
              </div>
              <div
                class="modal-footer border-top-0 d-flex justify-content-center"
              >
                <button
                  type="submit"
                  class="btn btn-success"
                  @click.prevent="login"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </keep-alive>
      </template>
    </base-dialog>
  </div>
</template>

<script>
global.jQuery = require("jquery");
var $ = global.jQuery;
import BaseDialog from "@/components/BaseDialog.vue";
import City from "../components/TheCity.vue";
import TheOnlineRestaurants from "../components/TheOnlineRestaurants.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      surname: "",
      gender: "",
      dateofbirth: "",
      loginUsername: "",
      loginPassword: "",
      usernameEmpty: false,
      passwordEmpty: false,
      cities: [
        {
          id: 12,
          name: "London",
        },
        {
          id: 100,
          name: "Novi Sad",
        },
        {
          id: 102,
          name: "Kraljevo",
        },
        {
          id: 110,
          name: "Beograd",
        },
        {
          id: 111,
          name: "Beograd 2",
        },
        {
          id: 113,
          name: "Beograd 3",
        },
      ],
    };
  },
  mounted() {},
  computed: {
    isRegistration() {
      return this.$store.getters.isActive;
    },
    isLogin() {
      return this.$store.getters["loginModule/isLoginActive"];
    },
    usernameError() {
      return this.$store.getters["loginModule/getUsernameError"];
    },
    passwordError() {
      return this.$store.getters["loginModule/getPasswordError"];
    },
  },
  methods: {
    closeRegistration() {
      this.$store.commit("closeRegistration");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    },
    closeLogin() {
      this.$store.commit("loginModule/closeLogin");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    },
    submit() {
      console.log(this.$store.getters["registrationModule/module"]);
      this.$store.dispatch("registrationModule/register", {
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        name: this.firstname,
        surname: this.surname,
        gender: this.gender,
        dateOfBirth: this.dateofbirth,
      });
    },
    login() {
      if (this.loginUsername === "") {
        this.usernameEmpty = true;
        $("#loginUsername").css("border", "2px solid red");
        setTimeout(() => {
          $("#loginUsername").css("border", "1px solid #ced4da");
        }, 1000);
        return false;
      }
      if (this.loginPassword === "") {
        this.usernameEmpty = false;
        this.passwordEmpty = true;
        $("#loginPassword").css("border", "2px solid red");
        setTimeout(() => {
          $("#loginPassword").css("border", "1px solid #ced4da");
        }, 1000);
        return false;
      } else {
        this.usernameEmpty = false;
        this.passwordEmpty = false;
        this.$store
          .dispatch("loginModule/login", {
            loginUsername: this.loginUsername,
            loginPassword: this.loginPassword,
          })
          .then(() => {
            if (!this.usernameError || !this.passwordError) this.closeLogin();
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
          });
      }
    },
  },
  components: { BaseDialog, City, TheOnlineRestaurants },
};
</script>

<style>
h2 {
  font-weight: 800;
  color: black;
}

.container-fluid {
  padding: 0%;
}
.showCountries {
  background: white;
  border: 0;
  font-size: 17px;
  color: rgb(25, 153, 238);
}
.radioRegistration {
  width: 50px;
  margin-top: 10px;
}
#dateofbirth {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
}

.loginError {
  color: red;
  font-size: 14px;
}

.restaurantsSearchButton {
  background-color: #00000070;
  color: white;
  border: none;
  border-radius: 10px;
  outline: none;
}
.restaurantsSearchButton:hover {
  background-color: #00000090;
  color: white;
  border: none;
  border-radius: 10px;
  outline: none;
}

.restaurantsSearchInput {
  background-color: #00000080;
  color: white;
  border: none;
  border-radius: 10px;
  outline: none;
}

.restaurantsSearchCheckbox {
  background-color: #00000080;
  color: white;
  border: none;
  border-radius: 10px;
  outline: none;
  width: 30px;
}
.restaurantsSearchLabel {
  background-color: #00000070;
  border-radius: 10px;
  color: white;
}
.form-label {
  float: left;
}
</style>
