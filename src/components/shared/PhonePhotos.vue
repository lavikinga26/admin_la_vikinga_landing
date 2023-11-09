<template>
  <div>
    <div class="container-fluid bg_blue pt-3">
      <div class="row mt-4 mt-5">
        <div class="col-md-6 text-center">
          <img src="@/assets/img/isotipo.png" alt="" />
          <p class="tit_h1_pink text_entrena" id="text-phones">
            CONOCE<br />NUESTROS<br />HORARIOS
          </p>
          <p class="text-center"> 
            <v-btn color="secondary" depressed
              large class="px-2" @click="abrirHorario()">
              <span class="ma-3">VER HORARIOS</span>
            </v-btn>
          </p>
        </div>
        <div class="col-md-6 phone-container">
          <div class="d-flex align-center" style="margin-bottom: -80px">
            <div style="margin-right: -35px">
              <div class="iphone iphone1">
                <div class="screen"></div>
              </div>
            </div>
            <div style="z-index: 100">
              <div class="iphone iphone2 iphone-center">
                <div class="screen" id="center-screen"></div>
              </div>
            </div>
            <div style="margin-left: -35px">
              <div class="iphone iphone3">
                <div class="screen"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div style="height: 100px"></div>
  </div>
</template>

<script>
export default {
  methods: {
    abrirHorario() {
      window.open("https://lavikingaoficial.com/horarios/horarios.jpg");
    },
  },
};
</script>
<style>

</style>