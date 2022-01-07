<template>
    <div>
        <v-container>
            <div class="d-flex justify-center">
                <v-card max-width="700" min-width="300" elevation="1" class="pa-5">
                    <div class="py-2 d-flex align-center">
                        <h2>Pago con tarjetas de crédito/débito</h2>  
                    </div>

                    <h4 style="font-weight: 100;" class="mx-3" v-if="usercc.length > 0">Selecciona una de tus tarjetas</h4>
                    <v-radio-group
                    v-model="selected_card"
                    column
                    color="secondary"
                    class="mt-0"
                    >
                        <template v-for="(item, index) in usercc">
                            <v-card :key="index" class="ma-3 pa-3">
                                <div class="d-flex align-center">    
                                    <div>
                                        <v-radio
                                            :value="item.id_card"
                                            color="secondary"
                                        ></v-radio>
                                    </div>
                                    
                                    <div>
                                        <img style="max-width: 40px" src="@/assets/img/icons/visa.png" v-if="item.card_brand == 'Visa'"/>
                                        <img style="max-width: 40px" src="@/assets/img/icons/mastercard.png" v-if="item.card_brand == 'Mastercard'"/>
                                        <img style="max-width: 40px" src="@/assets/img/icons/amex.png" v-if="item.card_brand == 'Amex'"/>
                                    </div>
                                    <div style="margin-left: 20px;">
                                        <h4> ****{{item.last_pan}}</h4>
                                        <!--<p style="font-size: 0.8rem; margin-bottom: 0px;">
                                            {{item.description}}
                                        </p>
                                        <div style="font-size: 0.8rem; margin-bottom: 0px;"
                                            v-html="item.card_brand">
                                        </div>-->
                                    </div>
                                </div>
                            </v-card>
                        </template>
                    </v-radio-group>
                    
                    <div class="mt-2 mb-2 d-flex">
                        <v-btn color="secondary"
                            outlined
                            class="px-2"
                            @click="abrirPayme()"
                            v-if="hide_btn==false">
                            <span class="ma-3">Nueva Tarjeta</span>
                        </v-btn>

                        <v-btn color="secondary"
                            depressed
                            class="btn_pay_cc"
                            @click="abrirPayme()"
                            v-if="hide_btn==false">
                            <span class="ma-3">Pagar</span>
                        </v-btn>
                    </div>

                    <div class="d-flex">
                        <div id="demo" class="d-flex"></div>
                    </div>
                    
                </v-card>
            </div>
            
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
import API from "../../api/axios";
export default {
    components: { 
        axios
     },

    data: () => ({
        category: 0,
        order:{},
        usercc:{},
        selected_card: 0,
        base_url: '',
        slug:'',
        rules: [
            value => !value || value.size < 2000000 || '',
        ],
        hide_btn: false,
        img_file: null,
        img_url: "../images/default-image.png",
        
        toast:{
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },

        uploadSuccess: false,
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.hash;
        vm.getOrder();

        /** Importamos Pay-me */
        let paymeScript = document.createElement('script');
        paymeScript.setAttribute('src', 'https://alignet-flex-demo.s3.amazonaws.com/flex-capture.min.js');
        document.head.appendChild(paymeScript);

        
    },

    watch: {
    },

    methods: {
        
        showToast(msg,color){
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },

        async getOrder(){
            let vm = this;
            vm.$store.commit('loader',true);
            try{
                //console.log("HASH: "+vm.slug);
                const data = await this.$API.order.getAllOrderInfo(vm.slug);
                console.log(data.data.data);
                vm.order = data.data.data.order;
                const ucards = await this.$API.payme.getUserCards(vm.order.customer);
                vm.usercc = ucards.data.data.cards;
                if(vm.usercc.length == 0){
                    this.abrirPayme();
                }
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },

        async reqCallback(response) {
            try{
                let vm = this;
                vm.$store.commit('loader',false);
                this.card_data = response;
                //console.log(this.card_data);
                this.card_data.id_user = this.order.customer.id;
                const data = await this.$API.payme.saveToken(this.card_data);

                let token_resul = data.data.data;

                if(token_resul.success == true){
                    //console.log("TOKEN CREADO");

                    token_resul.ucard.hash_order = vm.slug;

                    const data_auth = await this.$API.payme.authTransaction(token_resul.ucard);
                    //console.log(data_auth);
                }else{
                    alert("Error al generar token.");
                }
                
            }catch(e){
                //this.$store.commit('loader',false);
                console.error(e);
            } 
        },

        startCallback() {
            let vm = this;
            vm.$store.commit('loader',true);
            //console.log("-------Click en pagar-------");
        },

        errorOnPayCallback() {
            //console.log("-------Error al momento pagar-------");
        },

        abrirPayme(){
            this.hide_btn = true;
            this.selected_card = 0;
            var tokenRequest = {
                    "action": "tokenize",
                    "transaction": {
                    "meta": {
                        "internal_operation_number": Math.floor(Date.now()).toString().substring(7),
                        "additional_fields": {
                            "user_id": this.order.customer.id_user
                        }
                    }
                },
                "card_holder": [
                    {
                        "first_name": this.order.customer.name,
                        "last_name": this.order.customer.lastname,
                        "email_address": this.order.customer.email,
                        "identity_document_country": "PER",
                        "identity_document_type": this.order.customer.document_type.name,
                        "identity_document_identifier": this.order.customer.nro_doc
                    }
                ]
            };

            //console.log(tokenRequest);

            var token_key = "meQQw27S6i661bE6TnWWaYDmdwNQdJWNwe0HtD5HrL5H0hXTPdqWQjTTLAoTZKmX";

            var capture = new FlexCapture({
                "key": token_key,
                "payload": tokenRequest,
                "additionalFields": []
            });

            capture.init(document.querySelector('#demo'), this.reqCallback, this.startCallback, this.errorOnPayCallback); 
        }
    },
}
</script>
<style>
  .fb-btn.v-btn--outlined {
    border: 1px solid #E30E4F;
  }
  .rounded-lg .round-radius{
    border-radius: 5px !important; 
  }
</style>