<template>
	<v-container>
		<div class="col-md-12">
			<p class="text_title_white text_entrena">Cancelar Membresía</p>
		</div>

		<v-dialog v-model="dialogDelete" max-width="500px">
			<v-card>
				<v-card-title>Cancelar Suscripción</v-card-title>
				<v-card-text
					>Estas a punto de cancelar la renovación automatica de tu plan. Luego
					del {{ exp_date_pop | formatDate }} no tendrás más acceso a la
					plataforma. <br /><br />
					Si deseas, puedes dejar un comentario explicando el motivo de la
					cancelación: <br /><br />
					<v-text-field
						label="Motivo de cancelación"
						v-model="cancel_suscrip"
					></v-text-field>
					¿Estás seguro?
				</v-card-text>
				<v-card-actions>
					<v-btn color="error" text @click="dialogDelete = false"
						><v-icon dark small>
							mdi-close
						</v-icon>
						No</v-btn
					>
					<v-btn color="success" text @click="cancelarSuscripcion()"
						><v-icon dark small>
							mdi-check
						</v-icon>
						Si</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-row>
			<v-col
				cols="12"
				md="12"
				class="d-md-flex"
				style="position: relative;"
			>
				<v-card
					class="rounded-lg"
					style="background-color: rgba(255, 255, 255, 1); width:100%;"
					outlined
					v-if="plan_act != undefined && plan_act != null"
				>
					<div class="align-center justify-center pa-4">
						<h1 class="text_main_class mt-2" style="text-align:center;">
							Espera, tenemos algo para ofrecerte
						</h1>
						<p
							class="align-center textretencion"
						>
							Eres muy valiosa para nosotros y nos gustaría ofrecerte una oferta
							especial para que te quedes entrenando en el desafío, ¿Qué te
							parece?
						</p>
						<hr />
						<h1
							class="text_box_title"
							style="text-align:center; color: #0a2240;"
						>
							Desafío Plus
						</h1>
						<p
							class="align-center inforetencion"
							v-if="id_currency==1"
						>
							<span style="color: #44BD5E; font-weight: bold;"
								>S/ {{ plan_act.monto_retencion_pen }}</span
							>
							en vez de <s>S/ {{ plan_act.prices[0].amount }}</s> para los próximos
							{{ plan_act.cant_cobros_retencion }} cobros.
						</p>
						<p
							class="align-center inforetencion"
							v-if="id_currency==2"
						>
							<span style="color: #44BD5E; font-weight: bold;"
								>$ {{ plan_act.monto_retencion_usd }}</span
							>
							en vez de <s>$ {{ plan_act.prices[1].amount }}</s> para los próximos
							{{ plan_act.cant_cobros_retencion }} cobros.
						</p>
						<v-row style="max-width: 500px; margin: auto;">
							<v-col
								cols="12"
								md="6"
								class="d-md-flex"
								style="position: relative;"
							>
								<v-btn
									@click="
										showDeleteDialog(
											plan.id_suscripcion,
											plan.id_partner,
											plan.expiration_date
										)
									"
									class="text_btn_grey_title"
									block
									depressed
									>Cancelar membresía</v-btn
								>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="d-md-flex"
								style="position: relative;"
							>
								<v-btn
									class="text_btn_white_title"
									block
									depressed
									color="secondary"
									@click="beneficioPopup()"
									>Continuar con el beneficio</v-btn
								>
							</v-col>
						</v-row>
					</div>
				</v-card>
				<v-card
					class="rounded-lg"
					style="background-color: rgba(255, 255, 255, 1); width:100%;"
					outlined
					v-else
				>
					<div class="align-center justify-center pa-4">
						<p
							class="align-center textretencion"
						>
							Eres muy valiosa para nosotros y nos gustaría que te quedes en el desafío, pero si deseas cancelar tu membresía puedes hacerlo utilizando el botón que aparece en la parte inferior. Esperamos volver a verte en el desafío pronto!
						</p>
						<hr />
						<v-row style="max-width: 500px; margin: auto;">
							<v-col
								cols="12"
								md="12"
								class="d-md-flex"
								style="position: relative;"
							>
								<v-btn
									@click="
										showDeleteDialog(
											plan.id_suscripcion,
											plan.id_partner,
											plan.expiration_date
										)
									"
									class="text_btn_grey_title"
									block
									depressed
									>Cancelar membresía</v-btn
								>
							</v-col>
						</v-row>
					</div>
				</v-card>
			</v-col>
		</v-row>
		<v-dialog v-model="dialogConfirmCancel" max-width="500px">
			<v-card>
				<v-card-title>Aceptar beneficio</v-card-title>
				<v-card-text>
					Estas a punto de aceptar el beneficio exclusivo. Luego del
					{{ exp_date_pop | formatDate }} se realizara el nuevo cobro de con el
					monto ofrecido.
					<br />
					¿Estás seguro?
				</v-card-text>
				<v-card-actions>
					<v-btn color="error" @click="dialogConfirmCancel = false"
						>Cancelar</v-btn
					>
					<v-btn color="success" @click="updatePlanAndRetention">
						Continuar</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="successModal" max-width="500px" v-if="plan_act != undefined && plan_act != null">
			<v-card>
				<v-card-text>
					<div class="pt-8">
						<h2 class="congrats">¡Genial, Vikinga!</h2>
					</div>
					<p class="message" v-if="id_currency==1">
						Renovamos tu plan con un descuento especial, pagarás <strong>S/ {{ plan_act.monto_retencion_pen }}</strong
							> los próximos {{ plan.cant_cobros_retencion }} cobros. Gracias por seguir confiando en nosotros.
					</p>
					<p class="message" v-if="id_currency==2">
						Renovamos tu plan con un descuento especial, pagarás <strong>$ {{ plan_act.monto_retencion_usd }}</strong
							> los próximos {{ plan.cant_cobros_retencion }} cobros. Gracias por seguir confiando en nosotros.
					</p>
					<button class="button dark" @click="closeConfirm">FINALIZAR</button>
				</v-card-text>
			</v-card>
		</v-dialog>
		<v-snackbar
			v-model="toast.toast"
			:timeout="toast.timeout"
			:color="toast.color"
			dark
		>
			{{ toast.message }}
		</v-snackbar>
	</v-container>
	
