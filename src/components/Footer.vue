<template>
  <v-footer dark padless>
    <v-card flat tile class="white text-center py-5">

  <!-- Footer -->
    <!-- Grid container -->
    <div class="container">
      
        <div class="d-flex flex-row justify-center my-2 " align="center">
            <img style="width: 150px;" src="@/assets/img/logo_vikinga_icon.png" alt="Logo" />
        </div>

      <!-- Section: Social -->
      <section class="text-center mb-5">
        <v-btn
          color="secondary"
          fab
          x-small
          dark mx-1
          class="elevation-0"
          @click="goPage('https://www.facebook.com/lavikingaoficial')"
        >
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn
              color="secondary"
              fab
              x-small
              dark  mx-1
              class="elevation-0"
              @click="goPage('https://www.instagram.com/lavikingaoficial')"
        >
              <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn
              color="secondary"
              fab
              x-small
              dark mx-1
              class="elevation-0"
              @click="goPage('https://www.youtube.com/channel/UC4PlQJbtyk23yK23ye2uu8w')"
            >
              <v-icon>mdi-youtube</v-icon>
        </v-btn>
      </section>
      <!-- Section: Social -->
      <!-- Section: Links -->
      <section class="mt-5">
        <!-- Grid row-->
        <div class=" text-center d-flex justify-center  justify-space-around flex-wrap justify-space-between  align-center pt-5">
          <!-- Grid column -->
          <div>
            <v-btn
              text
              small
              color="secondary"
              href="/inscripciones"
            >
              INSCRIPCIONES
            </v-btn>
          </div>
          
          <!-- Grid column -->
          <div><span style="color: #E30E4F; font-size: 0.9rem;"> | </span></div>
          <!-- Grid column -->
          <div>
            <v-btn
              text
              small
              color="secondary"
              href="/staff"
            >
              STAFF
            </v-btn>
          </div>
          
          <!-- Grid column -->
          <div><span style="color: #E30E4F; font-size: 0.9rem;"> | </span></div>
          <!-- Grid column -->
          <div>
            <v-btn
              text
              small
              color="secondary"
              href="https://shop.lavikingaoficial.com"
            >
              TIENDA
            </v-btn>
          </div>
          <!-- Grid column -->
          <div><span style="color: #E30E4F; font-size: 0.9rem;"> | </span></div>
          <div>
            <v-btn
              text
              small
              color="secondary"
              href="/preguntas-frecuentes"
            >
              INFO
            </v-btn>
          </div>

          <!-- Grid column -->
          <div><span style="color: #E30E4F; font-size: 0.9rem;"> | </span></div>
          <!-- Grid column -->
          <div>
            <v-btn
              text
              small
              color="secondary"
              href="/terminos-condiciones"
            >
              TÉRMINOS Y CONDICIONES
            </v-btn>
          </div>
          <div><span style="color: #E30E4F; font-size: 0.9rem;"> | </span></div>
            <!-- Grid column -->
            <div>
              <v-btn
                text
                small
                color="secondary"
                href="/auth/iniciar-sesion"
              >
                INGRESAR
              </v-btn>
            </div>
        </div>
        <!-- Grid row-->
      </section>
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div
         class="text-center p-3"
         style="color: grey; font-size: 0.75rem;"
         >
        ©{{new Date().getFullYear()}} La Vikinga - Todos los derechos reservados. 
      Desarrollado por <a href="https://bytesoluciones.com" target="_blank" style="text-decoration:none;">ByteSoluciones</a>
    </div>
    <!-- Copyright -->
    </v-card>
  </v-footer>
</template>

<style scoped>
.v-card {
    width: 100%;
}
</style>

<script>
export default {
    components: {
    },
    data: function () {
        return {
            data_config: null,
        }
    },
    created(){
        this.getConfiguracion();
    },
    methods:{
        async getConfiguracion(){
            try{
                const data = await this.$API.configuration.configuration();
                this.data_config = data.data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
        goPage(url){
            window.open(url);
        }
    }
};
</script>
<style>
.v-btn{
  margin-right: 5px !important;
}
</style>