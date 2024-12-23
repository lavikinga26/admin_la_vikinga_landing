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
            <!-- PASO 1 -->
            <v-stepper-header v-show="step!=1" class="elevation-0">
              <v-stepper-step :complete="step > 1" step="1"></v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 3" step="3"></v-stepper-step>
            </v-stepper-header>

            <!-- CONTENIDO PASO 1 -->
            <v-stepper-items class="pa-4" style="height: 100%;">
              <v-stepper-content step="1">
                <div class="pa-4">
                  <h2 class="tit_h3_team_blue">NICOLE TE HA INVITADO A UNIRTE <br/>AL DESAFÍO, OBTÉN:</h2>
                  <h1 class="tit_h2_pink font-weight-bold">15 DÍAS GRATIS</h1>
                  <v-card class="pa-5" elevation="4" width="420">
                    <p>Únete al Desafío y logra el cambio físico y mental que deseas</p>
                    <v-text-field label="Email" v-model="email" outlined></v-text-field>
                    <v-btn block class="ma-0 secondary white--text" @click="nextStep">INICIAR</v-btn>
                  </v-card>
                </div>
              </v-stepper-content>

              <!-- CONTENIDO PASO 2 -->
              <v-stepper-content step="2">
                <h3 class="tit_h2_pink font-weight-bold">REGÍSTRATE AHORA</h3>
                <div style="width: 400px;">
                  <v-text-field label="Nombres" v-model="firstName" outlined></v-text-field>
                  <v-text-field label="Apellidos" v-model="lastName" outlined></v-text-field>
                  <v-text-field label="Teléfono" v-model="phone" outlined></v-text-field>
                  <v-btn class="grey lighten-2" @click="prevStep">VOLVER</v-btn>
                  <v-btn class="pink darken-1 white--text" @click="nextStep">SIGUIENTE</v-btn>
                </div>
              </v-stepper-content>

              <!-- CONTENIDO PASO 3 -->
              <v-stepper-content step="3">
                <h2 class="red--text font-weight-bold">ESTAS LISTO</h2>
                <v-select :items="documentTypes" label="Tipo de documento" v-model="documentType" outlined></v-select>
                <v-text-field label="Número de documento" v-model="documentNumber" outlined></v-text-field>
                <v-text-field label="Contraseña" v-model="password" type="password" outlined></v-text-field>
                <v-text-field label="Confirmar contraseña" v-model="confirmPassword" type="password" outlined></v-text-field>
                <v-select :items="levels" label="Nivel de entrenamiento" v-model="level" outlined></v-select>
                <v-btn class="grey lighten-2" @click="prevStep">VOLVER</v-btn>
                <v-btn class="pink darken-1 white--text" @click="submitForm">INICIAR</v-btn>
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
      levels: ['Principiante', 'Intermedio', 'Avanzado']
    };
  },
  methods: {
    nextStep() {
      if (this.step < 3) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    submitForm() {
      alert('Formulario enviado');
    }
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
