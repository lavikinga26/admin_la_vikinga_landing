<template>
    <v-row no-gutters>
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login" style="width:100%;" />
        </v-col>
        <v-col cols="12" md="6">
            <h1 class="title_pink mt-4 mb-4">DETALLES DE PAGO</h1>
            <v-tabs center-active centered class="tabs_selector_payment" v-model="tab_payment">
                <v-tab key="1">TARJETA DE CRÉDITO/DÉBITO</v-tab>
                <v-tab key="2">TRANSFERENCIA BANCARIA</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab_payment">
                <v-tab-item key="1">
                    <v-container class="mx-auto" style="width:450px">
                        <v-row>
                            <v-col cols="8"><b>Total</b></v-col>
                            <v-col cols="4"><b>S/ 93</b></v-col>
                        </v-row>
                        <hr/>
                        <v-row class="mt-5">
                            <v-col cols="8">
                                <label class="text_field_form">Cupón de descuento</label>
                                <v-text-field class="register_form" outlined type="text"></v-text-field>
                            </v-col>
                            <v-col cols="4"><v-btn depressed class="btn_blue_form mt-5" style="bottom:0!important;">APLICAR CUPÓN</v-btn></v-col>
                        </v-row>
                    </v-container>
                </v-tab-item>
                <v-tab-item key="2">
                    <p class="centered_paragraph">Sólo queda realizar la transferencia para iniciar el Desafío.</p>
                </v-tab-item>
            </v-tabs-items>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data: (e) => ({
        model: null,
        plans: [],
        base_url: '',
        data_config: {},
        tab_payment: "1"
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
            this.$router.push({ path: '/carrito#pago' })
        }
    }
}
</script>
<style scoped></style>