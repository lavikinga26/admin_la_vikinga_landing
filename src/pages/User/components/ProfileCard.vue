<template>
	<div class="my-5">
		<v-row>
			<v-col cols="12" md="6">
				<div class="text_title_white">MI INFORMACIÓN PERSONAL</div>
				<v-card
					class="my-5 pa-10"
					dark
					color="transparent"
					style="border: 2px solid #293E58!important; border-radius: 16px;"
				>
					<v-form
						ref="profileForm"
						v-model="validProfileForm"
						@submit.prevent="updateProfileInfo()"
						lazy-validation
					>
						<v-row>
							<v-col cols="12" md="4">
								<v-avatar class="rounded-circle" color="grey" size="120" tile>
									<v-img
										v-if="profileForm.file_path"
										:src="
											base_url +
												profileForm.file_path.path +
												profileForm.file_path.filename
										"
									>
									</v-img>
								</v-avatar>
							</v-col>
							<v-col cols="12" md="8">
								<h3>
									<b>{{ profileForm.name }} {{ profileForm.lastname }}</b>
								</h3>
								<br />
								<v-btn @click="profileImgDialog = true" color="pink" dark
									>Cambiar Foto</v-btn
								>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" md="6" sm="12">
								<label>Nombres</label>
								<v-text-field
									v-model="profileForm.name"
									class="ma-0 pt-0"
									hide-details
									outlined
									placeholder="Ingresa aquí tu nombre completo"
								></v-text-field>
							</v-col>
							<v-col cols="12" md="6" sm="12">
								<label>Apellidos</label>
								<v-text-field
									v-model="profileForm.lastname"
									class="ma-0 pt-0"
									hide-details
									outlined
									placeholder="Ingresa aquí tu apellido completo"
								></v-text-field>
							</v-col>
							<v-col cols="12" md="6" sm="12">
								<label>Tipo de Documento</label>
								<v-select
									class="register_form"
									:rules="requiredRule"
									:items="documents"
									outlined
									item-text="name"
									item-value="id"
									v-model="profileForm.id_document_type"
								></v-select>
							</v-col>
							<v-col cols="12" md="6" sm="12">
								<label>Nro. Doc</label>
								<v-text-field
									v-model="profileForm.nro_doc"
									class="ma-0 pt-0"
									hide-details
									outlined
									placeholder="Ingresa aquí tu DNI"
								></v-text-field>
							</v-col>
							<v-col cols="12" md="12" sm="12">
								<label>Teléfono</label>
								<vue-tel-input-vuetify
									outlined
									label=""
									v-model="profileForm.phone"
									:enabledCountryCode="true"
									:clearable="true"
									validCharactersOnly="true"
									placeholder=""
									v-on:country-changed="countryChanged"
									:rules="phoneRules"
								></vue-tel-input-vuetify>
							</v-col>
							<v-col cols="12" md="12">
								<label>Email</label>
								<v-text-field
									v-model="profileForm.email"
									outlined
									class="register_form"
									readonly
									hide-details
								></v-text-field>
							</v-col>
							<v-col cols="12" md="6" sm="12">
								<label>Fecha Nac.</label>
								<v-menu
									v-model="menuTestDate"
									:close-on-content-click="false"
									:nudge-right="-10"
									transition="scale-transition"
									offset-y
									min-width="auto"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="formatTestDate"
											v-bind="attrs"
											v-on="on"
											readonly
											outlined
											color="#ffffff"
											class="text_peso"
										></v-text-field>
									</template>
									<v-date-picker
										outlined
										hide-details
										v-model="profileForm.fecha_nacimiento"
										color="#293E58"
										@input="menuTestDate = false"
										locale="es-ES"
									></v-date-picker>
								</v-menu>
							</v-col>
							<v-col cols="12" md="6" sm="12">
								<label>Género</label>
								<v-select
									v-model="infoPersonal.gender"
									class="ma-0 pt-0"
									outlined
									:items="genders"
									item-text="text"
									item-value="value"
									hide-details
								>
								</v-select>
							</v-col>
						</v-row>
						<br />
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								type="submit"
								class="btn_pink_white_submit"
								:disabled="!validProfileForm"
								>Guardar</v-btn
							>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-col>
			<v-col cols="12" md="6" sm="6">
				<!--<div class="text_title_white">MEMBRESÍA</div>
				<v-card
					class="my-5 pa-10"
					dark
					color="transparent"
					style="border: 2px solid #293E58!important; border-radius: 16px;"
				>
					<v-form
						ref="form_change_password"
						v-model="isChangePasswordFormValid"
						lazy-validation
					>
						<v-row class="gap-4">
							<v-btn class="btn_white_outlined" @click="cancelMembership">
								CANCELAR MEMBRESIA
							</v-btn>
							<v-btn class="btn_white_outlined" @click="cancelTrial">
								CANCELAR MEMBRESIA TRIAL
							</v-btn>
						</v-row>
					</v-form>
				</v-card>-->
				<div class="text_title_white">CAMBIAR MI CONTRASEÑA</div>
				<v-card
					class="my-5 pa-10"
					dark
					color="transparent"
					style="border: 2px solid #293E58!important; border-radius: 16px;"
				>
					<p>Aquí podrás cambiar tu contraseña para acceder a tu cuenta</p>
					<v-form
						ref="form_change_password"
						v-model="isChangePasswordFormValid"
						lazy-validation
					>
						<v-row>
							<v-col cols="12" md="12" sm="12">
								<label>Contraseña actual</label>
								<v-text-field
									v-model="last_password"
									:append-icon="showLastPassword ? 'mdi-eye' : 'mdi-eye-off'"
									:rules="[rules.required]"
									:type="showLastPassword ? 'text' : 'password'"
									:error="error"
									:error-messages="errorMessages"
									name="password"
									@click:append="showLastPassword = !showLastPassword"
									outlined
									hide-details
								></v-text-field>
							</v-col>
							<v-col cols="12" md="12" sm="12">
								<label>Nueva contraseña</label>
								<v-text-field
									v-model="new_password"
									:append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
									:rules="[rules.required]"
									:type="showNewPassword ? 'text' : 'password'"
									:error="error"
									:error-messages="errorMessages"
									name="password"
									@click:append="showNewPassword = !showNewPassword"
									outlined
									hide-details
								></v-text-field>
							</v-col>
							<v-col cols="12" md="12" sm="12">
								<label>Confirmar contraseña</label>
								<v-text-field
									v-model="new_password_confirm"
									:rules="pwdConfirm"
									:error="error"
									:error-messages="errorMessages"
									type="password"
									name="password"
									outlined
									hide-details
								></v-text-field>
							</v-col>
							<v-btn
								class="btn_pink_white_submit"
								@click="submitChangePassword"
								:loading="loadingChangePassword"
							>
								<v-icon left small>mdi-lock-reset</v-icon>
								Guardar
							</v-btn>
						</v-row>
					</v-form>
				</v-card>
			</v-col>
		</v-row>

		<!-- Profile Image Dialog -->
		<v-dialog v-model="profileImgDialog" max-width="40%">
			<v-card>
				<v-card-title>
					<span class="headline">Cambiar Foto de Perfil</span>
				</v-card-title>
				<v-card-text>
					<v-row>
						<v-col>
							<v-file-input
								label="Subir Imagen (máx 200kb)"
								accept="image/*"
								ref="file"
								@change="onFileChange"
								:rules="rules.file_size_200kb"
							></v-file-input>
							<v-img :src="img_url" contain max-height="300" max-width="600" />
						</v-col>
					</v-row>
				</v-card-text>
				<br />
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="profileImgDialog = false"
						>Cancelar</v-btn
					>
					<v-btn color="primary" @click="uploadProfilePhoto()">Guardar</v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
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
		<!-- Fin -->
	</div>
