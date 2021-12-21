<template>
    <div>
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                    <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    <p class="tit_h1_white text_entrena">PREGUNTAS FRECUENTES</p>
                </div>
            </div>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" v-for="(info, index) in information" :key="index" class="px-5">
                    <v-card class="pa-10">
                        <div class="row justify-center m-4">
                            <h2 class="tit_h2_pink mb-5" style="font-size:30px; text-transform: uppercase !important;">{{info.question}}</h2>
                        </div>
                        <div 
                            v-html="info.answer">
                        </div>
                    </v-card>
                    
                </v-col>
            </v-row>
        </v-container>
        <phones-photos></phones-photos>
    </div>
</template>

<script>
export default {
    data: () => ({
        information:[],
    }),
    mounted(){
        this.getFrequentQuestions();
    },
    methods:{
        async getFrequentQuestions(){
            try{
                const data = await this.$API.configuration.frequent_questions();
                this.information = data.data.data;
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