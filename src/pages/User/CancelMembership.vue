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
									to="/cuenta/elegir-plan"
									>Continuar con el beneficio</v-btn
								>
							</v-col>
						</v-row>
					</div>
				</v-card>
			</v-col>
		</v-row>
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
		plan: {}
	}
  },
  mounted() {
    this.getPartnerData().then((res) => {
		console.log(res)
	});
  },
  methods: {

    async getPartnerData(id) {
      this.$store.commit('loader',true);
      try {
        const response = await this.$API.auth.auth(id);
        this.user = response.data;
		this.plan = this.user.plans.pop()
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