</template>
<script>
import axios from "axios";
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";
export default {
	components: {
		axios,
		VueTelInputVuetify,
	},
	props: {
		base_url: {
			type: String,
			default: null,
		},
		business_partner: {
			type: Object,
			default: null,
		},
		user: {
			type: Object,
			default: null,
		},
	},
	data: () => ({
		isChangePasswordFormValid: true,
		menuTestDate: false,
		validProfileForm: false,
		profileForm: {
			info_personal: null,
		},
		requiredRule: [(v) => !!v || "Campo obligatorio"],
		infoPersonal: {},
		genders: [
			{ text: "Femenino", value: 1 },
			{ text: "Masculino", value: 2 },
			{ text: "Otro", value: 3 },
		],
		civil_status: [
			{ text: "Casada(o)", value: 2 },
			{ text: "Soltera(o)", value: 1 },
			{ text: "Viuda (o)", value: 3 },
		],
		family_guy: [
			{ text: "Si", value: true },
			{ text: "No", value: false },
		],
		insignia: {},
		insignias: [],
		profileImgDialog: false,
		img_file: null,
		img_url: null,
		documents: [],
		//--- Form Rules ---
		rules: {
			file_size_200kb: [
				(value) =>
					!value ||
					value.size < 200000 ||
					"El archivo debe pesar menos de 200 kb!",
			],
		},
		inputtel: {
			showDialCode: true,
		},
		phoneRules: [
			(value) => !!value || "Debe ingresar un teléfono.",
			(value) => (value && value.length >= 12) || "Verifique su teléfono.",
			(value) => /^[0-9 ()+-]+$/.test(value) || "Debe ingresar solo números.",
		],
		toast: {
			toast: false,
			message: "",
			timeout: 3000,
			color: "success",
		},
		error: false,
		errorMessages: "",
		show_btn_add: true,
		// show password field
		showLastPassword: false,
		showNewPassword: false,
		loadingChangePassword: false,

		isChangePasswordFormValid: true,
		last_password: "",
		new_password: "",
		new_password_confirm: "",
		pwdRules: [(v) => !!v || "Este campo es requerido"],
		pwdConfirm: [
			(v) => !!v || "Este campo es requerido",
			(v) => v === this.new_password || "Contraseñas no coinciden",
		],
		hasActiveRetention: false,
		//--- End ---
	}),
	async created() {
		this.configPersonalInfo();
		this.getBadge();
		this.getTypeDocument();
		this.img_url = this.base_url + "/images/default-profile-picture.png";
	},
	async mounted() {
		// await this.checkActiveRetention();
	},
	computed: {
		formatTestDate: {
			get: function() {
				return this.formatDate(this.profileForm.fecha_nacimiento);
			},
			set: function(newValue) {
				return this.formatDate(newValue);
			},
		},
	},
	methods: {
		submitChangePassword() {
			this.changePassword();
		},
		cancelMembership() {
			// if(this.hasActiveRetention){
			// eliminar
			// }
			// else{
			this.$router.push({ path: "/cuenta/cancelar-membresia" });
			// }
		},
		cancelTrial() {
			this.$router.push({ path: "/cuenta/extender-prueba" });
		},
		async changePassword() {
			let vm = this;
			this.$store.commit("loader", true);
			try {
				vm.loadingChangePassword = true;
				let data = {
					old_password: vm.last_password,
					new_password: vm.new_password,
				};
				await vm.$API.auth.change_password(data);
				vm.loadingChangePassword = false;

				vm.$refs.form_change_password.reset();
				vm.$store.commit("loader", false);
				vm.showToast("Contraseña actualizada", "success");
			} catch (error) {
				vm.loadingChangePassword = false;
				let err = {
					status: error.response.status,
					name: error.name,
					data: error.response.data,
					message: error.message,
				};
				vm.last_password = "";
				vm.new_password = "";
				vm.new_password_confirm = "";
				vm.showToast(
					error.response.data.message + ". Vuelve a intentarlo",
					"error"
				);
				vm.$store.commit("loader", false);
			}
		},
		showToast(msg, color) {
			this.toast.color = color;
			this.toast.message = msg;
			this.toast.toast = true;
		},
		countryChanged(country) {
			this.country = country.dialCode;
			this.userData.telefono = "+" + country.dialCode;
		},
		formatDate(date) {
			if (!date) return null;

			const [year, month, day] = date.split("-");
			return `${day}/${month}/${year}`;
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
		async getBadge() {
			try {
				const response = await this.$API.business_partner.getBadge();
				this.insignia = response.data.data;
				const data = [];
				for (let index = 0; index < this.insignia.insignias.length; index++) {
					const element = this.insignia.insignias[index];
					for (let j = 0; j < element.cant; j++) {
						data.push(element.tipo);
					}
				}
				this.insignias = data;
			} catch (e) {
				// UTILS.toastr.error("Ups! Ocurrió un error", this);
				console.error(e);
			}
		},
		configPersonalInfo() {
			this.profileForm = Object.assign({}, this.business_partner);
			if (this.business_partner.partner_information.info_personal) {
				this.infoPersonal = JSON.parse(
					this.business_partner.partner_information.info_personal
				);
				this.profileForm.fecha_nacimiento = this.business_partner.fecha_nacimiento;
			}
		},
		async updateProfileInfo() {
			try {
				this.$store.commit("loader", true);

				this.profileForm.info_personal = JSON.stringify(this.infoPersonal);
				const response = await this.$API.business_partner.updateProfileInfo(
					this.business_partner.id,
					this.profileForm
				);
			} catch (e) {
				// UTILS.toastr.error("Ups! Ocurrió un error", this);
				console.error(e);
			} finally {
				this.$store.commit("loader", false);
			}
		},

		//--- Upload Image Functions ---
		onFileChange(file) {
			if (!file) {
				this.img_file = null;
				this.img_url = this.base_url + "/images/default-profile-picture.png";

				return;
			}

			this.img_file = this.$refs.file.lazyValue;
			this.img_url = URL.createObjectURL(this.img_file);
		},
		async uploadProfilePhoto() {
			try {
				this.$store.commit("loader", true);

				let formData = new FormData();
				formData.append("id", this.business_partner.id);
				formData.append("file", this.img_file);
				const response = await this.$API.business_partner.uploadProfilePhoto(
					formData
				);
				this.$router.go();
			} catch (e) {
				// UTILS.toastr.error("Ups! Ocurrió un error", this);
				console.error(e);
			} finally {
				this.$store.commit("loader", false);
			}
		},
		//--- End ---
		async checkActiveRetention() {
			try {
				const response = await this.$API.business_partner.checkActiveRetention({
					user_id: this.user.id,
				});
				this.hasActiveRetention = response.data.has_active_retention;
			} catch (error) {
				console.error("Error al verificar campaña activa:", error);
			}
		},
	},
	watch: {
		profileImgDialog() {
			if (!this.profileImgDialog) {
				// console.log('Dialog is closing');
				this.img_file = null;
				this.$refs.file.lazyValue = null;
				this.img_url = this.base_url + "/images/default-profile-picture.png";
			}
		},
		user: {
			immediate: true,
			handler(newVal) {
				if (newVal?.id) {
					this.checkActiveRetention();
				}
			},
		},
	},
};
</script>
