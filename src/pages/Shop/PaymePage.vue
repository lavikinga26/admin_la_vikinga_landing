<template>
    <div>
        <v-container>
            <div class="d-flex justify-center">
                <v-card max-width="800" min-width="400" elevation="1" class="pa-5">
                    <div class="py-2 d-flex align-center">
                        <h2>Pago con tarjetas de crédito/débito a través de Payme</h2>  
                    </div>

                    <div class="mt-2 d-flex align-center">
                        <v-btn @click="abrirPayme()">Abrir Formulario de Pago</v-btn>
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
        base_url: '',
        slug:'',
        rules: [
            value => !value || value.size < 2000000 || '',
        ],
        
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
        let paymeScript = document.createElement('script')
        paymeScript.setAttribute('src', 'https://alignet-flex-demo.s3.amazonaws.com/flex-capture.min.js')
        document.head.appendChild(paymeScript)
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
                console.log("HASH: "+vm.slug);
                const data = await this.$API.order.getAllOrderInfo(vm.slug);
                console.log(data.data.data);
                vm.order = data.data.data.order;
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },

        async reqCallback(response) {
            try{
                this.card_data = response;
                console.log(this.card_data);
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
        

            var token_key = "meQQw27S6i661bE6TnWWaYDmdwNQdJWNwe0HtD5HrL5H0hXTPdqWQjTTLAoTZKmX";

            var capture = new FlexCapture({
                "key": token_key,
                "payload": tokenRequest,
                "additionalFields": []
            });

            capture.init(document.querySelector('#demo'), this.reqCallback); 
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