<template>
    <div class="my-5">
        <v-card class="my-10 rounded-xl pa-10">
            <v-row>
                <v-col>
                    <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">ACERCA DE MI SALUD</div>
                    <v-row class="align-center">
                        <v-col cols="12" md="12" sm="12">
                            <span style="font-size: 0.9em;"><b>Enfermedad o padecimiento actual (Marque con una x):</b></span>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Hipertensión Arterial o prob cardiovasculares</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Acidez, Reflujo, Gastritis Crónica, náuseas, vómitos</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>
                        
                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Celiaquía, colon irritable, hemorroides, constipación</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">¿Problemas renales? Cálculos, insuficiencia, incontinencia</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">¿Alergias a alimentos o medicamentos? ¿Asma?</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Diabetes no Insulino Dependiente o insulinodependiente</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Hipotiroidismo o hipertiroidismo</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Menopausia o Andropausia?</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Lesiones actuales o previas</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-checkbox hide-details
                            ></v-checkbox>
                        </v-col>

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Otro. Descríbalo por favor:</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-text-field
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

                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Otros:</span></v-col>
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
        <v-card class="my-10 rounded-xl pa-10">
            <v-row>
                <v-col>
                    <v-row class="align-center">
                        <v-col cols="12" md="8" sm="12"><span style="font-size: 0.9em;">Fecha último examen de Laboratorio</span></v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-menu
                                v-model="menuTestDate"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field label="Fecha Fin" prepend-icon="mdi-calendar"
                                        v-model="formatTestDate"
                                        v-bind="attrs"
                                        v-on="on"
                                        readonly
                                    ></v-text-field>
                                </template>
                                <v-date-picker no-title v-model="healthForm.testDate" @input="menuTestDate = false" locale="es-ES"></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>

                    <span style="font-size: 0.9em;">¿Toma Medicación o esta en tratamientos? Descríbala y para qué:</span>
                    <v-text-field
                        class="ma-0 pt-0"
                        single-line
                    ></v-text-field>
                    <span style="font-size: 0.9em;">¿Toma algún suplemento? ¿Cuál? ¿Para qué?</span>
                    <v-text-field
                        class="ma-0 pt-0"
                        single-line
                    ></v-text-field>
                    <span style="font-size: 0.9em;">¿Cuántas comidas realiza al día?</span>
                    <v-text-field
                        class="ma-0 pt-0"
                        single-line
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        menuTestDate: false,
        healthForm: {
            testDate: null,
        },
    }),
    methods:{
        //--- Date Formatting ---
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        //--- Fin ---
    },
    computed: {
        formatTestDate: {
            get: function () {
                return this.formatDate(this.healthForm.testDate);
            },
            set: function (newValue) {
                return this.formatDate(newValue);
            }
        },
    },
}
</script>

<style>

</style>