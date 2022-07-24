<template>
  <div id="baseDialogOverlay">
    <div
      class="modal"
      id="baseDialogForm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
      @click="outsideClose($event)"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-bottom-0">
              <slot name="header"></slot>
            </div>
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
global.jQuery = require("jquery");
var $ = global.jQuery;
export default {
  mounted() {
    $("#baseDialogForm").modal("show");
  },
  methods: {
    outsideClose(evt) {
      if (evt.srcElement.id === "baseDialogForm") {
        $("#baseDialogForm").modal("hide");
        this.closeRegistration();
        this.closeLogin();
      }
    },
    closeRegistration() {
      this.$store.commit("closeRegistration");
    },
    closeLogin() {
      this.$store.commit("loginModule/closeLogin");
    },
    check(evt) {
      console.log("zatvaranje");
      console.log(evt);
      if (evt.srcElement.id === "baseDialogForm") {
        $("#baseDialogForm").mousedown(function () {
          console.log("Mouse button released.");
        });
        this.closeRegistration();
        this.closeLogin();
      }
    },
  },
};
</script>

<style>
.modal-header .close {
  padding: 0;
  margin: 0px;
}
button.close {
  background: #e8dada94;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0;
  font-weight: 400;
  opacity: 1;
}
.modal-content {
  -webkit-box-shadow: 0px 0px 20px 0px black !important;
  -moz-box-shadow: 0px 0px 20px 0px black !important;
  box-shadow: 0px 0px 20px 0px black !important;
}
body {
  overflow: visible !important;
  padding-right: 0px !important;
}
</style>
