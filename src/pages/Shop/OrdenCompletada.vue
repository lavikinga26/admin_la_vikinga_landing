<template>
    <div>
        <v-container>
            <div class="d-flex justify-center" v-if="order.id_status == 1">
                <v-card max-width="500" min-width="500" elevation="1" class="pa-5">
                    <div class="py-2 d-flex align-center">
                        <div style="width: 40%" class="text-center">
                            <img style="width: 100px" src="@/assets/img/icons/approved.png" />
                        </div>   
                        <div style="width: 60%" class="text-rigth">
                            <h4 style="font-weight: 800;">
                                Gracias! Tu orden se realizó correctamente.
                            </h4><br>
                            <h4 style="font-weight: 800;">
                                Ya puedes disfrutar de tu plan y acceder a nuestras clases! Para ello debes dirigirte a tu gym virtual.
                            </h4><br>

                            <v-btn color="secondary"
                                    :href="'/gym-virtual/agenda'"
                                    depressed
                                    large
                                    class="px-2">
                                <span class="ma-3">Ir a Gym Virtual</span>
                            </v-btn>
                        </div>     
                        
                    </div>
                    <br>
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

        irGym(){
            this.$router.push({ path: '/gym-virtual/agenda' })
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