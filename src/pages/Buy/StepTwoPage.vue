<template>
	<v-row>
		<v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="position: relative;"
		>
			<div class="py-10 px-8" style="position: absolute; top:10px">
				<h3 class="title_pink" style="text-align: left">DEJA DE HACER <br/>EJERCICIO Y COMIENZA <br/>A ENTRENAR</h3>
				<br/>
				<p class="subtitle-white">En el Desfío Gym Virtual preparamos una Programación de  Entrenamiento basada en la fuerza y adaptada para 3 niveles de  entrenamiento.</p>
			</div>
			<img
				src="@/assets/img/gym_virtual/register_img.png"
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
		<v-col cols="12" md="8" style="height: 100vh; overflow-y:auto;">
			<v-sheet class="mx-auto mb-5" max-width="450">
				<v-stepper non-linear value="2" elevation="0">
					<v-stepper-header>
						<v-stepper-step complete step="1"></v-stepper-step>

						<v-divider></v-divider>

						<v-stepper-step step="2"></v-stepper-step>

						<v-divider></v-divider>

						<v-stepper-step step="3"></v-stepper-step>
						<v-divider></v-divider>

						<v-stepper-step step="4"></v-stepper-step>
						<v-divider></v-divider>

						<v-stepper-step step="5"></v-stepper-step>
					</v-stepper-header>
				</v-stepper>
			</v-sheet>
			<div style="position: relative;">
				<h1 class="title_pink mt-4 mb-4">ELIGE TU PLAN</h1>
				<div style="position: absolute; right: 20px; top: 0; bottom: 0;">
					<div class="toggle-switch">
						<input v-model="currency" type="checkbox" id="switch" />
						<label for="switch" class="switch-label">
							<span class="switch-inner"></span>
							<span class="switch-text-on">SOL</span>
							<span class="switch-text-off">USD</span>
						</label>
					</div>
				</div>
			</div>
			<v-sheet class="mx-auto" elevation="'0'" color="#ffffff" light>
				<v-slide-group v-model="model" class="pa-0" center-active>
					<template v-for="(item, n) in plans">
						<v-slide-item
							v-if="item.allow_sale == 1 && item.status == 1"
							:key="n"
							v-slot="{ toggle }"
						>
							<div :class="
									item.is_outstanding == 1
										? 'header_plan_pink'
										: 'header_plan_blue'
								"
									class="ma-4  rounded-lg">
								<div class="header_plan_title_white pa-2">
									{{ periods[item.period] }}
								</div>
								<v-card
									:color="item.is_outstanding == 1 ? 'primary' : '#ffffff'"
									:class="
										item.is_outstanding == 1
											? 'card-outter'
											: 'card-outter white_card_border'
									"
									class="rounded-lg d-flex flex-column"
									height="570"
									width="270"
									@click="addToCart(item)"
									elevation="0"
								>
									<v-badge
										v-if="
											item.prices[currency_id].old_amount != '0.00' &&
											item.prices[currency_id].old_amount != '0'
										"
										color="#E7004C"
										class="badge_pink"
										:content="`Ahorra S/ ${getDiscount(item.prices)}`"
									></v-badge>
									<v-card-text max-height="300">
										<div class="item">
											<div class="blog-entry">
												<div class="mt-4 mb-4">
													<p>
														<span
															:class="
																item.is_outstanding == 1
																	? 'text_plan_title_white mb-2'
																	: 'text_plan_title_blue mb-2'
															"
															>{{ item.title }}</span
														>
													</p>
													<p>
														<strike
															v-if="
																item.prices[currency_id].old_amount != '0.00' &&
																	item.prices[currency_id].old_amount != '0'
															"
															:class="
																item.is_outstanding == 1
																	? 'price_strike_light mr-3'
																	: 'price_strike_dark mr-3'
															"
															>{{ getOldPrice(item.prices) }}</strike
														><span
															:class="
																item.is_outstanding == 1
																	? 'text_plan_price_pink mb-2'
																	: 'text_plan_price_blue mb-2'
															"
															>{{ !currency ? "S/" : "$" }}
															{{ getPrice(item.prices) }}</span
														>
													</p>
													<p
														style="font-weight: bold; color: #e30e4f"
														v-if="item.dias_trial > 0 && trial_status == true"
													>
														Prueba gratis por {{ item.dias_trial }} días!
													</p>
													<p style="font-weight: bold; color: #e30e4f" v-else>
														&nbsp;
													</p>
												</div>
												<div
													:class="
														item.is_outstanding == 1
															? 'p-2 bd_desc_carousel_white'
															: 'p-2 bd_desc_carousel_blue'
													"
													v-html="item.content"
												></div>
											</div>
										</div>
									</v-card-text>
									<v-card-actions class="card-actions mt-auto">
										<v-row align="center">
											<v-col cols="12" align="center">
												<v-btn
													block
													:class="
														item.is_outstanding == 1
															? 'my-2 rounded-lg fb-btn btn_pink_white'
															: 'my-2 rounded-lg fb-btn btn_blue_white'
													"
													style="padding:0.7em 0px!important;"
													@click="addToCart(item)"
													v-if="data_config.allow_sale && item.allow_sale"
												>
													ELEGIR PLAN
												</v-btn>
												<v-btn
													block
													:class="
														item.is_outstanding == 1
															? 'my-2 rounded-lg fb-btn btn_pink_white'
															: 'my-2 rounded-lg fb-btn btn_blue_white'
													"
													style="padding:0.7em 0px!important;"
													@click="addToCart(item)"
													v-if="!data_config.allow_sale && item.allow_sale"
												>
													ELEGIR PLAN
												</v-btn>
											</v-col>
										</v-row>
									</v-card-actions>
								</v-card>
							</div>
						</v-slide-item>
					</template>
				</v-slide-group>
			</v-sheet>
			<v-sheet class="mx-auto" style="width: 100px;">
				<v-btn
					class="text_btn_white_title"
					depressed
					color="secondary"
					@click="volver"
				>
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
		pq: null,
		model2: 0,
		plans: [],
		base_url: "",
		data_config: {},
		periodicidad: null,
		interval: 0,
		show_gym: false,
		business_partner: [],
		trial_status: false,
		currency: false,
		currency_id: 0,
		periods: {
			mensual: "MENSUAL",
			trimestral: "TRIMESTRAL",
			semestral: "SEMESTRAL",
			anual: "ANUAL",
		},
	}),
	mounted() {
		let vm = this;
		this.pq = localStorage.getItem("paquete_seleccionado");
		vm.slug = this.$route.params.slug;
		vm.getLoggedUser();
		vm.getConfiguracion();
		vm.getBaseUrl();
		vm.list();
		vm.fetchIpData();
	},
	methods: {
		async getLoggedUser() {
			this.$store.commit("loader", true);
			if (localStorage.getItem("token")) {
				this.logged_user = JSON.parse(localStorage.getItem("user_data"));
				this.logged_user_token = localStorage.getItem("token");

				const response = await this.$API.business_partner.getPartner(
					this.logged_user.id
				);

				if (response != null) {
					this.business_partner = Object.assign(response.data.data[0]);
					this.show_gym = true;

					if (this.business_partner.trial_status == 1) {
						this.trial_status = true;
					}
				} else {
					console.log("DAD");
					this.trial_status = true;
				}
			} else {
				this.trial_status = true;
			}
			this.$store.commit("loader", false);
		},
		checkPlan() {
			var itemv = this.plans.find((element) => element.code == this.pq);
			localStorage.removeItem("planSeleccionado");
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
				category_id: itemv.category_id,
				dias_trial: itemv.dias_trial,
			};
			localStorage.planSeleccionado = JSON.stringify(item);
			this.$store.dispatch("addItem", item);
			this.$router.push({ path: "/auth/registrarse" });
		},
		volver() {
			this.$router.push({ path: "/" });
		},
		getPrice(prices) {
			const currencyType = !this.currency ? "soles" : "dolar";
			const price = prices.find(
				(price) =>
					price.currency.currency.toLowerCase() === currencyType.toLowerCase()
			);
			return price ? price.amount : null;
		},
		getDiscount(prices) {
			const currencyType = !this.currency ? "soles" : "dolar";
			const price = prices.find(
				(price) =>
					price.currency.currency.toLowerCase() === currencyType.toLowerCase()
			);
			return price ? price.old_amount - price.amount : null;
		},
		getOldPrice(prices) {
			const currencyType = !this.currency ? "soles" : "dolar";
			const price = prices.find(
				(price) =>
					price.currency.currency.toLowerCase() === currencyType.toLowerCase()
			);
			return price.old_amount ? price.old_amount : null;
		},
		/* filtrarPlanesPeriodo(planes, period) {
			let listaPlanes = planes.filter(
				(plan) => plan.months == period && plan.active == 1
			);
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
		}, */
		async getConfiguracion() {
			try {
				const data = await this.$API.configuration.configuration();
				this.data_config = data.data.data;
			} catch (e) {
				console.error(e);
			}
		},
		async getBaseUrl() {
			try {
				const data = await this.$API.configuration.getBaseUrl();
				this.base_url = data.data;
			} catch (e) {
				console.error(e);
			}
		},
		async list() {
			let vm = this;
			vm.$store.commit("loader", true);

			try {
				const data = await this.$API.plans.list();
				vm.plans = data.data.data;
				vm.temp_plans = data.data.data;
				vm.checkPlan();
				vm.$store.commit("loader", false);
			} catch (e) {
				console.error(e);
				vm.$store.commit("loader", false);
			}
		},
		addToCart(itemv) {
			var selectedCurrency = this.currency == false ? itemv.prices[0] : itemv.prices[1];
	
			this.$store.commit("loader", true);
			localStorage.removeItem("planSeleccionado");
			let item = {
				id: itemv.id,
				title: itemv.title,
				code: itemv.code,
				image: itemv.base_url + itemv.file_path.path + itemv.file_path.filename,
				price: Number(selectedCurrency.amount),
				price_promotional: Number(itemv.promotional_cost),
				quantity: 1,
				priceCompare: Number(selectedCurrency.amount),
				priceTotal: Number(selectedCurrency.amount),
				currency: selectedCurrency.currency_symbol,
				renovacion: itemv.renovacion_automatica,
				category_id: itemv.category_id,
				dias_trial: this.trial_status == true ? itemv.dias_trial : 0,
				currency_id: selectedCurrency.id
			};
			localStorage.planSeleccionado = JSON.stringify(item);
			this.$store.dispatch("addItem", item);
			this.$store.commit("loader", false);
			//this.$router.push({ path: '/carrito#pago' })
			this.$router.push({ path: "/auth/registrarse" });
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
				if (this.ipData?.countryCode === 'PE') {
                    this.currency = false;
					this.currency_id = 1;
                } else {
                    this.currency = true;
					this.currency_id = 2;
                }
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
	},
};
</script>
<style scoped>
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
