<template>
    <v-row no-gutters align="center">
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login" style="width:100%;" />
        </v-col>
        <v-col cols="12" md="6">
            <h1 class="title_pink mb-4">Regístrate ahora</h1>
            <p style="font-family:'Poppins-Regular'; text-align:center;">¿Tienes una cuenta? <a href="/auth/iniciar-sesion">Inicia sesión</a>
            </p>
            <v-sheet width="400" class="mx-auto">
                <v-form ref="loginForm" class="formlogBlue" v-model="valid">
                    <v-row class="mt-3">
                        <v-col cols="12" md="6" class="pa-0 px-1">
                            <label class="text_field_form">Nombre</label>
                            <v-text-field :rules="requiredRule" v-model="userData.nombre" outlined class="register_form"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="pa-0 px-1">
                            <label class="text_field_form">Apellidos</label>
                            <v-text-field :rules="requiredRule" v-model="userData.apellidos" outlined class="register_form"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" class="pa-0 px-1">
                            <label class="text_field_form">Teléfono</label>
                            <vue-tel-input-vuetify outlined label=""  v-model="userData.telefono" :inputOptions={inputtel} :enabledCountryCode=true :clearable=true validCharactersOnly = "true" placeholder="" v-on:country-changed="countryChanged"></vue-tel-input-vuetify>
                        </v-col>
                        <v-col cols="12" md="6" class="pa-0 px-1">
                            <label class="text_field_form">Tipo de Documento</label>
                            <v-select class="register_form" :rules="requiredRule" :items="documents" outlined item-text="name" item-value="id" v-model="userData.tipo_doc"></v-select>
                        </v-col>
                        <v-col cols="12" md="6" class="pa-0 px-1">
                            <label class="text_field_form">Nro. Documento</label>
                            <v-text-field :rules="[docRules]" outlined  v-model="userData.nro_doc" class="register_form"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="pa-0 px-1">
                            <label class="text_field_form">Contraseña</label>
                            <v-text-field class="register_form" outlined v-model="userData.pwd" type="password" :rules="requiredRule"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="pa-0 px-1">
                            <label class="text_field_form">Confirmar contraseña</label>
                            <v-text-field class="register_form" outlined v-model="userData.pwd_rep" type="password" :rules="requiredRule"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" class="pa-0 px-1">
                            <v-btn class="text_btn_white_title" block depressed color="secondary" :disabled="!valid">
                            <v-icon>mdi-chevron-left</v-icon>VOLVER
                        </v-btn>
                        </v-col>
                        <v-col cols="12" md="6" class="pa-0 px-1">
                            <v-btn class="text_btn_white_title" block depressed color="secondary" :disabled="!valid"
                                @click="nextStep">
                                SIGUIENTE<v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    
                </v-form>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";
export default {
    components: {
        VueTelInputVuetify
    },
    data: (e) => ({
        fab: null,
        color: "",
        flat: null,
        show_pwd: String,
        logged_user: null,
        logged_user_token: null,
        documents: [],
        loginUserDialog: false,
        validLoginForm: false,
        enabledCountryCode: true,
        clearablebt:true,
        loginForm: {
            token_name: '',
        },
        inputtel: {
            showDialCode:true
        },
        phone: '',
        cart: [],
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
        userData: {},
        requiredRule: [
            v => !!v || 'Campo obligatorio',
        ],
        emailRules: [
            (v) => !!v || 'Campo obligatorio',
            (v) => /.+@.+\..+/.test(v) || 'Correo Electrónico debe ser válido'
        ],
        valid: true,
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },

    }),
    mounted() {
        this.getTypeDocument();

    },
    methods: {
        countryChanged(country) {
            this.country = country.dialCode;
            this.userData.telefono = "+"+ country.dialCode;
        },
        async nextStep() {
            localStorage.datosUsuario = userData; 
            window.location.replace('/auth/registrarse');
        },
        docRules(v) {
            if (this.order.id_document_type == 2 && !Number.isInteger(Number(v))) {
                return "Ingrese sólo números.";
            }
            if (this.order.id_document_type == 2 && v.length != 8) {
                return "DNI debe tener 8 dígitos.";
            }
            let renovacion = this.cart.filter((item) => item.renovacion == 1);
            if (renovacion.length > 0) {
                this.show_transfer = false;
            }
            return true;
        },
        showToast(msg, color) {
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },
        async getTypeDocument(type = 2) {
            this.$store.commit('loader', true);
            try {
                const data = await this.$API.configuration.getTypeDocument(type);
                this.documents = data.data.data;
                this.$store.commit('loader', false);
            }
            catch (e) {
                this.$store.commit('loader', false);
                console.error(e);
            }
        },
        getLoggedUser() {
            if (localStorage.getItem('token')) {
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');
            }
        },
    }
}
</script>
<style scoped></style>