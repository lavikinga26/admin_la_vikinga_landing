<template>
    <div>
        <v-container>
            <v-card elevation="0">
                <v-tabs v-model="tab" :show-arrows="false" background-color="primary" dark>
                    <v-tab to="#carrito">Carrito</v-tab>
                    <v-tab to="#pago"  v-if="cart.length > 0">Pago</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item value="carrito" class="pa-4">
                        <v-row>
                            <v-col cols="12">
                                <div v-if="cart.length === 0">
                                    <v-divider></v-divider>
                                    <div class="text-h5 pa-5 text-center">Carrito Vacío</div>
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
                                                :src="'http://admin-lavikinga.bytesoluciones.test/storage/uploads/plan_files/10292021191704617c48b0573bf.jpg'"
                                            ></v-img>
                                        </div>
                                        <div class="flex-grow-1" style="max-width: 30%; min-width: 30%; font-size: 0.9rem;">
                                            <div class="text-overline">SKU: {{ item.code }}</div> {{ item.title }}
                                        </div>
                                        <div class="d-none d-sm-block flex-grow-1 mx-1 mx-sm-4" style="font-size: 0.9rem;">
                                            <div class="text-overline">Precio:</div> {{item.currency}}{{ item.price | formatCurrency }}
                                        </div>
                                        <div class="mx-1 mx-sm-4 flex-grow-1" style="font-size: 0.9rem;">
                                            <v-select
                                                v-model="item.quantity"
                                                :items="[1, 2, 3, 4, 5]"
                                                :label="'CANT.'"
                                                outlined
                                                hide-details
                                                dense
                                                class="mt-4"
                                                style="max-width: 80px;"
                                            ></v-select>
                                        </div>
                                        <div class="mx-1 mx-sm-4 flex-grow-1" style="font-size: 0.9rem;">
                                            <div class="text-overline">Total:</div>{{item.currency}}{{ (item.price * item.quantity)  | formatCurrency }}
                                        </div>
                                        <v-btn icon @click="cart.splice(index, 1); removeItem(index)">
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
                        <v-row v-if="cart.length > 0">
                            <v-spacer></v-spacer>
                            <v-col cols="12" md="6" sm="12" class="pa-10">
                                <h3 class="text-uppercase">TOTAL DEL CARRITO</h3>
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
                                        <!--form order-->
                                        <v-row v-show="!payment">
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Nombre"
                                                    required
                                                    outlined
                                                    v-model="order.name"
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
                                                    v-model="order.lastname"
                                                ></v-text-field>
                                            </v-col>
                                            
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-select
                                                    :items="documents"
                                                    label="Tipo Documento"
                                                    outlined
                                                    v-model="order.id_document_type"
                                                    item-text="type_document"
                                                    item-value="id"
                                                ></v-select>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Nro. Documento"
                                                    required
                                                    outlined
                                                    v-model="order.nro_doc"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                            >
                                                <!--<v-text-field
                                                    label="País"
                                                    required
                                                    outlined
                                                    v-model="order.country"
                                                ></v-text-field>-->
                                                <v-select
                                                    :items="countries"
                                                    label="País"
                                                    outlined
                                                    v-model="order.country"
                                                    item-text="country"
                                                    item-value="country"
                                                ></v-select>
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
                                                    v-model="order.address"
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
                                                    v-model="order.city"
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
                                                    v-model="order.email"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                                v-if="!isLogged"
                                            >
                                                <v-text-field
                                                    label="Crear contraseña"
                                                    outlined
                                                    v-model="this.order.password"
                                                    :rules="rules"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                                v-if="!isLogged"
                                            >
                                                <v-text-field
                                                    label="Confirmar contraseña"
                                                    outlined
                                                    v-model="this.order.confirmPassword"
                                                    :rules="rules"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                            >
                                                <v-checkbox
                                                color="primary"
                                                v-model="order.had_invoice"
                                                :label="`Solicitar Factura`"
                                                ></v-checkbox>
                                            </v-col>
            
                                        </v-row>
                                        <!--end form order-->

                                        <!--form invoice-->
                                        <v-row v-if="order.had_invoice" v-show="!payment">
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="RUC"
                                                    required
                                                    outlined
                                                    v-model="order.inv_doc"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Razón Social"
                                                    required
                                                    outlined
                                                    v-model="order.inv_business_name"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Dirección fiscal"
                                                    required
                                                    outlined
                                                    v-model="order.inv_address"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <!--end form invoice-->

                                        <!--form payment-->
                                        <v-row v-show="payment">
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-radio-group
                                                v-model="order.id_payment_method"
                                                column
                                                >
                                                <v-radio
                                                    v-for="(item, index) in paymentMethods"
                                                    :key="'pm_'+index"
                                                    :label="item.name"
                                                    :value="item.id"
                                                ></v-radio>
                                                </v-radio-group>
                                            </v-col>
                                        </v-row>
                                        <!--end form invoice-->
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
                                    <div class="d-flex">
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
                                        @click="paymentProcess()"
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
import axios from "axios";
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

            discount: 0,
            tab: null,
            valid: false,
            cart: [],

            order:{
                country: 'Peru',
                password:'',
                confirmPassword:'',
                had_invoice: false,
            },
            rules: [
                v => !!v || 'Campo obligatorio',
            ],
            countries:[],
            documents:[],
            paymentMethods:[],

            payment: false,
        }
    },
    computed: {
        subtotal() {
            let total = 0

            this.cart.forEach((c) => {
                total += c.quantity * Number(c.price)
            })

            return total
        },
        total() {
            const total = this.subtotal - this.discount

            return total < 0 ? 0 : total
        },
        isLogged() {
            return this.$store.getters.isLoggedIn;
        },
    },
    mounted(){
        this.list();
        this.getUser();
        this.getCountry();
        this.getTypeDocument();
        this.getPaymentMethods();
    },
    methods:{
        list(){
            this.cart = this.$store.getters.StoreCart;
        },
        removeItem(index){
            this.$store.dispatch("removeItem", index);
        },
        async getUser(){
            if(this.$store.getters.isLoggedIn){
                this.$store.commit('loader',true);
                try{
                    const data = await this.$API.auth.auth();
                    this.order = Object.assign({}, data.data);
                    this.order.had_invoice = false;
                    this.order = JSON.parse(JSON.stringify(this.order));
                    console.log(this.order)
                    this.$store.commit('loader',false);
                }
                catch(e){
                    this.$store.commit('loader',false);
                    console.error(e);
                } 
            }
        },
        async getCountry(){
            this.$store.commit('loader',true);
            try{
                const data = await axios.get('https://countriesnow.space/api/v0.1/countries/');
                this.countries = data.data.data;
                this.$store.commit('loader',false);
            }
            catch(e){
                this.$store.commit('loader',false);
                console.error(e);
            } 
        },
        async getTypeDocument(type = 2){
            this.$store.commit('loader',true);
            try{
                const data = await this.$API.configuration.getTypeDocument(type);
                this.documents = data.data.data;
                this.$store.commit('loader',false);
            }
            catch(e){
                this.$store.commit('loader',false);
                console.error(e);
            } 
        },
        async getPaymentMethods(){
            this.$store.commit('loader',true);
            try{
                const data = await this.$API.configuration.getPaymentMethods();
                this.paymentMethods = data.data.data;
                this.$store.commit('loader',false);
            }
            catch(e){
                this.$store.commit('loader',false);
                console.error(e);
            } 
        },
        paymentProcess(){
            this.payment = true;
        },


        
        async getPaymentMethods(){
            this.$store.commit('loader',true);
            try{
                const data = await this.$API.order.register(this.order);
                this.$store.commit('loader',false);
            }
            catch(e){
                this.$store.commit('loader',false);
                console.error(e);
            } 
        },
    }
}
</script>