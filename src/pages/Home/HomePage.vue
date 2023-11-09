<template>
    <div>
        <home-slider></home-slider>
        <!--<plans-slider></plans-slider>-->

        <!-- 
        <div class="container-fluid pt-3 mt-n5">
            <div class="row mt-4">
                <div class="col-12 text-center">
                    <h2 class="sub_h2_white">DESCUBRE TODOS NUESTROS</h2>
                    <h1 class="tit_h1_pink">DESAFÍOS</h1>
                </div>
                <div class="col-12 text-center">
                    <img src="/assets/images/img_desafio_1.png" alt="" class="img-fluid img_border"> 
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
            </div>
        </div> -->

        <v-row class="d-none d-md-flex d-lg-flex">
            <v-col cols="12" class="px-5">
                <v-card class="pa-10">
                    <div class="row justify-center m-4">
                        <h2 class="tit_h2_pink mb-5">NUESTRA MISIÓN</h2>
                    </div>
                    <v-row>
                    <v-col cols="7" md="7" sm="12">
                        Nuestra misión es ayudarte a construir el hábito del entrenamiento, mejorando tu capacidad física y mental. De esta manera, lograras un estilo de vida más saludable apoyándote en un programa de entrenamiento diseñado por expertos en el
                        campo del deporte.<br/><br />
                        No importa tu nivel de habilidad, dónde te encuentres o el tiempo que tengas, en el Desafío te guiaremos para que alcances grandes resultados de manera simple y efectiva.
                        <br/><br />
                        
                        <v-btn color="secondary" depressed large class="px-2" @click="abrirHorario()">
                            <span class="ma-3">Descubre el Desafío</span>
                        </v-btn>
                    </v-col>
                    <v-col cols="5" md="5" sm="12">
                        <v-img src="@/assets/img/nuestra-mision.jpg" width="370" class="ma-auto"/>
                    </v-col>
                </v-row>
                </v-card>
        
            </v-col>
        </v-row>

        <v-row class="d-flex d-sm-none">
            <v-col cols="12" class="px-5">
                <v-card class="pa-10">
                    <div class="row justify-center m-4">
                        <h2 class="tit_h2_pink mb-5">NUESTRA MISIÓN</h2>
                    </div>
                    <v-row>
                        <v-col cols="12" md="12" sm="12">
                            Nuestra misión es ayudarte a construir el hábito del entrenamiento, mejorando tu capacidad física y
                            mental. De esta manera, lograras un estilo de vida más saludable apoyándote en un programa de
                            entrenamiento diseñado por expertos en el
                            campo del deporte.<br /><br />
                            No importa tu nivel de habilidad, dónde te encuentres o el tiempo que tengas, en el Desafío te
                            guiaremos para que alcances grandes resultados de manera simple y efectiva.
                            <br /><br />
        
                            <v-btn color="secondary" depressed large class="px-2" @click="abrirHorario()">
                                <span class="ma-3">Descubre el Desafío</span>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <v-img src="@/assets/img/nuestra-mision.jpg" width="370" class="ma-auto" />
                        </v-col>
                    </v-row>
                </v-card>
        
            </v-col>
        </v-row>

        <staff-slider></staff-slider>
        <!--<InformativeSection/>-->
        <phone-photos></phone-photos>
        <!--<frequent-questions></frequent-questions>-->
        <sponsors-section></sponsors-section>
        <FlyerPopup />
        <!--<whatsapp />-->
    </div>
</template>

<script>
import HomeSlider from './components/HomeSlider.vue';
import PlansSlider from './components/PlansSlider.vue';
import StaffSlider from './components/StaffSlider.vue';
import PhonePhotos from '../../components/shared/PhonePhotos.vue';
import InformativeSection from './components/InformativeSection.vue';
import FlyerPopup from './components/FlyerPopup.vue';

import axios from "axios";
export default {
    name: "App",
    components: { 
        PlansSlider,
        HomeSlider,
        StaffSlider,
        PhonePhotos,
        InformativeSection,
        FlyerPopup
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
        abrirHorario() {
            window.open("https://lavikingacoaching-29600.gr8.com/?utm_source=web&utm_medium=home");
        },
    },
};
</script>

<style >
    *{
        text-transform: none !important;
        /*font-family:'Montserrat', sans-serif  !important;*/
    }

</style>