<template>
	<v-row>
		<whatsapp />
		<v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="position: relative;"
		>
			<img
				src="@/assets/img/gym_virtual/register_img2.png"
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
						<v-card class="rounded-lg" color="#0A2240" width="540" outlined>
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
						<v-card class="rounded-lg" color="#0A2240" width="540" outlined>
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
						<v-card class="rounded-lg" color="#0A2240" width="540" outlined>
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
			md="8"
			class="pa-4"
			style="height: 100vh; overflow-y:auto;"
		>
			<v-sheet class="mx-auto mb-1" max-width="450">
				<v-stepper non-linear value="3" elevation="0">
					<v-stepper-header>
						<v-stepper-step complete step="1"></v-stepper-step>

						<v-divider></v-divider>

						<v-stepper-step step="2" complete></v-stepper-step>

						<v-divider></v-divider>

						<v-stepper-step step="3"></v-stepper-step>
						<v-divider></v-divider>

						<v-stepper-step step="4"></v-stepper-step>

						<v-divider></v-divider>

						<v-stepper-step step="5"></v-stepper-step>
					</v-stepper-header>
				</v-stepper>
			</v-sheet>
			<h1 class="title_pink">Regístrate ahora</h1>
			<p
				style="font-family:'Poppins-Regular'; text-align:center; margin-bottom: 0px!important;"
			>
				¿Tienes una cuenta? <a href="/auth/iniciar-sesion">Inicia sesión</a>
			</p>
			<v-sheet max-width="400" class="mx-auto" style="height:100vh;">
				<v-form ref="loginForm" class="formlogBlue" v-model="valid">
					<v-container>
						<v-row class="mt-3">
							<v-col cols="12" md="6" class="pa-0 px-1">
								<label class="text_field_form">Nombre</label>
								<v-text-field
									:rules="requiredRule"
									v-model="userData.nombre"
									outlined
									class="register_form"
								></v-text-field>
							</v-col>
							<v-col cols="12" md="6" class="pa-0 px-1">
								<label class="text_field_form">Apellidos</label>
								<v-text-field
									:rules="requiredRule"
									v-model="userData.apellidos"
									outlined
									class="register_form"
								></v-text-field>
							</v-col>
							<v-col cols="12" md="12" class="pa-0 px-1">
								<label class="text_field_form">Teléfono</label>
								<vue-tel-input-vuetify
									outlined
									label=""
									v-model="userData.telefono"
									:validate-on-blur="true"
									:input-options="{ showDialCode: true }"
									:clearable="true"
									validCharactersOnly="true"
									placeholder=""
									v-on:country-changed="countryChanged"
								></vue-tel-input-vuetify>
							</v-col>
							<v-col cols="12" md="6" class="pa-0 px-1">
                                <label class="text_field_form">Tipo de Documento</label>
                                <v-select class="register_form" :rules="requiredRule" :items="documents" outlined
                                    item-text="name" item-value="id" v-model="userData.tipo_doc"></v-select>
                            </v-col>
                            <v-col cols="12" md="6" class="pa-0 px-1">
                                <label class="text_field_form">Nro. Documento</label>
                                <v-text-field :rules="nrodocRules" outlined v-model="userData.nro_doc"
                                    class="register_form" autocomplete="null"></v-text-field>
                            </v-col>
							<v-col cols="12" md="6" class="pa-0 px-1">
								<label class="text_field_form">Contraseña</label>
								<v-text-field
									class="register_form"
									outlined
									v-model="userData.pwd"
									type="password"
									:rules="passwordRules"
									autocomplete="null"
								></v-text-field>
							</v-col>
							<v-col cols="12" md="6" class="pa-0 px-1">
								<label class="text_field_form">Confirmar contraseña</label>
								<v-text-field
									class="register_form"
									outlined
									v-model="userData.pwd_rep"
									type="password"
									autocomplete="null"
									:rules="[requiredRule, passwordConfirmationRule]"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="6" md="6" class="pa-0 px-1">
								<v-btn
									class="text_btn_white_title"
									block
									depressed
									color="secondary"
									@click="volver"
								>
									<v-icon>mdi-chevron-left</v-icon>VOLVER
								</v-btn>
							</v-col>
							<v-col cols="6" md="6" class="pa-0 px-1">
								<v-btn
									class="text_btn_white_title"
									block
									depressed
									color="secondary"
									:disabled="!valid"
									@click="nextStep"
								>
									SIGUIENTE<v-icon>mdi-chevron-right</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
				<v-row style="background: #fff;">
					<v-col>
						<div style="height: 250px;">
							<p>&nbsp;</p>
						</div>
					</v-col>
				</v-row>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";
