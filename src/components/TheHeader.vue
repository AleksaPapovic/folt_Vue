<template>
  <div>
    <header class="header-area overlay">
      <nav class="navbar sticky-top navbar-expand-lg navbar-dark">
        <div class="container">
          <router-link to="/" class="navbar-brand">Folt Delivery</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto w-100 justify-content-end">
              <li v-if="!isLogged">
                <router-link class="nav-link" to="/" @click="openLogin"
                  >Prijava</router-link
                >
              </li>
              <li v-if="!isLogged">
                <router-link class="nav-link" to="/" @click="openRegistration"
                  >Registrovanje</router-link
                >
              </li>
              <li v-if="isLogged">
                <router-link class="nav-link" to="/Profil">Profil</router-link>
              </li>
              <li v-if="isAdmin">
                <router-link class="nav-link" to="/AdministratorCrud"
                  >CRUD</router-link
                >
              </li>
              <li v-if="isAdmin">
                <router-link class="nav-link" to="/createRestaurant"
                  >Add Restaurant</router-link
                >
              </li>
              <li v-if="isAdmin">
                <router-link class="nav-link" to="/ShowUsers"
                  >Korisnici</router-link
                >
              </li>
              <li v-if="isManager">
                <router-link class="nav-link" to="/CreateArticle"
                  >Dodaj Artikal</router-link
                >
              </li>

              <li v-if="canSeeOrders">
                <router-link class="nav-link" to="/Orders"
                  >Moje Porudzbine</router-link
                >
              </li>
              <li v-if="isCustomer && cartIdComp">
                <router-link
                  class="nav-link"
                  :to="{ name: 'Cart', params: { id: this.userId } }"
                  >Kolica</router-link
                >
              </li>

              <li v-if="isLogged">
                <router-link @click="logout" class="nav-link" to="/"
                  >Odjavi se</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productPage: false,
      cartId: null,
      userId: 3,
    };
  },
  methods: {
    openRegistration() {
      this.$store.commit("openRegistration");
    },
    openLogin() {
      this.$store.commit("loginModule/openLogin");
    },
    logout() {
      this.$store.dispatch("loginModule/logout");
    },
  },
  mounted() {
    this.cartId = this.$store.getters["userModule/user"].cartId;
    return this.$store.dispatch("userModule/setCurrentUser");
  },
  computed: {
    isLogged() {
      return this.$store.getters["userModule/logged"];
    },
    isAdmin() {
      return this.$store.getters["userModule/isAdmin"];
    },
    isManager() {
      return this.$store.getters["userModule/isManager"];
    },
    isCustomer() {
      return this.$store.getters["userModule/isCustomer"];
    },
    canSeeOrders() {
      return this.$store.getters["userModule/canSeeOrders"];
    },
    cartIdComp() {
      return this.$store.getters["userModule/user"].cartId;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700,800");
@import url("https://fonts.googleapis.com/css?family=Lobster");

input {
  width: 200px;
}
.header-area {
  position: relative;
  height: 68px;
  background: white;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repear;
  background-size: cover;
}
.navbar {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  width: 100%;
  transition: background 0.6s ease-in;
  height: 68px;
  box-shadow: 0px 0px 17px 1px;
  border: none;
}
.navbar .navbar-brand {
  font-family: "Lobster", cursive;
  font-size: 2rem;
  color: black !important;
}

.navbar .navbar-toggler {
  position: relative;
  height: 50px;
  width: 50px;
  border: none;
  cursor: pointer;
  outline: none;
  background: black;
}
.navbar-dark .navbar-nav .nav-link {
  cursor: pointer;
  position: relative;
  color: black;
  font-size: 1.1rem;
}
.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: black;
}
.navbar.fixed-top {
  position: fixed;
  -webkit-animation: navbar-animation 0.6s;
  animation: navbar-animation 0.6s;
  background-color: rgba(0, 0, 0, 0.6);
}

@media screen and (max-width: 991px) {
  .navbar-brand {
    margin-left: 20px;
  }
  .navbar-nav {
    padding: 0 20px;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .navbar-dark .navbar-nav .nav-link {
    position: relative;
    color: white;
    font-size: 0.9rem;
  }
  input {
    width: 160px;
  }
}
@media screen and (min-width: 767px) {
  .navbar-dark .navbar-nav .nav-link {
    padding: 23px 15px;
  }
  .navbar-dark .navbar-nav .nav-link::after {
    content: "";
    position: absolute;
    bottom: 15px;
    left: 15%;
    right: 15%;
    height: 1px;
    background-color: black;
    -webkit-transform: scaleX(0);
    -ms-transform: scaleX(0);
    transform: scaleX(0);
    transition: transform 0.4s ease-in;
  }
  .navbar-dark .navbar-nav .nav-link:hover::after {
    -webkit-transform: scaleX(1);
    -ms-transform: scaleX(1);
    transform: scaleX(1);
  }
}
@media screen and (max-width: 370px) {
  input {
    width: 120px;
  }
}
@media screen and (max-width: 280px) {
  input {
    width: 85px;
  }
}
</style>
