<template>
	<div class="white flex-grow-1 py-10">
		<div style="position: relative;">
			<h1 class="title_pink mt-4 mb-4">ELIGE TU PLAN</h1>
			<div style="position: absolute; right: 20px; top: 0; bottom: 0;">
				<div class="toggle-switch">
					<input
						v-model="currency"
						type="checkbox"
						id="switch"
						v-on:change="updCurrency()"
					/>
					<label for="switch" class="switch-label">
						<span class="switch-inner"></span>
						<span class="switch-text-on">SOL</span>
						<span class="switch-text-off">USD</span>
					</label>
				</div>
			</div>
		</div>
		<v-row
			class="mx-auto justify-center mb-4"
			elevation="'0'"
			color="#ffffff"
			light
			v-if="centrarPlanes == true"
		>
			<v-slide-item v-slot="{ toggle }">
				<div class="ma-4  rounded-lg header_plan_gray">
					<div class="header_plan_title_white pa-2">
						MI PLAN ACTUAL
					</div>
					<v-card
						:color="lastPlan.is_outstanding == 1 ? 'primary' : '#ffffff'"
						:class="
							lastPlan.is_outstanding == 1
								? 'card-outter'
								: 'card-outter gray_card_border'
						"
						class="rounded-lg d-flex flex-column"
						height="580"
						width="270"
						@click="choosePlan(item)"
						elevation="0"
					>
						<v-badge
							v-if="
								(lastPlan.prices[currency_id].old_amount != '0.00' &&
									lastPlan.prices[currency_id].old_amount != '0' &&
									ref_code == null) ||
									((lastPlan.referred_discount_pen != '0.00' ||
										lastPlan.referred_discount_usd != '0.00') &&
										ref_code != null)
							"
							color="#E7004C"
							class="badge_pink"
							:content="
								`${getDiscount(
									lastPlan.prices,
									lastPlan.referred_discount_pen,
									lastPlan.referred_discount_usd
								)}`
							"
						></v-badge>
						<v-card-text max-height="300">
							<div class="item">
								<div class="blog-entry">
									<div class="mt-4 mb-4">
										<p>
											<span
												:class="
													lastPlan.is_outstanding == 1
														? 'text_plan_title_white mb-2'
														: 'text_plan_title_blue mb-2'
												"
												>{{ lastPlan.title }}</span
											>
										</p>
										<p>
											<strike
												v-if="
													(lastPlan.prices[currency_id].old_amount != '0.00' &&
														lastPlan.prices[currency_id].old_amount != '0') ||
														(ref_code != null && ref_code != undefined)
												"
												:class="
													lastPlan.is_outstanding == 1
														? 'price_strike_light mr-3'
														: 'price_strike_dark mr-3'
												"
												>{{
													getOldPrice(
														lastPlan.prices,
														lastPlan.referred_discount_pen,
														lastPlan.referred_discount_usd
													)
												}}</strike
											><span
												:class="
													lastPlan.is_outstanding == 1
														? 'text_plan_price_pink mb-2'
														: 'text_plan_price_blue mb-2'
												"
												>{{ !currency ? "S/" : "$" }}
												{{
													getPrice(
														lastPlan.prices,
														lastPlan.referred_discount_pen,
														lastPlan.referred_discount_usd,
														lastPlan
													)
												}}</span
											>
										</p>
									</div>
									<div class="">
										<p
											class="text--primary mb-1 font-weight-bold"
											style="font-size: 12px;"
										>
											Paga {{ !currency ? "S/" : "$" }}
											{{ getTotalPrice(lastPlan) }} cada mes
										</p>
										<p
											class="text--primary"
											style="font-size: 12px; line-height: 14px;"
										>
											Plan vía Tarjeta de Crédito o Transferencia Bancaria (Solo
											Perú)
										</p>
									</div>
									<div
										:class="
											lastPlan.is_outstanding == 1
												? 'p-2 bd_desc_carousel_white'
												: 'p-2 bd_desc_carousel_blue'
										"
										v-html="lastPlan.content"
									></div>
								</div>
							</div>
						</v-card-text>
					</v-card>
				</div>
			</v-slide-item>
			<template v-for="(item, n) in plans">
				<v-slide-item
					v-if="item.allow_sale == 1 && item.status == 1 && item.active == 1"
					:key="n"
					v-slot="{ toggle }"
				>
					<div
						:class="
							item.is_outstanding == 1 ? 'header_plan_pink' : 'header_plan_blue'
						"
						class="ma-4  rounded-lg"
					>
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
							height="580"
							width="270"
							@click="choosePlan(item)"
							elevation="0"
						>
							<v-badge
								v-if="
									(item.prices[currency_id].old_amount != '0.00' &&
										item.prices[currency_id].old_amount != '0' &&
										ref_code == null) ||
										((item.referred_discount_pen != '0.00' ||
											item.referred_discount_usd != '0.00') &&
											ref_code != null)
								"
								color="#E7004C"
								class="badge_pink"
								:content="
									`${getDiscount(
										item.prices,
										item.referred_discount_pen,
										item.referred_discount_usd
									)}`
								"
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
														(item.prices[currency_id].old_amount != '0.00' &&
															item.prices[currency_id].old_amount != '0') ||
															(ref_code != null && ref_code != undefined)
													"
													:class="
														item.is_outstanding == 1
															? 'price_strike_light mr-3'
															: 'price_strike_dark mr-3'
													"
													>{{
														getOldPrice(
															item.prices,
															item.referred_discount_pen,
															item.referred_discount_usd
														)
													}}</strike
												><span
													:class="
														item.is_outstanding == 1
															? 'text_plan_price_pink mb-2'
															: 'text_plan_price_blue mb-2'
													"
													>{{ !currency ? "S/" : "$" }}
													{{
														getPrice(
															item.prices,
															item.referred_discount_pen,
															item.referred_discount_usd,
															item
														)
													}}</span
												>
											</p>
										</div>

										<div class="">
											<p
												class="text--primary mb-1 font-weight-bold"
												style="font-size: 12px;"
											>
												Paga {{ !currency ? "S/" : "$" }}
												{{ getTotalPrice(lastPlan) }} cada
												{{ lastPlan.cant_cobros_retencion }} meses
											</p>
											<p
												class="text--primary"
												style="font-size: 12px; line-height: 14px;"
											>
												Plan vía Tarjeta de Crédito o Transferencia Bancaria
												(Solo Perú)
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
											@click="choosePlan(item)"
											v-if="data_config.allow_sale && item.allow_sale"
										>
											ACTUALIZAR PLAN
										</v-btn>
										<v-btn
											block
											:class="
												item.is_outstanding == 1
													? 'my-2 rounded-lg fb-btn btn_pink_white'
													: 'my-2 rounded-lg fb-btn btn_blue_white'
											"
											style="padding:0.7em 0px!important;"
											@click="choosePlan(item)"
											v-if="!data_config.allow_sale && item.allow_sale"
										>
											ACTUALIZAR PLAN
										</v-btn>
									</v-col>
								</v-row>
							</v-card-actions>
						</v-card>
					</div>
				</v-slide-item>
			</template>
		</v-row>
		<v-dialog v-model="dialogConfirmCancel"  max-width="500px" >
			<v-card>
				<v-card-title>Actualizar Plan</v-card-title>
				<v-card-text>
					Estas a punto de actualizar tu plan. Luego del {{ exp_date_pop | formatDate }} se realizara el nuevo cobro del plan seleccionado.
					<br/>
					¿Estás seguro?
				</v-card-text>
				<v-card-actions>
					<v-btn color="error" @click="dialogConfirmCancel = false">Cancelar</v-btn>
					<v-btn color="success" @click="updatePlanAndRetention"> Continuar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="model2"  max-width="500px" >
			<v-card>
				<v-card-text>
					<div class="pt-8">
						<h2 class="congrats">¡FELICIDADES!</h2>
					</div>
					<p class="message">
						Tu plan ha sido actualizado con éxito, el próximo cobro se realizará
						el día <strong>25/05/2025</strong> por un monto de
						<strong>S/75</strong> correspondiente al plan anual.
					</p>
					<button class="button dark" @click="closeConfirm">FINALIZAR</button>
				</v-card-text>
			</v-card>
		</v-dialog>
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
	</div>
