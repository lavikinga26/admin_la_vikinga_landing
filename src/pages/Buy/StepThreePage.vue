<template>
    <v-row no-gutters>
        <v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="position: relative;"
		>
			<div class="py-10 px-8" style="position: absolute; top:10px">
				<h3 class="title_pink" style="text-align: left">APRENDE A ENTRENAR <br/>LA FUERZA</h3>
				<br/>
				<p class="subtitle-white">Únete al Desafío y logra el cambio físico y mental que deseas.  
                    Solo 1 hora al día, con poco equipamientos y desde donde quieras.</p>
			</div>
			<img
				src="@/assets/img/gym_virtual/register-2.png"
				alt="Imagen Login"
				style="width:100%; max-height:100vh;object-fit: cover;"
			/>
			<v-sheet
				style="position: absolute; left: 0; right: 0; bottom: 10px;"
				class="mx-auto transparent"
				elevation="0"
				max-width="450"
			>
				<v-carousel cycle :show-arrows="false" hide-delimiters height="320">
					<v-carousel-item class="ma-4">
						<v-card class="rounded-lg" style="background-color: rgba(10, 34, 64, 0.6);" width="540" outlined>
							<div class="align-center justify-center">
								<p
									class="pa-3 align-center white--text"
									style="text-align:center; font-size: 13px;"
								>
									<v-rating
										:value="5"
										background-color="indigo"
										color="yellow darken-3"
										disabled
									></v-rating>
									Me gusta la buena vibra de los entrenadores y que sufren igual
									o más que yo. Y que me acompañen a ir aumentando la carga
									progresivamente, pero sobre todo a no dejar de moverme 💪.<br /><br />
									<span style="font-weight:bold; color: #E7004C">Carolina</span>
								</p>
							</div>
						</v-card>
					</v-carousel-item>
					<v-carousel-item class="ma-4">
						<v-card class="rounded-lg" style="background-color: rgba(10, 34, 64, 0.6);" width="540" outlined>
							<div class="align-center justify-center">
								<p
									class="pa-3 align-center white--text"
									style="text-align:center;font-size: 13px;"
								>
									<v-rating
										:value="5"
										background-color="indigo"
										color="yellow darken-3"
										disabled
									></v-rating>
									Las clases son todas excelentes, y me ayudan las explicaciones
									y correcciones. Amo las rutinas, y que sean grabadas así las
									puedo hacer a la hora que mas me conviene. Y el tener el pdf
									también me ayuda a que a veces lo hago cuando no tengo buena
									señal, y lo puedo hacer sola por lo que me han enseñado.<br /><br />
									<span style="font-weight:bold; color: #E7004C"
										>Gabriela Francke</span
									>
								</p>
							</div>
						</v-card>
					</v-carousel-item>
					<v-carousel-item class="ma-4">
						<v-card class="rounded-lg" style="background-color: rgba(10, 34, 64, 0.6);" width="540" outlined>
							<div class="align-center justify-center">
								<p
									class="pa-3 align-center white--text"
									style="text-align:center;font-size: 13px;"
								>
									<v-rating
										:value="5"
										background-color="indigo"
										color="yellow darken-3"
										disabled
									></v-rating>
									Me gusta todo, osea la intensidad, la exigencia, la paciencia
									con la q Sol , Nico y Maggy nos motivan a entrenar, y sobre
									todo enseñan, me han ayudado a ser más disciplinada aun no lo
									soy al 100% pero estoy encaminada!!<br /><br />
									<span style="font-weight:bold; color: #E7004C"
										>Monica Hurtado</span
									>
								</p>
							</div>
						</v-card>
					</v-carousel-item>
				</v-carousel>
			</v-sheet>
		</v-col>
        <v-col 
			cols="12"
			md="8" style="height: 100vh; overflow-y:auto;">
            <v-sheet class="mx-auto" max-width="390">
                <v-stepper non-linear value="4" elevation="0">
                    <v-stepper-header>
                        <v-stepper-step complete step="1"></v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="2" complete></v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3" complete></v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step step="4"></v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step step="5"></v-stepper-step>
                    </v-stepper-header>
                </v-stepper>
            </v-sheet>
            <h1 class="title_pink mt-4 mb-4">DETALLES DE PAGO</h1>
            <v-container class="mx-auto" style="max-width:450px">
                <v-row>
                    <v-col cols="8">{{ cart[0] ? cart[0].title : '' }}</v-col>
                    <v-col cols="4"  class="text-right">{{ cart[0].currency }} {{ cart[0] ?
                        parseFloat(
                            parseFloat(cart[0].price).toFixed(2) + 
                            parseFloat(discount).toFixed(2)
                        ).toFixed(0) :
                        ''
                        }}</v-col>
                </v-row>
                <v-row v-if="cart[0].ref_code != null && cart[0].ref_code != undefined">
                    <v-col cols="8"><b>Descuento Referido</b></v-col>
                    <v-col cols="4" class="text-right">{{ cart[0].currency }} {{ parseFloat(ref_des).toFixed(0) }}</v-col>
                </v-row>
                <v-row v-if="discount > 0">
                    <v-col cols="8"><b>Descuento</b></v-col>
                    <v-col cols="4" class="text-right">{{ cart[0].currency }} {{ parseFloat(discount).toFixed(0) }}</v-col>
                </v-row>

                <hr class="mt-2 mb-2" style="border: 1px dashed #000000;">
                <v-row>
                    <v-col cols="8"><b>Total a pagar hoy</b></v-col>
                    <v-col cols="4" class="text-right"><b>{{ cart[0].currency }} {{ parseFloat(total-discount).toFixed(2) }}</b></v-col>
                </v-row>

                <v-alert type="info" color="#E7004C" elevation="0" class="mt-5" v-if="is_trial == 1">
                    Suscribiéndote a este plan tienes {{ cart[0].dias_trial }} días gratis, no se te cobrará nada hasta
                    el <b>{{ prox_trial_pay }}</b>. Puedes cancelar cuando quieras.
                </v-alert>

                <v-row class="mt-5" v-if="show_coupon_box == true && couponDisabled == false">
                    <v-col cols="8">
                        <label class="text_field_form">Cupón de descuento</label>
                        <v-text-field dense v-model="coupon" class="register_form" outlined type="text"
                            placeholder="Cupón de descuento" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="4"><v-btn depressed class="btn_blue_form" 
                            style="bottom:0!important;margin-top: 25px !important;" @click="aplicarCupon()">APLICAR
                            CUPÓN</v-btn></v-col>
                    <v-col cols="12">
                        <v-checkbox v-model="had_invoice" label="Solicitar factura" hide-details
                            style="margin-top: 0px!important;"></v-checkbox>
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
                    <v-radio-group v-model="order.id_payment_method" column color="secondary" class="mt-0"
                        :rules="requiredRule" v-if="total > 0 || is_trial == 1" style="width: 100%;">
                        <template v-for="(item, index) in paymentMethods">
                            <v-card :key="'pm_' + index" class="ma-3 pa-3" v-if="show_transfer == true && item.id == 2"
                                elevation="0" outlined>
                                <div class="d-flex align-center">
                                    <div>
                                        <v-radio :value="item.id" color="secondary"></v-radio>
                                    </div>
                                    <div>
                                        <h4>{{ item.name }}</h4>
                                        <!--<p style="font-size: 0.8rem; margin-bottom: 0px;">
                                        {{item.description}}
                                    </p>-->
                                        <div style="font-size: 0.8rem; margin-bottom: 0px;" v-html="item.description">
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

                    <v-radio-group v-model="order.id_payment_method" column color="secondary" class="mt-0"
                        :rules="requiredRule" v-if="(total == 0 || total == 0.00) && is_trial == 0">
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
                        <v-btn class="text_btn_white_title" block depressed color="secondary" v-if="this.show_transfer==1 && data_config.allow_sale" @click="createOrder()">
                            SIGUIENTE<v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                        <v-btn class="text_btn_white_title" block depressed color="secondary" v-if="data_config.allow_sale && this.show_transfer==0" @click="showModalConditions()">
                            SIGUIENTE<v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <div style="height: 300px;">
                            <p>&nbsp;</p>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-snackbar v-model="toast.toast" :timeout="toast.timeout" :color="toast.color" dark>
            {{ toast.message }}
        </v-snackbar>
        <v-dialog v-model="dialogConfirm" max-width="500px">
            <v-card>
            <v-card-title>Confirmar Suscripción</v-card-title>
            <v-card-text>Al suscribirte a un plan con débito automático, autorizas el cobro del próximo mes en tu tarjeta de manera automática, 2 días antes del vencimiento.<br/>
            ✅ Recuerda que puedes darte de baja en cualquier momento desde tu cuenta.<br/>
            ¿Aceptas adherirte al débito automático?</v-card-text>
            <v-card-actions>
                <v-btn color="error" text @click="dialogConfirm = false"><v-icon dark small>
                mdi-close
                </v-icon> No</v-btn>
                <v-btn color="success" text @click="createOrder()"><v-icon dark small>
                mdi-check
                </v-icon> Si</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
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
        couponDisabled: false,
        selected_card: 0,
        usercc: {},
        user: {},
        plan_seleccionado: {},
        discount: 0,
        coupon: null,
        cart: [
            {
                currency_id:0,
                title: '',
                code: ''
            }
        ],
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
        is_trial: 0,
        prox_trial_pay: null,
        ipData: null,
        loading: false,
        error: null,
        ref_code: null,
        show_coupon_box: true,
        ref_des: 0,
        dialogConfirm: false,
    }),
    computed: {
        subtotal() {
            let total = 0

            this.cart.forEach((c) => {
                total += c.quantity * Number(c.price)
            })

            return total
        },
        /*total() {
            const total = this.subtotal - this.discount

            return total < 0 ? 0 : total
        },*/
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
        //vm.fetchIpData();
        vm.auth();
        vm.getConfiguracion();
        vm.getBaseUrl();
        vm.getPaymentMethods();
        vm.cart[0] = JSON.parse(localStorage.getItem('planSeleccionado'));
        vm.total = vm.cart[0] ? vm.cart[0].price : 0;
        var da_trial = new Date();
        da_trial.setDate(da_trial.getDate() + vm.cart[0].dias_trial);
        vm.prox_trial_pay = vm.formatDate(da_trial);
        vm.ref_code = localStorage.getItem("ref_code");
        if(vm.ref_code != null && vm.ref_code != undefined){
			vm.show_coupon_box = false;
            vm.ref_des = parseFloat(vm.cart[0].ref_discount).toFixed(2);
            let vtot = vm.cart[0].price;
            vm.cart[0].price = parseFloat(vtot) + parseFloat(vm.ref_des);
		}

    },
    methods: {
        showModalConditions(){
            this.dialogConfirm = true;
        },
        async fetchIpData() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch('http://ip-api.com/json/');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                this.ipData = await response.json();
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        },
        formatDate(date) {
            return [
                this.padTo2Digits(date.getDate()),
                this.padTo2Digits(date.getMonth() + 1),
                date.getFullYear(),
            ].join('/');
        },
        async createOrder() {
            let vm = this;
            vm.$store.commit('loader', true);
            try {
                let datosUser = JSON.parse(localStorage.getItem("datosUsuario"));
                vm.order.discount = parseFloat(vm.discount).toFixed(2);
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
                vm.order.id_currency = vm.cart[0].currency_id;
                vm.order.inv_business_name = vm.razon_social;
                vm.order.inv_address = vm.dom_fiscal;
                vm.order.address = "-";
                vm.order.country = datosUser.country;
                vm.order.total = vm.total;
                vm.order.subtotal = parseFloat(vm.total / 1.18).toFixed(2);
                vm.order.ref_code = vm.ref_code;
                vm.order.ref_discount = parseFloat(vm.cart[0].ref_discount).toFixed(2);
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
                    if(this.order.id_payment_method == '1'){
                        window.location.replace('/pago-payme/' + vm.actions.hash);
                    }else if(this.order.id_payment_method == '4'){
                        window.location.replace('/pago-stripe/' + vm.actions.hash);
                    }
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
                let paymentMethods = data.data.data;
                // Filtrar métodos de pago según el countryCode
                if (this.cart[0].currency_id == 1) {
                    paymentMethods = paymentMethods.filter((method) => method.id !== 4);
                } else {
                    paymentMethods = paymentMethods.filter((method) => method.id !== 1 && method.id !== 2);
                }
                // Asignar los métodos de pago filtrados
                this.paymentMethods = paymentMethods;
                
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
                if (this.user.trial_status == 1 && this.cart[0].dias_trial > 0 && this.ref_code == null) {
                    this.total = 0;
                    this.is_trial = 1;
                    this.subtotal = 0;
                    this.igv = 0;
                }
            } catch (e) {
                if (this.cart[0].dias_trial > 0 && this.ref_code == null) {
                    this.total = 0;
                    this.is_trial = 1;
                    this.subtotal = 0;
                    this.igv = 0;
                }
                /*localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');*/
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
        async aplicarCupon() {
            try {
                let products = this.cart.map(({ id }) => id);
                const response = await this.$API.coupon.validate({ cupon: this.coupon, items: products });
                let datos = response.data;
                let flag = 0;
                var dscamount = 0;
                if (this.cart[0].currency_id == 1) {
                    dscamount = datos.discount;
                }else{
                    dscamount = datos.discount_usd;
                }

                if (datos.available) {
                    if (datos.id_plan === null) {

                        this.discount = (datos.discount_type == 1) ? this.subtotal * (dscamount / 100) : dscamount;
                        const element = this.cart;
                        this.cart[0].priceTotal = this.cart[0].price - (this.cart[0].price * (dscamount / 100))
                        flag = 1;
                        this.couponDisabled = true;

                    } else {
                        datos.id_plan = datos.id_plan.map(Number);
                        let index = this.cart.findIndex((element) => {
                            if (datos.id_plan.indexOf(element.id) != -1) { return true; }
                            else { false }
                        })
                        if (index != -1) {
                            if (this.couponDisabled != true) {
                                this.discount = (datos.discount_type == 1) ? this.cart[0].price * (dscamount / 100) : dscamount;
                                this.cart[0].price = this.cart[0].price - this.discount;
                                this.couponDisabled = true;
                                flag = 1;
                                this.total = this.cart[0].price;
                                this.showToast("Cupón valido", "success");
                            }
                        }
                    }
                }
                if (flag == 0) {
                    this.toast.color = "red";
                    this.toast.message = "Cupón inválido.";
                    this.toast.toast = true;
                }

            } catch (e) {
                this.$store.commit('loader', false);
                console.error(e);
            }
        },
    }
}
</script>
<style scoped></style>