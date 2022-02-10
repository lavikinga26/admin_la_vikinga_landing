<template>
  <div class="bg_blue">
    <v-container>
        <div class="col-md-12">
            <p class="tit_h1_pink text_entrena">DESCARGABLES</p>
        </div>
        <v-card class="rounded-xl pa-10 mb-10">
            <v-row class="px-5">
            <v-col>
                <div class="mb-2">
                    <v-row no-gutters>
                        <v-col cols="12" md="6" v-for="(item, indx) in downloads_list" :key="indx" class="pa-3">
                            <v-card>
                                <v-card-text>
                                <p class="text-h6 text--primary">
                                    {{item.title}}
                                </p>
                                <div class="text--primary text-wrap">
                                    {{item.description}}
                                </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="secondary"
                                        :href="'https://apiserv.lavikingaoficial.com/api/download-file/'+item.code"
                                        target="_blank"
                                    >
                                        <b>DESCARGAR</b>
                                        <v-icon class="ml-2">mdi-tray-arrow-down</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>

            </v-col>
            </v-row>
        </v-card>
        <v-snackbar
            v-model="toast.toast"
            :timeout="toast.timeout"
            :color="toast.color"
            dark
            >
            {{ toast.message }}
        </v-snackbar>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      orders: [],
      hasOrders: true,
      dialog: false,
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
          sortable: false,
        },
        { text: "Detalles", value: "product_name", sortable: false },
        { text: "Precio", value: "price", sortable: false },
        { text: "Cantidad", value: "quantity", sortable: false },
        { text: "Precio total", value: "price_total", sortable: false },
      ],
      page: 1,
      total: 0,
      loading: false,
      downloads_list: [],

      // input rules
      rules: {
        required: (value) => !!value || "Este campo es requerido",
        only_numbers: this.$UTILS.rules.only_numbers,
      },


      pwdRules: [v => !!v || "Este campo es requerido"],
      pwdConfirm: [
        v => !!v || "Este campo es requerido",
        v => v === this.new_password || "Contraseñas no coinciden"
      ],


      toast:{
          toast: false,
          message: '',
          timeout: 3000,
          color: "success"
      },

    };
  },
  mounted() {
    this.getDownloads();
  },
  watch: {
    page(current, old) {
      this.getOrdersByUser(current);
    },
  },
  methods: {

    showToast(msg,color){
        this.toast.color = color;
        this.toast.message = msg;
        this.toast.toast = true;
    },

    async getDownloads() {
      this.$store.commit('loader',true);
      try {
        const response = await this.$API.business_partner.getDownloads();
        this.downloads_list=response.data.data;
        this.$store.commit('loader',false);
      } catch (e) {
        this.$store.commit('loader',false);
        console.error(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#custom-tab-items {
  background-color: transparent !important;
  padding: 0px 0px !important;
}
.orders-container {
  display: grid;
  gap: 2rem;
  grid-auto-rows: 25rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  @media (max-width: 600px) {
    grid-auto-rows: 30rem;
    grid-template-columns: 100%;
  }
}
.order-card {
  //background: linear-gradient( 347deg, #0b152a 0%, #0d1b37 100%);
  background-color: #ffff;
  color: #0000;
  border-radius: 20px;
  height: 100%;
  width: 100%;
  p {
    color: #000;
  }
}
@media (max-width: 600px) {
  .footer {
    
    span {
      margin-left: 0px !important;
    }
  }
  .orders-main-container {
    padding: 0px !important;
  }
}
</style>