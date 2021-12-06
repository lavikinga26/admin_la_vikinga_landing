<template>
    <div>
        <home-slider></home-slider>
        <!--<div class="container-fluid mt-2 px-0  bg_slider" id="slider">
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
        </div>-->

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
                    
                    <v-slide-group
                    class="pa-4"
                    center-active
                    show-arrows
                    >
                        <v-slide-item
                            v-for="n in 7"
                            :key="n"
                            v-slot="{ active }"
                        >
                            <v-hover v-slot="{ hover }">
                                <v-card
                                :color="active ? 'primary' : 'grey lighten-1'"
                                class="ma-4"
                                height="300px"
                                width="230"
                                >
                                    <v-img
                                        :src="require(`@/assets/img/multimedia/STAFF/STAFF_${n}.jpg`)"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="300px"
                                    >
                                    <!--class="img_staff"-->
                                        <v-expand-transition>
                                            <div
                                                v-if="hover"
                                                class="d-flex transition-fast-in-fast-out primary v-card--reveal text-h2 white--text"
                                                style="height: 100%;"
                                            >
                                                <div class="text-center" >
                                                    <img src="@/assets/img/isotipo.png" alt="" style="width: 50px" class="my-10">
                                                    <h5 style="font-family: 'MachProCondBold';
                                                    color: #E30E4F;
                                                    font-size: 1.3rem; line-height: 1em;">NOMBRE Y APELLIDO</h5>
                                                    <p style="font-size: 0.6rem;line-height: 1rem;">ENTRENADOR</p>
                                                    <p style="font-size: 0.8rem;line-height: 1rem;" class="px-2">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, optio tempora voluptatem error, suscipit alias voluptas eligendi natus sequi libero.
                                                    </p>
                                                </div>
                                                
                                            </div>
                                        </v-expand-transition>

                                    </v-img>
                                </v-card>
                            </v-hover>
                        </v-slide-item>
                    </v-slide-group>
                </div>
            </div>
        </div>

        <div class="container-fluid mt-15 bg_suplementacion" style="height: 800px;">
            <div class="row">
                <div class="col-12 text-center suplementacion_titulo">
                    <img src="@/assets/img/isotipo.png" alt="" style="width: 90px" class="my-15">
                    <p class="tit_h1_white text-center" style="font-family: 'MachProCondBold' !important;">SUPLEMENTACIÓN<br/>DEPORTIVA</p>
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
            <div class="row mt-4  mt-5">
                <div class="col-md-6 text-center">
                    <img src="@/assets/img/isotipo.png" alt="">
                    <p class="tit_h1_pink text_entrena">ENTRENA<br/>DONDE<br/>QUIERAS</p>
                </div>
                <div class="col-md-6">


                    <div class="d-flex align-center" style="margin-bottom: -80px;">
                        <div style="margin-right: -35px;">
                            <div class="iphone iphone1">
                                <div class="screen"></div>
                            </div>
                        </div>
                        <div style="z-index: 100;">
                            <div class="iphone iphone2" style="width: 220px;">
                                <div class="screen" style="height: 445px;"></div>
                            </div>
                        </div>
                        <div style="margin-left: -35px;">
                            <div class="iphone iphone3">
                                <div class="screen"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <div style="height:100px"></div>


        <frequent-questions></frequent-questions>
        <sponsors-section></sponsors-section>
    </div>
</template>

<script>
import HomeSlider from './components/HomeSlider.vue';
import PlansSlider from './components/PlansSlider.vue';

export default {
    name: "App",
    components: { 
        PlansSlider,
        HomeSlider,
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

    .iphone {
        width: 200px;
        background: #000;
        
        position: relative;
        border-radius: 35px;
    }
    .iphone .screen {
        background:url('~@/assets/img/multimedia/mobile.png') no-repeat;
        height: 405px;
        width: 100%;
        background: url(/img/mobile.80461c2b.png) no-repeat;
        background-size: 100%;
    }

    .iphone1{
        background:url('~@/assets/img/multimedia/ENTRENA_DONDE_QUIERAS/DESAFIO_7.jpg') no-repeat;
        background-size: cover;
        background-position: center;
    }
    .iphone2{
        background:url('~@/assets/img/multimedia/ENTRENA_DONDE_QUIERAS/DESAFIO_5.jpg') no-repeat;
        background-size: cover;
        background-position: center;
    }
    .iphone3{
        background:url('~@/assets/img/multimedia/ENTRENA_DONDE_QUIERAS/DESAFIO_6.jpg') no-repeat;
        background-size: cover;
        background-position: center;
    }

/*

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
}*/
</style>