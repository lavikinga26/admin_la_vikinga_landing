<template>
    <div>
        <home-slider></home-slider>
        <plans-slider></plans-slider>

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
    },
};
</script>

<style >
    *{
        text-transform: none !important;
        /*font-family:'Montserrat', sans-serif  !important;*/
    }

</style>