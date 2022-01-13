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
                                                :src="item.image"
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
                                    href="#pago"
                                >
                                    Finalizar Compra
                                </v-btn>
                            </v-col>
                            
                        </v-row>
                        <!--<v-card class="ma-3 pa-3">
                                                    <div class="d-flex align-center">
                                                        <v-btn @click="abrirPayme()">Abrir Payme</v-btn>
                                                    </div>

                                                    <div id="demo" class="d-flex">
                                                    </div>
                                                </v-card>-->
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
                                                    :rules="requiredRule"
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
                                                    :rules="requiredRule"
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
                                                    :rules="requiredRule"
                                                    :items="documents"
                                                    label="Tipo Documento"
                                                    outlined
                                                    v-model="order.id_document_type"
                                                    item-text="name"
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
                                                    :rules="requiredRule"
                                                    outlined
                                                    v-model="order.nro_doc"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                            >

                                                <v-autocomplete v-model="order.country" label="País"
                                                    :items="countries_list"
                                                    item-text="nombre"
                                                    item-value="id"
                                                    :rules="requiredRule"
                                                    return-object

                                                    outlined
                                                ></v-autocomplete>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Dirección"
                                                    :rules="requiredRule"
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
                                                    :rules="requiredRule"
                                                    outlined
                                                    v-model="order.city"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    label="Correo Electrónico"
                                                    :rules="requiredEmail"
                                                    outlined
                                                    v-model="order.email"
                                                    type="email"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pa-0 px-1"
                                            >
                                                <v-text-field
                                                    type="tel"
                                                    label="Nro. Teléfono"
                                                    :rules="requiredRule"
                                                    outlined
                                                    v-model="order.phone"
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
                                                    :rules="requiredRule"
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
                                                    :rules="requiredRule"
                                                ></v-text-field>
                                            </v-col>
                                            
                                            <v-col
                                                cols="12"
                                                md="12"
                                                class="pa-0 px-1"
                                                v-if="!isLogged"
                                            >
                                                <v-checkbox v-model="order.terms_conditions"
                                                :rules="requiredRule">
                                                <template v-slot:label>
                                                    <div>
                                                    Acepto los 
                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on }">
                                                        <a
                                                            class="secondary--text"
                                                            target="_blank"
                                                            href="/terminos-condiciones"
                                                            @click.stop
                                                            v-on="on"
                                                        >
                                                            Términos y Condiciones
                                                        </a>
                                                        </template>
                                                        Abrir <v-icon color="white" small>mdi-open-in-new</v-icon>
                                                    </v-tooltip>
                                                    del servicio
                                                    </div>
                                                </template>
                                                </v-checkbox>

                                                <v-checkbox v-model="order.privacy_policy"
                                                :rules="requiredRule">
                                                <template v-slot:label>
                                                    <div>
                                                    Acepto la 
                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on }">
                                                        <a
                                                            class="secondary--text"
                                                            target="_blank"
                                                            href="/politica-privacidad"
                                                            @click.stop
                                                            v-on="on"
                                                        >
                                                            Políticas de privacidad
                                                        </a>
                                                        </template>
                                                        Abrir <v-icon color="white" small>mdi-open-in-new</v-icon>
                                                    </v-tooltip>
                                                    del servicio
                                                    </div>
                                                </template>
                                                </v-checkbox>
                                                <br>
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
                                                    :rules="requiredRule"
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
                                                    :rules="requiredRule"
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
                                                    :rules="requiredRule"
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
                                                        <div v-if="order.country">{{order.address+', '+order.city+', '+order.country.nombre}}</div>
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
                                                :rules="requiredRule"
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
                                                                <!--<p style="font-size: 0.8rem; margin-bottom: 0px;">
                                                                    {{item.description}}
                                                                </p>-->
                                                                <div style="font-size: 0.8rem; margin-bottom: 0px;"
                                                                    v-html="item.description">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </v-card>
                                                </template>
                                                </v-radio-group>

                                                
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
                                                    <td class="pl-0 pr-0">
                                                        <v-img
                                                            width="100"
                                                            height="80"
                                                            cover
                                                            class="rounded mr-0"
                                                            :src="item.image"
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
                                            v-model="order.coupon"
                                            :disabled="couponDisabled"
                                        ></v-text-field>
                                        <v-btn
                                            color="grey"
                                            dark
                                            elevation="0"
                                            height="56"
                                            class="mr-0 rounded-0"
                                            @click="aplicarCupon()"
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
            coupon: null,
            order:{
                country: null,
                password:'',
                confirmPassword:'',
                had_invoice: false,
            },
            requiredRule: [
                v => !!v || 'Campo obligatorio',
            ],
            requiredEmail:[
                v => !!v || "Campo es requerido",
                v => /.+@.+\..+/.test(v) || "Correo electrónico debe ser válido",
            ],
            countries_list:[],
            documents:[],
            paymentMethods:[],

            payment: false,

            toast:{
                toast: false,
                message: '',
                timeout: 3000,
                color: "success"
            },
            couponDisabled:false,

            actions: {},


            logged_user: null,
            logged_affiliate: null,
            card_data: [],
            actions: {}
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
        this.getCountriesList();
        this.getTypeDocument();
        //this.reqCallback("asd");

        this.list();
        this.getLoggedUser();

    },
    methods:{
        showToast(msg,color){
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },
        async aplicarCupon(){
            try{
                const response = await this.$API.coupon.validate({cupon: this.order.coupon});
                if(response.data.available === true){
                    let data = response.data;
                    if(data.id_plan === null){
                        this.discount = (data.discount_type == 1) ? this.subtotal * (data.discount/100) : data.discount; 
                    }else{
                        let index = this.cart.findIndex((elem) => elem.id == data.id_plan);
                        if(index == -1){
                            this.showToast("No valido para los productos de este carrito","red");
                        }else{
                            if(this.couponDisabled != true){
                                this.discount = (data.discount_type == 1) ? this.cart[index].price * (data.discount/100) :  data.discount;
                                this.couponDisabled = true;
                                this.showToast("Cupón valido","success");
                            }
                        }
                    }

                }else{
                   
                    this.toast.color = "red";
                    this.toast.message = response.data.msg;
                    this.toast.toast = true;
                    console.log(response.data)
                    
                }
            }catch(e){
                this.$store.commit('loader',false);
                console.error(e);
            }
        },
        list(){
            this.cart = this.$store.getters.StoreCart;
            // console.log(this.cart );
        },
        removeItem(index){
            this.$store.dispatch("removeItem", index);
        },
        async getLoggedUser(){
            if(localStorage.getItem('token')){
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));

                const response = await this.$API.business_partner.getPartner(this.logged_user.id);
                this.logged_affiliate = response.data.data[0];
                
                this.order.bd_id     = this.logged_affiliate.id;
                this.order.id_document_type = this.logged_affiliate.id_document_type;
                this.order.name      = this.logged_affiliate.name;
                this.order.lastname  = this.logged_affiliate.lastname;
                this.order.nro_doc   = this.logged_affiliate.nro_doc;
                this.order.address   = this.logged_affiliate.address;
                this.order.city    = this.logged_affiliate.city;
                this.order.email   = this.logged_affiliate.email;
                this.order.phone   = this.logged_affiliate.phone;
                this.order.terms_conditions   = this.logged_affiliate.terms_conditions;
                this.order.privacy_policy   = this.logged_affiliate.privacy_policy;
                this.order.country = this.countries_list.find(e => e.id == this.logged_affiliate.id_country);
                

                this.order.had_invoice = false; //?
            }
        },
        async validateUser(){
            this.$store.commit('loader', true);
            try {
                const response = await this.$API.order.validateEmail(this.order.email);
                this.paymentProcess();
            } catch (e) {
                console.error(e);

            } finally {
                this.$store.commit('loader', false);
            }
        },
        async getCountriesList(){
            this.$store.commit('loader', true);
            try {
                const response = await this.$API.configuration.getCountriesList();
                this.countries_list = response.data.data;

            } catch (e) {
                console.error(e);

            } finally {
                this.$store.commit('loader', false);
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

        async paymentProcess(){
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
                    if(!this.order.bd_id){
                        this.$store.commit('loader', true);
                        try {
                            const response = await this.$API.order.validateEmail({email:this.order.email});
                            //console.log(response)
                            this.getPaymentMethods();
                            this.payment = true;
                        } catch (e) {
                            this.openToastAlert(true, e.response.data.message, 'red');
                            console.error(e.response.data.message);
                        } finally {
                            this.$store.commit('loader', false);
                        }
                    }
                    else{
                        this.getPaymentMethods();
                        this.payment = true;
                    }
                }
                else{
                    return;
                }
            }
        },
        
        async createOrder(){
            let vm = this;
            vm.$store.commit('loader',true);
            try{
                vm.order.discount = vm.discount
                vm.order.cupon = vm.coupon
                vm.order.total = vm.total
                vm.order.subtotal = vm.subtotal;
                vm.order.detail = vm.cart;
                const data = await vm.$API.order.register(vm.order);
                vm.openToastAlert(true, 'Orden creada correctamente', 'primary');
                vm.actions = data.data.data.actions
                if((vm.actions.payment_status=='pending') && (vm.actions.payment_external == false))
                {
                    vm.$store.dispatch("cleanCart");
                    this.$router.push({ path: '/confirmar-pago/'+vm.actions.hash });
                }
                if((vm.actions.payment_status=='pending') && (vm.actions.payment_external == true))
                {
                    //Enviamos a payme
                    this.$router.push({ path: '/pago-payme/'+vm.actions.hash });
                }
                
                vm.$store.commit('loader',false);
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

        async reqCallback(response) {
            try{
                this.card_data = response;
                //console.log(this.card_data);
                const data = await this.$API.payme.saveToken(this.card_data);
            }catch(e){
                //this.$store.commit('loader',false);
                console.error(e);
            } 
        },

        abrirPayme(){
            var tokenRequest = {
                    "action": "tokenize",
                    "transaction": {
                    "meta": {
                        "internal_operation_number": Math.floor(Date.now()).toString().substring(7),
                        "additional_fields": {
                            "user_id": "USER_0001"
                        }
                    }
                },
                "card_holder": [
                    {
                        "first_name": "Juan",
                        "last_name": "Perez",
                        "email_address": "prueba@token.com",
                        "identity_document_country": "PER",
                        "identity_document_type": "DNI",
                        "identity_document_identifier": "87654321"
                    }
                ]
            };
        

            var token_key = "meQQw27S6i661bE6TnWWaYDmdwNQdJWNwe0HtD5HrL5H0hXTPdqWQjTTLAoTZKmX";

            var capture = new FlexCapture({
                "key": token_key,
                "payload": tokenRequest,
                "additionalFields": []
            });

            capture.init(document.querySelector('#demo'), this.reqCallback); 
        }
    }
}
</script>