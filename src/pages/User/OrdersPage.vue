<template>
  <div class="bg_blue">
    <v-container>
      <div class="col-md-12">
        <p class="tit_h1_pink text_entrena">MI CUENTA</p>
      </div>
      <v-tabs
        v-model="userProfileTabs"
        :show-arrows="false"
        color="#E30E4F"
        background-color="transparent"
        dark
      >
        <v-tab to="#mi-cuenta">MI CUENTA</v-tab>
        <v-tab to="#mis-ordenes">MIS ORDENES</v-tab>
      </v-tabs>
      <v-tabs-items v-model="userProfileTabs" id="custom-tab-items">
        <v-tab-item value="mi-cuenta">
          <div class="my-5">
            <v-card class="my-10 rounded-xl pa-10"> INFO CUENTA </v-card>
          </div>
        </v-tab-item>
        <v-tab-item value="mis-ordenes">
          <div class="my-2">
            <v-card
              class="my-10 rounded-xl pa-10 orders-main-container"
              :loading="loading"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-card-title
                class="tit_h1_staff_pink text_entrena txt_uppercase mb-6"
              >
                MIS ORDENES
              </v-card-title>
              <v-card-text class="orders-container" v-if="hasOrders">
                <v-card
                  v-for="(order, i) in orders"
                  :key="i"
                  class="order-card elevation-2"
                >
                  <v-card-title
                    style="color: black"
                    class="d-flex flex-row justify-space-between"
                  >
                    <span>
                      {{ order.created_at.split("T")[0] }}
                    </span>

                    <v-chip
                      class="ma-2"
                      :color="getColor(order.order_status.id)"
                      label
                      text-color="white"
                    >
                      {{ order.order_status.name }}
                      <v-icon class="ml-1">
                        {{ getIcon(order.order_status.id) }}
                      </v-icon>
                    </v-chip>
                  </v-card-title>
                  <v-card-text class="d-flex flex-column">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          readonly
                          background-color="white lighten-5"
                          outlined
                          label="Metodo de pago"
                          hide-details="auto"
                          :value="order.payment_method.name"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          readonly
                          background-color="white lighten-5"
                          outlined
                          label="Subtotal"
                          hide-details="auto"
                          :value="order.subtotal"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          readonly
                          hide-details="auto"
                          background-color="white lighten-5"
                          outlined
                          label="IGV"
                          :value="order.igv"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          readonly
                          background-color="white lighten-5"
                          outlined
                          label="Total"
                          :value="order.total"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <div
                      class="
                        d-flex
                        flex-row
                        justify-space-between
                        align-center
                        footer
                      "
                    >
                      <!--<v-chip
                        class="ma-2"
                        :color="getColor(order.order_status.id)"
                        label
                        text-color="white"
                      >
                        {{ order.order_status.name }}
                        <v-icon class="ml-1">
                          {{ getIcon(order.order_status.id) }}
                        </v-icon>
                      </v-chip>-->

                      <v-btn
                        depressed
                        color="primary"
                        @click="openDetails(order)"
                      >
                        Detalles
                        <v-icon class="ml-2"> mdi-eye </v-icon>
                      </v-btn>
                      <v-btn
                        depressed
                        link
                        :to="'/confirmar-pago/' + order.hash"
                        color="green"
                        v-if="order.order_status.id == 5 && order.id_payment_method == 2"
                      >
                        Pagar
                        <v-icon class="ml-2"> mdi-check-circle </v-icon>
                      </v-btn>
                      
                      <v-btn
                        depressed
                        link
                        :to="'/pago-payme/' + order.hash"
                        color="green"
                        v-else-if="order.order_status.id == 5 && order.id_payment_method == 1"
                      >
                        Pagar
                        <v-icon class="ml-2"> mdi-check-circle </v-icon>
                      </v-btn>

                      <!-- /pago-payme/MTAxMTIyMDIyMTAwMTQ4OEw3 -->
                    </div>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-card-text v-else>
                <p>
                  <strong> No existen aún ordenes. </strong>
                </p>
              </v-card-text>
              <v-card-actions class="d-flex justify-center" v-if="hasOrders">
                <div>
                  <v-pagination v-model="page" :length="total"></v-pagination>
                </div>
              </v-card-actions>
            </v-card>

            <v-dialog v-model="dialog" max-width="900">
              <v-card>
                <v-card-title
                  class="d-flex flex-row justify-space-between align-center"
                >
                  <strong>Orden #{{ selectedOrder.id }}</strong>

                  <v-chip
                    class="ma-2"
                    :color="getColor(selectedOrder.order_status)"
                    label
                    text-color="white"
                  >
                    {{ selectedOrder.order_status_name }}
                    <v-icon class="ml-2">
                      {{ getIcon(selectedOrder.order_status) }}
                    </v-icon>
                  </v-chip>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly
                        background-color="white lighten-5"
                        outlined
                        label="Metodo de pago"
                        hide-details="auto"
                        :value="selectedOrder.payment_method"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-data-table
                        :headers="headers"
                        :items="selectedOrder.detail"
                        :hide-default-header="false"
                        :hide-default-footer="true"
                        class="elevation-1"
                      ></v-data-table>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        background-color="white lighten-5"
                        outlined
                        label="Descuento"
                        hide-details="auto"
                        :value="selectedOrder.descuento"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        background-color="white lighten-5"
                        outlined
                        label="Subtotal"
                        hide-details="auto"
                        :value="selectedOrder.subtotal"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        background-color="white lighten-5"
                        outlined
                        label="IGV"
                        hide-details="auto"
                        :value="selectedOrder.igv"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly
                        background-color="white lighten-5"
                        outlined
                        label="TOTAL"
                        hide-details="auto"
                        :value="selectedOrder.total"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions class="d-flex flex-wrap justify-end">
                  

                  <!-- <v-btn color="primary" text @click="dialog = false">
                    Cerrar
                  </v-btn>-->
                  <v-btn
                        depressed
                        color="primary"
                        @click="dialog = false"
                      >
                        Cerrar
                        <v-icon class="ml-2"> mdi-close-circle </v-icon>
                      </v-btn>


                    <v-btn
                        depressed
                        link
                        :to="'/pago-payme/' + selectedOrder.hash"
                        color="green"
                        v-if="selectedOrder.order_status == 5 && selectedOrder.payment_method_id == 1"
                      >
                        Pagar
                        <v-icon class="ml-2"> mdi-check-circle </v-icon>
                    </v-btn>
                    <v-btn
                        depressed
                        link
                        :to="'/confirmar-pago/' + selectedOrder.hash"
                        color="green"
                        v-else-if="selectedOrder.order_status == 5 && selectedOrder.payment_method_id == 2"
                      >
                        Pagar
                        <v-icon class="ml-2"> mdi-check-circle </v-icon>
                    </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userProfileTabs: 0,
      user: {},
      orders: [],
      selectedOrder: {
        detail: [],
        payment_method: "",
        payment_method_id: "",
        order_status: 0,
        order_status_name: 0,
        id: "",
        descuento: 0,
        total: 0,
        subtotal: 0,
        igv: 0,
        hash:""
      },
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
    };
  },
  mounted() {
    this.getPartnerData().then(() => this.getOrdersByUser());
  },
  watch: {
    page(current, old) {
      this.getOrdersByUser(current);
    },
  },
  methods: {
    openDetails(order) {
      this.selectedOrder.detail = order.detail;
      this.selectedOrder.order_status = order.order_status.id;
      this.selectedOrder.order_status_name = order.order_status.name;
      this.selectedOrder.id = order.id;
      this.selectedOrder.payment_method = order.payment_method.name;
      this.selectedOrder.descuento = order.discount;
      this.selectedOrder.subtotal = order.subtotal;
      this.selectedOrder.total = order.total;
      this.selectedOrder.hash = order.hash;
      this.selectedOrder.payment_method_id = order.id_payment_method;
      this.selectedOrder.igv = order.igv;
      this.dialog = true;
    },
    async getPartnerData(id) {
      try {
        const response = await this.$API.auth.auth(id);
        this.user = response.data;
        console.log(this.user);
      } catch (e) {
        console.error(e);
      }
    },
    async getOrdersByUser(page = 1) {
      try {
        this.loading = true;
        console.log(`el id del usuario es ${this.user.id}`);
        const response = await this.$API.order.getOrdersByUser(
          this.user.id,
          page
        );
        this.orders = response.data.data.orders.data;
        this.total = response.data.data.orders.last_page;
        this.hasOrders = response.data.data.orders.total != 0 ? true : false;
        this.loading = false;
        console.log(this.orders);
      } catch (e) {
        console.error(e);
      }
    },
    getIcon(status) {
      let color = null;
      switch (status) {
        case 1:
          color = "mdi-check";
          break;
        case 2:
          color = "mdi-close-circle";
          break;
        case 3:
          color = "mdi-delete";
          break;
        case 4:
          color = "mdi-clock";
          break;
        case 5:
          color = "mdi-cash-multiple";
          break;
      }
      return color;
    },
    getColor(status) {
      let color = null;
      switch (status) {
        case 1:
          color = "green";
          break;
        case 2:
          color = "red";
          break;
        case 3:
          color = "gray";
          break;
        case 4:
          color = "secondary";
          break;
        case 5:
          color = "orange";
          break;
      }
      return color;
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