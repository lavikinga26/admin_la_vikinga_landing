<template>
    <div>
        <v-toolbar
          color="primary"
          dark
          class="mb-1"
        >
            <v-toolbar-title class="tit_h2_pink" style="font-size: 3.0rem; color: white">GYM VIRTUAL</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                text 
                small
                link
                :to="'/gym-virtual/calendario'"
            >
                <!--<v-icon>mdi-calendar-blank-outline</v-icon>-->
                MI CALENDARIO
            </v-btn>
            <span style="color: #fff; font-size: 0.9rem;"> | </span>
            <v-btn 
                text 
                small
                link
                :to="'/gym-virtual/agenda'"
            >
                <!--<v-icon>mdi-view-agenda-outline</v-icon>-->
                MI AGENDA
            </v-btn>
            <!--<span style="color: #fff; font-size: 0.9rem;"> | </span>
            <v-btn 
                text 
                small
                link
                :to="'/gym-virtual/galeria'"
            >
                GALERÍA
            </v-btn>-->
        </v-toolbar>
        
        <Banner/>

        <div class="d-flex flex-grow-1 flex-column">
            <router-view :key="$route.fullPath" class="flex-grow-1"></router-view>
        </div>
        <!--<div class="d-flex flex-grow-1 flex-column">
            <v-container style="min-height:70vh;" class="d-flex align-center">
                <div style="text-align: center; width: 100%" class="pa-10">
                    <img style="width: 250px;" src="@/assets/img/logo_vikinga_icon.png" alt="Logo" />
                    <p class="tit_h1_staff_pink text_entrena txt_uppercase mb-6" style="font-size: 5rem">
                        PRÓXIMAMENTE
                    </p> 
                </div>
                
            </v-container>
        </div>-->
    </div>
</template>

<script>
import Banner from './components/Banner.vue';
export default {
    components: { 
        Banner,
    },
    data: () => ({

    }),

    mounted(){
        this.auth();
    },
    methods: {
        async auth(){
            try {
                const response = await this.$API.auth.auth();
            } catch (e) {
                console.log('not login')
                console.error(e);
            }
        }
    }
}
</script>