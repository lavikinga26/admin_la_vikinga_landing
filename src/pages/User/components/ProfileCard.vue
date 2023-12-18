<template>
    <div class="my-5">
        <v-row>
            <v-col cols="12" md="6">
                <div class="text_title_white">MI INFORMACIÓN PERSONAL</div>
                <v-card class="my-5 pa-10" dark  color="transparent" style="border: 2px solid #293E58!important; border-radius: 16px;">
                    <v-form ref="profileForm" v-model="validProfileForm" @submit.prevent="updateProfileInfo()" lazy-validation>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-avatar class="rounded-circle" color="grey" size="120" tile>
                                    <v-img 
                                        v-if="profileForm.file_path" 
                                        :src="base_url + profileForm.file_path.path + profileForm.file_path.filename">
                                    </v-img>
                                </v-avatar>
                            </v-col>
                            <v-col cols="12" md="8">
                                <h3><b>{{ profileForm.name }} {{ profileForm.lastname }}</b></h3><br>
                                <v-btn @click="profileImgDialog = true" color="pink" dark>Cambiar Foto</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="12">
                                <label>Nombres</label>
                                <v-text-field
                                    v-model="profileForm.name"
                                    class="ma-0 pt-0"
                                    hide-details
                                    outlined
                                    placeholder="Ingresa aquí tu nombre completo"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <label>Apellidos</label>
                                <v-text-field
                                    v-model="profileForm.lastname"
                                    class="ma-0 pt-0"
                                    hide-details
                                    outlined
                                    placeholder="Ingresa aquí tu apellido completo"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <label>DNI</label>
                                <v-text-field
                                    v-model="profileForm.nro_doc"
                                    class="ma-0 pt-0"
                                    hide-details
                                    outlined
                                    placeholder="Ingresa aquí tu DNI"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <label>Teléfono</label>
                                <v-text-field
                                    v-model="profileForm.phone"
                                    class="ma-0 pt-0"
                                    hide-details
                                    outlined
                                    placeholder="Ingresa aquí tu Teléfono"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <label>Edad</label>
                                <v-text-field
                                    v-model="infoPersonal.age"
                                    class="ma-0 pt-0"
                                    hide-details
                                    outlined
                                    placeholder="Ingresa aquí tu edad"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <label>Género</label>
                                <v-select
                                    v-model="infoPersonal.gender"
                                    class="ma-0 pt-0"
                                    outlined
                                    :items="genders"
                                    item-text="text"
                                    item-value="value"
                                    hide-details>
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <label>Estado civil</label>
                                <v-select
                                    v-model="infoPersonal.civil_status"
                                    class="ma-0 pt-0"
                                    outlined
                                    :items="civil_status"
                                    item-text="text"
                                    item-value="value"
                                    hide-details>
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <label>Madre/Padre de familia</label>
                                <v-select
                                    v-model="infoPersonal.family_guy"
                                    class="ma-0 pt-0"
                                    outlined
                                    :items="family_guy"
                                    item-text="text"
                                    item-value="value"
                                    hide-details>
                                </v-select>
                            </v-col>
                        </v-row>
                        <br>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn type="submit" class="btn_pink_white_submit" :disabled="!validProfileForm">Guardar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="6">
                <div class="text_title_white">CAMBIAR MI CONTRASEÑA</div>
                <v-card class="my-5 pa-10" dark  color="transparent" style="border: 2px solid #293E58!important; border-radius: 16px;">
                    <p>Aquí podrás cambiar tu contraseña para acceder a tu cuenta</p>
                    <v-row>
                        <v-col cols="12" md="12" sm="12">
                            <label>Contraseña actual</label>
                            <v-text-field
                                class="ma-0 pt-0"
                                hide-details
                                outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <label>Nueva contraseña</label>
                            <v-text-field
                                class="ma-0 pt-0"
                                hide-details
                                outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <label>Confirmar contraseña</label>
                            <v-text-field
                                class="ma-0 pt-0"
                                hide-details
                                outlined
                            ></v-text-field>
                        </v-col>
                        <v-btn type="submit" class="btn_pink_white_submit" :disabled="!validProfileForm">Guardar</v-btn>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

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
        profileForm: {
            info_personal: null,
        },
        infoPersonal: {
        },
        genders: [
            { "text": "Femenino", "value": 1 },
            { "text": "Masculino", "value": 2 },
            { "text": "Otro", "value": 3 }
        ],
        civil_status: [
            { "text": "Casada(o)", "value": 2 },
            { "text": "Soltera(o)", "value": 1 },
            { "text": "Viuda (o)", "value": 3 }
        ],
        family_guy: [
            { "text": "Si", "value": true },
            { "text": "No", "value": false }
        ],
        insignia: {
        },
        insignias: [],
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
                const data = [];
                for (let index = 0; index < this.insignia.insignias.length; index++) {
                    const element = this.insignia.insignias[index];
                    for (let j = 0; j < element.cant; j++) {
                        data.push(element.tipo);
                    }
                }
                this.insignias = data;
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