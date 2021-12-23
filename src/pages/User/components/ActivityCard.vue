<template>
    <div class="my-5">
        <v-form ref="progressForm" v-model="validProgressForm" @submit.prevent="updateProgressInfo()" lazy-validation>
            <v-card class="my-10 rounded-xl pa-10">
                <v-row>
                    <v-col>
                        <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">Planilla de Registro de Pesos</div>
                    </v-col>
                    <v-col class="text-right">
                        <v-select label="SELECCIONA EL MES"
                            v-model="progress_month"
                            :items="months_list"
                            item-text="name"
                            item-value="id"

                            class="rounded-pill customm-select"
                            background-color="pink lighten-5"
                            filled
                            hide-details
                        ></v-select>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col cols="12" md="2" sm="12">
                        <div class="rounded-xl secondary text--white px-8 py-5 mb-6" style="height: 100px; width:150px">
                            <span class="white--text caption" style="font-weight: 100; letter-spacing: 2px !important;">ALTURA</span>
                            <v-text-field
                                v-model="infoProgress[progress_month].question1"

                                class="ma-0 py-0"
                                placeholder="0"
                                dark
                                hide-details
                                suffix="CM"
                            ></v-text-field>
                        </div>
                        <div class="rounded-xl secondary text--white pa-8 py-5 mb-6" style="height: 100px; width:150px">
                            <span class="white--text caption" style="font-weight: 100; letter-spacing: 2px !important;">PESO</span>
                            <v-text-field
                                v-model="infoProgress[progress_month].question2"

                                class="ma-0 py-0"
                                placeholder="0"
                                dark
                                hide-details
                                suffix="KG"
                            ></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4" sm="12" class="px-10">
                        <v-text-field
                            v-model="infoProgress[progress_month].question3"
                            label="MEDIDAS DE PECHO"
                            hint="VER INDICACIONES PARA REALIZAR LA MEDICIÓN *"
                            persistent-hint
                        ></v-text-field>
                        <v-text-field
                            v-model="infoProgress[progress_month].question4"
                            label="MEDIDAS DE CINTURA"
                            hint="VER INDICACIONES PARA REALIZAR LA MEDICIÓN *"
                            persistent-hint
                        ></v-text-field>
                        <v-text-field
                            v-model="infoProgress[progress_month].question5"
                            label="MEDIDAS DE CADERA"
                            hint="VER INDICACIONES PARA REALIZAR LA MEDICIÓN *"
                            persistent-hint
                        ></v-text-field>
                        <v-text-field
                            v-model="infoProgress[progress_month].question6"
                            label="OBJETIVO MENSUAL"
                        ></v-text-field>
                        <v-text-field
                            v-model="infoProgress[progress_month].question7"
                            label="MESES DEL ENTRENAMIENTO"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12" class="px-4">
                        <v-row>
                            <v-col cols="6">
                                <span style="font-size: 0.9em;">FOTO FRONTAL</span>
                                <v-btn 
                                    @click="bodyPictureDialog = true; file_flag = 0"
                                    color="pink lighten-5 text-center"
                                    class="widt:100%"
                                    depressed
                                    dark
                                    large
                                    block>
                                    <v-icon x-large >mdi-cloud-upload-outline</v-icon>
                                </v-btn>
                                <br>
                            </v-col>
                            <v-col cols="6">
                                <span style="font-size: 0.9em;">FOTO LATERAL</span>
                                <v-btn
                                    @click="bodyPictureDialog = true; file_flag = 1"
                                    color="pink lighten-5 text-center"
                                    class="widt:100%"
                                    depressed
                                    dark
                                    large
                                    block>
                                    <v-icon x-large >mdi-cloud-upload-outline</v-icon>
                                </v-btn>
                                <br>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary" :disabled="!validProgressForm">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <!-- Profile Image Dialog -->
        <v-dialog v-model="bodyPictureDialog" max-width="40%">
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="file_flag == 0">Subir Foto Frontal</span>
                    <span class="headline" v-if="file_flag == 1">Subir Foto Lateral</span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-file-input label="Subir Imagen (máx 200kb)" v-if="file_flag == 0"
                                accept="image/*"
                                ref="frontal_file"
                                @change="onFileChange"
                                :rules="rules.file_size_200kb"
                            ></v-file-input>
                            <v-file-input label="Subir Imagen (máx 200kb)" v-if="file_flag == 1"
                                accept="image/*"
                                ref="lateral_file"
                                @change="onFileChange"
                                :rules="rules.file_size_200kb"
                            ></v-file-input>
                            <v-img :src="img_url"
                                contain
                                max-height="300"
                                max-width="600"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
                <br>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="bodyPictureDialog = false">Cancelar</v-btn>
                    <v-btn color="primary" @click="uploadProfilePhoto()">Guardar</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions> 
            </v-card>
        </v-dialog>
        <!-- Fin -->
    </div>
