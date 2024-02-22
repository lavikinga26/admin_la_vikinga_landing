<template>
    <v-row no-gutters>
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login"  style="width:100%; max-height:100vh;"/>
        </v-col>
        <v-col cols="12" md="6" style="height: 100vh; overflow-y:auto;">
            <v-sheet class="mx-auto" max-width="390">
                    <v-stepper
                    non-linear
                    value="4"
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
                            ></v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step 
                            step="5"
                            ></v-stepper-step>
                        </v-stepper-header>
                    </v-stepper>
                </v-sheet>
            <h1 class="title_pink mt-4 mb-4">DETALLES DE PAGO</h1>
            <v-container class="mx-auto" style="max-width:450px">
                <v-row>
                    <v-col cols="8">{{ cart[0] ? cart[0].title:'' }}</v-col>
                    <v-col cols="4">S/ {{ cart[0] ? cart[0].price : '' }}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="8"><b>Descuento</b></v-col>
                    <v-col cols="4">S/ {{ discount }}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="8"><b>Total</b></v-col>
                    <v-col cols="4"><b>S/ {{ total }}</b></v-col>
                </v-row>
                <hr/>
                <v-row class="mt-5">
                    <v-col cols="8">
                        <v-text-field v-model="coupon" class="register_form" outlined type="text" placeholder="Cupón de descuento" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="4"><v-btn depressed class="btn_blue_form mt-5" style="bottom:0!important;margin-top:10px!important;" @click="aplicarCupon()">APLICAR CUPÓN</v-btn></v-col>
                    <v-col cols="12">
                        <v-checkbox v-model="had_invoice" label="Solicitar factura" hide-details style="margin-top: 0px!important;"></v-checkbox>
                    </v-col>
                </v-row>
                <v-row v-if="had_invoice == true">
                    <v-col cols="6">
                        <label class="text_field_form">RUC</label>
                        <v-text-field class="register_form" outlined type="text" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <label class="text_field_form">Razón social</label>
                        <v-text-field class="register_form" outlined type="text" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label class="text_field_form">Domicilio fiscal</label>
                        <v-text-field class="register_form" outlined type="text" hide-details></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-radio-group v-model="order.id_payment_method" column color="secondary"
                        class="mt-0" :rules="requiredRule" v-if="total > 0" style="width: 100%;">
                        <template v-for="(item, index) in paymentMethods">
                            <v-card :key="'pm_' + index" class="ma-3 pa-3" v-if="show_transfer == true && item.id == 2" elevation="0" outlined>
                                <div class="d-flex align-center">
                                    <div>
                                        <v-radio :value="item.id" color="secondary"></v-radio>
                                    </div>
                                    <div>
                                        <h4>{{ item.name }}</h4>
                                        <!--<p style="font-size: 0.8rem; margin-bottom: 0px;">
                                        {{item.description}}
                                    </p>-->
                                        <div style="font-size: 0.8rem; margin-bottom: 0px;"
                                            v-html="item.description">
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                            <v-card :key="'pm_' + index" class="ma-3 pa-3" v-if="item.id != 2" elevation="0" outlined>
                                <div class="d-flex align-center">
                                    <div>
                                        <v-radio :value="item.id" color="secondary"></v-radio>
                                    </div>
                                    <div>
                                        <h4>{{ item.name }}</h4>
                                        <div style="font-size: 0.8rem; margin-bottom: 0px;" v-html="item.description">
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </template>
                    </v-radio-group>

                    <v-radio-group v-model="order.id_payment_method" column color="secondary"
                        class="mt-0" :rules="requiredRule" v-if="total == 0 || total == 0.00">
                        <v-card :key="'pm_' + index" class="ma-3 pa-3">
                            <div class="d-flex align-center">
                                <div>
                                    <v-radio value="3" color="secondary"></v-radio>
                                </div>
                                <div>
                                    <h4>GRATIS</h4>
                                    <!--<p style="font-size: 0.8rem; margin-bottom: 0px;">
                                        {{item.description}}
                                    </p>-->
                                    <div style="font-size: 0.8rem; margin-bottom: 0px;">No se
                                        requiere un pago para esta orden.</div>
                                </div>
                            </div>
                        </v-card>
                    </v-radio-group>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-btn class="text_btn_white_title" block depressed color="secondary" @click="volver()">
                            <v-icon>mdi-chevron-left</v-icon>VOLVER
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn class="text_btn_white_title" block depressed color="secondary"
                            @click="createOrder()">
                            SIGUIENTE<v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
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
export default {
    data: (e) => ({
        model: null,
        plans: [],
        order: {},
        base_url: '',
        data_config: {},
        tab_payment: "1",
        factura: false,
        hide_btn: false,
        selected_card: 0,
        usercc: {},
        user: {},
        plan_seleccionado: {},
        discount: 0,
        coupon: null,
        cart: [],
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
        paymentMethods: [],
        total: 0,
        show_transfer: true,
        requiredRule: [
            v => !!v || 'Campo obligatorio',
        ],
        had_invoice: false,
        ruc: "",
        razon_social: "",
        dom_fiscal: "",
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
    }),
    computed: {
        subtotal() {
            let total = 0

            this.cart.forEach((c) => {
                total += c.quantity * Number(c.price)
            })

            return total
        },
        total() {
            const total = this.subtotal - this.discount

            return total < 0 ? 0 : total
        },
        isLogged() {
            return this.$store.getters.isLoggedIn;
        },
        formTitle() {
            return this.payment ? 'Detalles de pago' : 'Detalles de orden'
        },

    },
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.slug;
        vm.getConfiguracion();
        vm.getBaseUrl();
        vm.getPaymentMethods();
        vm.cart.push(JSON.parse(localStorage.getItem('planSeleccionado')));
        vm.total = vm.cart[0] ? vm.cart[0].price :0;
    },
    methods: {
        async createOrder() {
            let vm = this;
            vm.$store.commit('loader', true);
            try {
                let datosUser = JSON.parse(localStorage.getItem("datosUsuario"));
                vm.order.discount = vm.discount
                vm.order.total = vm.total
                vm.order.subtotal = vm.subtotal;
                vm.order.detail = vm.cart;
                vm.order.name = datosUser.nombre;
                vm.order.lastname = datosUser.apellidos;
                vm.order.email = localStorage.getItem("emailRegistro");
                vm.order.password = datosUser.pwd;
                vm.order.nro_doc = datosUser.nro_doc;
                vm.order.id_document_type = datosUser.tipo_doc;
                vm.order.phone = datosUser.telefono;
                vm.order.terms_conditions = 1;
                vm.order.privacy_policy = 1;
                vm.order.had_invoice = vm.had_invoice;
                vm.order.cupon = vm.coupon;
                vm.order.inv_doc = vm.ruc;
                vm.order.inv_business_name = vm.razon_social;
                vm.order.inv_address = vm.dom_fiscal;
                vm.order.address = "-";
                vm.order.country = datosUser.country;
                vm.order.total = vm.total;
                vm.order.subtotal = parseFloat(vm.total / 1.18).toFixed(2);
                vm.order.igv = parseFloat(vm.total - (vm.total / 1.18)).toFixed(2);
                if (datosUser.bp_id != undefined && datosUser.bp_id != "") {
                    vm.order.bp_id = datosUser.bp_id;
                    vm.order.bd_id = datosUser.bp_id;
                }
                const data = await vm.$API.order.register(vm.order);
                //console.log(data)
                vm.openToastAlert(true, 'Orden creada correctamente', 'primary');
                vm.actions = data.data.data.actions;

                if (!this.isLogged) {
                    const response = await vm.$API.user.login({
                        email: vm.order.email,
                        password: vm.order.password,
                        token_name: "LaVikinga2021"
                    });
                    const user = response.data.data.user;
                    const token = response.data.data.token;
                    localStorage.setItem('user_data', JSON.stringify(user));
                    localStorage.setItem('token', token);
                }

                if ((vm.actions.payment_status == 'pending') && (vm.actions.payment_external == false)) {
                    vm.$store.dispatch("cleanCart");
                    //this.$router.push({ path: '/confirmar-pago/'+vm.actions.hash });
                    window.location.replace('/confirmar-pago/' + vm.actions.hash);
                }
                if ((vm.actions.payment_status == 'pending') && (vm.actions.payment_external == true)) {
                    //Enviamos a payme
                    //this.$router.push({ path: '/pago-payme/'+vm.actions.hash });
                    window.location.replace('/pago-payme/' + vm.actions.hash);
                }

                if ((vm.actions.payment_status == 'approved') && (vm.actions.payment_external == false)) {
                    window.location.replace('/orden-completada/' + vm.actions.hash);
                }

                vm.$store.commit('loader', false);
            }
            catch (e) {

                this.$store.commit('loader', false);
                vm.openToastAlert(true, 'Upps! Ocurrio un error. Vuelve a intentarlo', 'Error');
                setTimeout(() => {
                    //this.$router.go();
                }, 1500);
                console.log(e.response.data);
                //this.$router.go();
            }
        },
        async getPaymentMethods() {
            this.$store.commit('loader', true);
            try {
                const data = await this.$API.configuration.getPaymentMethods();
                this.paymentMethods = data.data.data;
                let renovacion = this.cart.filter((item) => item.renovacion == 1);
                if (renovacion.length > 0) {
                    this.show_transfer = false;
                }
                this.$store.commit('loader', false);
            }
            catch (e) {
                this.$store.commit('loader', false);
                console.error(e);
            }
        },
        volver() {
            if (this.isLogged) {
                this.$router.push({ path: '/proceso_compra/step2' });
            } else {
                this.$router.push({ path: '/auth/registrarse' });
            }
        },
        showToast(msg, color) {
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },
        nextStep() {
            window.location.replace('/proceso_compra/payment');
        },
        async auth() {
            let vm = this;
            try {
                const response = await this.$API.auth.auth();
                this.user = response.data;
            } catch (e) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
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
        openToastAlert(open, message, color) {
            this.toast = {
                toast: open,
                message: message,
                color: color
            }
        },
    }
}
</script>
<style scoped></style>