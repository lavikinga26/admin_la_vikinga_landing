<template>
    <v-row>
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login" style="width:100%;"/>
        </v-col>
        <v-col cols="12" md="6" style="height: 100vh; overflow-y:auto;">
            <v-sheet class="mx-auto mb-5" max-width="450">
                    <v-stepper
                    non-linear
                    value="5"
                    elevation="0"
                    >
                        <v-stepper-header>
                            <v-stepper-step
                            step="1"
                            complete
                            ></v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                            step="2"
                            complete
                            ></v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step 
                            step="3"
                            complete
                            ></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step 
                            step="4"
                            complete
                            ></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step 
                            step="5"
                            ></v-stepper-step>
                        </v-stepper-header>
                    </v-stepper>
                </v-sheet>
            <h1 class="title_pink mb-4">Realizar pago</h1>
            <v-sheet max-width="400" class="mx-auto">
                <div class="py-2 d-flex align-center">
                        <div style="width: 100%" class="text-center">
                            <h3>Sólo queda realizar la transferencia para iniciar el Desafío.</h3>
                        </div>
                    </div>
                    <div class="py-2 d-flex align-center">
                        
                        <div style="width: 40%" class="text-center">
                            <img style="width: 100px" src="@/assets/img/icons/mobile-payment.png" />
                        </div>
                        <div style="width: 60%" class="text-rigth">
                            <h3 style="font-weight: 400;">
                                Información de orden
                            </h3>
                            <h5>N° Orden #{{String(order.id_order).padStart(8,'0')}}</h5>
                        </div>      
                    </div>
                    <div>
                        <div style="font-size: 0.8rem;">Nombre:<span style="float: right;font-size: 0.8rem; ">{{order.customer_name}}</span></div>
                        <div style="font-size: 0.8rem;">Email:<span style="float: right;font-size: 0.8rem; ">{{order.customer_email}}</span></div>
                        <div style="font-size: 0.8rem;">Dirección:<span style="float: right;font-size: 0.8rem; ">{{order.customer_address}}</span></div>
                    </div>
                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left" style="font-size: 0.7rem;">
                                Producto
                            </th>
                            <th class="text-left" style="font-size: 0.7rem;">
                                Total
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="item in order.detail"
                            :key="item.name"
                            >
                            <td style="font-size: 0.8rem;">{{ item.quantity }} X {{ item.product_name }}</td>
                            <td style="font-size: 0.8rem;">S/. {{ item.price_total }}</td>
                            </tr>

                            <tr v-if="order.discount>0">
                                <td style="font-size: 0.8rem;"><b>Descuento</b></td>
                                <td style="font-size: 0.8rem;">S/. -{{ order.discount }}</td>
                            </tr>
                            <tr v-if="order.discount>0">
                                <td style="font-size: 0.8rem;"><b>Total a Pagar</b></td>
                                <td style="font-size: 0.8rem;">S/. {{ order.total }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                    <br>
                    <div class="text-center">
                        <div  style="font-size: 0.8rem;">{{order.payment_title}}</div>
                        <div v-html="order.payment_description"  style="font-size: 0.8rem; margin-bottom: 0px;"></div>
                    </div>

                    <template v-if="order.status == 4">
                        <h3 class="text-center my-7"><b>Orden pendiente de confirmación</b></h3>
                    </template>
                    <template v-if="order.status == 5">
                        <v-file-input label="Imágen comprobante"
                            accept="image/png, image/jpeg, image/bmp"
                            ref="file"
                            @change="onFileChange"
                            prepend-icon="mdi-camera"
                        ></v-file-input>
                        <v-img :src="img_url"
                            contain
                            max-height="300"
                            max-width="600"
                            class="ma-5"
                        />
                        <v-btn block dark color="secondary" @click="submitFiles()">
                            <v-icon>mdi-tray-arrow-up</v-icon>
                            &nbsp;&nbsp;ENVIAR
                        </v-btn>
                    </template>
            </v-sheet>
        </v-col>
        <v-col cols="12" class="text-center">
            <v-btn  block dark color="secondary" href="https://lavikingaoficial.com" target="_blank">
                Ir a Inicio
            </v-btn>
        </v-col>
        <v-snackbar
            v-model="toast.toast"
            :timeout="toast.timeout"
            :color="toast.color"
            dark
            >
            {{ toast.message }}
        </v-snackbar>
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
        
        showToast(msg,color){
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },

        async getOrder(){
            let vm = this;
            vm.$store.commit('loader',true);
            try{
                const data = await this.$API.order.payment(vm.slug);
                console.log(data.data.data.order);
                vm.order = data.data.data.order;
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },

        onFileChange(file) {
            if (!file) { return; }
            this.img_file = this.$refs.file.lazyValue;
            this.img_url = URL.createObjectURL(this.img_file);
        },

        async submitFiles() {
            let formData = new FormData();
            formData.append('id_order', this.slug);
            formData.append('file', this.img_file);
            axios.post(this.$baseURL + 'api/v1/files/upload-order-voucher',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function(data) {
                //console.log(data.data);
                this.uploadSuccess = true;
                this.showToast('Comprobante enviado correctamente',"success");
                this.$router.go();
            }.bind(this)).catch(function(e) {
                this.showToast(e.response.data.message,"red");
            });
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