export default {
	components: {
		VueTelInputVuetify,
	},
	data: (e) => ({
		fab: null,
		color: "",
		flat: null,
		show_pwd: String,
		logged_user: null,
		logged_user_token: null,
		documents: [],
		loginUserDialog: false,
		validLoginForm: false,
		enabledCountryCode: true,
		clearablebt: true,
		loginForm: {
			token_name: "",
		},
		inputtel: {
			showDialCode: true,
		},
		phone: "",
		cart: [],
		toast: {
			toast: false,
			message: "",
			timeout: 3000,
			color: "success",
		},
		userData: {
			nombre: "",
			apellidos: "",
			telefono: "",
			pwd: "",
			pwd_rep: "",
		},
		requiredRule: [(v) => !!v || "Campo obligatorio"],
		emailRules: [
			(v) => !!v || "Campo obligatorio",
			(v) => /.+@.+\..+/.test(v) || "Correo Electrónico debe ser válido",
		],
		valid: true,
		toast: {
			toast: false,
			message: "",
			timeout: 3000,
			color: "success",
		},
		passwordRules: [
			(value) => !!value || "Debe ingresar una contraseña.",
			(value) =>
				(value && value.length >= 6) || "Debe contener 6 caracteres o más.",
		],
		phoneRules: [
			(value) => !!value || "Debe ingresar un teléfono.",
			(value) => (value && value.length >= 12) || "Verifique su teléfono.",
			(value) => /^[0-9 ()+-]+$/.test(value) || "Debe ingresar solo números.",
		],
		nrodocRules: [
			(value) => !!value || "Debe ingresar un número de documento.",
			(value) =>
				(value && value.length >= 8) || "Debe contener 8 dígitos o más.",
			(value) => /^\d+$/.test(value) || "Debe ingresar solo números.",
		],
		confirmPasswordRules: [
			(value) => !!value || "Debe confirmar su contraseña.",
			(value) => value === userData.pwd || "Las contraseñas no coinciden.",
		],
	}),
	computed: {
		passwordConfirmationRule() {
			return (
				this.userData.pwd === this.userData.pwd_rep ||
				"Contraseñas no coinciden."
			);
		},
	},
	mounted() {
		this.getTypeDocument();
		this.getLoggedUser();
	},
	methods: {
		volver() {
			this.$router.push({ path: "/proceso_compra/step2" });
		},
		async countryChanged(country) {
			this.country = "+" + country.dialCode;
			const response = await this.$API.countries.search(country.iso2);
			this.userData.country = { id: response.data.data.id };
		},
		async nextStep() {
			localStorage.datosUsuario = JSON.stringify(this.userData);
			localStorage.setItem("user_data_tmp", JSON.stringify(this.userData));
			window.location.replace("/proceso_compra/step3");
		},
		docRules(v) {
			if (this.order.id_document_type == 2 && !Number.isInteger(Number(v))) {
				return "Ingrese sólo números.";
			}
			if (this.order.id_document_type == 2 && v.length != 8) {
				return "DNI debe tener 8 dígitos.";
			}
			let renovacion = this.cart.filter((item) => item.renovacion == 1);
			if (renovacion.length > 0) {
				this.show_transfer = false;
			}
			return true;
		},
		showToast(msg, color) {
			this.toast.color = color;
			this.toast.message = msg;
			this.toast.toast = true;
		},
		async getTypeDocument(type = 2) {
			this.$store.commit("loader", true);
			try {
				const data = await this.$API.configuration.getTypeDocument(type);
				this.documents = data.data.data;
				this.$store.commit("loader", false);
			} catch (e) {
				this.$store.commit("loader", false);
				console.error(e);
			}
		},
		async getLoggedUser() {
			if (localStorage.getItem("token")) {
				this.logged_user = JSON.parse(localStorage.getItem("user_data"));
				this.logged_user_token = localStorage.getItem("token");
				const response = await this.$API.business_partner.getPartner(
					this.logged_user.id
				);
				if (response != null) {
					this.logged_affiliate = response.data.data[0];

					this.userData.bd_id = this.logged_affiliate.id;
					this.userData.tipo_doc = this.logged_affiliate.id_document_type;
					this.userData.nombre = this.logged_affiliate.name;
					this.userData.apellidos = this.logged_affiliate.lastname;
					this.userData.nro_doc = this.logged_affiliate.nro_doc;
					this.userData.address = this.logged_affiliate.address;
					this.userData.city = this.logged_affiliate.city;
					this.userData.email = this.logged_affiliate.email;
					this.userData.telefono = this.logged_affiliate.phone;
					this.userData.bp_id = this.logged_affiliate.id;
					this.userData.country = { id: this.logged_affiliate.id_country };
					this.userData.dialcode = this.country;
					//this.userData.country = this.countries_list.find(e => e.id == this.logged_affiliate.id_country);

					this.userData.had_invoice = false;
					localStorage.datosUsuario = JSON.stringify(this.userData);
					window.location.replace("/proceso_compra/step3");
				} else {
					if(localStorage.getItem("user_data_tmp") != null)
						this.userData = JSON.parse(localStorage.getItem("user_data_tmp"));
				}
			} else if (localStorage.getItem("user_data_tmp")) {
				this.userData = JSON.parse(localStorage.getItem("user_data_tmp"));
			}
		},
	},
};
</script>
<style scoped></style>
