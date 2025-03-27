<template>
	<v-row>
		<v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="position: relative;"
		>
			<div class="py-10 px-8" style="position: absolute; top:10px">
				<h3 class="title_pink" style="text-align: left">CLASES PARA TODOS <br/>LOS gustos y niveles</h3>
				<br/>
				<p class="subtitle-white">Sin importar tu punto de partida, o que tipo de entrenamiento te guste más lo tendrás en el Desafío</p>
			</div>
			<img
				src="@/assets/img/gym_virtual/register_1_img.png"
				alt="Imagen Login"
				style="width:100%; max-height:100vh;object-fit: cover;"
			/>
			<v-sheet
				style="position: absolute; left: 0; right: 0; bottom: 5px;"
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
			<v-sheet class="mx-auto mb-5" max-width="390">
				<v-stepper non-linear value="1" elevation="0">
					<v-stepper-header>
						<v-stepper-step step="1"></v-stepper-step>

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
			<h1 class="title_pink mb-4">EMPECEMOS</h1>
			<p style="font-family:'Poppins-Regular'; text-align:center;">
				¿Tienes una cuenta? <a href="/auth/iniciar-sesion">Inicia sesión</a>
			</p>
			<v-sheet max-width="390" class="mx-auto">
				<v-alert
					type="info"
					color="#E7004C"
					elevation="0"
					v-if="usuario_registrado"
				>
					Ya te encuentras registrado, ingresa tu contraseña.
				</v-alert>
				<v-form ref="loginForm" class="formlogBlue" v-model="valid" v-on:submit.prevent>
					<div>Email</div>
					<v-text-field
						outlined
						type="email"
						:rules="emailRules"
						v-model="loginForm.email"
					></v-text-field>
					<div v-if="usuario_registrado">Contraseña</div>
					<v-text-field
						v-if="usuario_registrado"
						outlined
						type="password"
						:rules="rules"
						v-model="loginForm.password"
					></v-text-field>
					<div class="text-right mb-4" v-if="usuario_registrado">
						<a
							href="/auth/olvide-contrasena"
							style="font-size: 0.8rem; color: #000; font-family:'Poppins-Regular';"
							><b>¿Olvidaste tu contraseña?</b></a
						>
					</div>
					<div class="text-left mb-4" style="font-family: 'Poppins-Regular';">
						<v-checkbox v-model="acepta_tos" :rules="rules">
							<div slot="label">
								Aceptas los
								<a
									href="/terminos-condiciones"
									style="color: #000; font-family:'Poppins-Regular';"
									@click.stop
									><b>términos y condiciones</b></a
								>
								y nuestra
								<a
									href="/politica-privacidad"
									style="color: #000; font-family:'Poppins-Regular';"
									@click.stop
									><b>política de privacidad</b></a
								>.
							</div>
						</v-checkbox>
					</div>
					<v-btn
						class="text_btn_white_title"
						v-if="usuario_registrado"
						block
						depressed
						color="secondary"
						:disabled="!valid"
						@click="loginUser"
					>
						INICIAR SESIÓN<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
					<v-btn
						class="text_btn_white_title"
						v-if="!usuario_registrado"
						block
						depressed
						color="secondary"
						:disabled="!valid"
						@click="nextStep"
					>
						SIGUIENTE<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
				</v-form>
			</v-sheet>
		</v-col>
		<v-snackbar
			v-model="toast.toast"
			:timeout="toast.timeout"
			:color="toast.color"
			dark
		>
			{{ toast.message }}
		</v-snackbar>
	</v-row>
</template>
<script>
export default {
	data: (e) => ({
		fab: null,
		color: "",
		flat: null,
		show_pwd: String,
		//--- User Login/Signup ---
		logged_user: null,
		logged_user_token: null,

		loginUserDialog: false,
		validLoginForm: false,
		loginForm: {
			token_name: "",
		},
		toast: {
			toast: false,
			message: "",
			timeout: 3000,
			color: "success",
		},
		//--- End ---

		//--- Form Rules ---
		rules: [(v) => !!v || "Campo obligatorio"],
		emailRules: [
			(v) => !!v || "Campo obligatorio",
			(v) => /.+@.+\..+/.test(v) || "Correo Electrónico debe ser válido",
		],
		//--- End ---
		valid: false,
		acepta_tos: false,
		paquete_seleccionado: null,
		usuario_registrado: false,
	}),
	mounted() {
		this.paquete_seleccionado = this.$route.query.paquete;
		console.log("PAQueTEEEE "+this.paquete_seleccionado);
		localStorage.paquete_seleccionado = this.paquete_seleccionado;
		
		this.getLoggedUser();
		
		this.loginForm.email = this.$route.query.email;
		//this.loginUser();
	},
	methods: {
		showToast(msg, color) {
			this.toast.color = color;
			this.toast.message = msg;
			this.toast.toast = true;
		},
		async getLoggedUser() {
			this.$store.commit("loader", true);
			localStorage.removeItem("ref_code");
			if (localStorage.getItem("token")) {
				this.logged_user = JSON.parse(localStorage.getItem("user_data"));
				this.logged_user_token = localStorage.getItem("token");

				const response = await this.$API.business_partner.getPartner(
					this.logged_user.id
				);
				if (response) {
					this.business_partner = Object.assign(response.data.data[0]);
					this.id_level = this.business_partner.id_level;
					localStorage.emailRegistro = this.logged_user.email;
					window.location.replace("/proceso_compra/step2");
				}
			}
			this.$store.commit("loader", false);
		},
		async nextStep() {
			let payload = { email: this.loginForm.email };
			const response = await this.$API.order.validateEmail(payload);
			let rsp = response.data.data;
			if (rsp.success == true) {
				this.usuario_registrado = true;
			} else {
				localStorage.emailRegistro = this.loginForm.email;
				window.location.replace("/proceso_compra/step2");
			}
		},
		async loginUser() {
			if (this.$refs.loginForm.validate()) {
				this.$store.commit("loader", true);
				try {
					this.loginForm.token_name = "LaVikinga2021";
					const response = await this.$API.user.login(this.loginForm);
					const user = response.data.data.user;
					const token = response.data.data.token;

					localStorage.setItem("user_data", JSON.stringify(user));
					localStorage.setItem("token", token);
					setTimeout(() => {
						this.$store.commit("loader", false);
						localStorage.emailRegistro = this.loginForm.email;
						window.location.replace("/proceso_compra/step2");
						//this.$router.push({ path: '/gym-virtual/calendario' });
					}, 3000);
					//this.$router.go();
				} catch (e) {
					this.showToast(
						"Correo electrónico y/o contraseña incorrecta",
						"error"
					);
					this.$store.commit("loader", false);
					console.error(e);
				}
			} else {
				this.toast.color = "red";
				this.toast.message = "Usuario y/o contraseña incorrecta.";
				this.toast.toast = true;
			}
		},
	},
};
</script>
<style scoped></style>
