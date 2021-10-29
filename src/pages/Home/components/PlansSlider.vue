<template>
    <div style="background-color: #0b152a">
        <v-sheet
            class="mx-auto"
            elevation="'0'"
            max-width="1150"
            color="#0b152a"
            dark
        >
            <v-slide-group
            v-model="model"
            class="pa-4"
            center-active
            show-arrows
            >
            <v-slide-item
                v-for="n in 15"
                :key="n"
                v-slot="{ active, toggle }"
            >
                <v-card
                color="primary"
                class="ma-4"
                height="500"
                width="300"
                @click="toggle"
                >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <v-scale-transition>
                        <div class="item">
                            <div class="blog-entry">
                                <a href="#" class="block-20 d-flex align-items-start" >
                                    <img src="assets/images/img_carousel_2.png" alt="">
                                </a>
                                <div class="text p-2 bd_desc_carousel">
                                    <ul>
                                        <li>Entrenamientos Semanales</li>
                                        <li>Sesiones Express</li>
                                        <li>Special Sessions</li>
                                        <li>Masterclass</li>
                                        <li>Recetas y Tips</li>
                                        <li>Plan de Carreras</li>
                                    </ul>
                                    <p class="price_carousel text-center">
                                        S/. 972.00
                                    </p>
                                    <p class="text-center">
                                         <v-btn color="secondary"
                                            depressed
                                            class="px-2">
                                            <span class="ma-3">COMPRAR AHORA</span>
                                        </v-btn>
                                    </p>
                                </div>
                            </div>
                        </div>

                    <v-icon
                        v-if="active"
                        color="white"
                        size="48"
                        v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                    </v-scale-transition>
                </v-row>
                </v-card>
            </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>
<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>