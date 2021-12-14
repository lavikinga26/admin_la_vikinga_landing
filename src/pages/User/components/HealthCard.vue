<template>
    <div class="my-5">
        <v-card class="my-10 rounded-xl pa-10">
            <v-row>
                <v-col>
                    <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">MI HISTORIA CLÍNICA</div>
                    <v-row class="align-center">
                        <v-col cols="12" md="12" sm="12">
                            <span style="font-size: 0.9em;"><b>Enfermedad o padecimiento actual (Marque con una x):</b></span>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Hipertensión Arterial o prob cardiovasculares</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox
                                v-model="infoHealth.question1"
                                hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Acidez, Reflujo, Gastritis Crónica, náuseas, vómitos</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox
                                v-model="infoHealth.question2"
                                hide-details
                            ></v-checkbox>
                        </v-col>
                        
                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Celiaquía, colon irritable, hemorroides, constipación</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox
                                v-model="infoHealth.question3"
                                hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">¿Problemas renales? Cálculos, insuficiencia, incontinencia</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox
                                v-model="infoHealth.question4"
                                hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">¿Alergias a alimentos o medicamentos? ¿Asma?</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox
                                v-model="infoHealth.question5"
                                hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Diabetes no Insulino Dependiente o insulinodependiente</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox
                                v-model="infoHealth.question6"
                                hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Hipotiroidismo o hipertiroidismo</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox
                                v-model="infoHealth.question7"
                                hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Menopausia o Andropausia?</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox
                                v-model="infoHealth.question8"
                                hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Lesiones actuales o previas</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox
                                v-model="infoHealth.question9"
                                hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Otro. Descríbalo por favor:</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-text-field
                                v-model="infoHealth.question10"
                                class="ma-0 pt-0"
                                hide-details
                                single-line
                                placeholder="Osteopenia, osteoporosis..."
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="my-10 rounded-xl pa-10">
            <v-row>
                <v-col>
                    <v-row class="align-center">
                        <v-col cols="12" md="12" sm="12">
                            <span style="font-size: 0.9em;"><b>Alguna vez se le alteró un valor de:</b></span>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Glucemia (azúcar en sangre)</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Colesterol * triglicéridos * LDL HDL</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Ácido Úrico, urea y creatinina</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Sodio, potasio, calcio</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Otros: (TSH, T3, T4)</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-text-field
                                class="ma-0 pt-0"
                                hide-details
                                single-line
                                placeholder="TSH, T3, T4..."
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
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
        infoHealth:{
        },
    }),
    created(){
        this.configHealthQuestions();
    },
    methods: {
        configHealthQuestions(){
            this.infoHealth = JSON.parse(this.business_partner.partner_information.info_health);
            console.log(this.infoHealth);
        }
    }
}
</script>