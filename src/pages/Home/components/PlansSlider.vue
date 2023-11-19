<template>
    <div style="background-color: #0b152a">
        <v-sheet
            class="mx-auto"
            elevation="'0'"
            max-width="1150"
            color="#0b152a"
            dark
        >
            <v-slide-group
            v-model="model"
            class="pa-0"
            center-active
            
            >
            <v-slide-item
                v-for="(item, n) in plans"
                :key="n"
                v-slot="{ toggle }"
            >
                <v-card
                color="primary"
                class="ma-4 card-outter"
                height="800"
                width="300"
                @click="toggle"
                >
                    <v-img
                        v-if="item.file_path"
                        lazy-src="@/assets/img/lazy_img.jpg"
                        height="360"
                        max-height="360"
                        :src="base_url + item.file_path.path + item.file_path.filename"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        class=" white--text align-end"
                    >
                        <v-card-title>
                            <div style="border-left: 4px solid #E30E4F; text-align: left; word-break: keep-all;" class="pl-1">
                                {{item.title}}
                            </div>
                        </v-card-title>
                    </v-img>
                    <v-card-text 
                        max-height="300">
                            <div class="item">
                                <div class="blog-entry">
                                    <div class="text p-2 bd_desc_carousel" v-html="item.content">
                                        <!--<ul>
                                            <li>{{item.description}}</li>
                                        </ul>-->

                                    </div>
                                </div>
                            </div>
                    </v-card-text>
                    <v-card-actions class="card-actions">
                        <v-row align="center">
                            <v-col cols="12" align="center" class="py-0" v-if="item.promotional_cost != '0.00'">
                                <strike>S/. {{ item.cost }}</strike>
                                <span class="price_carousel text-center" style="font-family: 'MachProCondBold'!important;">
                                    S/. {{item.promotional_cost}}
                                </span>  
                            </v-col>
                            <v-col cols="12" align="center" class="py-0" v-if="item.promotional_cost=='0.00'">
                                    <span class="price_carousel text-center" style="font-family: 'MachProCondBold'!important;">
                                        S/. {{ item.cost }}
                                    </span>  
                                </v-col>
                            <v-col cols="12" align="center">
                                <v-btn class="my-2 fb-btn" color="secondary" outlined @click="addToCart(item)"
                                    v-if="(data_config.allow_sale && item.allow_sale)">
                                    INICIAR DESAFÍO
                                </v-btn>
                                <v-btn class="my-2 fb-btn" color="secondary" outlined @click="addToCart(item)"
                                    v-if="(!data_config.allow_sale && item.allow_sale)">
                                    INICIAR DESAFÍO
                                </v-btn>
                                <v-btn class="my-2 fb-not-spaces" color="white" outlined v-if="(!data_config.allow_sale && !item.allow_sale)">
                                    AGOTADO
                                </v-btn>
                                <v-btn class="my-2 fb-not-spaces" color="white" outlined v-if="(data_config.allow_sale && !item.allow_sale)">
                                    AGOTADO
                                </v-btn>
                            </v-col>
                        </v-row>
                        
                    </v-card-actions>
                </v-card>
            </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>
<script>
  export default {
    data: () => ({
        model: null,
        plans:[],
        base_url: '',
        data_config: {}
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.slug;
        vm.$store.commit('loader',true);
        vm.getConfiguracion();
        vm.getBaseUrl();
        vm.list();
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
        async list(){
            let vm = this;
            try{
                const data = await this.$API.plans.list();
                vm.plans = data.data.data;
                vm.temp_plans = data.data.data;
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },
        addToCart(itemv) {
            console.log(itemv);
            this.$store.commit('loader', true);
            let item = {
                id: itemv.id,
                title: itemv.title,
                code: itemv.code,
                image: itemv.base_url + itemv.file_path.path + itemv.file_path.filename,
                price: Number(itemv.cost),
                price_promotional: Number(itemv.promotional_cost),
                quantity: 1,
                priceCompare: Number(itemv.cost),
                priceTotal: Number(itemv.cost),
                currency: itemv.currency.symbol,
                renovacion: itemv.renovacion_automatica,
                category_id: itemv.category_id
            }
            this.$store.dispatch("addItem", item);
            this.$store.commit('loader', false);
            this.$router.push({ path: '/carrito#pago' })
        }
    },
}
</script>

<style>
.card-outter {
    position: relative;
    padding-bottom: 50px;
}
.card-actions {
    position: absolute;
    bottom: 0;
}
.price_carousel{
    font-family: "MachProCondBold" !important;
}
</style>