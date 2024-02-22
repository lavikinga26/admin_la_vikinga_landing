<template>
    <v-row>
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login" style="width:100%; max-height:100vh;" />
        </v-col>
        <v-col cols="12" md="6" style="height: 100vh; overflow-y:auto;">
            <v-sheet class="mx-auto mb-5" max-width="450">
                <v-stepper
                non-linear
                value="2"
                elevation="0"
                >
                    <v-stepper-header>
                        <v-stepper-step
                        complete
                        step="1"
                        ></v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                        step="2"
                        ></v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step 
                        step="3"
                        ></v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step 
                        step="4"
                        ></v-stepper-step>
                        <v-divider></v-divider>

                            <v-stepper-step 
                            step="5"
                            ></v-stepper-step>
                    </v-stepper-header>
                </v-stepper>
            </v-sheet>
            <p class="text-center"><a href="/gym-virtual/agenda" style="text-decoration:none; font-weight:bold;font-family: 'Poppins-Regular';"><v-icon style="color: #0b233f;">mdi-weight-lifter</v-icon> Ingresar a Mi Gym</a></p>
            <h1 class="title_pink mt-4 mb-4">ELIGE TU PLAN</h1>
            
            <v-tabs
            v-model="periodicidad"
            center-active
            centered
            fixed-tabs
            class="tabs_selector"
            >
                <v-tab v-for="(tab, idx) in tabs" :key="tab.key" v-show="tab.show">{{ tab.value }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="periodicidad">
                <v-tab-item key="mensual">
                    <v-sheet
                    class="mx-auto"
                    elevation="'0'"
                    max-width="650"
                    color="#ffffff"
                    light
                >
                    <v-slide-group
                    v-model="model"
                    class="pa-0"
                    center-active
                    >
                    <v-slide-item
                        v-for="(item, n) in filtrarPlanesPeriodo(plans, 4)"
                        :key="n"
                        v-slot="{ toggle }"
                    >
                        <v-card
                            :color="n % 2 == 0 ? 'primary' : '#ffffff'"
                            :class="n % 2 == 0 ? 'ma-4 card-outter' : 'ma-4 card-outter white_card_border'"
                            height="500"
                            width="270"
                            @click="addToCart(item)"
                            elevation="0"
                        >
                        <v-badge v-if="item.promotional_cost != '0.00' && item.promotional_cost != '0'" color="#E7004C" class="badge_pink" :content="`Ahorra S/ ${item.promotional_cost - item.cost}`"></v-badge>
                            <v-card-text 
                                max-height="300">
                                    <div class="item">
                                        <div class="blog-entry">
                                            <div class="mt-4 mb-4">
                                                <p><span :class="n % 2 == 0 ? 'text_plan_title_white mb-2' : 'text_plan_title_blue mb-2'">{{ item.title }}</span></p>
                                                <p><strike v-if="item.promotional_cost != '0.00' && item.promotional_cost != '0'" :class="n % 2 == 0 ? 'price_strike_light mr-3' : 'price_strike_dark mr-3'">{{ item.promotional_cost }}</strike><span :class="n % 2 == 0 ? 'text_plan_price_pink mb-2' : 'text_plan_price_blue mb-2'">S/ {{ item.cost }}</span></p>
                                            </div>
                                            <div :class="n % 2 == 0 ? 'p-2 bd_desc_carousel_white' : 'p-2 bd_desc_carousel_blue'" v-html="item.content">

                                            </div>
                                        </div>
                                    </div>
                            </v-card-text>
                            <v-card-actions class="card-actions">
                                <v-row align="center">
                                    <v-col cols="12" align="center">
                                        <v-btn block :class="n % 2 == 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2 fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
                                            v-if="(data_config.allow_sale && item.allow_sale)">
                                            INSCRIBETE
                                        </v-btn>
                                        <v-btn block :class="n % 2 == 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2  fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
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
                </v-tab-item>
                <v-tab-item key="trimestral">
                    <v-sheet
                        class="mx-auto"
                        elevation="'0'"
                        max-width="550"
                        color="#ffffff"
                        light
                    >
                        <v-slide-group
                        v-model="model"
                        class="pa-0"
                        center-active
                        >
                        <v-slide-item
                            v-for="(item, n) in filtrarPlanesPeriodo(plans, 12)"
                            :key="n"
                            v-slot="{ toggle }"
                        >
                            <v-card
                                :color="n % 2 == 0 ? 'primary' : '#ffffff'"
                                :class="n % 2 == 0 ? 'ma-4 card-outter' : 'ma-4 card-outter white_card_border'"
                                height="500"
                                width="300"
                                @click="addToCart(item)"
                                elevation="0"
                            >
                            <v-badge v-if="item.promotional_cost == '0.00' && item.promotional_cost != '0'" color="#E7004C" class="badge_pink" :content="`Ahorra S/ ${item.promotional_cost - item.cost}`"></v-badge>
                                <v-card-text 
                                    max-height="300">
                                        <div class="item">
                                            <div class="blog-entry">
                                                <div class="mt-4 mb-4">
                                                    <p><span :class="n % 2 == 0 ? 'text_plan_title_white mb-2' : 'text_plan_title_blue mb-2'">{{ item.title }}</span></p>
                                                    <p><strike v-if="item.promotional_cost != '0.00' && item.promotional_cost != '0'" :class="n % 2 == 0 ? 'price_strike_light mr-3' : 'price_strike_dark mr-3'">{{ item.promotional_cost }}</strike><span :class="n % 2 == 0 ? 'text_plan_price_pink mb-2' : 'text_plan_price_blue mb-2'">S/ {{ item.cost }}</span></p>
                                                </div>
                                                <div :class="n % 2 == 0 ? 'p-2 bd_desc_carousel_white' : 'p-2 bd_desc_carousel_blue'" v-html="item.content">

                                                </div>
                                            </div>
                                        </div>
                                </v-card-text>
                                <v-card-actions class="card-actions">
                                    <v-row align="center">
                                        <v-col cols="12" align="center">
                                            <v-btn block :class="n % 2 == 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2 fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
                                                v-if="(data_config.allow_sale && item.allow_sale)">
                                                INSCRIBETE
                                            </v-btn>
                                            <v-btn block :class="n % 2 == 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2  fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
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
                </v-tab-item>
                <v-tab-item key="semestral">
                    <v-sheet
                        class="mx-auto"
                        elevation="'0'"
                        max-width="550"
                        color="#ffffff"
                        light
                    >
                        <v-slide-group
                        v-model="model"
                        class="pa-0"
                        center-active
                        >
                        <v-slide-item
                            v-for="(item, n) in filtrarPlanesPeriodo(plans, 24)"
                            :key="n"
                            v-slot="{ toggle }"
                        >
                            <v-card
                                :color="n % 2 != 0 ? 'primary' : '#ffffff'"
                                :class="n % 2 != 0 ? 'ma-4 card-outter' : 'ma-4 card-outter white_card_border'"
                                height="500"
                                width="300"
                                @click="addToCart(item)"
                                elevation="0"
                            >
                            <v-badge v-if="item.promotional_cost != '0.00' && item.promotional_cost != '0'" color="#E7004C" class="badge_pink" :content="`Ahorra S/ ${item.promotional_cost - item.cost}`"></v-badge>
                                <v-card-text 
                                    max-height="300">
                                        <div class="item">
                                            <div class="blog-entry">
                                                <div class="mt-4 mb-4">
                                                    <p><span :class="n % 2 == 0 ? 'text_plan_title_white mb-2' : 'text_plan_title_blue mb-2'">{{ item.title }}</span></p>
                                                    <p><strike v-if="item.promotional_cost != '0.00' && item.promotional_cost != '0'" :class="n % 2 == 0 ? 'price_strike_light mr-3' : 'price_strike_dark mr-3'">{{ item.promotional_cost }}</strike><span :class="n % 2 == 0 ? 'text_plan_price_pink mb-2' : 'text_plan_price_blue mb-2'">S/ {{ item.cost }}</span></p>
                                                </div>
                                                <div :class="n % 2 == 0 ? 'p-2 bd_desc_carousel_white' : 'p-2 bd_desc_carousel_blue'" v-html="item.content">

                                                </div>
                                            </div>
                                        </div>
                                </v-card-text>
                                <v-card-actions class="card-actions">
                                    <v-row align="center">
                                        <v-col cols="12" align="center">
                                            <v-btn block :class="n % 2 == 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2 fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
                                                v-if="(data_config.allow_sale && item.allow_sale)">
                                                INSCRIBETE
                                            </v-btn>
                                            <v-btn block :class="n % 2 == 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2  fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
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
                </v-tab-item>
                <v-tab-item key="anual">
                    <v-sheet
                        class="mx-auto"
                        elevation="'0'"
                        max-width="550"
                        color="#ffffff"
                        light
                    >
                        <v-slide-group
                        v-model="model"
                        class="pa-0"
                        center-active
                        >
                        <v-slide-item
                            v-for="(item, n) in filtrarPlanesPeriodo(plans, 48)"
                            :key="n"
                            v-slot="{ toggle }"
                        >
                            <v-card
                                :color="n % 2 == 0 ? 'primary' : '#ffffff'"
                                :class="n % 2 == 0 ? 'ma-4 card-outter' : 'ma-4 card-outter white_card_border'"
                                height="500"
                                width="300"
                                @click="addToCart(item)"
                                elevation="0"
                            >
                            <v-badge v-if="item.promotional_cost != '0.00' && item.promotional_cost != '0'" color="#E7004C" class="badge_pink" :content="`Ahorra S/ ${item.promotional_cost - item.cost}`"></v-badge>
                                <v-card-text 
                                    max-height="300">
                                        <div class="item">
                                            <div class="blog-entry">
                                                <div class="mt-4 mb-4">
                                                    <p><span :class="n % 2 == 0 ? 'text_plan_title_white mb-2' : 'text_plan_title_blue mb-2'">{{ item.title }}</span></p>
                                                    <p><strike v-if="item.promotional_cost != '0.00' && item.promotional_cost != '0'" :class="n % 2 == 0 ? 'price_strike_light mr-3' : 'price_strike_dark mr-3'">{{ item.promotional_cost }}</strike><span :class="n % 2 == 0 ? 'text_plan_price_pink mb-2' : 'text_plan_price_blue mb-2'">S/ {{ item.cost }}</span></p>
                                                </div>
                                                <div :class="n % 2 == 0 ? 'p-2 bd_desc_carousel_white' : 'p-2 bd_desc_carousel_blue'" v-html="item.content">

                                                </div>
                                            </div>
                                        </div>
                                </v-card-text>
                                <v-card-actions class="card-actions">
                                    <v-row align="center">
                                        <v-col cols="12" align="center">
                                            <v-btn block :class="n % 2 == 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2 fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
                                                v-if="(data_config.allow_sale && item.allow_sale)">
                                                INSCRIBETE
                                            </v-btn>
                                            <v-btn block :class="n % 2 == 0 ? 'my-2 fb-btn btn_pink_white' : 'my-2  fb-btn btn_blue_white'" style="padding:0.7em 0px!important;" @click="addToCart(item)"
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
                </v-tab-item>
            </v-tabs-items>
            <v-sheet
                class="mx-auto"
                elevation="0"
                max-width="450"
            >
                <v-carousel
                    cycle
                    :show-arrows="false"
                    hide-delimiters
                    height="320"
                >
                    <v-carousel-item class="ma-4">
                        <v-card
                        color="grey-lighten-1"
                        width="540"
                        outlined
                        >
                        <div class="align-center justify-center">
                            <p class="pa-3 align-center" style="text-align:center;">
                                <v-rating :value="5" background-color="indigo" color="yellow darken-3" disabled></v-rating>
                                Me gusta la buena vibra de los entrenadores y que sufren igual o más que yo.  Y que me acompañen a ir aumentando la carga progresivamente, pero sobre todo a no dejar de moverme 💪.<br><br>
                                <span style="font-weight:bold;">Carolina</span>
                            </p>
                        </div>
                        </v-card>
                    </v-carousel-item>
                    <v-carousel-item class="ma-4">
                        <v-card
                        color="grey-lighten-1"
                        width="540"
                        outlined
                        >
                        <div class="align-center justify-center">
                            <p class="pa-3 align-center" style="text-align:center;">
                                <v-rating :value="5" background-color="indigo" color="yellow darken-3" disabled></v-rating>
                                Las clases son todas excelentes, y me ayudan las explicaciones y correcciones. Amo las rutinas, y que sean grabadas así las puedo hacer a la hora que mas me conviene. Y el tener el pdf también me ayuda a que a veces lo hago cuando no tengo buena señal, y lo puedo hacer sola por lo que me han enseñado.<br><br>
                                <span style="font-weight:bold;">Gabriela Francke</span>
                            </p>
                        </div>
                        </v-card>
                    </v-carousel-item>
                    <v-carousel-item class="ma-4">
                        <v-card
                        color="grey-lighten-1"
                        width="540"
                        outlined
                        >
                        <div class="align-center justify-center">
                            <p class="pa-3 align-center" style="text-align:center;">
                                <v-rating :value="5" background-color="indigo" color="yellow darken-3" disabled></v-rating>
                                Me gusta todo, osea la intensidad, la exigencia, la paciencia con la q Sol , Nico y Maggy nos motivan a entrenar, y sobre todo enseñan, me han ayudado a ser más disciplinada aun no lo soy al 100% pero estoy encaminada!!<br><br>
                                <span style="font-weight:bold;">Monica Hurtado</span>
                            </p>
                        </div>
                        </v-card>
                    </v-carousel-item>
                </v-carousel>
            </v-sheet>
            <v-sheet class="mx-auto" style="width: 100px;">
                <v-btn class="text_btn_white_title" depressed color="secondary" @click="volver">
                    <v-icon>mdi-chevron-left</v-icon>VOLVER
                </v-btn>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
export default {

    data: (e) => ({
        model: null,
        pq:null,
        model2: 0,
        plans: [],
        base_url: '',
        data_config: {},
        periodicidad: null,
        interval: 0,
        show_gym: false,
        tabs: [
            { key: "mensual", value: "Mensual", show: true },
            { key: "trimestral", value: "Trimestral", show: true },
            { key: "semestral", value: "Semestral", show: true },
            { key: "anual", value: "Anual", show: true },
        ]
    }),
    mounted() {
        let vm = this;
        this.pq = localStorage.getItem('paquete_seleccionado');
        vm.slug = this.$route.params.slug;
        vm.getConfiguracion();
        vm.getBaseUrl();
        vm.list();
    },
    methods: {
        async getLoggedUser() {
            if (localStorage.getItem('token')) {
                this.show_gym = true;
            }
        },
        checkPlan() {
            var itemv = this.plans.find(element => element.code == this.pq);
            localStorage.removeItem('planSeleccionado');
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
            };
            localStorage.planSeleccionado = JSON.stringify(item);
            this.$store.dispatch("addItem", item);
            this.$router.push({ path: '/auth/registrarse' });
        },
        volver() {
            this.$router.push({ path: '/' });
        },
        filtrarPlanesPeriodo(planes, period) {
            let listaPlanes = planes.filter((plan) => plan.months == period);
            let estado = listaPlanes.length == 0 ? false : true;
            switch (period) {
                case 4:
                    this.tabs[0].show = estado;
                    break;
                case 12:
                    this.tabs[1].show = estado;
                    break;
                case 24:
                    this.tabs[2].show = estado;
                    break;
                case 48:
                    this.tabs[3].show = estado;
                    break;
            }
            return listaPlanes;
        },
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
            vm.$store.commit('loader', true);
            
            try {
                const data = await this.$API.plans.list();
                vm.plans = data.data.data;
                vm.temp_plans = data.data.data;
                vm.checkPlan();
                vm.$store.commit('loader', false);
            }
            catch (e) {
                console.error(e);
                vm.$store.commit('loader', false);
            }
        },
        addToCart(itemv) {
            this.$store.commit('loader', true);
            localStorage.removeItem('planSeleccionado');
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
            };
            localStorage.planSeleccionado = JSON.stringify(item);
            this.$store.dispatch("addItem", item);
            this.$store.commit('loader', false);
            //this.$router.push({ path: '/carrito#pago' })
            this.$router.push({ path: '/auth/registrarse' })
        }
    }
}
</script>
<style scoped></style>