<template>
    <div>
        <div class="pa-5 my-5">
            <div class="text-center my-3">
                <h1>CALENDARIO NOVIEMBRE 2021</h1>
            </div>
            <div class="text-center pt-5">
                <v-sheet
                    class="mx-auto"
                    max-width="240"
                >
                    <v-slide-group
                    multiple
                    show-arrows
                    >
                    <v-slide-item
                        v-for="n in ['NOVIEMBRE','DICIEMBRE','ENERO']"
                        :key="n"
                        v-slot="{ active, toggle }"
                    >
                        <v-btn
                        max-width="120"
                        min-width="120"
                        class="mx-2"
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
        </div>
        <div class="grey lighten-2 d-flex align-center" style="height:450px">
            <v-sheet
                class="mx-auto transparent"
                elevation="0"
                max-width="1300"
            >
                <v-slide-group
                v-model="model"
                class="py-4"
                center-active
                show-arrows
                >
                <v-slide-item
                    v-for="n in ['LUNES 01', 'MARTES 02','MIERCOLES 03','JUEVES 04','VIERNES 05','SABADO 06','DOMINGO 07','LUNES 08','MARTES 09','MIERCOLES 10']"
                    :key="n"
                    v-slot="{ active, toggle }"
                >
                    <v-card
                    :color="active ? 'grey lighten-5' : 'grey lighten-5'"
                    class="my-4 mx-1"
                    height="280"
                    width="180"
                    elevation="3"
                    @click="toggle"
                    >
                        <div class="primary white--text text-center py-2">
                            {{n}}
                        </div>
                        <div class="pa-4">
                            <h5>YOGA PRINCIPIANTES</h5>
                            <p class="mb-3" style="font-size: 0.7rem"> VER VIDEO</p>
                            <h5>ENTRENAMIENTO PRINCIPIANTES</h5>
                            <p class="mb-3" style="font-size: 0.7rem"> VER VIDEO</p>
                            <h5>TALLER NUTRICIÓN</h5>
                        </div>
                        <!--<v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                        >
                            <v-scale-transition>
                            <v-icon
                                v-if="active"
                                color="white"
                                size="48"
                                v-text="'mdi-close-circle-outline'"
                            ></v-icon>
                            </v-scale-transition>
                        </v-row>-->
                        <v-card-actions class="card-actions text-center">
                            <v-row align="center">
                                <v-col cols="12" align="center">
                                    <v-btn color="secondary"
                                        depressed
                                        small
                                        class="px-2">
                                        <span class="ma-3">VER DÍA</span>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            
                        </v-card-actions>
                    </v-card>
                </v-slide-item>
                </v-slide-group>
            </v-sheet>
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
.card-actions {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>