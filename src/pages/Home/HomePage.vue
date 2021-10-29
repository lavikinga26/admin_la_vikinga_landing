<template>
    <div>
        <div class="container-fluid mt-2 px-0  bg_slider" id="slider">
            <div class="row g-0">
                <div class="col-12">
                        <h2 class="tit_h1_white text_slide ms-5">ACEPTAR PARA</h2>
                        <h2 class="tit_h1_white ms-5">TRANSFORMAR</h2>
                        <v-btn
                            depressed
                            color="secondary"
                            class="ml-5"
                            >
                            COMPRAR AHORA
                        </v-btn>
                </div>
            </div>
        </div>

        <plans-slider></plans-slider>


        <div class="container-fluid pt-3 mt-n5">
            <div class="row mt-4">
                <div class="col-12 text-center">
                    <h2 class="sub_h2_white">DESCUBRE TODOS NUESTROS</h2>
                    <h1 class="tit_h1_pink">DESAFÍOS</h1>
                </div>

                <div class="col-3">
                    
                </div>
                <div class="col-6 text-center">
                    <img src="assets/images/img_desafio_1.png" alt="" class="img-fluid img_border">
                    <p class="txt_video">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quis cumque ad necessitatibus quasi, deserunt impedit quia error sapiente iure adipisci autem ut earum quaerat nisi aliquam dolores saepe? Natus?
                        
                    </p>
                    <p>
                        <v-btn color="secondary"
                            depressed
                            class="px-2">
                            <span class="ma-3">COMPRAR AHORA</span>
                        </v-btn>
                    </p>
                </div>
                <div class="col-3">
                    
                </div>
            </div>
        </div>

        <div class="container-fluid mt-5">
            <div class="row">
                <div class="col-12 text-center">
                    <h2 class="sub_h2_black">CONOCE A NUESTROS</h2>
                    <h1 class="tit_h1_pink">ENTRENADORES</h1>
                </div>

                <div class="col-12">
                    
                </div>
            </div>
        </div>

        <div class="container-fluid mt-5 bg_suplementacion">
            <div class="row">
                <div class="col-12 text-center suplementacion_titulo">
                    <img src="assets/images/isotipo.png" alt="">
                    <p class="tit_h1_white text-center">SUPLEMENTACIÓN<br/>DEPORTIVA</p>
                </div>

                <div class="col-4 d-sm-none d-md-block"></div>
                <div class="col-md-4 col-sm-12 text-center text_suplementacion">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perferendis minus delectus cum molestiae cupiditate aspernatur explicabo nisi ratione error. Est, expedita modi itaque ex asperiores minus eveniet ratione dolores?</p>
                    <v-btn color="secondary"
                        depressed
                        class="px-2">
                        <span class="ma-3">COMPRAR AHORA</span>
                    </v-btn>
                </div>
                <div class="col-4 d-sm-none d-md-block"></div>
            </div>
        </div>

        <div class="container-fluid bg_blue pt-3">
            <div class="row mt-4">
                <div class="col-md-6 text-center">
                    <img src="assets/images/isotipo.png" alt="">
                    <p class="tit_h1_pink text_entrena">ENTRENA<br/>DONDE<br/>QUIERAS</p>
                </div>
                <div class="col-md-6">
                    <img src="assets/images/img_celulares.png" alt="" class="img-fluid">
                </div>
            </div>
        </div>

        <frequent-questions></frequent-questions>
        <sponsors-section></sponsors-section>
    </div>
</template>

<script>
import PlansSlider from './components/PlansSlider.vue';

export default {
    name: "App",
    components: { 
        PlansSlider,
     },

    data: () => ({
        fab: null,
        color: "",
        flat: null,
    }),

    mounted() {
        this.$store.commit('loader',true);
        setTimeout(()=>{ 
            this.$store.commit('loader',false);
        }, 5000);
    },

    watch: {
    },

    methods: {
    },
};
</script>

<style >
    *{
        text-transform: none !important;
        /*font-family:'Montserrat', sans-serif  !important;*/
    }



.vueperslides__arrow {color: #333;}
.vueperslides__bullet {border-color: #E73C7E;box-shadow: none;}

.vueperslide {
  color: #fff;
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  transition: .3s ease-in-out;
  opacity: 0.3;
  transform: scale(0.8);
}

.offset-slide--first .vueperslides__track-inner {
  transform: translate3d(33.333%, 0, 0) !important;
}

.offset-slide--last .vueperslides__track-inner {
  transform: translate3d(-133.33%, 0, 0) !important;
}
</style>