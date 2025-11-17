<template>
	<div>
		<v-container class="mb-5" v-if="has_active_plan === false">
			<v-row class="text-center">
				<v-col cols="12" v-if="show_message_plan === true">
					<h1 class="text-center text_box_title" style="margin-top: 10%;">
						Ups! No cuentas con ningún plan activo!
					</h1>
					<v-btn
						class="text_btn_white_title mt-5"
						color="secondary"
						@click="gohome"
						>Renovar/adquirir plan</v-btn
					>
				</v-col>
			</v-row>
		</v-container>
		<v-container class="pa-10" v-if="has_active_plan === true">
			<v-row>
				<v-col cols="11">
					<h1 class="text_plan_title_white mb-6">Retos</h1>
				</v-col>
				<v-col cols="1" v-if="show_currency_sw">
					<div class="toggle-switch">
						<input v-model="currency" type="checkbox" id="switch" v-on:change="updCurrency()"/>
						<label for="switch" class="switch-label">
							<span class="switch-inner"></span>
							<span class="switch-text-on">SOL</span>
							<span class="switch-text-off">USD</span>
						</label>
					</div>
				</v-col>
			</v-row>

			<v-row
				style="border: 2px solid #293E58; border-radius: 16px;margin-bottom: 10px;"
				v-if="showRetos"
			>
				<v-col
					v-for="(item, indx) in groupList"
					:key="'col_' + indx"
					cols="12"
					md="4"
				>
					<v-card
						min-height="280"
						class="box_rutina position-relative overflow-hidden"
						flat
						tile
						style="border-radius: 16px !important;"
					>
						<!-- Imagen con escala de grises -->
						<v-img
							:src="'https://apiweb.lavikingaoficial.com/storage/uploads/plan_files/' + item.img_path"
							:class="findCompra(item.id) ? '' : 'grayscale-img'"
							height="280"
							cover
						></v-img>

						<!-- Título encima de la imagen -->
						<div class="absolute-title text-left white--text px-4">
							<h1 class="text_box_gym_sm_white">{{ item.name }}</h1>
							<p class="text-caption mt-1">{{ item.description }}</p>
						</div>

						<!-- Overlay oscuro + candado + botón -->
						<div
							class="overlay-dark pa-4 d-flex flex-column align-stretch justify-end"
						>
							<v-icon size="48" color="white" v-if="findCompra(item.id) == 'false'">mdi-lock</v-icon>
							<h1 class="mt-4 text_box_gym_sm" style="text-align: left;" v-if="findCompra(item.id) == false">
								{{ currency_id == 0 ? 'S/ ':'USD ' }} {{ currency_id == 0 ? item.price_pen:item.price_usd }}
							</h1>
							<v-btn
								color="secondary"
								class="mt-4 font-weight-bold"
								@click.stop="comprarReto(item)"
								v-if="findCompra(item.id) == false"
							>
								COMPRAR RETO
							</v-btn>
							<v-btn
								color="secondary"
								class="mt-4 font-weight-bold"
								@click.stop="verReto(item)"
								v-else
							>
								VER RETO
							</v-btn>
						</div>
					</v-card>
				</v-col>
			</v-row>

			<v-row class="pa-2">
                <v-col cols="12" md="3" v-for="(item, indx) in retosFullList" :key="indx">
                    <v-card min-height="200" min-width="200" class="box_rutina" :img="'https://apiweb.lavikingaoficial.com/storage/uploads/downloadable/' + item.img_path" color="#0A2240" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" v-if="item.link_video == null && item.filename != null && item.link_external == null">
                        <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                        <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                        <v-btn
                            fab
                            small
                            color="#fff"
                            :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code"
                            target="_blank"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                        >
                        <v-icon color="#E7004C">
                            mdi-tray-arrow-down
                        </v-icon>
                        </v-btn>
                    </v-card>
                    <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="'https://apiweb.lavikingaoficial.com/storage/uploads/downloadable/' + item.img_path" @click="openPlayer(item.link_video)" v-if="item.link_video != null && item.filename == null && item.link_external == null">
                        <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                        <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                        <v-btn
                            fab
                            small
                            color="#fff"
                            @click="openPlayer(item.link_video)"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                        >
                        <v-icon color="#E7004C">
                            mdi-play
                        </v-icon>
                        </v-btn>
                    </v-card>
                    <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="'https://apiweb.lavikingaoficial.com/storage/uploads/downloadable/' + item.img_path" @click="openLink(item.link_external)" v-if="item.link_video == null && item.filename == null && item.link_external != null">
                        <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                        <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                        <v-btn
                            fab
                            small
                            color="#fff"
                            @click="openLink(item.link_external)"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                        >
                        <v-icon color="#E7004C">
                            mdi-link
                        </v-icon>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

			<v-row class="white flex-grow-1 py-10" v-if="showPaymentForm">
				<v-col cols="12">
					<div style="position: relative;">
						<h1 class="title_pink mt-4 mb-4">DETALLES DE PAGO</h1>
					</div>
					<v-container v-if="cart.length > 0" class="mx-auto" style="max-width:450px">
						<v-row>
							<v-col cols="8">{{ cart[0] ? cart[0].title : "" }}</v-col>
							<v-col cols="4" class="text-right"
								>{{ cart[0].currency }}
								{{
									cart[0]
										? parseFloat(parseFloat(cart[0].price).toFixed(2)).toFixed(0)
										: ""
								}}</v-col
							>
						</v-row>
						<v-row v-if="discount > 0">
							<v-col cols="8"><b>Descuento</b></v-col>
							<v-col cols="4" class="text-right">{{ cart[0].currency }} {{ formatPrice(discount) }}</v-col>
						</v-row>

						<hr class="mt-2 mb-2" style="border: 1px dashed #000000;" />
						<v-row>
							<v-col cols="8"><b>Total a pagar hoy</b></v-col>
							<v-col cols="4" class="text-right"
								><b
									>{{ cart[0].currency }} {{ parseFloat(total).toFixed(2) }}</b
								></v-col
							>
						</v-row>

						<v-row class="mt-5">
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
								<v-text-field
									class="register_form"
									outlined
									type="text"
									hide-details
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<label class="text_field_form">Razón social</label>
								<v-text-field
									class="register_form"
									outlined
									type="text"
									hide-details
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<label class="text_field_form">Domicilio fiscal</label>
								<v-text-field
									class="register_form"
									outlined
									type="text"
									hide-details
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-radio-group
								v-model="order.id_payment_method"
								column
								color="secondary"
								class="mt-0"
								:rules="requiredRule"
								v-if="total > 0"
								style="width: 100%;"
							>
								<template v-for="(item, index) in paymentMethods">
									<v-card
										:key="'pm_' + index"
										class="ma-3 pa-3"
										v-if="item.id != 2"
										elevation="0"
										outlined
									>
										<div class="d-flex align-center">
											<div>
												<v-radio :value="item.id" color="secondary"></v-radio>
											</div>
											<div>
												<h4>{{ item.name }}</h4>
												<div
													style="font-size: 0.8rem; margin-bottom: 0px;"
													v-html="item.description"
												></div>
											</div>
										</div>
									</v-card>
								</template>
							</v-radio-group>

							<v-radio-group
								v-model="order.id_payment_method"
								column
								color="secondary"
								class="mt-0"
								:rules="requiredRule"
								v-if="total == 0 || total == 0.0"
							>
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
											<div style="font-size: 0.8rem; margin-bottom: 0px;">
												No se requiere un pago para esta orden.
											</div>
										</div>
									</div>
								</v-card>
							</v-radio-group>
						</v-row>
						<v-row>
							<v-col cols="6">
								<v-btn
									class="text_btn_white_title"
									block
									depressed
									color="secondary"
									@click="volver()"
								>
									<v-icon>mdi-chevron-left</v-icon>VOLVER
								</v-btn>
							</v-col>
							<v-col cols="6">
								<v-btn
									class="text_btn_white_title"
									block
									depressed
									color="secondary"
									@click="createOrder()"
								>
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
			</v-row>
		</v-container>
		<v-snackbar
			v-model="toast.toast"
			:timeout="toast.timeout"
			:color="toast.color"
			dark
		>
			{{ toast.message }}
		</v-snackbar>
		<v-dialog
			transition="dialog-bottom-transition"
			max-width="800"
			v-model="dialogPlayer"
		>
			<v-card>
				<v-card-text
					class="text-center d-flex align-center pt-10 justify-center"
					v-if="dialogPlayer"
				>
					<iframe
						:src="now_playing"
						width="800"
						height="328"
						frameborder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowfullscreen
					></iframe>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn text @click="dialogPlayer = false">Cerrar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>

	
