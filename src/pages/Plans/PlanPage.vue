<template>
    <div class="bg_blue">
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <div class="inline-block">
                        <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                        <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    </div>
                    
                    <p class="tit_h1_white text_entrena">INSCRIPCIONES</p>
                </div>
            </div>
        </div>

        <div class="container mt-4">
            <v-row>
                <v-col cols="12" md="6">

                </v-col>
                <v-col cols="12" md="6">
                    <div style="min-height: 490px;" class="pa-10">
                        <h2 class="tit_h1_pink">PLAN VIKINGA</h2>
                        <h4 class="mb-10 white--text" style="letter-spacing: 5px;">12 MESES</h4>
                        <div class="grey--text text--lighten-2 desc_plan py-10">
                            <ul>
                                <li>dskhjdsfh</li>
                                <li>dskhjdsfh</li>
                                <li>dskhjdsfh</li>
                                <li>dskhjdsfh</li>
                                <li>dskhjdsfh</li>
                            </ul>
                        </div>
                        <v-btn
                            class="ma-2 fb-btn"
                            color="secondary"
                            outlined
                            @click="addToCart"
                            >
                                COMPRAR AHORA
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </div>

    </div>
</template>
<script>
export default {
    components: { 
     },

    data: () => ({
        category: 0,
        plan:{},
        base_url: '',
        slug:''
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.slug;
        vm.$store.commit('loader',true);
        vm.getBaseUrl();
        vm.getPlan();
    },

    watch: {
    },

    methods: {
        async getBaseUrl(){
            try{
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
        async getPlan(){
            let vm = this;
            try{
                const data = await this.$API.plans.read(vm.slug);
                console.log(data.data.data)
                vm.plan = data.data.data;
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },
        addToCart() {
            this.$store.commit('loader',true);
            let item = {
                title: this.plan.title,
                code: this.plan.code,
                image: this.base_url + this.plan.file_path.path + this.plan.file_path.filename,
                price: Number(this.plan.cost),
                quantity: 1,
                priceCompare: Number(this.plan.cost),
                currency: this.plan.currency.symbol
            }
            this.$store.dispatch("addItem", item);
            this.$store.commit('loader',false);
            this.$router.push({ path: '/carrito#pago' })
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