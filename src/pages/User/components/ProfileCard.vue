<template>
    <div class="my-5">
        <v-card class="my-10 rounded-xl pa-10">
            <v-row>
                <v-col cols="12" md="3" sm="12" align="center">
                    <div>
                        <v-avatar class="profile rounded-circle" color="grey" size="164" tile>
                            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                        </v-avatar>
                        <h3 class="mx-10 my-5"><b>HOLA VIKINGA_012</b></h3>
                    </div>
                </v-col>
                <v-col cols="12" md="9" sm="12" class="px-15">
                    <div>
                        <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">MI INFORMACIÓN PERSONAL</div>
                        <v-row class="align-center">
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">NOMBRES</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    class="ma-0 pt-0"
                                    hide-details
                                    single-line
                                    placeholder="Ingresa aquí tu nombre completo"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">APELLIDOS</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    class="ma-0 pt-0"
                                    hide-details
                                    placeholder="Ingresa aquí tu apellido completo"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">DNI</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    class="ma-0 pt-0"
                                    hide-details
                                    placeholder="Ingresa aquí tu DNI"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">EDAD</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    class="ma-0 pt-0"
                                    hide-details
                                    placeholder="Ingresa aquí tu edad"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">GÉNERO</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-radio-group
                                    row
                                    hide-details
                                    class="ma-0 pt-0"
                                >
                                    <v-radio
                                        label="Femenino"
                                        value="radio-1"
                                    ></v-radio>
                                    <v-radio
                                        label="Masculino"
                                        value="radio-2"
                                    ></v-radio>
                                    <v-radio
                                        label="Otro"
                                        value="radio-3"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">ESTADO CIVIL</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-radio-group
                                    row
                                    hide-details
                                    class="ma-0 pt-0"
                                >
                                    <v-radio
                                        label="Soltera(o)"
                                        value="radio-1"
                                    ></v-radio>
                                    <v-radio
                                        label="Casado(0)"
                                        value="radio-2"
                                    ></v-radio>
                                    <v-radio
                                        label="Viudo(0)"
                                        value="radio-3"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">MADRE/PADRE FAMILIA</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-radio-group
                                    row
                                    hide-details
                                    class="ma-0 pt-0"
                                >
                                    <v-radio
                                        label="Sí"
                                        value="radio-1"
                                    ></v-radio>
                                    <v-radio
                                        label="No"
                                        value="radio-2"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>