</template>
<script>
export default {
	data: (e) => ({
		model: null,
		pq: null,
		model2: false,
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
		currency_url: null,
		lastPlan: {},
		dialogConfirmCancel: false,
		exp_date_pop: null,
		plan: {}
	}),
	async mounted() {
		let vm = this;
		vm.pq = localStorage.getItem("paquete_seleccionado");
		vm.ref_code = localStorage.getItem("ref_code");
		vm.slug = this.$route.params.slug;
		vm.currency_url = localStorage.getItem("currency");

		await vm.getIpData();
		vm.fetchIpData();

		await vm.getPartnerData();
		await vm.getConfiguracion();
		await vm.getLoggedUser();
		await vm.getBaseUrl();
		await vm.list();
		if (vm.ref_code != null && vm.ref_code != undefined) {
			vm.calcDiscountReferred();
		}
	},
	methods: {
		updCurrency() {
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

					if (
						this.business_partner.trial_status == 1 &&
						this.ref_code == null
					) {
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
			var itemv = this.plans.find(
				(element) =>
					element.code == localStorage.getItem("paquete_seleccionado")
			);
			console.log("PLAN " + itemv);
			localStorage.removeItem("planSeleccionado");
			var selectedCurrency =
				this.currency == false ? itemv.prices[0] : itemv.prices[1];
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
				currency_id: selectedCurrency.currency_id,
			};
			localStorage.planSeleccionado = JSON.stringify(item);
			this.$store.dispatch("addItem", item);
			this.$router.push({ path: "/auth/registrarse" });
		},
		volver() {
			this.$router.push({ path: "/cuenta/mi-perfil" });
		},
		getTotalPrice(plan) {
			let amount = this.getPrice(
				plan.prices,
				plan.referred_discount_pen,
				plan.referred_discount_usd,
				plan
			);
			return amount * 3; // (amount * plan.cant_cobros_retencion)
		},
		getPrice(prices, dsc_pen, dsc_usd, item) {
			const currencyType = !this.currency ? "soles" : "dolar";

			const price = {};
			price.amount =
				this.currency == "soles"
					? item.monto_retencion_pen
					: item.monto_retencion_usd;

			if (this.ref_code != null && this.ref_code != undefined) {
				return price
					? this.calcDiscountReferred(price.amount, dsc_pen, dsc_usd)
					: null;
			} else {
				return price ? price.amount : null;
			}
		},
		getDiscount(prices, dsc_pen, dsc_usd) {
			const currencyType = !this.currency ? "soles" : "dolar";
			const currencySymbol = !this.currency ? "S/ " : "$ ";
			const currid = currencyType == "soles" ? 1 : 2;

			const price = prices[this.currency_id];
			const finalAmount = price.old_amount - price.amount;

			if (this.ref_code != null && this.ref_code != undefined) {
				let precioCalcDsct =
					price.old_amount != "0" && price.old_amount != "0.00"
						? price.old_amount
						: price.amount;
				const finalAmount = this.calcDiscountReferred(
					precioCalcDsct,
					dsc_pen,
					dsc_usd
				);
				return this.currency_id == 0
					? "Dscto. Referido " + currencySymbol + parseFloat(dsc_pen).toFixed(2)
					: "Dscto. Referido " +
							currencySymbol +
							parseFloat(dsc_usd).toFixed(2);
			} else {
				return price
					? "Ahorra " + currencySymbol + parseFloat(finalAmount).toFixed(2)
					: null;
			}
		},
		getOldPrice(prices, dsc_pen, dsc_usd) {
			const currencyType = !this.currency ? "soles" : "dolar";
			const currencySymbol = !this.currency ? "S/ " : "$ ";
			const currid = currencyType == "soles" ? 1 : 2;

			const price = prices[this.currency_id];
			if (this.ref_code != null && this.ref_code != undefined) {
				return price.amount;
			} else {
				return price.old_amount ? currencySymbol + price.old_amount : null;
			}
		},
		calcDiscountReferred(price, dsc_pen, dsc_usd) {
			if (this.currency_id == 0) {
				var newprice = price - dsc_pen;
			} else {
				var newprice = price - dsc_usd;
			}

			return newprice;
		},
		async getConfiguracion() {
			try {
				const data = await this.$API.configuration.configuration(this.dataIP);
				this.data_config = data.data.data;

				if (this.currency_url == null) {
					if (this.data_config.countryCode === "PE") {
						this.currency = false;
						this.currency_id = 0;
					} else {
						this.currency = true;
						this.currency_id = 1;
					}
				} else {
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

				// Agregar el último plan como primer elemento
				const lastPlan = this.business_partner.plans.pop();
				vm.lastPlan = lastPlan;

				// if (lastPlan) {
				// 	vm.plans.unshift(lastPlan);
				// }

				let activeplans = vm.plans.filter(
					(pl) => pl.active == 1 && pl.status == 1
				);

				// if (activeplans.length <= 2) {
				// 	vm.centrarPlanes = true;
				// }
				vm.centrarPlanes = true;
				console.log("vm.plans", vm.plans);
				vm.checkPlan();
				vm.$store.commit("loader", false);
			} catch (e) {
				console.error(e);
				vm.$store.commit("loader", false);
			}
		},
		choosePlan(itemv) {
			this.$store.commit("loader", true);
			setTimeout(() => {
				// TODO: Reload pla
				this.dialogConfirmCancel = true;
				// this.model2 = true;
			}, 1000); 
			this.$store.commit("loader", false);
		},
		async getIpData() {
			await fetch("https://api.ipify.org?format=json")
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error al obtener la IP");
					}
					return response.json();
				})
				.then((data) => {
					this.dataIP = data.ip;
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		},
		async fetchIpData() {
			this.loading = true;
			this.error = null;
			try {
				this.ipData = this.data_config;
				if (this.ipData?.countryCode === "PE") {
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
		async getPartnerData(id) {
			this.$store.commit('loader',true);
			try {
				const response = await this.$API.auth.auth(id);
				const user = response.data;
				this.plan = user.plans.pop();

				this.del_id_susc = this.plan.id_suscripcion;
				this.exp_date_pop = this.plan.expiration_date;

				this.$store.commit('loader',false);
			} catch (e) {
				this.$store.commit('loader',false);
				console.error(e);
			}
    	},
		async updatePlanAndRetention() {
			this.$store.commit('loader', true);
			try {
				const payload = {
					id_partner: this.business_partner.id,
					new_plan_id: this.plan.id,
					next_renew_date: this.exp_date_pop, 
					renew_auto: true, 
					user_id: this.logged_user.id,
					subscription_id: this.del_id_susc,
					currency: this.currency_id === 0 ? 'PEN' : 'USD',
					retention_amount: this.getTotalPrice(this.plan), // Monto total del nuevo plan
					total_retention_charges: this.plan.cant_cobros_retencion,
				};

				// await this.$axios.post('/api/subscription/plan/update', payload);
				await  this.$API.business_partner.updatePlan(payload);
				this.dialogConfirmCancel = false;
				this.model2 = true;
			} catch (error) {
				console.error('Error al actualizar el plan:', error);
				this.$toast.error('No se pudo actualizar el plan');
			} finally {
				this.$store.commit('loader', false);
			}
		},
		closeConfirm(){
			this.model2 = false;
			this.$router.push({ path: "/cuenta" });
		}
	},
};
</script>
<style scoped>
@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
	.centrarPlanes {
		margin: 0 16%;
	}
}

@media (min-width: 1650px) {
	.centrarPlanes {
		margin: 0 25%;
	}
}

@media (min-width: 480px) and (max-device-width: 800px) {
	.centrarPlanes {
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


<style scoped>
.card-container {
	background: #ffffff;
	border-radius: 20px;
	padding: 24px;
	max-width: 800px;
	margin: auto;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
	font-family: "MachProCondBold", sans-serif;
}

.trial-title {
	color: #e7004c;
	font-size: 24px;
	text-align: left;
	font-weight: bold;
	margin-bottom: 24px;
	text-transform: uppercase;
}

.card {
	border-radius: 12px;
	padding: 16px;
	margin-bottom: 16px;
}

.green-border {
	border: 2px solid #44bd5e;
}

.card-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.text-section {
	max-width: 70%;
}

.card-title {
	font-size: 16px;
	font-weight: bold;
	margin: 0;
	color: #000;
}

.subtitle {
	font-size: 14px;
	color: #555;
	margin: 4px 0 0;
}

.price {
	color: #44bd5e;
	font-size: 24px;
	font-weight: bold;
	margin: 0;
}

.per-month {
	font-size: 16px;
	margin-left: 4px;
}

.button {
	border: none;
	border-radius: 8px;
	font-size: 16px;
	padding: 10px 16px;
	font-weight: bold;
	font-family: "MachProCondBold", sans-serif;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
}

.button-green {
	background-color: #44bd5e;
	border: 2px solid #44bd5e;
	color: white;
}

.button-green-outline {
	background-color: transparent;
	border: 2px solid #44bd5e;
	color: #44bd5e;
}

.disabled {
	text-align: center;
	opacity: 0.8;
	font-size: 24px;
}

.button.disabled {
	background: none;
	border: none;
	color: #d9d9d9;
	cursor: not-allowed;
	border: 2px solid #d9d9d9;
}

.confirmation-card {
	background-color: #ffffff;
	padding: 32px 24px;
	border-radius: 20px;
	text-align: center;
	max-width: 450px;
	margin: auto;
}

.congrats {
	color: #e7004c;
	font-size: 40px;
	margin-bottom: 16px;
	text-transform: uppercase;
	font-family: "MachProCondBold", sans-serif;
}

.message {
	color: #000;
	font-size: 16px;
	line-height: 1.5;
	margin-bottom: 24px;
}

.message strong {
	font-weight: bold;
}

.button.dark {
	background-color: #0d1e3f;
	color: white;
	padding: 12px 24px;
	border: none;
	border-radius: 12px;
	font-family: "MachProCondBold", sans-serif;
	font-size: 24px;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out;
}

.button.dark:hover {
	background-color: #09152e;
}
v-dialog v-dialog--active{
	box-shadow: none !important;
}
</style>
