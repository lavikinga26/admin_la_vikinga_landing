<template>
    <div>
        <v-container>
            <div class="text-center my-3">
                <h1>MI AGENDA</h1>
            </div>
            <div class="text-center py-5">
                <v-sheet
                    class="mx-auto"
                    max-width="1000"
                >
                    <v-slide-group
                    center-active
                    show-arrows
                    >
                    <v-slide-item
                        v-for="n in ['LUN 01','MAR 02','MIE 04','JUE 05','VIE 06','SAB 07','DOM 08']"
                        :key="n"
                        v-slot="{ active, toggle }"
                    >
                        <v-btn
                        max-width="120"
                        min-width="120"
                        class="mx-3"
                        :input-value="active"
                        active-class="secondary white--text"
                        depressed
                        rounded
                        @click="toggle"
                        >
                        {{ n }}
                        </v-btn>
                    </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </div>
        </v-container>
        <div class="grey lighten-2">
            <v-container>
                <v-row>
                    <v-col cols="12" 
                    align="center">
                        <v-card
                        color="grey lighten-5"
                        class="my-3 mx-4"
                        elevation="3"
                        min-height="250"
                        max-width="1000"
                        >
                            <div class="primary white--text text-left pa-3 px-15">
                                ENTRENAMIENTO FUERZA PRINCIPIANTES
                            </div>
                            <v-card-text>
                                <v-row height="250">
                                    <v-col cols="12" md="4" class="pa-4" align-items="center">
                                        <v-img
                                            src="https://i.vimeocdn.com/video/1216681987-4743218d2221b42f2acba382eceedf59e3a83c91aade0ff4b264a3deb6b2a295-d_640"
                                            height="180px"
                                            width="270"
                                            class="ma-auto"
                                        >
                                            
                                            <v-row class="fill-height ma-0"  align="center" justify="center" 
                                            style="background-color:#0000004d">
                                                <v-icon style="font-size: 50px" class="white--text">mdi-motion-play-outline</v-icon>
                                            </v-row>
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" md="8" class="text-left align-center d-flex">
                                        <v-container>
                                            <h3>ENTRENAMIENTO BRAZOS</h3>
                                            <div>HORA: 07:00 AM</div>
                                            <v-row class="my-3">
                                                <v-col cols="12" md="4">
                                                    <h5>TIEMPO:</h5>
                                                    <div>1:00 HR APROX.</div>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <h5>ENFOQUE:</h5>
                                                    <div>BRAZOS</div>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <h5>MATERIAL:</h5>
                                                    <div>MANCUERNAS</div>
                                                </v-col>
                                            </v-row>
                                            <v-btn
                                            tile
                                            color="light-blue lighten-2"
                                            class="rounded"
                                            dark
                                            >
                                                <v-icon left>
                                                    mdi-video
                                                </v-icon>
                                                Entrar a clase
                                            </v-btn>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12"
                    align="center">
                        <v-card
                        color="grey lighten-5"
                        class="my-3 mx-4"
                        elevation="3"
                        min-height="280"
                        max-width="1000"
                        >
                            <div class="primary white--text text-left pa-3 px-15">
                                ENTRENAMIENTO FUERZA AVANZADO
                            </div>
                            <v-card-text>
                                <v-row height="280">
                                    <v-col cols="12" md="4" class="pa-4" align-items="center">
                                        <v-img
                                            src="https://i.vimeocdn.com/video/1216681987-4743218d2221b42f2acba382eceedf59e3a83c91aade0ff4b264a3deb6b2a295-d_640"
                                            height="200px"
                                            width="270"
                                            class="ma-auto"
                                        >
                                            
                                            <v-row class="fill-height ma-0"  align="center" justify="center" 
                                            style="background-color:#0000004d">
                                                <v-icon style="font-size: 50px" class="white--text">mdi-motion-play-outline</v-icon>
                                            </v-row>
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" md="8" class="text-left align-center d-flex">
                                        <v-container>
                                            <h3>ENTRENAMIENTO PIERNAS</h3>
                                            <div>HORA: 07:00 AM</div>
                                            
                                            <v-row class="my-3">
                                                <v-col cols="12" md="4">
                                                    <h5>TIEMPO:</h5>
                                                    <div>1:00 HR APROX.</div>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <h5>ENFOQUE:</h5>
                                                    <div>PIERNAS</div>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <h5>MATERIAL:</h5>
                                                    <div>MANCUERNAS</div>
                                                </v-col>
                                            </v-row>
                                            
                                            <v-btn
                                            tile
                                            color="light-blue lighten-2"
                                            class="mt-5 rounded"
                                            dark
                                            >
                                                <v-icon left>
                                                    mdi-video
                                                </v-icon>
                                                Entrar a clase
                                            </v-btn>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12"
                    align="center">
                        <v-card
                        color="grey lighten-5"
                        class="my-3 mx-4"
                        elevation="3"
                        min-height="280"
                        max-width="1000"
                        >
                            <div class="secondary white--text text-left pa-3 px-15">
                                TALLER: NUTRICION
                            </div>
                            <v-card-text>
                                <v-row height="280">
                                    <v-col cols="12" md="4" class="pa-4" align-items="center">
                                        <v-img
                                            src="https://i.vimeocdn.com/video/1216681987-4743218d2221b42f2acba382eceedf59e3a83c91aade0ff4b264a3deb6b2a295-d_640"
                                            height="200px"
                                            width="270"
                                            class="ma-auto"
                                        >
                                            
                                            <v-row class="fill-height ma-0"  align="center" justify="center" 
                                            style="background-color:#0000004d">
                                                <v-icon style="font-size: 50px" class="white--text">mdi-motion-play-outline</v-icon>
                                            </v-row>
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" md="8" class="text-left align-center d-flex">
                                        <v-container >
                                            <h3>LA NUTRICION EN EL ENTRENAMIENTO</h3>
                                            <div>HORA: 4:00 PM</div>
                                            
                                            <v-row class="my-3">
                                                <v-col cols="12" md="4">
                                                    <h5>TIEMPO:</h5>
                                                    <div>1:00 HR APROX.</div>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <h5>ENFOQUE:</h5>
                                                    <div>TALLER</div>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <h5>MATERIAL:</h5>
                                                    <div>-</div>
                                                </v-col>
                                            </v-row>
                                            
                                            <v-btn
                                            tile
                                            color="light-blue lighten-2"
                                            class="mt-5 rounded"
                                            dark
                                            >
                                                <v-icon left>
                                                    mdi-video
                                                </v-icon>
                                                Entrar a clase
                                            </v-btn>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>
<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
<style>
</style>