</template>

<script>
import moment from "moment-timezone";
import axios from "axios";

import FlipCountdown from "vue2-flip-countdown";

export default {
	components: {
		axios,
		FlipCountdown,
	},
	data: () => ({
		cabeceras: [
			{
				text: "Ejercicio",
				align: "start",
				sortable: false,
				value: "ejercicio",
			},
			{ text: "Fecha", value: "fecha" },
			{ text: "Peso (kg)", value: "peso" },
			{ text: "Comentarios", value: "comentarios" },
			{ text: "Acciones", value: "acciones" },
		],
		registrosTabla: [
			{
				ejercicio: "Back Squat",
				fecha: "01/12/2023",
				peso: 6.0,
				comentarios: "Aumentar peso proxima semana",
				acciones: "",
			},
		],
		toast: {
			toast: false,
			message: "",
			timeout: 3000,
			color: "success",
		},
		retos_list: [],
		groupList: [],
		dialogPlayer: false,
		now_playing: null,
		has_active_plan: false,
		show_message_plan: false,
		user: [],
		userPlans: [],
		userCompras: [],
		selectedReto: [],
		showPaymentForm: false,
		cart: [],
		total: 0,
		currencyId: 0,
		had_invoice: false,
		requiredRule: [(v) => !!v || "Campo obligatorio"],
		order: {
			country: null,
			password: "",
			confirmPassword: "",
			had_invoice: false,
			coupon: "",
		},
		toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
		paymentMethods: [],
		showRetos: true,
		coupon: null,
		discount: 0,
		currency: false,
		currency_id: 0,
		show_currency_sw: true,
		retosFullList: [],
	}),
	mounted() {
		this.auth();
		this.getDownloads();
		this.getCompras();
		//this.getPaymentMethods();
	},
	computed: {
		subtotal() {
            let total = 0

            this.cart.forEach((c) => {
                total += c.quantity * Number(c.price)
            })

            return total
        },
	},
	created() {
		Array.prototype.groupBy = function(field) {
			let groupedArr = [];
			this.forEach(function(e) {
				//look for an existent group
				let group = groupedArr.find((g) => g["field"] === e[field]);
				if (group == undefined) {
					//add new group if it doesn't exist
					group = { field: e[field], groupList: [] };
					groupedArr.push(group);
				}
				//add the element to the group
				group.groupList.push(e);
			});

			return groupedArr;
		};
	},
	methods: {
		formatPrice(price) {
            // Convierte el precio a número y elimina .00 si no hay decimales significativos
            const numPrice = parseFloat(price);
            return numPrice % 1 === 0 ? numPrice.toFixed(0) : numPrice.toFixed(2);
        },
		updCurrency(){
			this.currency_id = !this.currency ? 0 : 1;
		},
		async auth() {
			let vm = this;
			try {
				const response = await this.$API.auth.auth();
				this.user = response.data;

				this.userPlans = response.data.plans;
				let fecha_actual = new Date();

				this.userPlans.map(function(item) {
					let init_d = new Date(item.init_date);
					let end_d = new Date(item.expiration_date);
					if (
						fecha_actual <= new Date(item.expiration_date) &&
						vm.has_active_plan == false
					) {
						vm.has_active_plan = true;
					}
				});
				vm.show_message_plan = vm.has_active_plan === true ? false : true;
			} catch (e) {
				localStorage.removeItem("user_data");
				localStorage.removeItem("token");
				window.location.replace("/auth/iniciar-sesion");
			}
		},
		async getPaymentMethods() {
			try {
				const response = await this.$API.configuration.getPaymentMethods();
				var paymentMethods = response.data.data;
				this.paymentMethods = response.data.data || [];

				if (this.currency_id == 0) {
                    paymentMethods = paymentMethods.filter((method) => method.id !== 4);
                } else {
                    paymentMethods = paymentMethods.filter((method) => method.id !== 1 && method.id !== 2);
                }
                // Asignar los métodos de pago filtrados
                this.paymentMethods = paymentMethods;
			} catch (e) {
				console.error("Error al cargar métodos de pago:", e);
			}
		},
		showReto(reto) {
			let index = reto + 1;
		},
		volver() {
			this.showPaymentForm = false;
			this.$store.commit("loader", true);
			const timeoutId = setTimeout(() => {
				this.showRetos = true;
				this.show_currency_sw = true;
				this.$store.commit("loader", false);
			}, 2000);
		},
		async getCompras() {
			this.$store.commit("loader", true);
			try {
				const response = await this.$API.business_partner.retosCompradosList();

				this.userCompras = response.data;
				
			} catch (e) {
				this.$store.commit("loader", false);
				console.error(e);
			}
		},
		async verReto(item){
			this.$store.commit("loader", true);
			try {
				const response = await this.$API.business_partner.getReto(item.id);

				this.retosFullList = response.data.data;

				this.$store.commit("loader", false);
			} catch (e) {
				this.$store.commit("loader", false);
				console.error(e);
			}
		},
		comprarReto(item) {
			this.showRetos = false;
			this.show_currency_sw = false;
			this.$store.commit("loader", true);
			this.getPaymentMethods();
			const timeoutId = setTimeout(() => {
				this.selectedReto = item;

				if(this.currency_id == 0){
					this.cart = [
						{
							id:item.id,
							title: item.name,
							price: parseFloat(item.price_pen),
							amount: parseFloat(item.price_pen),
							currency: "S/ ",
							currency_id: 1,
							code: "reto1",
							priceCompare: parseFloat(item.price_pen),
							priceTotal: parseFloat(item.price_pen),
							quantity: 1
						},
					];
					this.total = parseFloat(item.price_pen);
				}else{
					this.cart = [
						{
							id:item.id,
							title: item.name,
							price: parseFloat(item.price_usd),
							amount: parseFloat(item.price_usd),
							currency: "USD ",
							currency_id: 2,
							code: "reto1",
							priceCompare: parseFloat(item.price_usd),
							priceTotal: parseFloat(item.price_usd),
							quantity: 1
						},
					];
					this.total = parseFloat(item.price_usd);
				}

				this.showPaymentForm = true;
				this.$store.commit("loader", false);
			}, 2000);

			//this.$store.commit("loader", false);
		},
		findCompra(reto_id){
			var data = this.userCompras;
			const found = data.find(item => item.reto_id == reto_id);
			if(found){
				return true;
			}else{
				return false;
			}
		},
		async getDownloads() {
			this.$store.commit("loader", true);
			try {
				const response = await this.$API.business_partner.getRetosComprar();

				this.retos_list = response.data;

				this.groupList = this.retos_list;

				console.log(this.groupList);
				this.$store.commit("loader", false);
			} catch (e) {
				this.$store.commit("loader", false);
				console.error(e);
			}
		},
		openPlayer(video_link) {
			this.now_playing = video_link;
			this.dialogPlayer = true;
		},
		openLink(link) {
			window.open(link, "_blank");
		},
		openToastAlert(open, message, color) {
            this.toast = {
                toast: open,
                message: message,
                color: color
            }
        },
		async createOrder() {
            let vm = this;
            vm.$store.commit('loader', true);
			var datosUser = this.user;
			

                vm.order.discount = parseFloat(vm.discount).toFixed(2);
                vm.order.detail = vm.cart;
                vm.order.name = datosUser.name;
                vm.order.lastname = datosUser.lastname;
                vm.order.email = datosUser.email;
                vm.order.nro_doc = datosUser.nro_doc;
                vm.order.id_document_type = datosUser.id_document_type;
                vm.order.phone = datosUser.phone;
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
                vm.order.ref_code = vm.ref_code;
                vm.order.ref_discount = vm.cart[0].ref_discount != undefined && !isNaN(vm.cart[0].ref_discount) ? vm.cart[0].ref_discount : 0;
                vm.order.total = parseFloat(vm.total).toFixed(2);
                vm.order.subtotal = parseFloat(vm.total / 1.18).toFixed(2);
                vm.order.igv = parseFloat(vm.total - (vm.total / 1.18)).toFixed(2);
				vm.order.bp_id = datosUser.bp_id;
                vm.order.bd_id = datosUser.bp_id;

                const data = await vm.$API.order.register(vm.order);
                vm.openToastAlert(true, 'Orden creada correctamente', 'primary');
				vm.actions = data.data.data.actions;
				if ((vm.actions.payment_status == 'pending') && (vm.actions.payment_external == true)) {
                    //Enviamos a payme
                    if(this.order.id_payment_method == '1'){
                        window.location.replace('/gym-virtual/retos-pagar/' + vm.actions.hash);
                    }else if(this.order.id_payment_method == '4'){
                        window.location.replace('/gym-virtual/retos-pagar-st/' + vm.actions.hash);
                    }
                }
                vm.$store.commit('loader', false);

        },
		async aplicarCupon() {
            try {
                let products = this.cart.map(({ id }) => id);
                const response = await this.$API.coupon_retos.validate({ cupon: this.coupon, items: products });
                let datos = response.data;
                let flag = 0;
                var dscamount = 0;
                if (this.cart[0].currency_id == 1) {
                    dscamount = datos.discount;
                }else{
                    dscamount = datos.discount_usd;
                }

                if (datos.available) {
                    if (datos.id_retos === null) {

                        this.discount = (datos.discount_type == 1) ? this.subtotal * (dscamount / 100) : dscamount;
                        const element = this.cart;
                        this.cart[0].price = this.cart[0].price - this.discount;
                        this.total = this.cart[0].price;
                        flag = 1;
                        this.couponDisabled = true;
                        this.showToast("Cupón valido", "success");
                    } else {
                        datos.id_retos = datos.id_retos.map(Number);
                        let index = this.cart.findIndex((element) => {
                            if (datos.id_retos.indexOf(element.id) != -1) { return true; }
                            else { false }
                        })
                        if (index != -1) {
                            if (this.couponDisabled != true) {
                                this.discount = (datos.discount_type == 1) ? this.subtotal * (dscamount / 100) : dscamount;
                                this.cart[0].price = this.cart[0].price - this.discount;
                                this.total = this.cart[0].price;
                                this.couponDisabled = true;
                                flag = 1;
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
	},
};
</script>

<style>
.activity-class {
	background-color: #0b233f;
}

.activity-taller {
	background-color: #e30e4f;
}

.activity-descanso {
	background-color: #e9e9e9;
}

.activity-nutrition {
	background-color: #0480a4;
}

.grayscale-img {
	filter: grayscale(100%);
}

.overlay-dark {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(10, 34, 64, 0.5);
	z-index: 2;
	border-radius: 16px;
}

.absolute-title {
	position: absolute;
	top: 20px;
	width: 100%;
	z-index: 3;
}

.toggle-switch {
	position: relative;
	width: 80px;
	height: 40px;
}

input[type="checkbox"] {
	display: none;
}

.switch-label {
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
	width: 100%;
	height: 100%;
	background-color: #0a2240; /* Color para el estado OFF */
	border-radius: 20px;
	overflow: hidden;
	transition: background-color 0.3s ease;
	border: 1px solid #e30e4f;
}

.switch-inner {
	position: absolute;
	left: 4px;
	width: 32px;
	height: 32px;
	background-color: #fff;
	border-radius: 50%;
	transition: left 0.3s ease, background-color 0.3s ease;
}

.switch-text-on,
.switch-text-off {
	position: absolute;
	width: 50%;
	text-align: center;
	font-weight: bold;
	color: white;
	font-size: 12px;
}

.switch-text-on {
	left: 0;
	color: #0a2240; /* Color del texto ON */
}

.switch-text-off {
	right: 0;
	color: #fff; /* Color del texto OFF */
}

input[type="checkbox"]:checked + .switch-label {
	background-color: #0a2240; /* Color para el estado ON */
}

input[type="checkbox"]:checked + .switch-label .switch-inner {
	left: 44px; /* Ajuste para la posición al activarse */
	background-color: #fff;
}
input[type="checkbox"]:checked + .switch-label .switch-text-on {
	color: #fff; /* Color del texto ON */
}

input[type="checkbox"]:checked + .switch-label .switch-text-off {
	color: #0a2240; /* Color del texto ON */
}
</style>
