<template>
    <v-container>
        <div class="col-md-12">
            <p class="text_title_white text_entrena">Cancelar Trial</p>
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
                        <h1 class="text_main_class mt-2" style="text-align:center;">Aún estás en periodo de prueba</h1>
                        <p
                            class="align-center"
                            style="text-align:center; font-size: 14px; padding: 40px 100px 10px 100px;"
                        >
                            Te quedan 3 días de prueba, pero si necesitas más tiempo puedes extender tu periodo de prueba:
                        </p>
                        <v-row>
                            <v-col
                                cols="12"
                                md="3"
                                class="d-none d-md-flex d-sm-none"
                                style="position: relative;"
                            >
                                <v-btn class="text_btn_grey_title" block depressed>Cancelar prueba</v-btn>
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
                                <v-btn class="text_btn_white_title" block depressed color="secondary">Extender prueba</v-btn>
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