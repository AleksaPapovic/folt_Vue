<template>
  <div class="container-fluid">
    <div v-if="cartComp">
      <h1>Moj Cart</h1>
    </div>
    <div id="restaurantPageArticle">
      <div class="container pt 2">
        <div class="row">
          <div class="col-md-1"></div>
          <div v-if= "cartArticles!== undefined &&  cartArticles !== null &&  cartArticles !== []" class="col-md-8">

            <the-order v-for="order in cartArticles"
              :key="order.restaurantID" :orderItems="order"></the-order>
          </div>
          <div class="col-md-1">
            <button @click="poruci">Poruci</button>
            Ukupan racun: {{ suma }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheOrder from "../components/TheOrder.vue";
export default {
  name: "CartPage",
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
      articles: new Map(),
      korpa: [],
      cart: null,
      art: [],
      mapaKorpa: null,
      suma: 0,
      stari: new Map(),
      restaurantId: null,
      user: null,
      cartId: null,
    };
  },
  mounted() {
    this.cartId = this.$store.getters["userModule/user"].cartId;
    this.getCartArticles();
  },
   components: { TheOrder },
  computed: {
    cartArticles() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.articles = this.$store.getters["cartModule/articles"];
      console.log("artikli su" + this.articles);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.art = [];
      this.articles.forEach(e => {
       this.art.push({ article: e.id, brojPorucenih: e.quantity });
        //this.restaurantID = value.restaurantId;
      });
      console.log("ART",JSON.parse(JSON.stringify(this.art)));
       // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.art = JSON.parse(JSON.stringify(this.art));
      let sumica = 0;
  //    this.articles.forEach(e => {
  //            console.log("ovde", e.cost.amount);
  //          console.log("test ",e.id);
   //            console.log("test2 ",e.quantity);
   //     sumica += e.cost.amount * e.quantity;
    //    this.korpa.push({
     //     id: e.id,
   //       brojPorucenih: e.quantity,
     //    });
   //   });
      console.log(sumica);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.suma = sumica;

      return this.articles;
    },
    cartComp() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.cart = this.$store.getters["cartModule/cart"]);
    },
  },
  methods: {
    checkId(val) {
      console.log(val);
      let k;
      this.articles.forEach((key, value) => {
        if (val === JSON.parse(value)) {
          k = key;
        }
      });
      return k;
    },
    overallSum() {
      this.suma = 0;
      let s = 0;
      this.mapaKorpa.forEach((values, keys) => {
        s = 0;
        this.art.forEach((element) => {
          console.log("elemid" + element.article.id);
          console.log("kljuc" + keys);
          if (element.article.id === keys) {
            s = values * element.article.price;
          }
        });
        this.suma += s;
      });
      return this.suma;
    },
    noviArtikal(value) {
      if (this.korpa.length === 0) {
        this.korpa.push(value);
      } else {
        var notInlist = true;
        this.korpa.forEach((element) => {
          if (element.id === value.id) {
            this.changeCart(element.id, value.brojPorucenih);
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
        //map[value.id] = value.brojPorucenih;
        map.set(value.id, value.brojPorucenih);
      }
      this.mapaKorpa = map;
      console.log(map);
      this.overallSum();
    },
    ukloniArtikal(value) {
      if (this.korpa.length === 0) {
        console.log("prazna");
      } else {
        this.korpa.forEach((element) => {
          if (element.id === value.id) {
            if (value.brojPorucenih === 0) {
              this.changeCart(element.id, 0);
              this.korpa.splice(this.korpa.indexOf(element), 1);
              // const indeks = this.art.indexOf({ 'article': element, 'brojPorucenih': value.brojPorucenih });
              // console.log("indeks jee" + indeks);
              // this.art.splice(indeks+1, 1);
            } else {
              this.changeCart(element.id, value.brojPorucenih);
              this.korpa[this.korpa.indexOf(element)] = value;
            }
          }
        });
        let map = new Map();
        console.log(this.korpa);
        for (const [, value] of Object.entries(this.korpa)) {
          console.log(`${value.id}: ${value.brojPorucenih}`);
          //map[value.id] = value.brojPorucenih;
          map.set(value.id, value.brojPorucenih);
        }
        this.mapaKorpa = map;
        console.log(this.korpa);
        this.overallSum();
      }
    },
    poruci() {
      this.activeCartId = this.$store.getters["cartModule/activeCart"];
      console.log("porucio " + this.activeCartId);
      if (this.activeCartId !== -1) {
        console.log("PORUCIO");
        this.$store.dispatch("ordersModule/addOrder", {
          cartId: this.cartId,
          cartPrice: this.suma,
        });
      }
      this.art = this.getCartArticles();
    },
    getCartArticles() {
      this.$store.dispatch("cartModule/getCartArticles");
    },
    changeCart(id, value) {
      console.log("IDDD" + id);
      console.log("Value" + value);
      console.log(typeof value);
      this.$store.dispatch("cartModule/changeCart", {
        id: id,
        quantity: parseInt(value),
      });
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
