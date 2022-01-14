<template>
    <div class="my-5">
        <v-form ref="healthForm" v-model="validHealthForm" @submit.prevent="updateHealthInfo()" lazy-validation>
            <v-card class="my-10 rounded-xl pa-10">
                <v-row>
                    <v-col>
                        <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">MI HISTORIA CLÍNICA</div>
                        <v-row class="align-center">
                            <v-col cols="12" md="12" sm="12">
                                <span style="font-size: 0.9em;"><b>Enfermedad o padecimiento actual:</b></span>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Hipertensión Arterial o prob cardiovasculares</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question1"
                                    :label="`${infoHealth.question1 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Acidez, Reflujo, Gastritis Crónica, náuseas, vómitos</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question2"
                                    :label="`${infoHealth.question2 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>
                            
                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Celiaquía, colon irritable, hemorroides, constipación</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question3"
                                    :label="`${infoHealth.question3 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">¿Problemas renales? Cálculos, insuficiencia, incontinencia</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question4"
                                    :label="`${infoHealth.question4 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">¿Alergias a alimentos o medicamentos? ¿Asma?</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question5"
                                    :label="`${infoHealth.question5 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Diabetes no Insulino Dependiente o insulinodependiente</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question6"
                                    :label="`${infoHealth.question6 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Hipotiroidismo o hipertiroidismo</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question7"
                                    :label="`${infoHealth.question7 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Menopausia o Andropausia?</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question8"
                                    :label="`${infoHealth.question8 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Lesiones actuales o previas</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question9"
                                    :label="`${infoHealth.question9 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
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
                                <v-switch
                                    v-model="infoHealth.question11"
                                    :label="`${infoHealth.question11 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Colesterol * triglicéridos * LDL HDL</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question12"
                                    :label="`${infoHealth.question12 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Ácido Úrico, urea y creatinina</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question13"
                                    :label="`${infoHealth.question13 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Sodio, potasio, calcio</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoHealth.question14"
                                    :label="`${infoHealth.question14 != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>

                            <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Otros:</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-text-field
                                    v-model="infoHealth.question15"
                                    class="ma-0 pt-0"
                                    hide-details
                                    single-line
                                    placeholder="TSH, T3, T4..."
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <br>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary" :disabled="!validHealthForm">Guardar</v-btn>
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
        validHealthForm: false,
        healthForm:{
            info_health: null,
        },
        infoHealth:{
        },
    }),
    created(){
        this.configHealthInfo();
    },
    methods: {
        configHealthInfo(){
            if(this.business_partner.partner_information.info_health){
                this.infoHealth = JSON.parse(this.business_partner.partner_information.info_health);
            }
        },
        async updateHealthInfo(){
            try {
                this.$store.commit('loader', true);

                this.healthForm.info_health = JSON.stringify(this.infoHealth);
                const response = await this.$API.business_partner.updateHealthInfo(this.business_partner.id, this.healthForm);

            } catch (e) {
                // UTILS.toastr.error("Ups! Ocurrió un error", this);
                console.error(e);

            } finally {
                this.$store.commit('loader', false);
            }
        },
    }
}
</script>