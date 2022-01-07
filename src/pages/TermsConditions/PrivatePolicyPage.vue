<template>
    <div style="min-height:80vh;">
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                    <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    <p class="tit_h1_white text_entrena">POLÍTICA DE PRIVACIDAD</p>
                </div>
            </div>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" class="px-5">
                    <v-card class="pa-10">
                        <div 
                            v-html="information.policy">
                        </div>
                    </v-card>
                    
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
    }),
    mounted(){
        this.getTermsConditions();
        this.$store.commit('loader',true);
        setTimeout(()=>{ 
            this.$store.commit('loader',false);
        }, 2000);
    },
    methods:{
        async getTermsConditions(){
            try{
                const data = await this.$API.configuration.privacyPolicy();
                this.information = data.data.data;
                console.log(data.data.data)
            }
            catch(e){
                console.error(e);
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