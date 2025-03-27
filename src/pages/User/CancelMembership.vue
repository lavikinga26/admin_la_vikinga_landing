<template>
        <v-container>
            <div class="col-md-12">
                <p class="text_title_white text_entrena">Cancelar Membresía</p>
            </div>
            <v-row>
                <v-col
                    cols="12"
                    md="12"
                    class="d-none d-md-flex d-sm-none"
                    style="position: relative;"
                >
                    <v-card class="rounded-lg" style="background-color: rgba(255, 255, 255, 1); width:100%;" outlined >
                        <div class="align-center justify-center pa-4">
                            <h1 class="text_main_class mt-2" style="text-align:center;">Espera, tenemos algo para ofrecerte</h1>
                            <p
                                class="align-center"
                                style="text-align:center; font-size: 14px; padding: 40px 100px 10px 100px;"
                            >
                                Eres muy valiosa para nosotros y nos gustaria ofrecerte una oferta especial para que te quedes entrenando en el desafío, ¿Qué te parece?
                            </p>
                            <hr>
                            <h1 class="text_box_title" style="text-align:center; color: #0a2240;">Desafío Plus</h1>
                            <p
                                class="align-center"
                                style="text-align:center; font-size: 14px; margin: 2% 360px; color: #6D6D6D; background: rgba(68,189,94, 0.15); border-radius: 20px; padding: 10px;"
                            >
                                <span style="color: #44BD5E; font-weight: bold;">S/ 65</span> en vez de <s>S/ 93</s> para los próximos 3 meses.
                            </p>
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="3"
                                    class="d-none d-md-flex d-sm-none"
                                    style="position: relative;"
                                >
                                    <v-btn class="text_btn_grey_title" block depressed>Cancelar membresía</v-btn>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                    class="d-none d-md-flex d-sm-none"
                                    style="position: relative;"
                                ></v-col>
                                <v-col
                                    cols="12"
                                    md="3"
                                    class="d-none d-md-flex d-sm-none"
                                    style="position: relative;"
                                >
                                    <v-btn class="text_btn_white_title" block depressed color="secondary">Continuar con el beneficio</v-btn>
                                </v-col>
                                
                            </v-row>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
</template>

<style>
    hr{
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0;
    }
</style>