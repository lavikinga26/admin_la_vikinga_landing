<template>
    <div>
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                    <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    <p class="tit_h1_white text_entrena">CONTACTO</p>
                </div>
            </div>
        </div>
        <v-row>
            <v-col cols="12" md="6" sm="12" class="pa-15">
                <div class="form-div ml-auto p-5">
                    <p class="tit_h2_pink text_entrena">!ES HORA DE COMENZAR EL DESAFÍO¡</p>
                    <h4 style="color: #E30E4F; font-weight:100;">DEJANOS UN MENSAJE Y TE BRINDAREMOS INFORMACION</h4>
                    <v-form ref="contactForm" v-model="validContactForm" @submit.prevent="saveContactInfo()" lazy-validation>
                        <v-row class="mt-10">
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
                                    :items="list_plans"
                                    item-text="title"
                                    item-value="id"
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
                        <div class="text-center">
                            <v-btn color="#E30E4F"  type="submit" :disabled="!validContactForm"
                                tile
                                outlined
                                large>
                                ENVIAR
                            </v-btn>
                        </div>
                    </v-form>
                </div>
            </v-col>
            <v-col cols="12" md="6" sm="12" >
                <img src="@/assets/img/img_carousel_1.png" alt="" class="" style="width: 100%">
            </v-col>
        </v-row>
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
            name: null,
            email: null,
            phone: null,
            id_plan: null,
            message: null,
        }),
        list_plans: [],

        requiredRules: [
            v => !!v || 'Campo Obligatorio'
        ],
        emailRules: [
            v => !!v || 'Campo Obligatorio is required',
            v => /.+@.+\..+/.test(v) || 'Correo Electrónico Invalido',
        ],
    }),
    mounted() {
        this.getListPlans();
    },
    methods:{
        async getListPlans(){
            try {
                const response = await this.$API.plans.list();
                this.list_plans = response.data.data;
                this.contactForm.id_plan = this.list_plans[0].id;

            } catch (e) {
                console.error(e);
            } 
        },
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