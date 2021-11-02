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
                        <v-form ref="contactForm" v-model="validContactForm" @submit.prevent="saveContactInfo()" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-model="contactForm.name"
                                        label="NOMBRES Y APELLIDOS"
                                        :rules="requiredRules"
                                        autocomplete="off"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="contactForm.email"
                                        label="EMAIL"
                                        :rules="emailRules"
                                        autocomplete="off"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="contactForm.phone"
                                        label="TELÉFONO"
                                        type="number"
                                        class="input_txtnumber"
                                        min="0"
                                        :rules="requiredRules"
                                        autocomplete="off"
                                    ></v-text-field>
                                    <v-select
                                        v-model="contactForm.id_plan"
                                        label="ME INTERESA EL PLAN"
                                        no-data-text="Planes no disponibles"
                                    ></v-select>
                                    <v-text-field
                                        v-model="contactForm.message"
                                        label="MENSAJE"
                                        :rules="requiredRules"
                                        autocomplete="off"
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


        <v-dialog v-model="dialogSuccess" max-width="30%" transition="dialog-top-transition">
            <v-card>
                <v-card-title>
                    <span class="headline">Información Enviada!</span>
                </v-card-title>
                <v-card-text>
                    <span>{{dialogMessage}}</span>
                    <v-card-actions>
                        <v-col class="text-center">
                            <v-btn @click="dialogSuccess = false" color="primary" dark><b>Aceptar</b></v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data: () => ({
        dialogSuccess: false,
        dialogMessage: '',

        validContactForm: false,
        contactForm: new Form({

        }),

        requiredRules: [
            v => !!v || 'Campo Obligatorio'
        ],
        emailRules: [
            v => !!v || 'Campo Obligatorio is required',
            v => /.+@.+\..+/.test(v) || 'Correo Electrónico Invalido',
        ],
    }),
    methods:{
        async saveContactInfo(){
            if(this.$refs.contactForm.validate()){

                this.$store.commit('loader',true);
                try{
                    const response = await this.$API.contact.saveContactInfo(this.contactForm);
                    this.dialogMessage = response.data.data.message;
                    this.dialogSuccess = true;

                    this.$refs.contactForm.reset();
                    this.contactForm.reset();

                } catch(e){
                    console.error(e);

                } finally {
                    this.$store.commit('loader',false);
                }
            }
        }
    }
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