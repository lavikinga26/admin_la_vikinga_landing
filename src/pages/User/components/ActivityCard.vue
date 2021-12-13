<template>
    <div class="my-5">
        <v-card class="my-10 rounded-xl pa-10">
            <v-row>
                <v-col>
                    <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">Planilla de Registro de Pesos</div>
                </v-col>
                <v-col class="text-right">
                    <v-select class="rounded-pill customm-select"
                        :items="months"
                        filled
                        background-color="pink lighten-5"
                        hide-details
                        label="SELECCIONA EL MES"
                    ></v-select>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col cols="12" md="2" sm="12">
                    <div class="rounded-xl secondary text--white px-8 py-5 mb-6" style="height: 100px; width:150px">
                        <span class="white--text caption" style="font-weight: 100; letter-spacing: 2px !important;">ALTURA</span>
                        <v-text-field
                            class="ma-0 py-0"
                            placeholder="0 CM"
                            dark
                            hide-details
                            suffix="CM"
                        ></v-text-field>
                    </div>
                    <div class="rounded-xl secondary text--white pa-8 py-5 mb-6" style="height: 100px; width:150px">
                        <span class="white--text caption" style="font-weight: 100; letter-spacing: 2px !important;">PESO</span>
                        <v-text-field
                            class="ma-0 py-0"
                            placeholder="0 KG"
                            dark
                            hide-details
                            suffix="KG"
                        ></v-text-field>
                    </div>
                </v-col>
                <v-col cols="12" md="5" sm="12" class="px-10">
                    <v-text-field
                        label="MEDIDAS DE PECHO"
                        hint="VER INDICACIONES PARA REALIZAR LA MEDICIÓN *"
                        persistent-hint
                    ></v-text-field>
                    <v-text-field
                        label="MEDIDAS DE CINTURA"
                        hint="VER INDICACIONES PARA REALIZAR LA MEDICIÓN *"
                        persistent-hint
                    ></v-text-field>
                    
                    <v-text-field
                        label="MEDIDAS DE CADERA"
                        hint="VER INDICACIONES PARA REALIZAR LA MEDICIÓN *"
                        persistent-hint
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="5" sm="12" class="px-10">
                    <v-text-field
                        label="OBJETIVO MENSUAL"
                    ></v-text-field>
                    <v-text-field
                        label="MESES DEL ENTRENAMIENTO"
                    ></v-text-field>
                    <v-row>
                        <v-col cols="6">
                            <span style="font-size: 0.9em;">FOTO FRONTAL</span>
                            <v-btn 
                                color="pink lighten-5 text-center"
                                class="widt:100%"
                                depressed
                                dark
                                large
                                block
                            >
                                <v-icon x-large >mdi-cloud-upload-outline</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="6">
                            <span style="font-size: 0.9em;">FOTO DE COSTADO</span>
                            <v-btn 
                                color="pink lighten-5 text-center"
                                class="widt:100%"
                                depressed
                                dark
                                large
                                block
                            >
                                <v-icon x-large >mdi-cloud-upload-outline</v-icon>
                            </v-btn>
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
        months: [],
        base_url: '',
    }),
    watch: {
    },
    methods: {
    },
}
</script>
<style>
.customm-select.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: none;
}
.customm-select.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: none;
    border-style: none;
    border-width: none;
}
.v-messages__wrapper{
    text-align: right;
    font-size: 0.5rem;
    color: #E30E4F;
}

.v-input .v-label {
    font-size: 0.9em;
}
</style>