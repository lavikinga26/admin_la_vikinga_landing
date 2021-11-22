<template>
    <div>
        <v-container>
            <div class="d-flex justify-center">
                <v-card max-width="500" min-width="500" elevation="1" class="pa-5">
                    <div class="text-center py-2">           
                        <h3 style="font-weight: 400;">
                            Información de la facturación
                        </h3>
                        <h5>N° Orden #00001002</h5>
                    </div>
                    <br>
                    <div>
                        <div>Nombre:<span style="float: right;">{{order.customer_name}}</span></div>
                        <div>Email:<span style="float: right;">{{order.customer_email}}</span></div>
                        <div>Dirección:<span style="float: right;">{{order.customer_address}}</span></div>
                    </div>
                    <br>
                    <v-file-input
                        :rules="rules"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Imágen comprobante"
                        prepend-icon="mdi-camera"
                        label="Imágen comprobante"
                    ></v-file-input>

                    <v-btn block dark color="secondary">
                        <v-icon>mdi-tray-arrow-up</v-icon>
                        &nbsp;&nbsp;ACTUALIZAR
                    </v-btn>
                </v-card>
            </div>
        </v-container>
    </div>
</template>
<script>
export default {
    components: { 
     },

    data: () => ({
        category: 0,
        order:{},
        base_url: '',
        slug:'',
        rules: [
            value => !value || value.size < 2000000 || '',
        ],
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.hash;
        vm.getOrder();
    },

    watch: {
    },

    methods: {
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