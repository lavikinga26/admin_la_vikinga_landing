<template>
    <div class="my-5">
        <v-card class="my-10 rounded-xl pa-10">
            <v-row>
                <v-col>
                    <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">PLANILLA DE REGISTROS DE PESOS EJERCICIOS MULTIARTICULARES</div>
                    <v-row>
                        <v-col cols="12" md="2" sm="12">
                            <div class="rounded-lg grey lighten-3 text--white px-8 py-10 mb-6" style="width:150px">
                                <v-row>
                                    <v-col cols="12" class="py-2 px-0 my-0 secondary--text" style="border-bottom: 1.5px solid;font-size: 0.9rem !important;">LUNES</v-col>
                                    <v-col cols="12" class="py-2 px-0 my-0 secondary--text" style="border-bottom: 1.5px solid;font-size: 0.9rem !important;">MARTES</v-col>
                                    <v-col cols="12" class="py-2 px-0 my-0 secondary--text" style="border-bottom: 1.5px solid;font-size: 0.9rem !important;">MIERCOLES</v-col>
                                    <v-col cols="12" class="py-2 px-0 my-0 secondary--text" style="border-bottom: 1.5px solid;font-size: 0.9rem !important;">JUEVES</v-col>
                                    <v-col cols="12" class="py-2 px-0 my-0 secondary--text" style="border-bottom: 1.5px solid;font-size: 0.9rem !important;">VIERNES</v-col>
                                    <v-col cols="12" class="py-2 px-0 my-0 secondary--text" style="border-bottom: 1.5px solid;font-size: 0.9rem !important;">SABADO</v-col>
                                    <v-col cols="12" class="py-2 px-0 my-0 secondary--text" style="border-bottom: 1.5px solid;font-size: 0.9rem !important;">DOMINGO</v-col>
                                </v-row>

                            </div>
                        </v-col>
                        <v-col cols="12" md="10" sm="12" class="px-5">
                            <div class="d-flex">
                                <v-spacer></v-spacer>
                                <div class="d-flex align-center" style="font-size: 0.75rem !important;">
                                    SELECCIONA EL MES 
                                    <v-select
                                        style="width: 100px;"
                                        class="ml-3"
                                        color="secondary"
                                        item-color="secondary"
                                        :items="[]"
                                    ></v-select>
                                </div>
                                <div class="d-flex align-center" style="font-size: 0.75rem !important;">
                                    SELECCIONA LA SEMANA
                                    <v-select
                                        style="width: 100px;"
                                        class="ml-3"
                                        color="secondary"
                                        item-color="secondary"
                                        :items="[]"
                                    ></v-select>
                                </div>
                            </div>

                            <div class="d-flex flex-wrap">
                                <div style="width:20%" class="pa-2" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index">
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
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script>
export default {
    data: () => ({

    }),
    watch: {
    },
    methods: {
    },
}
</script>
<style>

</style>