<template>
  <button type="button" class="btn-lg">
    {{ name }}<i class="arrow right"></i>
  </button>
</template>

<script>
export default {
  props: ["id", "name"],
};
</script>

<style>
.cards-section h3,
h5 {
  font-weight: 700 !important;
}

.btn-green {
  background-color: #17c3ba;
  color: #fff;
}

.btn:hover {
  color: #fff;
  opacity: 0.8 !important;
}

.btn-pad {
  padding-bottom: 50px;
}

.item-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px;
  height: 100%;
}

.card-title {
  border-radius: 5px 5px 0 0;
  color: #fff;
  text-align: center;
}

.body-text {
  height: 100px;
  padding: 0 20px 10px;
}

button {
  margin: 10px;
  width: 200px;
  height: 51px;
  border: 1px solid rgb(0, 0, 0, 0.25);
  background: white;
  color: black;
}

button:hover {
  background: white;
  color: #4ec1fc;
}

.arrow {
  border: 0px solid black;
  border-width: 0 1px 1px 0;
  padding: 3.5px;
  margin-top: 10px;
  float: right;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
</style>
