<template>
  <div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="d-flex justify-content-between position-absolute w-100"></div>
      <div class="img-hover-zoom img-hover-zoom--xyz">
        <img
          src="https://picsum.photos/700/550"
          class="card-img-top"
          alt="Product"
        />
        <div class="cardOverlay" @click="open">
          Pogledaj <br />
          {{ name }} <br />
          ponudu
        </div>
      </div>
      <div class="card-body px-2 pb-2 pt-1">
        <div class="d-flex justify-content-between">
          <div>
            <p class="h4">{{ name }}</p>
          </div>
          <div>
            <a
              href="#"
              class="text-secondary lead"
              data-toggle="tooltip"
              data-placement="left"
              title="Compare"
            >
              <p class="starcolor d-flex align-items-center mb-2">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-half-o" aria-hidden="true"></i>
              </p>
            </a>
          </div>
        </div>
        <p class="mb-0">
          <strong>
            <a href="#" v-if="isOpen === 'OPEN'" class="text-secondary"
              >Otvoren</a
            >
            <a href="#" v-else class="text-secondary">Zatvoren</a>
          </strong>
        </p>
        <p class="mb-1">
          <small>
            <a href="#" class="text-secondary">{{ type }}</a>
          </small>
        </p>
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
    open() {
      this.$router.push("/Restaurant/" + this.id);
    },
  },
  props: ["name", "isOpen", "type", "id"],
};
</script>

<style>
#baseOnlineRestaurant {
  margin: 15px;
  position: relative;
  width: 300px;
  height: 300px;
  background: #00000080;
  float: left;
}

.card {
  border: 0px !important;
  -webkit-box-shadow: 0px 0px 20px 2px black !important;
  -moz-box-shadow: 0px 0px 20px 2px black !important;
  box-shadow: 0px 0px 20px 2px black !important;
  overflow: hidden; /* Removing this will break the effects */
}

.cardOverlay {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  height: 100%;
  transition: 0.5s ease;
  opacity: 0;
  color: white;
  font-size: 20px;
  padding: 50px;
  text-align: center;
}
.cardOverlay:hover {
  opacity: 1;
}

.img-hover-zoom {
  max-height: 150px;
  overflow: hidden; /* Removing this will break the effects */
}

.img-hover-zoom img {
  transform-origin: 65% 75%;
  transition: transform 1s, filter 0.5s ease-out;
}

.img-hover-zoom:hover img {
  transform: scale(1.15);
}

.starcolor {
  color: #b51414;
}
</style>
