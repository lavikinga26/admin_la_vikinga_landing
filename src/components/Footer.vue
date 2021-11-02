<template>
  <v-footer dark padless>
    <v-card flat tile class="white text-center py-5">

  <!-- Footer -->
    <!-- Grid container -->
    <div class="container">
      
        <div class="d-flex flex-row justify-center my-2" align="center">
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
            >
              <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn
              color="secondary"
              fab
              x-small
              dark  mx-1
              class="elevation-0"
        >
              <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn
              color="secondary"
              fab
              x-small
              dark mx-1
              class="elevation-0"
            >
              <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn
              color="secondary"
              fab
              x-small
              dark mx-1
              class="elevation-0"
            >
              <v-icon>mdi-twitter</v-icon>
        </v-btn>
      </section>
      <!-- Section: Social -->
      <!-- Section: Links -->
      <section class="mt-5">
        <!-- Grid row-->
        <div class=" text-center d-flex justify-center  justify-space-between  align-center pt-5">
          <!-- Grid column -->
          <div>
            <v-btn
              text
              color="secondary"
            >
              INSCRIPCIONES
            </v-btn>
          </div>
          <!-- Grid column -->
          <div><span style="color: #E30E4F"> | </span></div>
          <!-- Grid column -->
          <div>
            <v-btn
              text
              color="secondary"
            >
              GYM VIRTUAL
            </v-btn>
          </div>
          <!-- Grid column -->
          <div><span style="color: #E30E4F"> | </span></div>
          <!-- Grid column -->
          <div>
            <v-btn
              text
              color="secondary"
            >
              SATFF
            </v-btn>
          </div>
          <!-- Grid column -->
          <div><span style="color: #E30E4F"> | </span></div>
          <!-- Grid column -->
          <div>
            <v-btn
              text
              color="secondary"
            >
              CALENDARIO
            </v-btn>
          </div>
          <!-- Grid column -->
          <div><span style="color: #E30E4F"> | </span></div>
          <!-- Grid column -->
          <div>
            <v-btn
              text
              color="secondary"
            >
              TIENDA
            </v-btn>
          </div>
          <!-- Grid column -->
          <div><span style="color: #E30E4F"> | </span></div>
          <div>
            <v-btn
              text
              color="secondary"
            >
              INFO
            </v-btn>
          </div>
          <!-- Grid column -->
          <div><span style="color: #E30E4F"> | </span></div>
          <div>
            <v-btn
              text
              color="secondary"
            >
              INFO
            </v-btn>
          </div>
          <!-- Grid column -->
          <div><span style="color: #E30E4F"> | </span></div>
        </div>
        <!-- Grid row-->
      </section>
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div
         class="text-center p-3"
         style="color: grey; font-size: 0.7rem;"
         >
      © 2021 La Vikinga - TODOS LOS DERECHOS RESERVADOS. DESARROLLADO POR BYTESOLUCIONES
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
    }
};
</script>
<style>
.v-btn{
  margin-right: 5px !important;
}
</style>