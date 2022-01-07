<template>
  <div>
    <v-row class="flex-row">
      <v-col cols="12" md="6" sm="6" class="flex-col">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="400"
          height="300"
          max-width="250"
          :src="image"
          class="img_staff"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" sm="6" class="flex-col flex-text">
        <p class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">
          {{ phrase }}
        </p>
        <div class="tit_h3_team_pink txt_uppercase">
          {{ name }}
        </div>
        <hr class="divider my-3 divider" />
        <p class="txt_staff_description">
          {{ description }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "staff-card",
  props: {
    image: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    phrase: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      rules: [(v) => !!v || "Campo es obligatorio"],
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.flex-text{
    padding-right: 60px;
}
@media (max-width: 600px) {
  .flex-row {
      padding-right: 20px;
      padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap-reverse;
  }
  .flex-col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-text{
    flex-direction: column;
    text-align: center;
    padding-right: 0px;
  }
  .divider{
      width: 90%;
  }
}
</style>