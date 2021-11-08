<template>
    <div>
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <div class="inline-block">
                        <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                        <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    </div>
                    
                    <p class="tit_h1_white text_entrena">GYM VIRTUAL</p>
                </div>
            </div>
        </div>
        <div class="bg_slider" style="height: 800px; width:100%">
            <div style="width: 30%; margin: auto; text-align: center; padding-top: 200px; height: 100%;">
                <h2 class="tit_h1_white">UNA VIKINGA NO ABANDONA</h2>
                <div class="ma-auto rounded-xl pa-10" style="width: 450px; background: rgba(255,255,255,0.5); text-align: left;">
                    <div class="sub_h2_white_login" >USUARIO</div>
                    <v-text-field
                        solo
                    ></v-text-field>
                    <div class="sub_h2_white_login" >CONTRASEÑA</div>
                    <v-text-field
                        solo
                    ></v-text-field>
                    <div class="d-flex align-center">
                        <span class="white--text" style="font-size: 0.8rem">OLVIDE MI CONTRASEÑA</span>
                        <v-spacer></v-spacer>
                        <v-btn
                            depressed
                            color="secondary"
                            class="ml-5"
                            >
                                ENTRAR
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>