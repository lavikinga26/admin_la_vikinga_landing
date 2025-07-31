<template>
	<div class="white flex-grow-1 py-10">
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

			<hr class="mt-2 mb-2" style="border: 1px dashed #000000;" />
			<v-row>
				<v-col cols="8"><b>Total a pagar hoy</b></v-col>
				<v-col cols="4" class="text-right"
					><b
						>{{ cart[0].currency }} {{ parseFloat(total).toFixed(2) }}</b
					></v-col
				>
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
						@click="showModalConditions()"
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
	</div>
</template>
<script>
export default {
	data() {
		return {
			cart: [],
			newPlan: {
				id: null,
				title: "",
				price: 0,
				difference: 0,
			},
			lastPlan: {
				id: null,
				price: 0,
			},
			subscriptionId: null,
			currencySymbol: "S/",
			currencyId: 0,
			selectedPaymentMethod: null,
			total: 0,
			had_invoice: false,
			invoiceData: {
				ruc: "",
				razon_social: "",
				direccion_fiscal: "",
			},
			requiredRule: [(v) => !!v || "Campo obligatorio"],
			order: {
				country: null,
				password: "",
				confirmPassword: "",
				had_invoice: false,
				coupon: "",
			},
			paymentMethods: [],
		};
	},
	mounted() {
		this.getLoggedUser();
		this.loadPlanFromRoute();
		this.getPaymentMethods();
	},
	methods: {
		loadPlanFromRoute() {
			const q = this.$route.query;

			this.newPlan = {
				id: q.new_plan_id,
				title: q.new_plan_title,
				price: parseFloat(q.new_plan_price),
				difference: parseFloat(q.upgrade_difference),
			};

			this.lastPlan = {
				id: q.last_plan_id,
				price: parseFloat(q.last_plan_price),
			};

			this.subscriptionId = q.subscription_id;
			this.currencySymbol = q.currency_id == 0 ? "S/" : "$";
			this.currencyId = Number(q.currency_id);

			this.cart = [
				{
					title: this.newPlan.title,
					price: this.newPlan.price,
					amount: this.newPlan.price,
					old_amount: this.lastPlan.price,
					currency: this.currencySymbol,
					currency_id: this.currencyId,
					cant_cobros_retencion: q.cant_cobros_retencion || 1,
				},
			];

			this.total = this.newPlan.difference;
		},
		async getPaymentMethods() {
			try {
				const response = await this.$API.configuration.getPaymentMethods();
				var paymentMethods = response.data.data;
				this.paymentMethods = response.data.data || [];
				console.log("MONEDA: "+this.currencyId);
				if (this.currencyId == 0) {
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
		confirmarPago() {
			if (!this.selectedPaymentMethod) {
				this.$toast.error("Selecciona un método de pago");
				return;
			}

			const payload = {
				user_id: this.$store.state.auth.user?.id,
				plan_id: this.newPlan.id,
				subscription_id: this.subscriptionId,
				amount: this.total,
				payment_method: this.selectedPaymentMethod,
				currency: this.currencySymbol,
				invoice: this.had_invoice ? this.invoiceData : null,
			};

			// TODO Formulario de stripe
			console.log("Procesando pago con:", payload);

			this.$toast.success("¡Pago realizado con éxito!");
			this.$router.push({ path: "/cuenta" });
		},
		async getLoggedUser() {
			if (localStorage.getItem("token")) {
				this.logged_user = JSON.parse(localStorage.getItem("user_data"));

				const response = await this.$API.business_partner.getPartner(
					this.logged_user.id
				);
				this.logged_affiliate = response.data.data[0];

				this.order.bd_id = this.logged_affiliate.id;
				this.order.id_document_type = this.logged_affiliate.id_document_type;
				this.order.name = this.logged_affiliate.name;
				this.order.lastname = this.logged_affiliate.lastname;
				this.order.nro_doc = this.logged_affiliate.nro_doc;
				this.order.address = this.logged_affiliate.address;
				this.order.city = this.logged_affiliate.city;
				this.order.email = this.logged_affiliate.email;
				this.order.phone = this.logged_affiliate.phone;
				this.order.terms_conditions = this.logged_affiliate.terms_conditions;
				this.order.privacy_policy = this.logged_affiliate.privacy_policy;
				this.order.country = this.countries_list.find(
					(e) => e.id == this.logged_affiliate.id_country
				);

				this.order.had_invoice = false; //?
			}
		},
		volver() {
			this.$router.go(-1);
		},
	},
};
</script>
