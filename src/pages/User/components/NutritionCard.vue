<template>
    <div class="my-5">
        <v-card class="my-10 rounded-xl pa-10">
            <v-form ref="nutritionForm" v-model="validNutritionForm" @submit.prevent="updateNutritionInfo()" lazy-validation>
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
                                        <v-text-field prepend-icon="mdi-calendar"
                                            v-model="formatTestDate"
                                            v-bind="attrs"
                                            v-on="on"
                                            readonly
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker no-title v-model="infoNutrition.test_date" @input="menuTestDate = false" locale="es-ES"></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>

                        <span style="font-size: 0.9em;">¿Toma Medicación o esta en tratamientos? Descríbala y para qué:</span>
                        <v-text-field
                            v-model="infoNutrition.question1"
                            class="ma-0 pt-0"
                            single-line
                        ></v-text-field>
                        <span style="font-size: 0.9em;">¿Toma algún suplemento? ¿Cuál? ¿Para qué?</span>
                        <v-text-field
                            v-model="infoNutrition.question2"
                            class="ma-0 pt-0"
                            single-line
                        ></v-text-field>
                        <span style="font-size: 0.9em;">Tipo de alimentación:</span>
                        <v-text-field
                            v-model="infoNutrition.question3"
                            class="ma-0 pt-0"
                            single-line
                        ></v-text-field>
                        <span style="font-size: 0.9em;">¿Cuántas comidas realiza al día?</span>
                        <v-text-field
                            v-model="infoNutrition.question4"
                            class="ma-0 pt-0"
                            single-line
                        ></v-text-field>
                        <span style="font-size: 0.9em;">¿Presenta intolerancias o alergias alimentarias? Descríbalas </span>
                        <v-text-field
                            v-model="infoNutrition.question5"
                            class="ma-0 pt-0"
                            single-line
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary" :disabled="!validNutritionForm">Guardar</v-btn>
                </v-card-actions>
            </v-form>
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
        validNutritionForm: false,
        menuTestDate: false,
        nutritionForm:{
            info_nutrition: null,
        },
        infoNutrition:{
            test_date: null,
        },
    }),
    created(){
        this.configNutritionInfo();
    },
    methods:{
        configNutritionInfo(){
            if(this.business_partner.partner_information.info_nutrition){
                this.infoNutrition = JSON.parse(this.business_partner.partner_information.info_nutrition);
            }
        },
        async updateNutritionInfo(){
            try {
                this.$store.commit('loader', true);

                this.nutritionForm.info_nutrition = JSON.stringify(this.infoNutrition);
                const response = await this.$API.business_partner.updateNutritionInfo(this.business_partner.id, this.nutritionForm);

            } catch (e) {
                // UTILS.toastr.error("Ups! Ocurrió un error", this);
                console.error(e);

            } finally {
                this.$store.commit('loader', false);
            }
        },

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
                return this.formatDate(this.infoNutrition.test_date);
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