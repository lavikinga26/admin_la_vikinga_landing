<template>
    <v-row>
        <v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="position: relative;"
		>
			<img
				src="@/assets/img/gym_virtual/register-4.png"
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
            <div class="d-flex justify-center" v-if="order.id_status == 1">
                <v-card max-width="500" style="margin-top: 15%;" elevation="0" class="pa-2">
                    <div class="py-2 d-flex align-center">
                        <div style="" class="text-rigth">
                            <h4 class="title_pink" style="text-align:left!important;">
                                Felicidades, {{ order.customer_name.split(' ')[0] }}
                            </h4><br>
                            <h3 style="font-weight: 200;">La comunidad vikinga te da la bienvenida al Desafio Gym Virtual. Te hemos enviado un email de confirmación a {{ order.customer_email }}.</h3><br>

                            <v-row class="mt-3">
                                <v-col cols="12" md="6" class="pa-0 px-1">
                                    <label class="text_field_form">Tipo de Documento</label>
                                    <v-select class="register_form" :rules="requiredRule" :items="documents" outlined
                                        item-text="name" item-value="id" v-model="tipo_doc"></v-select>
                                </v-col>
                                <v-col cols="12" md="6" class="pa-0 px-1">
                                    <label class="text_field_form">Nro. Documento</label>
                                    <v-text-field :rules="nrodocRules" outlined 
                                        class="register_form" autocomplete="null" v-model="nro_doc"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="pa-0 px-1">
                                    <label class="text_field_form">Nivel de entrenamiento</label>
                                    <v-select :items="levels" v-model="id_level" label="Nivel" item-text="level" placeholder="Seleciona" item-value="id_level" color="#ffffff" outlined v-on:change="filterByLevel()"></v-select>
                                </v-col>
                                <v-col cols="12" >
                                    <h5 style="font-weight: 200;">Te hemos enviado un email de confirmación a {{ order.customer_email }}.</h5><br>
                                </v-col>
                            </v-row>

                            <v-btn link to="/gym-virtual/agenda" color="secondary" depressed>Guardar e ir al gym</v-btn>
                        </div>     
                        
                    </div>
                    <br>
                </v-card>
            </div>

            <div class="d-flex justify-center" v-if="order.id_status == 2">
                <v-card max-width="450" elevation="0" class="pa-2 mt-5">
                    <div class="py-2 d-flex align-center">
                        <div style="width: 40%" class="text-center">
                            <img style="width: 100px" src="@/assets/img/icons/payment_declined.png" />
                        </div>   
                        <div style="width: 60%" class="text-rigth">
                            <h3 style="font-weight: 800;">
                                Lo sentimos, no se pudo procesar tu pago.
                            </h3><br>
                            <span>
                                <b>Motivo:</b> {{ order.comment }}
                            </span><br><br>
                            <h4 style="font-weight: 200;">Verifica que los datos ingresados sean correctos o intenta con otra tarjeta de crédito o débito.</h4>
                            <v-btn color="secondary"
                                depressed
                                class="align-center mt-5"
                                @click="reintentar()">
                                <span class="ma-3">Intentar nuevamente</span>
                            </v-btn>
                        </div>
                    </div>
                    <br>
                </v-card>
            </div>
        </v-col>
        <v-snackbar
            v-model="toast.toast"
            :timeout="toast.timeout"
            :color="toast.color"
            dark
            >
            {{ toast.message }}
        </v-snackbar>
        <whatsapp/>
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
        documents: [],
        id_level: null,
        userData: {
			nombre: "",
			apellidos: "",
			telefono: "",
			pwd: "",
			pwd_rep: "",
		},
        img_file: null,
        img_url: "../images/default-image.png",
        
        toast:{
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },

        uploadSuccess: false,
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.hash;
        vm.getOrder();
        //vm.getLoggedUser();
        vm.getTypeDocument();
        vm.loadLevels();
    },

    watch: {
    },

    methods: {
        async loadLevels(page = 1, per_page = 50, sortDesc = 0, sortBy = '') {
            let vm = this;
            try {
                const response = await this.$API.levels.list('?page=' + page + '&itemsPerPage=' + per_page + '&sortDesc=' + sortDesc + '&sortBy=' + sortBy);
                this.levels = response.data.data;
                this.levels.splice(3, 1);
            } catch (e) {
                this.loadingTable = false;
                console.error(e);
            }
        },
        reintentar(){
            this.$router.push({ path: '/pago-payme/'+this.slug })
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
                if(vm.order.id_status==1 && (vm.order.external_id==null || vm.order.external_id==undefined)){
                    vm.$store.dispatch("cleanCart");

                    if(vm.order.id_currency == '1'){
                        //const data = await this.$API.order.generatePostInvoice(vm.slug);
                    }
                }
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },

        updateUserData(){

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