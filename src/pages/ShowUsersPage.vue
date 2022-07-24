<template>
  <div class="container-fluid" v-if="updatedUsers.length !== 0">
    <div class="container pt-4">
      <h2>Korisnici sistema</h2>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <h2 class="pt-5">Administratori</h2>

          <div class="d-flex pt-2">
            <div class="pt-2 m-auto">Korisnicko ime</div>
            <div class="pt-2 m-auto">Ime</div>
            <div class="pt-2 m-auto">Prezime</div>
          </div>
          <BaseUser
            v-for="a in admins"
            :key="a.id"
            :name="a.name"
            :surname="a.surname"
            :username="a.username"
          ></BaseUser>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <h2 class="pt-5">Menadzeri</h2>
          <div class="pt-2 m-auto">Korisnicko ime</div>
          <div class="pt-2 m-auto">Ime</div>
          <div class="pt-2 m-auto">Prezime</div>
          <BaseUser
            v-for="m in managers"
            :key="m.id"
            :name="m.name"
            :surname="m.surname"
            :username="m.username"
          ></BaseUser>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <h2 class="pt-5">Dostavljaci</h2>
          <div class="pt-2 m-auto">Korisnicko ime</div>
          <div class="pt-2 m-auto">Ime</div>
          <div class="pt-2 m-auto">Prezime</div>
          <BaseUser
            v-for="d in delivers"
            :key="d.id"
            :name="d.name"
            :surname="d.surname"
            :username="d.username"
          ></BaseUser>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <h2 class="pt-5">Kupci</h2>
          <div class="pt-2 m-auto">Korisnicko ime</div>
          <div class="pt-2 m-auto">Ime</div>
          <div class="pt-2 m-auto">Prezime</div>
          <BaseUser
            v-for="c in customers"
            :key="c.id"
            :name="c.name"
            :surname="c.surname"
            :username="c.username"
          ></BaseUser>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showUsers",
  data() {
    return {
      users: [],
      managers: [],
      delivers: [],
      admins: [],
      customers: [],
    };
  },
  mounted() {
    let style = document.createElement("link");
    style.type = "text/css";
    style.rel = "stylesheet";
    // style.href = 'css/showUsers.css';
    document.head.appendChild(style);
    this.$store.dispatch("userModule/getUsers");
  },
  computed: {
    updatedUsers() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.users = this.$store.getters["userModule/getterUsers"];
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.admins = this.getByRole(0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.managaers = this.getByRole(2);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.delivers = this.getByRole(1);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.customers = this.getByRole(3);
      return this.users;
    },
  },
  methods: {
    getByRole(role) {
      return this.users.filter((user) => {
        return user.role === role;
      });
    },
  },
};
</script>

<style></style>
