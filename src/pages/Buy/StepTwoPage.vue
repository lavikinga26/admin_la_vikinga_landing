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
			<div class="d-flex align-center justify-center mb-4 d-none d-md-flex">
				<h1 class="title_pink mt-4 mr-4">ELIGE TU PLAN</h1>
				<div class="toggle-switch">
					<input v-model="currency" type="checkbox" id="switch" v-on:change="updCurrency()"/>
					<label for="switch" class="switch-label">
						<span class="switch-inner"></span>
						<span class="switch-text-on">SOL</span>
						<span class="switch-text-off">USD</span>
					</label>
				</div>
			</div>
			<div class="d-flex d-md-none flex-column align-center">
				<h1 class="title_pink mt-4 mb-4">ELIGE TU PLAN</h1>
				<div class="toggle-switch mb-3">
					<input v-model="currency" type="checkbox" id="switch-mobile" v-on:change="updCurrency()"/>
					<label for="switch-mobile" class="switch-label">
						<span class="switch-inner"></span>
						<span class="switch-text-on">SOL</span>
						<span class="switch-text-off">USD</span>
					</label>
				</div>
			</div>
			<v-row class="mx-auto justify-center mb-4" elevation="'0'" color="#ffffff" light v-if="centrarPlanes == true">
				<template v-for="(item, n) in plans">
					<v-slide-item
						v-if="item.allow_sale == 1 && item.status == 1 && item.active == 1"
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
										(item.prices[currency_id].old_amount != '0.00' &&
										item.prices[currency_id].old_amount != '0' && ref_code==null) || 
										((item.referred_discount_pen  != '0.00' || item.referred_discount_usd != '0.00') && ref_code!=null)
									"
									color="#E7004C"
									class="badge_pink"
									:content="`${getDiscount(item.prices, item.referred_discount_pen, item.referred_discount_usd)}`"
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
																item.prices[currency_id].old_amount != '0' || (ref_code != null && ref_code != undefined)
														"
														:class="
															item.is_outstanding == 1
																? 'price_strike_light mr-3'
																: 'price_strike_dark mr-3'
														"
														>{{ getOldPrice(item.prices, item.referred_discount_pen, item.referred_discount_usd) }}</strike
													><span
														:class="
															item.is_outstanding == 1
																? 'text_plan_price_pink mb-2'
																: 'text_plan_price_blue mb-2'
														"
														>{{ !currency ? "S/" : "$" }}
														{{ getPrice(item.prices, item.referred_discount_pen,  item.referred_discount_usd) }}</span
													>
												</p>
												<p
													style="font-weight: bold; color: #e30e4f"
													v-if="item.dias_trial > 0 && trial_status == true && ref_code == null"
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
			</v-row>
			<v-sheet class="mx-auto" elevation="'0'" color="#ffffff" light v-if="centrarPlanes == false">
				<v-slide-group v-model="model" class="pa-0" center-active>
					<template v-for="(item, n) in plans">
						<v-slide-item
							v-if="item.allow_sale == 1 && item.status == 1 && item.active == 1"
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
											(item.prices[currency_id].old_amount != '0.00' &&
											item.prices[currency_id].old_amount != '0') || 
											((item.referred_discount_pen  != '0.00' || item.referred_discount_usd != '0.00') && ref_code!=null)
										"
										color="#E7004C"
										class="badge_pink"
										:content="`${getDiscount(item.prices, item.referred_discount_pen, item.referred_discount_usd)}`"
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
																	item.prices[currency_id].old_amount != '0' || (ref_code != null && ref_code != undefined)
															"
															:class="
																item.is_outstanding == 1
																	? 'price_strike_light mr-3'
																	: 'price_strike_dark mr-3'
															"
															>{{ getOldPrice(item.prices, item.referred_discount_pen, item.referred_discount_usd) }}</strike
														><span
															:class="
																item.is_outstanding == 1
																	? 'text_plan_price_pink mb-2'
																	: 'text_plan_price_blue mb-2'
															"
															>{{ !currency ? "S/" : "$" }}
															{{ getPrice(item.prices, item.referred_discount_pen,  item.referred_discount_usd) }}</span
														>
													</p>
													<p
														style="font-weight: bold; color: #e30e4f"
														v-if="item.dias_trial > 0 && trial_status == true && ref_code == null"
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
		currency_id: 1,
		periods: {
			mensual: "MENSUAL",
			trimestral: "TRIMESTRAL",
			semestral: "SEMESTRAL",
			anual: "ANUAL",
		},
		ref_code: null,
		dataIP: null,
		centrarPlanes: false,
		def_currency: null,
		currency_url: null
	}),
	async mounted() {
		let vm = this;
		vm.pq = localStorage.getItem("paquete_seleccionado");
		vm.ref_code = localStorage.getItem("ref_code");
		vm.slug = this.$route.params.slug;
		vm.currency_url = localStorage.getItem("currency");

		await vm.getIpData();
		vm.fetchIpData();
		
		await vm.getConfiguracion();
		await vm.list();
		vm.getLoggedUser();
		vm.getBaseUrl();
		console.log("REF "+vm.ref_code);
		if(vm.ref_code != null && vm.ref_code != undefined){
			vm.calcDiscountReferred();
		}
	},
	methods: {
		updCurrency(){
			this.currency_id = !this.currency ? 0 : 1;
			console.log(this.currency_id);
		},
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

					if (this.business_partner.trial_status == 1 && this.ref_code == null) {
						this.trial_status = true;
					}
				} else {
					this.trial_status = true;
				}
			} else {
				this.trial_status = true;
			}
			this.$store.commit("loader", false);
		},
		checkPlan() {
			var itemv = this.plans.find((element) => element.code == localStorage.getItem("paquete_seleccionado"));
			console.log("PLAN "+itemv);
			localStorage.removeItem("planSeleccionado");
			var selectedCurrency = this.currency == false ? itemv.prices[0] : itemv.prices[1];
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
				dias_trial: itemv.dias_trial,
				currency_id: selectedCurrency.currency_id
			};
			localStorage.planSeleccionado = JSON.stringify(item);
			this.$store.dispatch("addItem", item);
			this.$router.push({ path: "/auth/registrarse" });
		},
		volver() {
			if (localStorage.getItem("token")) {
				// Usuario logueado: salir del flujo completamente
				window.location.replace("https://lavikingaoficial.com/");
			} else {
				// Usuario no logueado: volver al step1 del flujo
				this.$router.push({ path: "/proceso_compra" });
			}
		},
		getPrice(prices, dsc_pen, dsc_usd) {
			const currencyType = !this.currency ? "soles" : "dolar";

			const price = prices[this.currency_id];

			if(this.ref_code != null && this.ref_code != undefined){
				return price ? this.calcDiscountReferred(price.amount, dsc_pen, dsc_usd) : null; 
			}else{
				return price ? price.amount : null;
			}
		},
		getDiscount(prices, dsc_pen, dsc_usd) {
			const currencyType = !this.currency ? "soles" : "dolar";
			const currencySymbol = !this.currency ? "S/ " : "$ ";
			const currid = currencyType == "soles" ? 1:2;

			const price = prices[this.currency_id];
			const finalAmount = price.old_amount - price.amount;

			if(this.ref_code != null && this.ref_code != undefined){
				let precioCalcDsct = price.old_amount != "0" && price.old_amount != "0.00" ? price.old_amount : price.amount;
				const finalAmount = this.calcDiscountReferred(precioCalcDsct, dsc_pen, dsc_usd);
				return this.currency_id == 0 ? "Dscto. Referido " + currencySymbol + parseFloat(dsc_pen).toFixed(2) : "Dscto. Referido " + currencySymbol + parseFloat(dsc_usd).toFixed(2);
			}else{
				return price ? "Ahorra " + currencySymbol + parseFloat(finalAmount).toFixed(2) : null;
			}
		},
		getOldPrice(prices, dsc_pen, dsc_usd) {
			const currencyType = !this.currency ? "soles" : "dolar";
			const currencySymbol = !this.currency ? "S/ " : "$ ";
			const currid = currencyType == "soles" ? 1:2;

			const price = prices[this.currency_id];
			if(this.ref_code != null && this.ref_code != undefined){
				return price.amount;
			}else{
				return price.old_amount ? currencySymbol + price.old_amount : null;
			}
		},
		calcDiscountReferred(price, dsc_pen, dsc_usd){
			if(this.currency_id == 0){
				var newprice = price - dsc_pen;
			}else{
				var newprice = price - dsc_usd;
			}
			
			return newprice;
		},
		async getConfiguracion() {
			try {
				const data = await this.$API.configuration.configuration(this.dataIP);
				this.data_config = data.data.data;

				if (this.currency_url == null) {
					if (this.data_config.countryCode === 'PE') {
						this.currency = false;
						this.currency_id = 0;
					} else {
						this.currency = true;
						this.currency_id = 1;
					}
				}else {
					if (this.currency_url == "PEN") {
						this.currency = false;
						this.currency_id = 0;
					} else {
						this.currency = true;
						this.currency_id = 1;
						console.log(this.currency_id);
					}
				}
			} catch (e) {
				console.error(e);
			} finally {
                this.loading = false;
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
				let activeplans = vm.plans.filter(pl => pl.active == 1 && pl.status == 1);
				if(activeplans.length <= 2){
					vm.centrarPlanes = true;
				}
				vm.checkPlan();
				vm.$store.commit("loader", false);
			} catch (e) {
				console.error(e);
				vm.$store.commit("loader", false);
			}
		},
		addToCart(itemv) {
			var selectedCurrency = this.currency == false ? itemv.prices[0] : itemv.prices[1];

			var amoutItem = Number(selectedCurrency.amount);
			var ref_dscto = 0;

			if(this.currency == false && this.ref_code != null && this.ref_code != undefined){
				amoutItem = Number(selectedCurrency.amount - itemv.referred_discount_pen);
				ref_dscto = itemv.referred_discount_pen;
			}else if(this.currency == true && this.ref_code != null && this.ref_code != undefined){
				amoutItem = Number(selectedCurrency.amount - itemv.referred_discount_usd);
				ref_dscto = itemv.referred_discount_usd;
			}
	
			this.$store.commit("loader", true);
			localStorage.removeItem("planSeleccionado");
			let item = {
				id: itemv.id,
				title: itemv.title,
				code: itemv.code,
				image: itemv.base_url + itemv.file_path.path + itemv.file_path.filename,
				price: amoutItem,
				price_promotional: Number(itemv.promotional_cost),
				quantity: 1,
				priceCompare: amoutItem,
				priceTotal: amoutItem,
				currency: selectedCurrency.currency_symbol,
				renovacion: itemv.renovacion_automatica,
				category_id: itemv.category_id,
				dias_trial: this.trial_status == true ? itemv.dias_trial : 0,
				currency_id: selectedCurrency.currency_id,
				ref_code: this.ref_code,
				ref_discount: parseFloat(ref_dscto).toFixed(2)
			};
			localStorage.planSeleccionado = JSON.stringify(item);
			this.$store.dispatch("addItem", item);
			this.$store.commit("loader", false);
			//this.$router.push({ path: '/carrito#pago' })
			this.$router.push({ path: "/auth/registrarse" });
		},
		async getIpData(){
			await fetch('https://api.ipify.org?format=json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Error al obtener la IP');
				}
				return response.json();
			})
			.then(data => {
				this.dataIP = data.ip;
			})
			.catch(error => {
				console.error('Error:', error);
			});
		},
		async fetchIpData() {
            this.loading = true;
            this.error = null;
            try {
                this.ipData = this.data_config;
				if (this.ipData?.countryCode === 'PE') {
					this.currency = false;
					this.currency_id = 0;
				} else {
					this.currency = true;
					this.currency_id = 1;
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
@media screen 
  and (min-device-width: 1200px) 
  and (max-device-width: 1600px) 
  and (-webkit-min-device-pixel-ratio: 1) { 
	.centrarPlanes{
		margin: 0 16%;
	}
}

@media (min-width:1650px) {
	.centrarPlanes{
		margin: 0 25%;
	}
}

@media (min-width:480px) and (max-device-width: 800px)  { 
	.centrarPlanes{
		margin: 0 0%;
	}
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
