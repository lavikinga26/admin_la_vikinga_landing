<template>
    <div>
        <v-container>
            <div class="d-flex justify-center">
                <v-card max-width="500" min-width="500" elevation="1" class="pa-5">
                    <div class="py-2 d-flex align-center">
                        <div style="width: 40%" class="text-center">
                            <img style="width: 100px" src="@/assets/img/icons/mobile-payment.png" />
                        </div>   
                        <div style="width: 60%" class="text-rigth">
                            <h3 style="font-weight: 400;">
                                Información de facturación
                            </h3>
                            <h5>N° Orden #0000{{ order.id }}</h5>
                        </div>     
                        
                    </div>
                    <br>
                    <div>
                        <div>Nombre:<span style="float: right;">{{order.customer_name}}</span></div>
                        <div>Email:<span style="float: right;">{{order.customer_email}}</span></div>
                        <div>Dirección:<span style="float: right;">{{order.customer_address}}</span></div>
                    </div>
                    <br>
                    <template v-if="order.status == 4">
                        <h3 class="text-center my-7"><b>Orden pendiente de confirmación</b></h3>
                    </template>
                    <template v-if="order.status == 5">
                        <v-file-input label="Imágen comprobante"
                            accept="image/png, image/jpeg, image/bmp"
                            ref="file"
                            @change="onFileChange"
                            prepend-icon="mdi-camera"
                            placeholder="Imágen comprobante"
                        ></v-file-input>
                        <v-img :src="img_url"
                            contain
                            max-height="300"
                            max-width="600"
                            class="ma-5"
                        />
                        <v-btn block dark color="secondary" @click="submitFiles()">
                            <v-icon>mdi-tray-arrow-up</v-icon>
                            &nbsp;&nbsp;ACTUALIZAR
                        </v-btn>
                    </template>
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