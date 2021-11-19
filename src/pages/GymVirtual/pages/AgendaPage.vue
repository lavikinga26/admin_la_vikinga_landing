<template>
    <div>
        <v-container>
            <div class="text-center my-3">
                <h1>AGENDA</h1>
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
                        min-height="280"
                        max-width="1000"
                        >
                            <div class="primary white--text pa-3 px-15">
                                YOGA PRINCIPIANTES 2
                            </div>
                            <v-card-text>
                                <v-row height="280">
                                    <v-col cols="12" md="4" class="pa-4" align-items="center">
                                        <v-img
                                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
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
                                    <v-col cols="12" md="8">

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
                            <div class="primary white--text pa-3 px-15">
                                YOGA AVANZADO 2
                            </div>
                            <v-card-text>
                                <v-row height="280">
                                    <v-col cols="12" md="4" class="pa-4" align-items="center">
                                        <v-img
                                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
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
                                    <v-col cols="12" md="8">

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
                            <div class="secondary white--text pa-3 px-15">
                                YOGA PRINCIPIANTES 2
                            </div>
                            <v-card-text>
                                <v-row height="280">
                                    <v-col cols="12" md="4" class="pa-4" align-items="center">
                                        <v-img
                                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
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
                                    <v-col cols="12" md="8">

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