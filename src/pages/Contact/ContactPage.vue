<template>
    <div>
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <p class="tit_h1_white text_entrena">CONTACTO</p>
                </div>
            </div>
        </div>
        <table>
            <tr>
                <th style="width: 50%;"></th>
                <th style="width: 50%;"></th>
            </tr>
            <tr>
                <td style="text-align: center; padding-right:50px; padding-left:50px;">
                    <div class="form-div">
                        <p class="tit_h2_pink text_entrena">ES HORA DE COMENZAR EL DESAFÍO</p>
                        <h3 style="color: #E30E4F; font-weight:100;">DEJANOS UN MENSAJE Y TE BRINDAREMOS INFORMACION</h3>
                        <v-form ref="contactForm" v-model="validContactForm" @submit.prevent="saveReg()" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-model="contactForm.name"
                                        label="NOMBRES Y APELLIDOS"
                                        :rules="requiredRules"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="contactForm.email"
                                        label="EMAIL"
                                        :rules="emailRules"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="contactForm.phone"
                                        label="TELÉFONO"
                                        type="number"
                                        class="input_txtnumber"
                                        min="0"
                                        :rules="requiredRules"
                                    ></v-text-field>
                                    <v-select
                                        v-model="contactForm.id_plan"
                                        label="ME INTERESA EL PLAN"
                                        :rules="requiredRules"
                                        no-data-text="Planes no disponibles"
                                    ></v-select>
                                    <v-text-field
                                        v-model="contactForm.message"
                                        label="MENSAJE"
                                        :rules="requiredRules"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <br>
                            <v-btn color="#E30E4F"  type="submit" :disabled="!validContactForm"
                                tile
                                outlined
                                large>
                                ENVIAR
                            </v-btn>
                        </v-form>
                    </div>
                </td>
                <td>
                    <div class="parent-div">
                        <img src="@/assets/img/img_carousel_1.png" alt="" class="">
                    </div>
                </td>
            </tr>
        </table>

        <sponsors-section></sponsors-section>
        <frequent-questions></frequent-questions>
    </div>
</template>

<script>
export default {
    data: () => ({
        validContactForm: false,
        contactForm: {

        },
        
        requiredRules: [
            v => !!v || 'Campo Obligatorio'
        ],
        emailRules: [
            v => !!v || 'Campo Obligatorio is required',
            v => /.+@.+\..+/.test(v) || 'Correo Electrónico Invalido',
        ],
    }),
}
</script>

<style>
.parent-div img {
   height: 100%;
   width: 100%;
}
.form-div {
    text-align: center;
    top: 50%;
    left: 1%;
    right: 1%;
}

table {
  width: 100%;
  margin-top:-3.5px;
  margin-bottom:-7.5px;
}
</style>