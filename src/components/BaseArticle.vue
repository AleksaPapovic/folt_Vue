<template>
  <div class="articleRow" @click="change($event)">
    <transition name="fullAImg">
      <div class="fullArticleImg" :class="fullTheme" v-show="isClicked">
        <img src="https://picsum.photos/700/550" />
      </div>
    </transition>
    <div class="d-flex">
      <div class="p-2" v-show="brojPorucenih === 0" @click="dodajUKorpu()">
        <i class="fa fa-plus iplus" aria-hidden="true"></i>
      </div>
      <div class="p-2 pt-4" style="color: lightblue" v-show="brojPorucenih > 0">
        <h3>{{ brojPorucenih }}x</h3>
      </div>
      <div class="p-2">
        <div class="col-lg plus">
          <h3>{{ name }}</h3>
        </div>
        <div class="col-lg">
          {{ description }}
        </div>
        <div class="col-lg" style="color: blue">
          <h5>{{ price }}</h5>
        </div>
      </div>
      <transition name="aImg">
        <div :class="theme" class="ml-auto" v-show="!isClicked">
          <img class="slika" src="https://picsum.photos/700/550" />
        </div>
      </transition>
    </div>
    <div v-show="isClicked" class="row addButtons">
      <div class="col-3 pt-4">
        <div class="naslov">
          <h4>Broj: {{ brojPorucenih }}</h4>
        </div>
      </div>
      <div class="col-4">
        <div class="naslov"></div>
      </div>
      <div class="col-3 pt-4">
        <div class="d-flex">
          <div class="pt-2" v-if="!this.isManagerRestaurant">
            <button class="buttonCartMinus" @click="ukloniIzKorpe()">-</button>
          </div>
          <div class="pt-2" v-if="!this.isManagerRestaurant">
            <button class="buttonCartPlus" @click="dodajUKorpu()">+</button>
          </div>
        </div>
        <div class="pt-2" v-if="this.isManagerRestaurant">
          <button class="buttonCartMinus" @click="izmeniArtikal(id)">
            Izmeni
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
global.jQuery = require("jquery");
var $ = global.jQuery;
export default {
  data() {
    return {
      id: this.ida,
      isClicked: false,
      manji: false,
      theme: "idA",
      startTheme: "id",
      fullTheme: "id",
      brojPorucenih: 0,
      ukupnaCena: 0,
    };
  },
  props: [
    "ida",
    "name",
    "description",
    "price",
    "quantity",
    "isManagerRestaurant",
  ],
  mounted() {
    $("#baseDialogForm").modal("show");
    let style = document.createElement("link");
    style.type = "text/css";
    style.rel = "stylesheet";
    style.href = "css/baseArticle.css";
    document.head.appendChild(style);
    this.isClicked = false;
    this.theme = "idA" + this.id;
    this.fullTheme = "idF" + this.id;
    if (this.quantity > 0) {
      this.brojPorucenih = this.quantity;
    }
  },
  methods: {
    closeRegistration() {
      this.$store.commit("closeRegistration");
    },
    closeLogin() {
      this.$store.commit("loginModule/closeLogin");
    },
    check(evt) {
      if (evt.srcElement.id === "baseDialogForm") {
        $("#baseDialogForm").mousedown(function () {});
        this.closeRegistration();
        this.closeLogin();
      }
    },
    change(evt) {
      if (
        evt.srcElement.className === "buttonCartPlus" ||
        evt.srcElement.className === "fa fa-plus iplus" ||
        evt.srcElement.className === "buttonCartMinus"
      ) {
        console.log("no change");
      } else {
        this.isClicked = !this.isClicked;
        if (this.isClicked === false) {
          console.log($(".ml-auto "));
          // $('.ml-auto')[this.id].style='opacity:0';
          $("." + this.theme).css("opacity", "0");
          $("." + this.fullTheme).css("margin-top", "0px");
          setTimeout(() => {
            $("." + this.theme).css("opacity", "1");
            // $('.ml-auto')[this.id].style='opacity:1';
            $("." + this.fullTheme).css("margin-top", "-300px");
          }, 1);
        } else {
          //  $('.ml-auto')[this.id].style='opacity:1';
          $("." + this.theme).css("opacity", "10");
          $("." + this.fullTheme).css("margin-top", "-300px");
          setTimeout(() => {
            // $('.ml-auto')[this.id].style='opacity:0';
            $("." + this.theme).css("opacity", "0");
            $("." + this.fullTheme).css("margin-top", "0px");
          }, 1);
        }
      }
    },
    dodajUKorpu() {
      this.brojPorucenih = this.brojPorucenih + 1;
      this.$emit("dodaj", {
        id: this.id,
        brojPorucenih: this.brojPorucenih,
      });
    },
    ukloniIzKorpe() {
      if (this.brojPorucenih - 1 <= 0) {
        this.brojPorucenih = 0;
      } else {
        this.brojPorucenih = this.brojPorucenih - 1;
      }
      this.$emit("ukloni", {
        id: this.id,
        brojPorucenih: this.brojPorucenih,
      });
    },
    izmeniArtikal(id) {
      this.$router.push("/UpdateArticle/" + id);
    },
  },
};
</script>

<style>
.articleRow {
  margin-top: 20px !important;
  border-top: 1px solid #80808040 !important;
  border-bottom: 1px solid #80808040 !important;
  border-radius: 10px !important;
  overflow: hidden;
}

.articleRow:hover {
  margin-top: 20px !important;
  border: 1px solid #80808040 !important;
  box-shadow: 0px 0px 15px -7px;
}

.articleImg {
  padding: 10px;
  opacity: 1;
}
.slika {
  width: 220px !important;
  height: 180px !important;
  border-radius: 5px;
}

.fullArticleImg {
  padding: 0px;
  height: 300px;
}

.fullArticleImg img {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  max-height: 300px !important;
}

.fullAImg-enter-active {
  transition: all 0.4s ease-out;
}

.fullAImg-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.fullAImg-enter-from,
.fullAImg-enter-to {
  transform: scaleY(1);
  margin-top: -300px;
}

.fullAImg-leave-from,
.fullAImg-leave-to {
  transform: scaleY(1);
  margin-top: -300px;
}

.aImg-enter-active {
  transition: all 0.4s ease;
}

.aImg-leave-active {
  transition: all 0.4s ease-in-out;
}

.aImg-enter-from {
  opacity: 0;
}
.aImg-enter-to {
  opacity: 1;
}

.aImg-leave-from {
  opacity: 1;
}
.aImg-leave-to {
  opacity: 0;
}

.addButtons {
  width: 100%;
  margin: 0;
  height: 100px;
  border-top: 1px solid grey;
}

.buttonCartMinus {
  margin: 0;
  background: white;
  width: 100px;
  height: 55px;
  border: 1px solid grey;
  padding: 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.buttonCartPlus {
  margin: 0;
  background: white;
  width: 100px;
  height: 55px;
  border: 1px solid grey;
  padding: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.naslov {
  margin-top: 15px;
}
</style>
