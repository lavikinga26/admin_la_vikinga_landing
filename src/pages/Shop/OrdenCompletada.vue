<template>

<v-row>
        
        <v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="position: relative;"
		>
			<img
				src="@/assets/img/gym_virtual/register-3.png"
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
        <v-col cols="12" md="8" style="height: 100vh; overflow-y:auto;">

            <v-sheet max-width="400" class="mx-auto py-16">

                <h1 class="title_pink mb-4">¡FELICITACIONES!</h1>
                <p class="title_blue mb-4">Ya casi eres una Vikinga. Completa con tus datos:</p>
                <v-form ref="loginForm" class="formlogBlue" v-model="valid">
					<v-container>
						<v-row class="mt-3">
							
							<v-col cols="12" md="12" class="pa-0 px-1">
								<label class="text_field_form">Tipo de Documento</label>
								<v-select
									class="register_form"
									:rules="requiredRule"
									:items="documents"
									outlined
									item-text="name"
									item-value="id"
									v-model="userData.tipo_doc"
								></v-select>
								<label class="text_field_form">Nro. Documento</label>
								<v-text-field
									:rules="nrodocRules"
									outlined
									v-model="userData.nro_doc"
									class="register_form"
									autocomplete="null"
								></v-text-field>
								<label class="text_field_form">Nivel de entrenamiento</label>
								<v-select
									class="register_form"
									:rules="requiredRule"
									:items="levels"
									outlined
									v-model="userData.id_level"
								></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" md="12" class="pa-0 px-1">
								<v-btn
									class="text_btn_white_title"
									block
									depressed
									color="secondary"
									:disabled="!valid"
									@click="nextStep"
								>
                                INGRESAR AL GYM<v-icon>mdi-chevron-right</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
            </v-sheet>

        </v-col>
    </v-row>
</template>
<script>
import axios from "axios";
import API from "../../api/axios";
export default {
    components: { 
        axios
     },

    data: () => ({
        category: 0,
        order:{},
        base_url: '',
        slug:'',
        rules: [
            value => !value || value.size < 2000000 || '',
        ],
        
        img_file: null,
        img_url: "../images/default-image.png",
        
        toast:{
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },

        uploadSuccess: false,

		levels: [
			{ text: 'Principiante', value: '1' },
			{ text: 'Intermedio', value: '2' },
			{ text: 'Avanzado', value: '3' }
		],
		valid: true,
		validLoginForm: false,
		enabledCountryCode: true,
		show_pwd: String,
		logged_user: null,
		logged_user_token: null,
		enabledCountryCode: true,
		userData: {
			nombre: "",
			apellidos: "",
			telefono: "",
			tipo_doc: "",
			nro_doc: "",
			pwd: "",
			pwd_rep: "",
		},
		requiredRule: [(v) => !!v || "Campo obligatorio"],
		emailRules: [
			(v) => !!v || "Campo obligatorio",
			(v) => /.+@.+\..+/.test(v) || "Correo Electrónico debe ser válido",
		],
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
        let vm = this;
        vm.slug = this.$route.params.hash;
        vm.getOrder();
		this.getTypeDocument();
		this.getLoggedUser();
    },

    watch: {
    },

    methods: {

        irGym(){
            this.$router.push({ path: '/gym-virtual/agenda' })
        },
        
        showToast(msg,color){
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },

        async getOrder(){
            let vm = this;
            vm.$store.commit('loader',true);
            try{
                const data = await this.$API.order.getAllOrderInfo(vm.slug);
                console.log(data.data.data);
                vm.order = data.data.data.order;
                if(vm.order.id_status==1){
                    vm.$store.dispatch("cleanCart");
                }
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
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
		async countryChanged(country) {
			this.country = "+" + country.dialCode;
			const response = await this.$API.countries.search(country.iso2);
			this.userData.country = { id: response.data.data.id };
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
					this.userData.id_level = this.logged_affiliate.id_level;
					//this.userData.country = this.countries_list.find(e => e.id == this.logged_affiliate.id_country);

					this.userData.had_invoice = false;
					localStorage.datosUsuario = JSON.stringify(this.userData);
					
				} else {
					this.userData = JSON.parse(localStorage.getItem("user_data_tmp"));
				}
			} else if (localStorage.getItem("user_data_tmp")) {
				this.userData = JSON.parse(localStorage.getItem("user_data_tmp"));
			}
		},
    },
}
</script>
<style>
  .fb-btn.v-btn--outlined {
    border: 1px solid #E30E4F;
  }
  .rounded-lg .round-radius{
    border-radius: 5px !important; 
  }
</style>