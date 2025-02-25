<template>
	<v-row no-gutters align="center">
		<v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="height: 100%; position: relative;"
		>
			<div class="py-10 px-8" style="position: absolute; top:10px">
				<h3 class="title_pink" style="text-align: left">CLASES PARA TODOS LOS gustos y niveles</h3>
				<br/>
				<p class="subtitle-white">Sin importar tu punto de partida, o que tipo de entrenamiento te guste más lo tendrás en el Desafío.</p>
			</div>
			<img
				src="@/assets/img/gym_virtual/register_1_img.png"
				alt="Imagen Login"
				style="width:100%; object-fit: cover;"
			/>
		</v-col>
		<v-col cols="12" md="8">
			<h1 class="title_pink mb-4">INICIAR SESIÓN</h1>
			<v-sheet width="350" class="mx-auto">
				<v-form
					ref="loginForm"
					class="formlogBlue"
					v-model="valid"
					lazy-validation
				>
					<div>Usuario</div>
					<v-text-field
						outlined
						type="email"
						:rules="emailRules"
						v-model="loginForm.email"
					></v-text-field>
					<div>Contraseña</div>
					<v-text-field
						outlined
						:append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="() => (show_pwd = !show_pwd)"
						:type="show_pwd ? 'password' : 'text'"
						:rules="rules"
						v-model="loginForm.password"
						@keydown.enter="loginUser"
					></v-text-field>
					<div>
						<a
							href="/"
							class="text-left"
							style="float:left; font-size: 0.8rem; color: #000; font-family:'Poppins-Regular';"
							><b>Registrarme</b></a
						>

						<a
							class="text-right"
							href="/auth/olvide-contrasena"
							style="float:right; font-size: 0.8rem; color: #000; font-family:'Poppins-Regular';"
							><b>¿Olvidaste tu contraseña?</b></a
						>
						<br/>
					</div>
					<v-btn
						class="text_btn_white_title mt-2"
						block
						depressed
						color="secondary"
						:disabled="!valid"
						@click="loginUser"
						style="margin-top:10px;"
					>
						INICIAR SESIÓN
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
			(v) => /.+@.+\..+/.test(v) || "Correo electrónico debe ser válido",
		],
		//--- End ---
		valid: true,

		toast: {
			toast: false,
			message: "",
			timeout: 3000,
			color: "success",
		},
	}),
	mounted() {
		this.getLoggedUser();
	},
	methods: {
		showToast(msg, color) {
			this.toast.color = color;
			this.toast.message = msg;
			this.toast.toast = true;
		},
		getLoggedUser() {
			if (localStorage.getItem("token")) {
				this.logged_user = JSON.parse(localStorage.getItem("user_data"));
				this.logged_user_token = localStorage.getItem("token");
				if (this.logged_user) {
					window.location.replace("/gym-virtual/agenda");
				}
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
						window.location.replace("/gym-virtual/agenda");
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
