<template>
    <v-row>
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login" style="width:100%;"/>
        </v-col>
        <v-col cols="12" md="6" style="height: 100vh; overflow-y:auto;">
            <div class="d-flex justify-center" v-if="order.id_status == 1">
                <v-card max-width="450" style="margin-top: 15%;" elevation="0" class="pa-2">
                    <div class="py-2 d-flex align-center">
                        <div style="" class="text-rigth">
                            <h4 class="title_pink" style="text-align:left!important;">
                                Felicidades, {{ order.customer_name.split(' ')[0] }}
                            </h4><br>
                            <h3 style="font-weight: 200;">La comunidad vikinga te da la bienvenida al Desafio Gym Virtual. Te hemos enviado un email de confirmación a {{ order.customer_email }}.</h3><br>
                            <v-btn link to="/gym-virtual/agenda" color="secondary" depressed>Ingresar al gym</v-btn>
                        </div>     
                        
                    </div>
                    <br>
                </v-card>
            </div>

            <div class="d-flex justify-center" v-if="order.id_status == 2">
                <v-card max-width="450" elevation="0" class="pa-2">
                    <div class="py-2 d-flex align-center">
                        <div style="width: 40%" class="text-center">
                            <img style="width: 100px" src="@/assets/img/icons/payment_declined.png" />
                        </div>   
                        <div style="width: 60%" class="text-rigth">
                            <h3 style="font-weight: 800;">
                                Lo sentimos, no se pudo procesar tu pago.
                            </h3><br>
                            <span>
                                <b>Motivo:</b> {{ order.comment }}
                            </span><br><br>
                            <h4 style="font-weight: 200;">Verifica que los datos ingresados sean correctos o intenta con otra tarjeta de crédito o débito.</h4>
                            <v-btn color="secondary"
                                depressed
                                class="align-center mt-5"
                                @click="reintentar()">
                                <span class="ma-3">Intentar nuevamente</span>
                            </v-btn>
                        </div>
                    </div>
                    <br>
                </v-card>
            </div>
        </v-col>
        <v-snackbar
            v-model="toast.toast"
            :timeout="toast.timeout"
            :color="toast.color"
            dark
            >
            {{ toast.message }}
        </v-snackbar>
        <whatsapp/>
    </v-row>
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
    },

    watch: {
    },

    methods: {
        reintentar(){
            this.$router.push({ path: '/pago-payme/'+this.slug })
        },
        showToast(msg,color){
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },

        async getOrder(){
            let vm = this;
            vm.$store.commit('loader',true);
            try{
                const data = await this.$API.order.getAllOrderInfo(vm.slug);
                console.log(data.data.data);
                vm.order = data.data.data.order;
                if(vm.order.id_status==1){
                    vm.$store.dispatch("cleanCart");
                }
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },
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