<template>
  <div class="articleRow">
    <div class="row">
      <div class="col-2"></div>
      <div
        v-if="this.getOrderItems !== undefined && this.getOrderItems !== null"
        class="col-md-8"
      >
        <h6>Order {{ this.id }}</h6>

        <base-article
          v-for="a in orderItemsArray"
          :key="a.id"
          :ida="a.id"
          :name="a.name"
          :description="a.description"
          :price="a.cost.amount"
          :quantity="a.quantity"
          @dodaj="noviArtikal"
          @ukloni="ukloniArtikal"
        >
        </base-article>
      </div>
      <div
        v-if="this.personalSuggestionItems !== undefined && this.personalSuggestionItems !== null"
        class="col-md-8 offset-2"
      >
        <h6>Preporuka na osnovu vasih narudzbina</h6>

        <base-article
          v-for="a in personalSuggestionItems"
          :key="a.id"
          :ida="a.id"
          :name="a.name"
          :description="a.description"
          :price="a.price.amount"
          :quantity="0"
          @dodaj="noviArtikal"
          @ukloni="ukloniArtikal"
        >
        </base-article>
      </div>
      <div
        v-if="this.allSuggestionItems !== undefined && this.allSuggestionItems !== null"
        class="col-md-8 offset-2"
      >
        <h6>Preporuka na osnovu narudzbina drugih korisnika</h6>

        <base-article
          v-for="a in allSuggestionItems"
          :key="a.id"
          :ida="a.id"
          :name="a.name"
          :description="a.description"
          :price="a.price.amount"
          :quantity="0"
          @dodaj="noviArtikal"
          @ukloni="ukloniArtikal"
        >
        </base-article>
      </div>
    </div>
    <div class="row pt-3">
        <div class="col-5 offset-2">
          <button class="btn-success bg-dark" @click="getAllSuggestion">Preporuka drugih</button>
          </div>
          <div class="col-3">
          <button class="btn-success bg-info" @click="getPersonalSuggestion">Moja preporuka</button>
          </div>
        </div>
          <div class="row pt-2">
          <div class="col-5 offset-2">
          <button class="btn-success" @click="poruci">Poruci</button>
        </div>
        <div class="col-3">
          <button class="btn-danger" @click="poruci">Otkazi</button>
        </div>
      </div>
      <div class="row pt-5"><div class="col-6 offset-3">
        <h2><span v-if="this.getPrice !== 0">{{ "Cena narudzbine: "+this.suma }} </span></h2>
        </div></div>
  </div>
</template>

<script>
import BaseArticle from "../components/BaseArticle.vue";
global.jQuery = require("jquery");
export default {
  name: "CartPage",
  props: ["orderItems", "id", "restaurantId"],
  data() {
    return {
      articles: new Map(),
      orderItemsArray: [],
      orderItemsIds: [],
      allSuggestionItems: undefined,
      personalSuggestionItems: undefined,
      korpa: [],
      cart: null,
      art: [],
      mapaKorpa: null,
      suma: 0,
      stari: new Map(),
      user: null,
      cartId: null,
    };
  },
  mounted() {
    this.cartId = this.$store.getters["userModule/user"].cartId;
    this.getCartArticles();
    this.getOrderItems();
    this.$emit("updateCartPrice", this.suma);
  },
  components: { BaseArticle },
  computed: {
    getPrice() {
      console.log("suma", this.suma);
      return this.suma;
    },
  },
  methods: {
    getOrderItems() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentOrderItems = JSON.parse(
        JSON.stringify(this.orderItems.orderItems)
      );
      if (this.suma === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.orderItemsArray = Object.values(this.currentOrderItems);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.art = [];
      this.orderItemsArray.forEach((e) => {
        this.art.push({
          article: e.id,
          brojPorucenih: e.quantity,
          cena: e.cost.amount,
        });
        this.orderItemsIds.push(e.id);
        //this.restaurantID = value.restaurantId;
      });

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.art = JSON.parse(JSON.stringify(this.art));

      this.orderItemsArray.forEach((e) => {
        this.korpa.push({
          id: e.id,
          brojPorucenih: e.quantity,
        });
      });
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      let map = new Map();
      for (const [, value] of Object.entries(this.korpa)) {
        map.set(value.id, value.brojPorucenih);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.mapaKorpa = map;

      if (this.suma === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.suma = this.overallSum();
      }
      return this.orderItemsArray;
    },
    overallSum() {
      let ukupno = 0;
      this.orderItemsArray.map((oi) => {
        const e = Object.assign({}, oi);
        let amount = Object.assign({}, e.cost).amount;
        ukupno += e.quantity * amount;
        return oi;
      });
      this.suma = ukupno;
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
        this.orderItemsArray.map((oi) => {
          if (oi.id === value.id) {
            oi.quantity = oi.quantity + 1;
            this.$emit("updateCartPrice", oi.cost.amount);
            return oi;
          }
        });

        console.log("ITEMMM", this.orderItemsArray);
        if (notInlist) {
          this.korpa.push(value);
        }
      }
      let map = new Map();
      for (const [, value] of Object.entries(this.korpa)) {
        map.set(value.id, value.brojPorucenih);
      }
      this.mapaKorpa = map;
      this.overallSum();
      this.$store.dispatch("ordersModule/addProduct", {
        "Id": this.id,
        "OrderItemId": value.id
      });
    },
    ukloniArtikal(value) {
      this.orderItemsArray.map((oi) => {
        if (oi.id === value.id) {
          console.log("KOLLLLL", oi.quantity);
          oi.quantity = oi.quantity - 1;
          console.log("KOLLLLL1", oi.quantity);
          if (oi.quantity === 0) {
            console.log("null");
          }
          this.$emit("updateCartPrice", 0 - oi.cost.amount);
          console.log("KOLICINAAA", oi.quantity);
          return { ...oi, quantity: oi.quantity };
        }
      });
      console.log("itemss", this.orderItems);
      this.overallSum();
      this.$store.dispatch("ordersModule/removeProduct", {
        "Id": this.id,
        "OrderItemId": value.id
      });
    },
    poruci() {
      this.$store.dispatch("orderModule/addOrder", {
        cartId: this.cartId,
        cartPrice: this.suma,
      });
      this.art = this.getCartArticles();
    },
    async getAllSuggestion(){
      var response = await this.$store.dispatch("ordersModule/getAllSuggestions",this.orderItemsIds);
      this.allSuggestionItems = response.data.suggestedProducts;
    },
    async getPersonalSuggestion(){
      var response = await this.$store.dispatch("ordersModule/getPersonalSuggestions",this.orderItemsIds);
      this.personalSuggestionItems = response.data.suggestedProducts;
    },
    getCartArticles() {
      this.$store.dispatch("cartModule/getCartArticles");
    },
    changeCart(id, value) {
      console.log("IDDD" + id);
      console.log("Value" + value);
      console.log(typeof value);
    },
  },
};
</script>

<style></style>
