<template>
    <div class="my-5">
        <v-card class="my-10 rounded-xl pa-10">
            <v-row>
                <v-col>
                    <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">NUTRICIÓN</div>
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
                                <v-date-picker no-title v-model="nutritionForm.testDate" @input="menuTestDate = false" locale="es-ES"></v-date-picker>
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
                    <span style="font-size: 0.9em;">Tipo de alimentación:</span>
                    <v-text-field
                        class="ma-0 pt-0"
                        single-line
                    ></v-text-field>
                    <span style="font-size: 0.9em;">¿Cuántas comidas realiza al día?</span>
                    <v-text-field
                        class="ma-0 pt-0"
                        single-line
                    ></v-text-field>
                    <span style="font-size: 0.9em;">¿Presenta intolerancias o alergias alimentarias? Descríbalas </span>
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
        menuTestDate: false,
        nutritionForm: {
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
                return this.formatDate(this.nutritionForm.testDate);
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