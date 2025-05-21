<template>
  	<v-row>
      <v-col
        cols="12"
        md="4"
        class="d-none d-md-flex d-sm-none"
        style="position: relative;"
      >
        <div class="py-10 px-8" style="position: absolute; top:10px">
          <h3 class="title_pink" style="text-align: left">DEJA DE HACER <br/>EJERCICIO Y COMIENZA <br/>A ENTRENAR</h3>
          <br/>
          <p class="subtitle-white">En el Desfío Gym Virtual preparamos una Programación de  Entrenamiento basada en la fuerza y adaptada para 3 niveles de  entrenamiento.</p>
        </div>
        <img
          src="@/assets/img/gym_virtual/register_img.png"
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
      <v-col cols="12" md="8" style="height: 100vh; overflow-y:auto;flex: 1.5;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #ffffff;
            padding: 20px;">
          <v-stepper v-model="step" elevation="0" >
            <!-- CONTENIDO PASO 1 -->
            <v-stepper-items class="pa-4" style="height: 100%;">
              <v-stepper-content step="1">
                <div class="pa-4" v-if="allow_reffer==true">
                  <img
                    src="@/assets/img/referidos_icon.png"
                    alt="Imagen Login"
                    style=""
                  />
                  <h2 class="tit_h3_team_blue" style="margin-bottom: 10px;" v-if="usuario_logeado == false && usuario_logeado != null"> {{referralname.toUpperCase()}} TE HA INVITADO A UNIRTE<br/>AL DESAFÍO CON UN DESCUENTO DE HASTA S/ {{parseFloat(max_discount)}}:</h2>
                  <h2 class="tit_h3_team_blue" style="margin-bottom: 10px;" v-if="usuario_logeado == true && usuario_logeado != null">{{business_partner.name.toUpperCase()}}, {{referralname.toUpperCase()}} TE HA INVITADO A UNIRTE<br/>AL DESAFÍO CON UN DESCUENTO DE HASTA S/ {{parseFloat(max_discount)}}:</h2>
                  <v-card class="pa-5" elevation="4" width="420" v-if="usuario_logeado == false && usuario_logeado != null">
                    <p>Ingresa tu email y logra el cambio físico que deseas</p>
                    <v-text-field label="Email" v-model="email" outlined></v-text-field>
                    <v-btn block class="ma-0 secondary white--text" @click="nextStep">INICIAR</v-btn>
                  </v-card>
                  <v-card class="pa-5" elevation="4" width="420" v-if="usuario_logeado == true && usuario_logeado != null">
                    <v-btn block class="ma-0 secondary white--text" @click="nextStep">CONTINUAR</v-btn>
                  </v-card>
                </div>

                <div class="pa-4" v-if="allow_reffer==false">
                  <img
                    src="@/assets/img/referidos_icon.png"
                    alt="Imagen Login"
                    style=""
                  />
                  <h2 class="tit_h3_team_blue" style="margin-bottom: 10px;">Ups! Ya tienes un plan activo o has sido referido hace poco!</h2>

                </div>
              </v-stepper-content>

            </v-stepper-items>
          </v-stepper>
      </v-col>
	</v-row>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      documentType: '',
      documentNumber: '',
      password: '',
      confirmPassword: '',
      level: '',
      documentTypes: ['DNI', 'Pasaporte'],
      levels: ['Principiante', 'Intermedio', 'Avanzado'],
      usuario_logeado: null,
      business_partner: [],
      id_level: null,
      referralname: "",
      currency: false,
      currency_id: 0,
      dataIP: null,
      plans: [],
      temp_plans: [],
      max_discount: 0,
      allow_reffer: true
    };
  },
  async mounted() {
    let vm = this;
		this.ref_code = this.$route.query.ref;
		localStorage.ref_code = this.ref_code;
    this.getLoggedUser();
    this.getReferralName();

    await vm.getIpData();
		vm.fetchIpData();

    await vm.list();
	},
  methods: {
    nextStep() {
      if (this.usuario_logeado == true) {
				this.$router.push({ path: "/proceso_compra/step2" });
			} else {
				localStorage.emailRegistro = this.email;
				this.$router.push({ path: "/proceso_compra/step2" });
			}
    },
    async getLoggedUser() {
			this.$store.commit("loader", true);
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
          this.usuario_logeado = true;

          var userPlans = this.business_partner.plans;
          let fecha_actual = new Date();
          userPlans.map(function (item) {
              let init_d = new Date(item.init_date);
              let end_d = new Date(item.expiration_date);

              if(fecha_actual <= new Date(item.expiration_date)){
                  this.allow_reffer = false;
              }
          });

				}else{
          this.usuario_logeado = false;
        }
			}else{
        this.usuario_logeado = false;
      }
			this.$store.commit("loader", false);
		},
    async getReferralName() {
			this.$store.commit("loader", true);
			const response = await this.$API.referidos.getReferral(this.ref_code);
      this.referralname = response.data.name;
			this.$store.commit("loader", false);
		},
    async getIpData(){
			await fetch('https://api.ipify.org?format=json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Error al obtener la IP');
				}
				return response.json();
			})
			.then(data => {
				this.dataIP = data.ip;
			})
			.catch(error => {
				console.error('Error:', error);
			});
		},
		async fetchIpData() {
      this.loading = true;
      this.error = null;
      try {
        this.ipData = this.data_config;
        if (this.ipData?.countryCode === 'PE') {
          this.currency = false;
          this.currency_id = 0;
        } else {
          this.currency = true;
          this.currency_id = 1;
        }
      
      } catch (error) {
          this.error = error.message;
      } finally {
          this.loading = false;
      }
    },
    async list() {
			let vm = this;
			vm.$store.commit("loader", true);

			try {
				const data = await this.$API.plans.list();
				vm.plans = data.data.data;
				vm.temp_plans = data.data.data;
				let activeplans = vm.plans.filter(pl => pl.active == 1 && pl.status == 1);
        var dscto = parseFloat(0);

        activeplans.forEach((item) => {
          console.log(item);
          if(parseFloat(item.referred_discount_pen) > dscto){
            dscto = parseFloat(item.referred_discount_pen);
          }
        });

        vm.max_discount = dscto;

        if(this.referralname.toUpperCase() == this.business_partner.name.toUpperCase()){
          this.allow_reffer = false;
        }
			
				vm.$store.commit("loader", false);
			} catch (e) {
				console.error(e);
				vm.$store.commit("loader", false);
			}
		},
  }
};
</script>

<style scoped>
h2 {
  color: #1e293b;
}
.v-btn {
  margin: 10px;
}
</style>
