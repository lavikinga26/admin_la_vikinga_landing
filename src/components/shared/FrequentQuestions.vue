<template>
    <div class="py-5 mx-auto" style="max-width:900px; min-height: 450px">
        <div class="container-fluid pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <p class="tit_h1_pink text_entrena">PREGUNTAS FRECUENTES</p>
                </div>
            </div>
        </div>
        <v-expansion-panels 
            dark 
            accordion
            v-model="panel"    
        >
            <v-expansion-panel
            class="elevation-0"
            v-for="(question, index) in questions"
            :key="'question_'+index"
            >
                <v-expansion-panel-header class="secondary white--text">
                {{question.question}}
                </v-expansion-panel-header>
                <v-expansion-panel-content  class="white black--text py-3">
                    <div>
                        {{question.answer}}
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>  
</template>
<script>
export default {
    data: () => ({
      panel: 0,
      disabled: false,
      readonly: false,
      questions: []
    }),
    mounted(){
        this.getFrequentQuestions();
    },
    methods:{
        async getFrequentQuestions(){
            try{
                const data = await this.$API.configuration.frequent_questions();
                this.questions = data.data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
    },
}
</script>