</template>

<script>
export default {
	data() {
		return {
			user: {},
			dialogDelete: false,
			cancel_suscrip: "",
			exp_date_pop: null,
			del_id_susc: null,
			del_id_part: null,
			toast: {
				toast: false,
				message: "",
				timeout: 3000,
				color: "success",
			},
			plan: {},
			dialogConfirmCancel: false,
			exp_date_pop: null,
			logged_user: {},
			business_partner: [],
			successModal: false,
			plans: [],
			plan_act: null,
			id_order: null,
			id_plan: null,
			id_suscripcion: null,
			id_currency: 1
		};
	},
	async mounted() {
		await this.list();
		this.id_order = this.$route.params.id_order;
		this.id_plan = this.$route.params.id_plan;
		this.id_suscripcion = this.$route.params.id_suscripcion;
		await this.obtener_orden(this.id_order);
		this.getPartnerData().then((res) => {
			console.log(res);
		});

		this.getLoggedUser();
		
	},
	methods: {
		beneficioPopup() {
			this.$store.commit("loader", true);
			
			setTimeout(() => {
				// TODO: Reload pla
				this.dialogConfirmCancel = true;
				// this.model2 = true;
			}, 500);
			this.$store.commit("loader", false);
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
				}
			}
			this.$store.commit("loader", false);
		},
		async obtener_orden(id_order){
			this.$store.commit("loader", true);
			try {
				const response = await this.$API.order.getAllOrderInfobyId(id_order);
				var order = response.data.data.order;
				this.id_currency = order.id_currency;
			}
            catch (e) {
                console.error(e);
            }
			this.$store.commit("loader", false);
		},
		async getPartnerData(id) {
			this.$store.commit("loader", true);
			try {
				const response = await this.$API.auth.auth(id);
				this.user = response.data;
				this.plan = this.user.plans.pop();
				this.exp_date_pop = this.plan.expiration_date;
				var planuser = this.plan.id_plan;

				for (const plan of this.plans){
					if(plan.id == this.id_plan){
						this.plan_act = plan;
					}
				}

				this.$store.commit("loader", false);
			} catch (e) {
				this.$store.commit("loader", false);
				console.error(e);
			}
		},
		showDeleteDialog(id_suscripcion, id_partner, fecha_venc) {
			this.dialogDelete = true;
			this.exp_date_pop = fecha_venc;
			this.del_id_susc = id_suscripcion;
			this.del_id_part = id_partner;
		},
		async cancelarSuscripcion() {
			try {
				this.$store.commit("loader", true);
				this.dialogDelete = false;
				if (this.cancel_suscrip == "") this.cancel_suscrip = "-";
				const response = await this.$API.business_partner.cancelSuscription(
					this.del_id_susc,
					this.cancel_suscrip
				);
				this.$store.commit("loader", false);
				this.showToast("Suscripción cancelada correctamente!", "success");
				this.$router.push({ path: "/cuenta/mi-perfil#tabs-info-membresia" });
				this.getPartnerData(this.del_id_part);
				this.$router.push({ path: "/cuenta/mi-perfil" });
			} catch (e) {
				console.error(e);
			}
		},
		showToast(msg, color) {
			this.toast.color = color;
			this.toast.message = msg;
			this.toast.toast = true;
		},
		async updatePlanAndRetention() {
			try {
				this.$store.commit("loader", true);
				const payload = {
					id_partner: this.business_partner.id,
					new_plan_id: this.business_partner.id,
					next_renew_date: this.exp_date_pop,
					renew_auto: true,
					user_id: this.logged_user.id,
					subscription_id: this.plan.id_suscripcion,
					currency: this.id_currency === 1 ? "PEN" : "USD", // this.currency_id === 0 ? "PEN" : "USD",
					retention_amount: this.id_currency === 1 ? this.plan_act.monto_retencion_pen:this.plan_act.monto_retencion_usd, // Monto total del nuevo plan
					total_retention_charges: this.plan_act.cant_cobros_retencion,
				};
				await this.$API.business_partner.updatePlan(payload);
				this.$store.commit("loader", false);
				this.dialogConfirmCancel = false;
				this.successModal = true;
			} catch (e) {
				this.$store.commit("loader", false);
				console.error(e);
			}
		},
		closeConfirm() {
			this.successModal = false;
			this.$router.push({ path: "/gym-virtual/agenda" });
		},
		async list() {
			let vm = this;
			vm.$store.commit("loader", true);

			try {
				const data = await this.$API.plans.list();

				vm.plans = data.data.data;
				
				vm.$store.commit("loader", false);
			} catch (e) {
				console.error(e);
				vm.$store.commit("loader", false);
			}
		},
	},
};
</script>
<style scoped>
hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid #ccc;
	margin: 1em 0;
	padding: 0;
}
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
	margin-top: 24px;
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

.inforetencion{
	text-align:center;
	font-size: 14px;
	margin: 2% 360px;
	color: #6D6D6D;
	background: rgba(68,189,94, 0.15);
	border-radius: 20px;
	padding: 10px;
}

.textretencion{
	text-align:center;
	font-size: 14px;
	padding: 40px 100px 10px 100px;
}

@media (max-width: 520px) {
    .textretencion{
		padding: 0px!important;
		margin-top: 20px;
	}

	.inforetencion{
		text-align:center;
		font-size: 14px;
		margin: 2% 10%;
		color: #6D6D6D;
		background: rgba(68,189,94, 0.15);
		border-radius: 20px;
		padding: 10px;
	}
}

v-dialog v-dialog--active {
	box-shadow: none !important;
}
</style>
