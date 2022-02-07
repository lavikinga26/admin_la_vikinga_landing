<template>
    <div class="my-5">
        <v-card class="my-10 rounded-xl pa-10">
            <v-form ref="profileForm" v-model="validProfileForm" @submit.prevent="updateProfileInfo()" lazy-validation>
                <v-row>
                    <v-col cols="12" md="3" sm="12" align="center">
                        <v-avatar class="profile rounded-circle" color="grey" size="164" tile>
                            <v-img 
                                v-if="profileForm.file_path" 
                                :src="base_url + profileForm.file_path.path + profileForm.file_path.filename">
                            </v-img>
                        </v-avatar>
                        <h3 class="mx-10 my-5"><b>{{profileForm.name}} {{profileForm.lastname}}</b></h3>
                        <v-btn @click="profileImgDialog = true" color="pink" dark>Cambiar Foto</v-btn>
                        <div style="background: #f6e4e9;" class="pa-10 ma-10 rounded-lg">
                            <img :src='require(`@/assets/img/icons/${insignia.insignia}`)' alt="">
                        </div>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" class="px-15">
                        <div class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">MI INFORMACIÓN PERSONAL</div>
                        <v-row class="align-center">
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">NOMBRES</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    v-model="profileForm.name"
                                    class="ma-0 pt-0"
                                    hide-details
                                    single-line
                                    placeholder="Ingresa aquí tu nombre completo"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">APELLIDOS</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    v-model="profileForm.lastname"
                                    class="ma-0 pt-0"
                                    hide-details
                                    placeholder="Ingresa aquí tu apellido completo"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">DNI</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    v-model="profileForm.nro_doc"
                                    class="ma-0 pt-0"
                                    hide-details
                                    placeholder="Ingresa aquí tu DNI"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">Teléfono</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    v-model="profileForm.phone"
                                    class="ma-0 pt-0"
                                    hide-details
                                    placeholder="Ingresa aquí tu Teléfono"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">EDAD</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-text-field
                                    v-model="infoPersonal.age"
                                    class="ma-0 pt-0"
                                    hide-details
                                    placeholder="Ingresa aquí tu edad"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">GÉNERO</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-radio-group
                                    v-model="infoPersonal.gender"
                                    class="ma-0 pt-0"
                                    row
                                    hide-details>
                                    <v-radio
                                        label="Femenino"
                                        :value="1"
                                    ></v-radio>
                                    <v-radio
                                        label="Masculino"
                                        :value="2"
                                    ></v-radio>
                                    <v-radio
                                        label="Otro"
                                        :value="3"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">ESTADO CIVIL</span></v-col>
                            <v-col cols="12" md="8" sm="12">
                                <v-radio-group
                                    v-model="infoPersonal.civil_status"
                                    class="ma-0 pt-0"
                                    row
                                    hide-details>
                                    <v-radio
                                        label="Soltera(o)"
                                        :value="1"
                                    ></v-radio>
                                    <v-radio
                                        label="Casada(o)"
                                        :value="2"
                                    ></v-radio>
                                    <v-radio
                                        label="Viuda(o)"
                                        :value="3"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="12" md="4" sm="12"><span style="font-size: 0.9em;">MADRE/PADRE FAMILIA</span></v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-switch
                                    v-model="infoPersonal.family_guy"
                                    :label="`${infoPersonal.family_guy != true ? 'No' : 'Si'}`"
                                    hide-details
                                ></v-switch>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <br>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary" :disabled="!validProfileForm">Guardar</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>

        <!-- Profile Image Dialog -->
        <v-dialog v-model="profileImgDialog" max-width="40%">
            <v-card>
                <v-card-title>
                    <span class="headline">Cambiar Foto de Perfil</span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-file-input label="Subir Imagen (máx 200kb)"
                                accept="image/*"
                                ref="file"
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
                    <v-btn color="blue darken-1" text @click="profileImgDialog = false">Cancelar</v-btn>
                    <v-btn color="primary" @click="uploadProfilePhoto()">Guardar</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions> 
            </v-card>
        </v-dialog>
        <!-- Fin -->
    </div>
</template>
<script>
import axios from "axios";

export default {
    components: {
        axios,
    },
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
        validProfileForm: false,
        profileForm:{
            info_personal: null,
        },
        infoPersonal:{
        },
        insignia: {
        },
        profileImgDialog: false,
        img_file: null,
        img_url: null,

        //--- Form Rules ---
        rules: {
            file_size_200kb: [
                value => !value || value.size < 200000 || 'El archivo debe pesar menos de 200 kb!',
            ],
        },
        //--- End ---
    }),
    created(){
        this.configPersonalInfo();
        this.getBadge();
        this.img_url = this.base_url+"/images/default-profile-picture.png";
    },
    methods: {
        async getBadge(){
            try {
                const response = await this.$API.business_partner.getBadge();
                this.insignia = response.data.data;
            } catch (e) {
                // UTILS.toastr.error("Ups! Ocurrió un error", this);
                console.error(e);

            }
        },
        configPersonalInfo(){
            this.profileForm = Object.assign({}, this.business_partner);
            if(this.business_partner.partner_information.info_personal){
                this.infoPersonal = JSON.parse(this.business_partner.partner_information.info_personal);
            }
        },
        async updateProfileInfo(){
            try {
                this.$store.commit('loader', true);

                this.profileForm.info_personal  = JSON.stringify(this.infoPersonal);
                const response = await this.$API.business_partner.updateProfileInfo(this.business_partner.id, this.profileForm);
            } catch (e) {
                // UTILS.toastr.error("Ups! Ocurrió un error", this);
                console.error(e);

            } finally {
                this.$store.commit('loader', false);
            }
        },


        //--- Upload Image Functions ---
        onFileChange(file) {
            if (!file) {
                this.img_file = null;
                this.img_url = this.base_url+"/images/default-profile-picture.png";

                return;
            }

            this.img_file = this.$refs.file.lazyValue;
            this.img_url = URL.createObjectURL(this.img_file);
        },
        async uploadProfilePhoto() {
            try {
                this.$store.commit('loader', true);

                let formData = new FormData();
                formData.append('id', this.business_partner.id);
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
        profileImgDialog(){
            if(!this.profileImgDialog){
                // console.log('Dialog is closing');
                this.img_file = null;
                this.$refs.file.lazyValue = null;
                this.img_url = this.base_url+"/images/default-profile-picture.png";
            }
        },
    }
}
</script>