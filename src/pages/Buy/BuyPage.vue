<template>
    <v-row no-gutters align="center">
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login" style="width:100%;"/>
        </v-col>
        <v-col cols="12" md="6">
            <h1 class="title_pink mb-4">EMPECEMOS</h1>
            <p style="font-family:'Poppins-Regular'; text-align:center;">¿Tienes una cuenta? <a href="/auth/iniciar-sesion">Inicia sesión</a></p>
            <v-sheet width="350" class="mx-auto">
                <v-form ref="loginForm" class="formlogBlue" v-model="valid">
                    <div>Email</div>
                    <v-text-field outlined type="email" :rules="emailRules" v-model="loginForm.email"></v-text-field>
                    <div class="text-left mb-4" style="font-family: 'Poppins-Regular';">
                        <v-checkbox> 
                            <div slot='label'>Aceptas los <a href="/auth/olvide-contrasena"
                            style="color: #000; font-family:'Poppins-Regular';" @click.stop><b>términos y condiciones</b></a> y nuestra <a href="#" style="color: #000; font-family:'Poppins-Regular';"><b>política de privacidad</b></a>.</div>
                        </v-checkbox>
                    </div>
                    <v-btn class="text_btn_white_title" block depressed color="secondary" :disabled="!valid"
                        @click="nextStep">
                        SIGUIENTE<v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-form>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
export default {

    data: (e) => ({
        fab: null,
        color: "",
        flat: null,
        show_pwd: String,
        //--- User Login/Signup ---
        logged_user: null,
        logged_user_token: null,

        loginUserDialog: false,
        validLoginForm: false,
        loginForm: {
            token_name: '',
        },
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
        //--- End ---

        //--- Form Rules ---
        rules: [
            v => !!v || 'Campo obligatorio',
        ],
        emailRules: [
            (v) => !!v || 'Campo obligatorio',
            (v) => /.+@.+\..+/.test(v) || 'Correo Electrónico debe ser válido'
        ],
        //--- End ---
        valid: false,

        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },

    }),

    methods: {
        showToast(msg, color) {
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },
        getLoggedUser() {
            if (localStorage.getItem('token')) {
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');
            }
        },
        async nextStep() {
            localStorage.emailRegistro = this.loginForm.email;
            window.location.replace('/proceso_compra/step2');
            
        },
    }
}
</script>
<style scoped></style>