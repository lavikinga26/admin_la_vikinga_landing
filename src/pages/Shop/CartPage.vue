<template>
    <div>
        <v-container>
            <!--<v-card elevation="0" min-height="500">-->
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
                                    <div class="d-flex align-center justify-center">
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
                                            <div class="text-overline">Total:</div>{{item.currency}} {{ (item.price * item.quantity)  | formatCurrency }}
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
                        <v-divider></v-divider>
                        <v-row v-if="cart.length > 0">
                            <v-spacer></v-spacer>
                            <v-col cols="12" md="5" sm="12" class="pa-10">
                                <h3 class="text-uppercase">TOTAL DEL CARRITO</h3>
                                <div class="d-flex text-h6 my-6">
                                    <div class="text-uppercase">Total:</div>
                                    <v-spacer></v-spacer>
                                    <div>S/. {{ total | formatCurrency}}</div>
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
                                <h2 style="font-weight: 100;">{{formTitle}}</h2>
                                <v-container>
                                    <v-form 
                                    ref="form_invoice" 
                                    v-model="valid">
                                        <!--form order-->
                                        <v-row v-show="!payment"  class="mt-10">
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Nombre"
                                                    :rules="rules"
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
                                                    :rules="rules"
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
                                                    :rules="rules"
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
                                                    :rules="rules"
                                                    outlined
                                                    v-model="order.nro_doc"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                            >
                                                <v-select
                                                    :items="countries"
                                                    label="País"
                                                    :rules="rules"
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
                                                    :rules="rules"
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
                                                    :rules="rules"
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
                                                    :rules="rules"
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
                                                    type="password"
                                                    v-model="order.password"
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
                                                    type="password"
                                                    v-model="order.confirmPassword"
                                                    :rules="rules"
                                                ></v-text-field>
                                            </v-col>
                                            
                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                                v-if="!isLogged"
                                            >
                                                ¿Ya tienes una cuenta? <a href='/auth/iniciar-sesion' style="color: #e30e4f; text-decoration: underline">Inicia Sesión</a>
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
                                                md="4"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="RUC"
                                                    :rules="rules"
                                                    outlined
                                                    v-model="order.inv_doc"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="8"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Razón Social"
                                                    :rules="rules"
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
                                                    :rules="rules"
                                                    outlined
                                                    v-model="order.inv_address"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <!--end form invoice-->
                                    </v-form>

                                    <v-form 
                                    ref="form_payment" 
                                    v-model="valid2">
                                        <!--form payment-->
                                        <v-row v-show="payment">
                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                            >
                                                <v-card class="ma-3">
                                                    <v-card-title>
                                                        <h5>Detalle de Facturación</h5>
                                                        <v-btn
                                                        icon
                                                        @click="payment=false;"
                                                        >
                                                            <v-icon>mdi-square-edit-outline</v-icon>
                                                        </v-btn>
                                                    </v-card-title>
                                                    <v-card-subtitle v-if="!order.had_invoice">
                                                        <div>{{order.name+' '+order.lastname}}</div>
                                                        <div>{{order.email}}</div>
                                                        <div>{{order.address+', '+order.city+', '+order.country}}</div>
                                                    </v-card-subtitle>
                                                    <v-card-subtitle v-else>
                                                        <div>{{order.inv_business_name}}</div>
                                                        <div>RUC: {{order.inv_doc}}</div>
                                                        <div>{{order.inv_address}}</div>
                                                    </v-card-subtitle>
                                                </v-card>
                                                <v-divider class="my-7"></v-divider>
                                                <h4 style="font-weight: 100;" class="mx-3">Seleccione método de pago</h4>
                                                <v-radio-group
                                                v-model="order.id_payment_method"
                                                column
                                                color="secondary"
                                                class="mt-0"
                                                :rules="rules"
                                                >
                                                <template v-for="(item, index) in paymentMethods">
                                                    <v-card :key="'pm_'+index" class="ma-3 pa-3">
                                                        <div class="d-flex align-center">    
                                                            <div>
                                                                <v-radio
                                                                    :value="item.id"
                                                                    color="secondary"
                                                                ></v-radio>
                                                            </div>
                                                            <div>
                                                                <h4>{{item.name}}</h4>
                                                                <p style="font-size: 0.8rem; margin-bottom: 0px;">
                                                                    {{item.description}}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </v-card>
                                                </template>
                                                </v-radio-group>

                                                <v-card class="ma-3 pa-3">
                                                    <div class="d-flex align-center">
                                                        <v-btn @click="abrirPayme()">Abrir Payme</v-btn>
                                                    </div>

                                                    <div id="demo" class="d-flex">
                                                    </div>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                        <!--end form invoice-->
                                    </v-form>
                                    </v-container>
                            </v-col>

                            <v-col cols="12" md="5">
                                <v-card class="pa-5 px-7" elevation="0" color="grey lighten-3">
                                    <div class="text-h5 mb-6">Resumen</div>
                                    <div class="my-5">
                                        <v-simple-table class="transparent">
                                            <template v-slot:default>
                                            <tbody>
                                                <tr
                                                v-for="(item, index) in cart" :key="'tb_'+index"
                                                >
                                                    <td class="pl-0 pr-2">
                                                        <v-img
                                                            width="100"
                                                            height="80"
                                                            cover
                                                            class="rounded mr-4"
                                                            :src="'http://admin-lavikinga.bytesoluciones.test/storage/uploads/plan_files/10292021191704617c48b0573bf.jpg'"
                                                        ></v-img>
                                                    </td>
                                                    <td class="pl-0 pr-2">{{ item.title }}</td>
                                                    <td class="pr-0 pl-2">S/. {{ (item.price * item.quantity)  | formatCurrency }}</td>
                                                </tr>
                                            </tbody>
                                            </template>
                                        </v-simple-table>
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <div class="d-flex">
                                        <div>Subtotal:</div>
                                        <v-spacer></v-spacer>
                                        <div>S/. {{ subtotal | formatCurrency }}</div>
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <div class="d-flex">
                                        <div>Descuento:</div>
                                        <v-spacer></v-spacer>
                                        <div>S/. - {{ discount | formatCurrency }}</div>
                                    </div>
                                    <v-divider class="my-2"></v-divider>
                                    <div class="d-flex py-2">
                                        <v-text-field
                                            class="rounded-0"
                                            outlined
                                            height="40"
                                            background-color="grey lighten-2"
                                            placeholder="CUPÓN"
                                            hide-details=""
                                        ></v-text-field>
                                        <v-btn
                                        color="grey"
                                        dark
                                        elevation="0"
                                        height="56"
                                        class="mr-0 rounded-0"
                                        >APLICAR</v-btn>
                                    </div>
                                    <div class="d-flex text-h6 pt-3">
                                        <div>Total:</div>
                                        <v-spacer></v-spacer>
                                        <div>S/. {{ total | formatCurrency  }}</div>
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
            <!--</v-card>-->
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
            valid2: false,
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

            toast:{
                toast: false,
                message: '',
                timeout: 3000,
                color: "success"
            }
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
        formTitle () {
            return this.payment ?'Detalles de pago' : 'Detalles de orden' 
        },
    },
    mounted(){
        this.list();
        this.getUser();
        this.getCountry();
        this.getTypeDocument();

        /** Importamos Pay-me */
        let paymeScript = document.createElement('script')
        paymeScript.setAttribute('src', 'https://alignet-flex-demo.s3.amazonaws.com/flex-capture.min.js')
        document.head.appendChild(paymeScript)
    },
    methods:{
        list(){
            this.cart = this.$store.getters.StoreCart;
            console.log(this.cart );
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
            if(this.payment){
                if(this.$refs.form_payment.validate()){
                    this.createOrder();
                }
                else{
                    return;
                }
            }
            else{
                if(this.$refs.form_invoice.validate()){
                    this.getPaymentMethods();
                    this.payment = true;
                }
                else{
                    return;
                }
            }
        },
        
        async createOrder(){
            this.$store.commit('loader',true);
            try{
                this.order.discount = this.discount
                this.order.total = this.total
                this.order.subtotal = this.subtotal;
                this.order.detail = this.cart;
                const data = await this.$API.order.register(this.order);
                this.openToastAlert(true, 'Orden creada correctamente', 'primary');
                this.$store.commit('loader',false);
                this.$router.push({ path: '/auth/iniciar-sesion' });
            }
            catch(e){
                this.$store.commit('loader',false);
                console.error(e);
            } 
        },

        openToastAlert(open, message, color){
            this.toast = {
                toast: open,
                message: message, 
                color: color
            }
        },

        reqCallback(response) {
            console.log("vueeeee");
            console.log(response);
        },

        abrirPayme(){
            var payRequest = {
                "action": "authorize",
                "transaction": {
                    "currency": "604",
                    "amount": "100000",
                    "meta": {
                        "internal_operation_number": Math.floor(Date.now()).toString().substring(7),
                        "description": "Descripcion de la transaccion",
                        "additional_fields": {
                            "reserverd1": "Prueba valor reservado 1"
                        }
                    }
                },
                "address": {
                    "billing": {
                        "first_name": "Juan",
                        "last_name": "Perez",
                        "email": "jperez@gmail.com",
                        "phone": {
                            "country_code": "51",
                            "subscriber": "987654321"
                        },
                        "location": {
                            "line_1": "Mi casa",
                            "line_2": "Mi casa",
                            "city": "LIMA",
                            "state": "LIMA",
                            "country": "PE",
                            "zip_code": "18"
                        }
                    },
                    "shipping": {
                        "first_name": "Juan",
                        "last_name": "Perez",
                        "email": "jperez@gmail.com",
                        "phone": {
                            "country_code": "51",
                            "subscriber": "987654321"
                        },
                        "location": {
                            "line_1": "Mi casa",
                            "line_2": "Mi casa",
                            "city": "LIMA",
                            "state": "LIMA",
                            "country": "PE",
                            "zip_code": "18"
                        }
                    }
                },
                "card_holder": [
                    {
                        "first_name": "Juan",
                        "last_name": "Perez",
                        "email_address": "jperez@gmail.com",
                        "identity_document_country": "PE",
                        "identity_document_type": "DNI",
                        "identity_document_identifier": "87654321"
                    }
                ]
            };

            var token_key = "meQQw27S6i661bE6TnWWaYDmdwNQdJWNwe0HtD5HrL5H0hXTPdqWQjTTLAoTZKmX";

            var capture = new FlexCapture({
                "key": token_key,
                "payload": payRequest,
                "additionalFields": []
            });

            capture.init(document.querySelector('#demo'), this.reqCallback); 
        }
    }
}
</script>

<style>
.flex-capture .field > input{
    outline:none;
    margin-left: 2em;
    border-bottom: 1px solid #626262;
}

.flex-capture .field > input:focus{
    outline: none;
    margin-left: 2em;
    border-bottom: 1px solid #e30e4f;
}

.flex-capture .field{
    margin-top: .5em;
}

.flex-capture .submit > button{
    background: #e30e4f;
    padding: 10px;
    color: #fff;
    border-radius: 8px;
    margin-top: 1em;
}
</style>