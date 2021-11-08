<template>
    <div>
        <v-container>
            <v-card elevation="0">
                <v-tabs v-model="tab" :show-arrows="false" background-color="primary" dark>
                    <v-tab to="#carrito">Carrito</v-tab>
                    <v-tab to="#pago">Pago</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item value="carrito" class="pa-4">
                        <v-row>
                            <v-col cols="12">
                                <div v-if="cart.length === 0">
                                    <v-divider></v-divider>
                                    <div class="text-h5 pa-5 text-center">Empty Cart</div>
                                    <v-divider></v-divider>
                                </div>
                                <div v-for="(item, index) in cart" :key="index" class="my-2">
                                    <v-divider v-if="index !== 0" class="my-3"></v-divider>
                                    <div class="d-flex align-center justify-center font-weight-bold">
                                        <div class="d-none d-md-block">
                                            <v-img
                                                width="150"
                                                contain
                                                class="rounded mr-4"
                                                :src="'https://picsum.photos/id/11/10/6'"
                                            ></v-img>
                                        </div>
                                        <div class="font-weight-bold flex-grow-1" style="max-width: 30%; min-width: 30%;">
                                            {{ item.title }}
                                        </div>
                                        <div class="d-none d-sm-block flex-grow-1 mx-1 mx-sm-4">
                                            <div class="text-overline">Precio:</div> {{ item.price | formatCurrency }}
                                        </div>
                                        <div class="mx-1 mx-sm-4 flex-grow-1">
                                            <v-select
                                                v-model="item.quantity"
                                                :items="[1, 2, 3, 4, 5]"
                                                :label="'Cantidad'"
                                                outlined
                                                hide-details
                                                dense
                                                style="max-width: 80px;"
                                            ></v-select>
                                        </div>
                                        <div class="mx-1 mx-sm-4 flex-grow-1">
                                            <div class="text-overline">Total:</div>{{ (item.price * item.quantity)  | formatCurrency }}
                                        </div>
                                        <v-btn icon @click="cart.splice(index, 1)">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </div>
                                </div>

                                <!--<div class="d-flex my-6">
                                    <v-btn color="secondary">
                                        <v-icon left>mdi-arrow-left</v-icon>
                                        Continuar
                                    </v-btn>
                                </div>-->
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-col cols="12" md="6" sm="12" class="pa-10">
                                <h2 class="text-uppercase">TOTAL DEL CARRITO</h2>
                                <div class="d-flex text-h6 my-6">
                                    <div class="text-uppercase">Total:</div>
                                    <v-spacer></v-spacer>
                                    <div>{{ total | formatCurrency}}</div>
                                </div>
                                <v-btn 
                                    color="secondary"
                                    x-large
                                    block
                                    class="widt:100%"
                                >
                                    Finalizar Compra
                                </v-btn>
                            </v-col>
                        </v-row>

                    </v-tab-item>

                    <v-tab-item value="pago" class="pa-4">
                        <v-row>
                            <v-col cols="12" md="7">
                                <h2 style="font-weight: 100;">DETALLES DE ORDEN</h2>
                                <v-form v-model="valid">
                                    <v-container class="mt-10">
                                        <v-row>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Nombre"
                                                    required
                                                    outlined
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Apellidos"
                                                    required
                                                    outlined
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="País"
                                                    required
                                                    outlined
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Dirección"
                                                    required
                                                    outlined
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Ciudad"
                                                    required
                                                    outlined
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Correo Electrónico"
                                                    required
                                                    outlined
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Crear contraseña"
                                                    required
                                                    outlined
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Confirmar contraseña"
                                                    required
                                                    outlined
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-form>
                            </v-col>

                            <v-col cols="12" md="5">
                                <v-card class="pa-2" elevation="0">
                                    <div class="text-h5 mb-6">Resumen</div>
                                    <div class="d-flex">
                                        <div class="ml-15">SUBTOTAL:</div>
                                        <v-spacer></v-spacer>
                                        <div class="mr-15">{{ subtotal | formatCurrency }}</div>
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <div v-if="discount" class="d-flex">
                                        <div class="ml-15">DESCUENTOS:</div>
                                        <v-spacer></v-spacer>
                                        <div class="mr-15">- {{ discount | formatCurrency }}</div>
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <div class="d-flex text-h6">
                                        <div class="text-uppercase ml-15">Total:</div>
                                        <v-spacer></v-spacer>
                                        <div class="mr-15">{{ total | formatCurrency  }}</div>
                                    </div>
                                    <v-btn
                                        large
                                        color="secondary"
                                        block
                                        class="mt-8"
                                        x-large
                                        :disabled="cart.length === 0"
                                    >
                                        <v-icon left>mdi-cart-outline</v-icon>
                                        Continuar Pago
                                    </v-btn>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      breadcrumbs: [{
        text: 'Ecommerce',
        disabled: false,
        to: '/ecommerce/list'
      }, {
        text: 'Cart'
      }],

      discount: 10,
      tab: null,
      valid: false,
      cart: [{
            title: 'Leave the road T-shirt',
            image: '1.png',
            images: ['1.png', '2.png', '3.png', '4.png', '5.png'],
            price: 25,
            quantity: 1,
            priceCompare: null
        }, {
            title: 'Creative T-Shirt',
            image: '2.png',
            images: ['2.png', '6.png', '3.png', '4.png', '5.png'],
            price: 22,
            quantity: 2,
            priceCompare: 30
        }]
    }
  },
  computed: {
    subtotal() {
      let total = 0

      this.cart.forEach((c) => {
        total += c.quantity * c.price
      })

      return total
    },
    total() {
      const total = this.subtotal - this.discount

      return total < 0 ? 0 : total
    }
  }
}
</script>