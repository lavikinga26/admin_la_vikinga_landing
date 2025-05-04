<template>
	<v-container>
		<div class="col-md-12">
			<p class="text_title_white text_entrena">Cancelar Membresía</p>
		</div>

		<v-dialog v-model="dialogDelete" max-width="500px">
			<v-card>
				<v-card-title>Cancelar Suscripción</v-card-title>
				<v-card-text>Estas a punto de cancelar la renovación automatica de tu plan. Luego del {{ exp_date_pop | formatDate }} no tendrás más acceso a la plataforma. <br/><br/>
					Si deseas, puedes dejar un comentario explicando el motivo de la cancelación: <br/><br/>
					<v-text-field label="Motivo de cancelación" v-model="cancel_suscrip"></v-text-field>
					¿Estás seguro?
				</v-card-text>
				<v-card-actions>
					<v-btn color="error" text @click="dialogDelete = false"><v-icon dark small>
					mdi-close
					</v-icon> No</v-btn>
					<v-btn color="success" text @click="cancelarSuscripcion()"><v-icon dark small>
					mdi-check
					</v-icon> Si</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-row>
			<v-col
				cols="12"
				md="12"
				class="d-none d-md-flex d-sm-none"
				style="position: relative;"
			>
				<v-card
					class="rounded-lg"
					style="background-color: rgba(255, 255, 255, 1); width:100%;"
					outlined
				>
					<div class="align-center justify-center pa-4">
						<h1 class="text_main_class mt-2" style="text-align:center;">
							Espera, tenemos algo para ofrecerte
						</h1>
						<p
							class="align-center"
							style="text-align:center; font-size: 14px; padding: 40px 100px 10px 100px;"
						>
							Eres muy valiosa para nosotros y nos gustaria ofrecerte una oferta
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
							class="align-center"
							style="text-align:center; font-size: 14px; margin: 2% 360px; color: #6D6D6D; background: rgba(68,189,94, 0.15); border-radius: 20px; padding: 10px;"
						>
							<span style="color: #44BD5E; font-weight: bold;">S/ 65</span> en
							vez de <s>S/ 93</s> para los próximos 3 meses.
						</p>
						<v-row style="max-width: 500px; margin: auto;">
							<v-col
								cols="12"
								md="6"
								class="d-none d-md-flex d-sm-none"
								style="position: relative;"
							>
								<v-btn  @click="showDeleteDialog(plan.id_suscripcion, plan.id_partner, plan.expiration_date)"  class="text_btn_grey_title" block depressed
									>Cancelar membresía</v-btn
								>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="d-none d-md-flex d-sm-none"
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
			</v-col>
		</v-row>
		<v-dialog v-model="dialogConfirmCancel"  max-width="500px" >
		<v-card>
			<v-card-title>Aceptar beneficio</v-card-title>
			<v-card-text>
				Estas a punto de aceptar el beneficio exclusivo. Luego del {{ exp_date_pop | formatDate }} se realizara el nuevo cobro de con el monto ofrecido.
				<br/>
				¿Estás seguro?
			</v-card-text>
			<v-card-actions>
				<v-btn color="error" @click="dialogConfirmCancel = false">Cancelar</v-btn>
				<v-btn color="success" @click="updatePlanAndRetention"> Continuar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
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
		plan: {},
		dialogConfirmCancel: false,
		exp_date_pop: null,
		logged_user: {},
		business_partner: [],
	}
  },
  mounted() {
    this.getPartnerData().then((res) => {
		console.log(res)
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
		}, 1000); 
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
    async getPartnerData(id) {
      this.$store.commit('loader',true);
      try {
        const response = await this.$API.auth.auth(id);
        this.user = response.data;
		this.plan = this.user.plans.pop();
		this.exp_date_pop = this.plan.expiration_date;
		console.log(this.plan);
        this.$store.commit('loader',false);
      } catch (e) {
        this.$store.commit('loader',false);
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
        this.$store.commit('loader', true);
        this.dialogDelete = false;
        if(this.cancel_suscrip=="") this.cancel_suscrip = "-";
        const response = await this.$API.business_partner.cancelSuscription(this.del_id_susc, this.cancel_suscrip);
        this.$store.commit('loader', false);
        this.showToast('Suscripción cancelada correctamente!', "success");

        this.getPartnerData(this.del_id_part);
      } catch (e) {
        console.error(e);
      }
    },
	async updatePlanAndRetention() {
		this.$store.commit('loader', true);
		const payload = {
			id_partner: this.business_partner.id,
			new_plan_id: this.plan.id,
			next_renew_date: this.exp_date_pop, 
			renew_auto: true, 
			user_id: this.logged_user.id,
			subscription_id: this.del_id_susc,
			currency: this.currency_id === 0 ? 'PEN' : 'USD',
			retention_amount: 1, // Monto total del nuevo plan
			total_retention_charges: this.plan.cant_cobros_retencion,
		};

		console.log(payload);

		// await this.$axios.post('/api/subscription/plan/update', payload);
		//const response =  await this.$API.business_partner.updatePlan(payload);
		this.dialogConfirmCancel = false;

	},
	closeConfirm(){
		this.model2 = false;
		this.$router.push({ path: "/cuenta" });
	}
  }
}
</script>
<style>
hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid #ccc;
	margin: 1em 0;
	padding: 0;
}
</style>
