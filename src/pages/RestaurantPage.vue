<template>
  <div class="container-fluid p-0">
    <div id="restaurantPageSection">
      <div class="container py-5">
        <div class="row py-4">
          <div class="col-lg-7 pt-5 text-center restaurant">
            <h1 class="pt-5">
              <div class="white" v-if="restaurantComp !== null">
                <h2 class="white">{{ restaurant.name }}</h2>
              </div>
            </h1>
          </div>
        </div>
      </div>
      <div class="gradeAndSearch">
        <div class="container pt-4">
          <div class="d-flex">
            <img src="../assets/img/1.gif" />

            <div id="grade">
              <h3>9.6<sup>od 10</sup></h3>
            </div>
            <div class="ml-auto">
              <div id="articleSearch">
                <input type="search" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="restaurantArticles !== undefined && restaurantArticles !== null"
      id="restaurantPageArticle"
    >
      <div class="container pt 2">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <base-article
              v-for="a in this.restaurantArticles"
              :visible="a.logicalDeleted !== 1"
              :key="a.id"
              :ida="a.id"
              :name="a.name"
              :description="a.description"
              :price="a.price.amount"
              :isManagerRestaurant="isManagerOfRestaurant"
              @dodaj="noviArtikal"
              @ukloni="ukloniArtikal"
            ></base-article>
          </div>
          <div class="col-md-2">
            <div>
              <h3>Narucite</h3>
            </div>
            <div>
              <h3>Folt dostava</h3>
            </div>
          </div>
        </div>
      </div>
      <button @click="addArticlesToCart">Dodaj u kolica</button>
      <button @click="showCart">Idi na kolica</button>
    </div>
    <div class="row" v-if="commentsForRestaurant.length !== 0">
      <BaseComment
        v-for="c in restaurantComments"
        :key="c.id"
        :komentar="c.text"
        :ocena="c.rating"
        :username="c.user.username"
        :id="c.id"
        :restaurantId="c.restaurantId"
        :noButton="false"
      ></BaseComment>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseArticle from "../components/BaseArticle.vue";
export default {
  name: "RestaurantPage",
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
      role: "",
      mapaKorpa: new Map(),
      articles: [],
      korpa: [],
      restaurant: [],
      activeCartId: -1,
      isManagerOfRestaurant: false,
      cartId: null,
      restaurantComments: [],
    };
  },
  mounted() {
    this.cartId = this.$store.getters["userModule/user"].cartId;
    this.getRestaurant();
    this.isRestaurantManager();
    this.getRestaurantArticles();
    //this.getComments();
  },
  components: { BaseArticle },
  computed: {
    restaurantArticles() {
      console.log("aaarr");
      console.log(
        Object.assign(
          {},
          this.$store.getters["restaurantArticlesModule/articles"]
        )
      );
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.articles =
        this.$store.getters["restaurantArticlesModule/articles"]);
    },
    restaurantComp() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.restaurant =
        this.$store.getters["restaurantModule/restaurant"]);
    },
    commentsForRestaurant() {
      return this.restaurantComments;
    },
  },
  methods: {
    getComments() {
      axios
        .get(
          "rest/comments/restaurantComments/" + parseInt(this.$route.params.id)
        )
        .then((response) => (this.restaurantComments = response.data));
    },
    noviArtikal(value) {
      if (this.korpa.length === 0) {
        this.korpa.push(value);
      } else {
        var notInlist = true;
        this.korpa.forEach((element) => {
          if (element.id === value.id) {
            this.korpa[this.korpa.indexOf(element)] = value;
            notInlist = false;
          }
        });
        if (notInlist) {
          this.korpa.push(value);
        }
      }
      let map = new Map();
      console.log(this.korpa);
      for (const [, value] of Object.entries(this.korpa)) {
        console.log(`${value.id}: ${value.brojPorucenih}`);
        map[value.id] = value.brojPorucenih;
      }
      this.mapaKorpa = map;
      console.log("mapaKorpa" + this.mapaKorpa);
    },
    ukloniArtikal(value) {
      if (this.korpa.length !== 0) {
        this.korpa.forEach((element) => {
          if (element.id === value.id) {
            if (value.brojPorucenih === 0) {
              this.korpa.splice(this.korpa.indexOf(element), 1);
            } else {
              this.korpa[this.korpa.indexOf(element)] = value;
            }
          }
        });
      }
      let map = new Map();
      console.log(this.korpa);
      for (const [, value] of Object.entries(this.korpa)) {
        console.log(`${value.id}: ${value.brojPorucenih}`);
        map[value.id] = value.brojPorucenih;
      }
      this.mapaKorpa = map;
      console.log("mapaKorpa" + this.mapaKorpa);
    },
    dodajUKorpu() {
      this.$store.dispatch("cartModule/addToCart", {
        map: this.mapaKorpa,
        id: this.$route.params.id,
      });
    },
    getRestaurantArticles() {
      this.$store.dispatch("restaurantArticlesModule/getRestaurantArticles", {
        restaurantId: this.$route.params.id,
      });
    },
    getRestaurant() {
      this.$store.dispatch("restaurantModule/getRestaurant", {
        restaurantId: this.$route.params.id,
      });
    },
    showCart() {
      this.$router.push("/Cart/" + this.userId);
    },
    addArticlesToCart() {
      this.activeCartId = this.$store.getters["cartModule/activeCart"];
      console.log("aktivan" + this.activeCartId);
      this.dodajUKorpu();
    },
    isRestaurantManager() {
      this.isManagerOfRestaurant =
        parseInt(this.$route.params.id) ===
        parseInt(this.$store.getters["userModule/user"].restaurantId);
      console.log("Gleda menadzer" + this.isManagerOfRestaurant);
    },
  },
};
</script>

<style>
#restaurantPageSection {
  position: relative;
  display: flex;
  width: 100%;
  height: 650px;
  background: url("../assets/img/lily-banse--YHSwy6uqvk-unsplash.jpg") no-repeat;
  background-size: cover;
}
.container-fluid {
  padding: 0px;
}

.white {
  color: white;
  font-size: 50px;
  line-height: 50px;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.33);
}

.gradeAndSearch {
  position: absolute;
  background: white;
  width: 70%;
  min-height: 90px;
  left: 15%;
  bottom: 0%;
  margin-bottom: -40px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 15px -5px black !important;
  -moz-box-shadow: 0px 0px 15x -5px black !important;
  box-shadow: 0px 0px 15px -5px black !important;
}

.gradeAndSearch .container img {
  width: 50px;
  height: 50px;
  padding: 0px;
}

#grade {
  display: inline-flex;
  width: 100px;
}

.ml-auto #articleSearch > input {
  width: 250px;
  border: 1px solid #80808060;
  border-radius: 10px;
  background: #80808024;
  height: 40px;
}

#restaurantTextSection {
  background: green;
}

#restaurantPageArticle {
  margin-top: 50px;
  background: white;
  width: 100%;
  height: 500px;
}

.iplus {
  font-size: 35px;
  padding: 10px;
}
</style>
