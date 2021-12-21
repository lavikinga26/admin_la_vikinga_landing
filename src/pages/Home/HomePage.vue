<template>
    <div>
        <home-slider></home-slider>
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

        <staff-slider></staff-slider>

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

        <phone-photos></phone-photos>
        <frequent-questions></frequent-questions>
        <sponsors-section></sponsors-section>
    </div>
</template>

<script>
import HomeSlider from './components/HomeSlider.vue';
import PlansSlider from './components/PlansSlider.vue';
import StaffSlider from './components/StaffSlider.vue';
import PhonePhotos from '../../components/shared/PhonePhotos.vue';

export default {
    name: "App",
    components: { 
        PlansSlider,
        HomeSlider,
        StaffSlider,
        PhonePhotos
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