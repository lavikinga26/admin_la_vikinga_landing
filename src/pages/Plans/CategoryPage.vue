<template>
    <div>
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                    <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    <p class="tit_h1_white text_entrena">INSCRIPCIONES</p>
                </div>
            </div>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" class="px-5">
                    <v-card class="pa-10">
                        <div class="row justify-center m-4">
                            <h2 class="tit_h2_pink mb-5" style="text-transform: uppercase !important;">{{information.name}}</h2>
                        </div>
                        <div 
                            v-html="information.content">
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col
                    v-for="(plan,index) in information.plans"
                    :key="index"
                    cols="12"
                    sm="4"
                    align="center"
                >
                    <v-hover
                        v-slot="{ hover }"
                        close-delay="200"
                    >
                        <v-card
                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                        max-width="250"
                        
                        >
                            <v-img
                                lazy-src="@/assets/img/lazy_img.jpg"
                                max-height="400"
                                max-width="250"
                                class="rounded plan white--text align-end"
                                :src="base_url + plan.file_path.path + plan.file_path.filename"
                                @click="goToPlan(plan.identifier)"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            >
                            <v-card-title>
                                <div style="border-left: 4px solid #E30E4F; text-align: left; word-break: keep-all;" class="pl-1">
                                    {{plan.title}}
                                </div>
                            </v-card-title>
                            </v-img>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>

        </v-container>
        <phones-photos></phones-photos>
        <frequent-questions></frequent-questions>
    </div>
</template>

<script>
export default {
    data: () => ({
        information:{},
        base_url: '',
    }),
    mounted(){
        let vm = this;
        vm.slug = this.$route.params.slug;
        vm.$store.commit('loader',true);
        vm.getBaseUrl();
        vm.getCategory();
    },
    methods:{
        async getBaseUrl(){
            try{
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
        async getCategory(){
            let vm = this;
            try{
                const data = await this.$API.plans.category(vm.slug);
                this.information = data.data.data;
                console.log(this.information)
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            } 
        },
    },
}
</script>

<style>
#calendar_title {
  text-transform: uppercase !important;
}

</style>