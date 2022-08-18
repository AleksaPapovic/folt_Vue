<template>
  <div class="articleRow" @click="change($event)">
    <div class="container pt 2">
        <div class="row">
          <div class="col-md-2"></div>
          <div v-if= "this.getOrderItems!== undefined &&  this.getOrderItems !== null" class="col-md-8">
            
             // :name="a.article.name"
             // :description="a.article.description"
             //  :price="a.article.price"
            <base-article
              v-for="a in currentOrderItems"
              :key="a.id"
              :ida="a.id"
           
              :quantity="a.brojPorucenih"
              @dodaj="noviArtikal"
              @ukloni="ukloniArtikal"
            >
            </base-article>
          </div>
          <div class="col-md-2">
            <button @click="poruci">Poruci</button>
            Ukupan racun: {{ suma }}
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import BaseArticle from "../components/BaseArticle.vue";
global.jQuery = require("jquery");
export default {
  name: "CartPage",
  props: ['orderItems'],
  data() {
    return {
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
  console.log("ORDERIIII", this.orderItems);
    this.cartId = this.$store.getters["userModule/user"].cartId;
    this.getCartArticles();
  },
   components: { BaseArticle },
  computed: {
    getOrderItems() {
   /* eslint-disable */ 
      console.log("ORDERIIII CCCCC", this.orderItems);
      console.log("ORDERIIII C22222", JSON.parse(JSON.stringify(this.orderItems.orderItems)));
      this.currentOrderItems = JSON.parse(JSON.stringify(this.orderItems.orderItems));
      
       console.log("ORDERIIII C3333", this.currentOrderItems[0].quantity);
       return this.orderItems;
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
      this.articles.forEach(e => {
              console.log("ovde", e.cost.amount);
            console.log("test ",e.id);
               console.log("test2 ",e.quantity);
        sumica += e.cost.amount * e.quantity;
        this.korpa.push({
          id: e.id,
          brojPorucenih: e.quantity,
         });
      });
      console.log(sumica);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.suma = sumica;

      return this.articles;
    }
  },
  methods: {
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

</style>
