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
                <v-col cols="12" md="6" align-self="center">
                    <v-img
                        lazy-src="@/assets/img/lazy_img.jpg"
                        max-height="550"
                        :src="base_url + plan.file_path.path + plan.file_path.filename"
                    ></v-img>
                </v-col>
                <v-col cols="12" md="6">
                    <div style="min-height: 490px;" class="pa-10">
                        <h2 class="tit_h1_pink" style="line-height: 1em">{{plan.title}}</h2>
                        <h4 class="mb-10 white--text" style="letter-spacing: 5px;">{{plan.months}} SEMANAS</h4>
                        <div class="grey--text text--lighten-2 desc_plan py-5 mb-5" >
                            <!--<ul>
                                <li>{{plan.description}}</li>
                            </ul>-->
                            <div>{{plan.description}}</div>
                            <br>
                            <div v-html="plan.content"></div>
                        </div>
                        <div class="my-4" v-if="(plan.promotional_cost == '0.00')">
                            <span class="price_carousel text-center" style="font-family: 'MachProCondBold' !important;">
                                S/. {{plan.cost}}
                            </span>  
                        </div>
                        <v-btn
                            class="my-2 fb-btn"
                            color="secondary"
                            outlined
                            @click="addToCart"
                            v-if="(data_config.allow_sale && plan.allow_sale)"
                            >
                                INICIAR DESAFÍO
                        </v-btn>
                        <v-btn
                            class="my-2 fb-btn"
                            color="secondary"
                            outlined
                            @click="addToCart"
                            v-if="(!data_config.allow_sale && plan.allow_sale)"
                            >
                                INICIAR DESAFÍO
                        </v-btn>
                        <v-btn
                            class="my-2 fb-not-spaces"
                            color="white"
                            outlined
                            v-if="(!data_config.allow_sale && !plan.allow_sale)"
                            >
                                AGOTADO
                        </v-btn>
                        <v-btn
                            class="my-2 fb-not-spaces"
                            color="white"
                            outlined
                            v-if="(data_config.allow_sale && !plan.allow_sale)"
                            >
                                AGOTADO
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </div>
<whatsapp />
    </div>
    
</template>
<script>
export default {
    components: { 
     },

    data: () => ({
        category: 0,
        plan: {},
        base_url: '',
        slug:'',
        data_config: {}
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.slug;
        vm.getConfiguracion();
        vm.getBaseUrl();
        vm.getPlan();
        this.$store.commit('loader',true);
        setTimeout(()=>{ 
            this.$store.commit('loader',false);
        }, 2000);
    },

    watch: {
    },

    methods: {
        async getConfiguracion(){
            try{
                const data = await this.$API.configuration.configuration();
                this.data_config = data.data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
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
            vm.$store.commit('loader',true);
            try{
                const data = await this.$API.plans.read(vm.slug);
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
                id: this.plan.id,
                title: this.plan.title,
                code: this.plan.code,
                image: this.base_url + this.plan.file_path.path + this.plan.file_path.filename,
                price: Number(this.plan.cost),
                quantity: 1,
                priceCompare: Number(this.plan.cost),
                priceTotal: Number(this.plan.cost),
                currency: this.plan.currency.symbol,
                renovacion: this.plan.renovacion_automatica
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
  .fb-not-spaces.v-btn--outlined {
    border: 1px solid #FFFFFF;
  }
  .rounded-lg .round-radius{
    border-radius: 5px !important; 
  }
</style>