<template>
    <v-row no-gutters>
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login" style="width:100%;" />
        </v-col>
        <v-col cols="12" md="6">
            <h1 class="title_pink mt-4 mb-4">ELIGE TU PLAN</h1>
            <v-tabs
            center-active
            centered
            class="tabs_selector"
            >
                <v-tab>MENSUAL</v-tab>
                <v-tab>TRIMESTRAL</v-tab>
                <v-tab>SEMESTRAL</v-tab>
                <v-tab>ANUAL</v-tab>
            </v-tabs>
            <v-sheet
                class="mx-auto"
                elevation="'0'"
                max-width="1150"
                color="#ffffff"
                light
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
                    :color="n%2!=0 ? 'primary' : '#ffffff'"
                    class="ma-4 card-outter"
                    height="500"
                    width="300"
                    @click="toggle"
                    >
                    <v-badge v-if="item.promotional_cost != '0.00'" color="#E7004C" class="badge_pink" :content="`Ahorra S/ ${item.promotional_cost- item.cost}`"></v-badge>
                        <v-card-text 
                            max-height="300">
                                <div class="item">
                                    <div class="blog-entry">
                                        <div class="mt-4 mb-4">
                                            <p><span :class="n % 2 != 0 ? 'text_plan_title_white mb-2' : 'text_plan_title_blue mb-2'">{{item.title }}</span></p>
                                            <p><strike v-if="item.promotional_cost!='0.00'" :class="n % 2 != 0 ? 'price_strike_light mr-3' : 'price_strike_dark mr-3'">{{ item.promotional_cost }}</strike><span :class="n % 2 != 0 ? 'text_plan_price_pink mb-2' : 'text_plan_price_blue mb-2'">S/ {{ item.cost }}</span></p>
                                        </div>
                                        <div :class="n % 2 != 0 ? 'p-2 bd_desc_carousel_white' : 'p-2 bd_desc_carousel_blue'" v-html="item.content">

                                        </div>
                                    </div>
                                </div>
                        </v-card-text>
                        <v-card-actions class="card-actions">
                            <v-row align="center">
                                <v-col cols="12" align="center">
                                    <v-btn block :class="n % 2 != 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2 fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
                                        v-if="(data_config.allow_sale && item.allow_sale)">
                                        INSCRIBETE
                                    </v-btn>
                                    <v-btn block :class="n % 2 != 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2  fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
                                        v-if="(!data_config.allow_sale && item.allow_sale)">
                                        INSCRIBETE
                                    </v-btn>
                                </v-col>
                            </v-row>
                        
                        </v-card-actions>
                    </v-card>
                </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
export default {

    data: (e) => ({
        model: null,
        plans: [],
        base_url: '',
        data_config: {}
    }),
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.slug;
        vm.getConfiguracion();
        vm.getBaseUrl();
        vm.list();
    },
    methods: {
        async getConfiguracion() {
            try {
                const data = await this.$API.configuration.configuration();
                this.data_config = data.data.data;
            }
            catch (e) {
                console.error(e);
            }
        },
        async getBaseUrl() {
            try {
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
            }
            catch (e) {
                console.error(e);
            }
        },
        async list() {
            let vm = this;
            try {
                const data = await this.$API.plans.list();
                vm.plans = data.data.data;
                vm.temp_plans = data.data.data;
                vm.$store.commit('loader', false);
            }
            catch (e) {
                console.error(e);
                vm.$store.commit('loader', false);
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
            //this.$router.push({ path: '/carrito#pago' })
            this.$router.push({ path: '/proceso_compra/step3' })
        }
    }
}
</script>
<style scoped></style>