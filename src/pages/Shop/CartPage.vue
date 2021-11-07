<template>
    <div>
        <v-container>
            <v-card>
                <v-tabs v-model="tab" :show-arrows="false" background-color="secondary" dark>
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
                                            <div class="text-overline">Precio:</div> {{ item.price }}
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
                                            <div class="text-overline">Total:</div>{{ (item.price * item.quantity)  }}
                                        </div>
                                        <v-btn icon @click="cart.splice(index, 1)">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </div>
                                </div>

                                <div class="d-flex my-6">
                                <v-btn color="secondary">
                                    <v-icon left>mdi-arrow-left</v-icon>
                                    Continuar
                                </v-btn>
                                </div>
                            </v-col>
                        </v-row>

                    </v-tab-item>

                    <v-tab-item value="pago" class="pa-4">
                        <v-row>
                            <v-col cols="12" md="8">
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
                                        height="60"
                                        width="60"
                                        contain
                                        class="rounded mr-4"
                                        :src="'https://picsum.photos/id/11/10/6'"
                                    ></v-img>
                                    </div>
                                    <div class="font-weight-bold flex-grow-1">
                                    {{ item.title }}
                                    </div>
                                    <div class="d-none d-sm-block mx-1 mx-sm-4">
                                    <div class="text-overline">Precio:</div>
                                    {{ item.price }}
                                    </div>
                                    <div class="mx-1 mx-sm-4">
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
                                    <div class="mx-1 mx-sm-4">
                                    <div class="text-overline">Total:</div>
                                    {{ (item.price * item.quantity)  }}
                                    </div>
                                    <v-btn icon @click="cart.splice(index, 1)">
                                    <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </div>
                                </div>

                                <div class="d-flex my-6">
                                <v-btn color="secondary">
                                    <v-icon left>mdi-arrow-left</v-icon>
                                    Continuar
                                </v-btn>
                                </div>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-card class="pa-2">
                                    <div class="text-h5 mb-6">Resumen</div>
                                    <div class="d-flex">
                                        <div>Subtotal:</div>
                                        <v-spacer></v-spacer>
                                        <div>{{ subtotal }}</div>
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <div v-if="discount" class="d-flex">
                                        <div>Descuento:</div>
                                        <v-spacer></v-spacer>
                                        <div>- {{ discount }}</div>
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <div class="d-flex text-h6">
                                        <div class="text-uppercase">Total:</div>
                                        <v-spacer></v-spacer>
                                        <div>{{ total  }}</div>
                                    </div>
                                    <v-btn
                                        large
                                        color="success"
                                        block
                                        class="mt-8"
                                        :disabled="cart.length === 0"
                                    >
                                        <v-icon left>mdi-cart-outline</v-icon>
                                        Checkout
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
        }, {
            title: 'That T-Shirt',
            image: '3.png',
            images: ['3.png', '1.png', '6.png', '4.png', '5.png'],
            price: 25,
            quantity: 1,
            priceCompare: null
        }, {
            title: 'Grey T-Shirt',
            image: '7.png',
            images: ['7.png', '2.png', '3.png', '4.png', '5.png'],
            price: 26,
            quantity: 1,
            priceCompare: 34
        }, {
            title: 'F* Awesome T-Shirt',
            image: '8.png',
            images: ['8.png', '2.png', '3.png', '4.png', '5.png'],
            price: 27,
            quantity: 1,
            priceCompare: 32
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