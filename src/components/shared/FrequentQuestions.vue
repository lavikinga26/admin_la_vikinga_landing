<template>
    <div class="py-5 mx-auto" style="max-width:900px; min-height: 450px">
        <div class="container-fluid pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <p class="tit_h1_pink text_entrena">PREGUNTAS FRECUENTES</p>
                </div>
            </div>
        </div>
        <v-expansion-panels 
            dark 
            accordion
            v-model="panel"    
        >
            <v-expansion-panel
            class="elevation-0"
            >
                <v-expansion-panel-header class="secondary white--text">
                ¿Qué es La Vikinga?
                </v-expansion-panel-header>
                <v-expansion-panel-content  class="white black--text py-3">
                    <div>
                        ¡Hola chic@s! Ahora que está de moda todo esto de la gordo fobia, quiero contarles como ha sido mi experiencia en todos estos años. Desde pequeña he tenido sobrepeso y he sido feliz porque cuando eres niña en ese momento solo te importa jugar.
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel
            class="elevation-0"
            >
                <v-expansion-panel-header class="secondary white--text">
                ¿Como Funciona?
                </v-expansion-panel-header>
                <v-expansion-panel-content  class="white black--text py-3">
                    <div>
                        Tienes que poner el producto en el carrito y procesar la compra. Después, te pedirá los datos de facturación y te pedirá un email y una contraseña. Es muy importante que te acuerdes de lo que pones porque será tu usuario de acceso a la plataforma.
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>  
</template>
<script>
export default {
    data: () => ({
      panel: 0,
      disabled: false,
      readonly: false,
    }),
}
</script>