</template>
<script>
export default {
    props:{
        base_url: {
            type: String,
            default: null,
        },
        business_partner: {
            type: Object,
            default: null,
        },
    },
    data: () => ({
        validProgressForm: false,
        progressForm:{
            info_progress: null,
        },
        infoProgress:[
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],

        progress_month: 0,
        months_list: [
            {id: 0, name:'Enero'},
            {id: 1, name:'Febrero'},
            {id: 2, name:'Marzo'},
            {id: 3, name:'Abril'},
            {id: 4, name:'Mayo'},
            {id: 5, name:'Junio'},
            {id: 6, name:'Julio'},
            {id: 7, name:'Agosto'},
            {id: 8, name:'Septiembre'},
            {id: 9, name:'Octubre'},
            {id: 10, name:'Noviembre'},
            {id: 11, name:'Diciembre'},
        ],

        bodyPictureDialog: false,
        file_flag: 0,
        img_url: null,
        img_file: null,


        //--- Form Rules ---
        rules: {
            file_size_200kb: [
                value => !value || value.size < 200000 || 'El archivo debe pesar menos de 200 kb!',
            ],
        },
        //--- End ---
    }),
    created(){
        this.configProgressInfo();
        this.img_url = this.base_url+"/images/default-profile-picture.png";
    },
    methods: {
        configProgressInfo(){
            if(this.business_partner.partner_information.info_progress){
                this.infoProgress = JSON.parse(this.business_partner.partner_information.info_progress);
            }
        },
        async updateProgressInfo (){
            try {
                this.$store.commit('loader', true);

                this.progressForm.info_progress = JSON.stringify(this.infoProgress);
                const response = await this.$API.business_partner.updateProgressInfo(this.business_partner.id, this.progressForm);

            } catch (e) {
                // UTILS.toastr.error("Ups! Ocurrió un error", this);
                console.error(e);

            } finally {
                this.$store.commit('loader', false);
            }
        },

        //--- Upload Pictures Functions ---
        onFileChange(file) {
            if (!file) {
                this.img_file = null;
                this.img_url = this.base_url+"/images/default-profile-picture.png";

                return;
            }

            this.img_file = this.file_flag != 1 ? this.$refs.frontal_file.lazyValue : this.$refs.lateral_file.lazyValue;
            this.img_url = URL.createObjectURL(this.img_file);
        },
        async uploadProfilePhoto() {
            try {
                this.$store.commit('loader', true);

                let formData = new FormData();
                formData.append('file', this.img_file);
                const response = await this.$API.business_partner.uploadProfilePhoto(formData);
                this.$router.go();

            } catch (e) {
                // UTILS.toastr.error("Ups! Ocurrió un error", this);
                console.error(e);

            } finally {
                this.$store.commit('loader', false);
            }

        },
        //--- End ---
    },
    watch:{
        bodyPictureDialog(){
            if(!this.bodyPictureDialog){
                // console.log('Dialog is closing');
                this.img_file = null;
                if(this.$refs.frontal_file){
                    this.$refs.frontal_file.lazyValue = null;
                }
                if(this.$refs.lateral_file){
                    this.$refs.lateral_file.lazyValue = null;
                }
                
                this.img_url = this.base_url+"/images/default-profile-picture.png";
            }
        },
    }
}
</script>
<style>
.customm-select.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: none;
}
.customm-select.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: none;
    border-style: none;
    border-width: none;
}
.v-messages__wrapper{
    text-align: right;
    font-size: 0.5rem;
    color: #E30E4F;
}

.v-input .v-label {
    font-size: 0.9em;
}
</style>