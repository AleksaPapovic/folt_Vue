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
      <div class="row pt-3">
        <div class="col-6 offset-4">
          <button class="btn-success" @click="poruci">Poruci</button> Cena
          porudzbine:
          <div v-if="this.getPrice !== 0">{{ this.suma }}</div>
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
  props: ["orderItems", "id", "restaurantId"],
  data() {
    return {
      articles: new Map(),
      orderItemsArray: [],
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
    getCartArticles() {
      this.$store.dispatch("cartModule/getCartArticles");
    },
    changeCart(id, value) {
      console.log("IDDD" + id);
      console.log("Value" + value);
      console.log(typeof value);
      //    this.$store.dispatch("cartModule/changeCart", {
      //      id: id,
      //     quantity: parseInt(value),
      //   });
    },
  },
};
</script>

<style></style>
