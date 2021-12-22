<template>
    <div class="my-5">
        <v-form ref="progressForm" v-model="validTrainingForm" @submit.prevent="updateTrainingInfo()" lazy-validation>
            <v-card class="my-10 rounded-xl pa-10">
                <v-row>
                    <v-col>
                        <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">PLANILLA DE REGISTROS DE PESOS EJERCICIOS MULTIARTICULARES</div>
                        <v-row>
                            <v-col cols="12" md="12" sm="12" class="px-5">
                                <div class="d-flex">
                                    <v-spacer></v-spacer>
                                    <div class="d-flex align-center" style="font-size: 0.75rem !important;">
                                        SELECCIONA EL MES 
                                        <v-select
                                            v-model="training_month"
                                            :items="months_list"
                                            item-text="name"
                                            item-value="id"

                                            style="width: 100px;"
                                            class="ml-3"
                                            color="secondary"
                                            item-color="secondary"
                                        ></v-select>
                                    </div>
                                </div>

                                <div class="d-flex flex-wrap">
                                    <!-- <div style="width:20%" class="pa-2" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>BLACK SQUAT</b></h5>
                                            <v-text-field
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div> -->
                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>BACK SQUAT</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q1_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q1_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>
                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>FRONT SQUAT</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q2_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q2_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>
                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>SUMO SQUAT</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q3_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q3_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>
                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>PESO MUERTO</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q4_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q4_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>
                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>PESO MUERTO RUMANO</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q5_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q5_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>

                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>HIP THRUST</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q6_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q6_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>
                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>LUNGES CON BARRA</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q7_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q7_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>
                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>BENCH PRESS</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q8_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q8_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>
                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>SHOULDER PRESS</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q9_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q9_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>
                                    <div style="width:20%" class="pa-2">
                                        <div class="rounded-lg pink lighten-5 pa-5">
                                            <h5 class="secondary--text"><b>REMO CON BARRA</b></h5>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q10_weight"
                                                class="ma-0 py-0"
                                                placeholder="PESO"
                                                hide-details
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="infoTraining[training_month].q10_comments"
                                                class="ma-0 py-0"
                                                placeholder="COMENTARIOS"
                                                hide-details
                                            ></v-text-field>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary" :disabled="!validTrainingForm">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>
<script>
export default {
    props:{
        base_url: {
            type: String,
            default: null,
        },
        business_partner: {
            type: Object,
            default: null,
        },
    },
    data: () => ({
        validTrainingForm: false,
        trainingForm:{
            info_training: null,
        },
        infoTraining:[
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],

        training_month: 0,
        months_list: [
            {id: 0, name:'Enero'},
            {id: 1, name:'Febrero'},
            {id: 2, name:'Marzo'},
            {id: 3, name:'Abril'},
            {id: 4, name:'Mayo'},
            {id: 5, name:'Junio'},
            {id: 6, name:'Julio'},
            {id: 7, name:'Agosto'},
            {id: 8, name:'Septiembre'},
            {id: 9, name:'Octubre'},
            {id: 10, name:'Noviembre'},
            {id: 11, name:'Diciembre'},
        ],
    }),
    created(){
        this.configTrainingInfo();
    },
    methods: {
        configTrainingInfo(){
            if(this.business_partner.partner_information.info_training){
                this.infoTraining = JSON.parse(this.business_partner.partner_information.info_training);
            }
        },
        async updateTrainingInfo (){
            try {
                this.$store.commit('loader', true);

                this.trainingForm.info_training = JSON.stringify(this.infoTraining);
                const response = await this.$API.business_partner.updateTrainingInfo(this.business_partner.id, this.trainingForm);

            } catch (e) {
                // UTILS.toastr.error("Ups! Ocurrió un error", this);
                console.error(e);

            } finally {
                this.$store.commit('loader', false);
            }
        },
    },
}
</script>