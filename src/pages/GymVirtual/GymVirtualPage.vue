<template>
    <div>
        
        
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