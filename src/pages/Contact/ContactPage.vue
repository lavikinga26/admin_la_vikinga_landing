<template>
    <div>
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <p class="tit_h1_white text_entrena">CONTACTO</p>
                </div>
            </div>
        </div>
        <div class="container-fluid pt-3 mt-n5">
            <div class="row mt-4">
                <div class="col-2">
                </div>
                <div class="col-4">
                    <v-form>
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
                                ></v-select>
                                <v-text-field
                                    v-model="contactForm.message"
                                    label="MENSAJE"
                                    :rules="requiredRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </div>
                <div class="col-4">

                </div>
                <div class="col-2">
                </div>
            </div>
        </div>
        <!-- <div class="row mt-4">
            <v-form>
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-text-field
                            v-model="contactForm.name"
                            label="Nombres y apellidos"
                            filled
                            :rules="requiredRules"
                            hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </div> -->

        <sponsors-section></sponsors-section>
        <frequent-questions></frequent-questions>
    </div>
</template>

<script>
export default {
    data: () => ({
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
</style>