<template>
    <v-row no-gutters align="center">
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login" style="width:100%;" />
        </v-col>
        <v-col cols="12" md="6">
            <h1 class="title_pink mb-4">¿Se te olvidó tu contraseña?</h1>
            <p style="font-family:'Poppins-Regular'; text-align:center;" class="mx-5">Ingrese la dirección de correo electrónico de tu cuenta y te enviaremos un enlace para restablecer tu contraseña.</a>
            </p>
            <v-sheet width="400" class="mx-auto">
                <v-form
                    ref="loginForm"
                    v-model="valid"
                    lazy-validation
                >
                    <label class="text_field_form">Email</label>
                    <v-text-field
                        outlined 
                        class="register_form"
                        type="email"
                        :rules="emailRules"
                        v-model="loginForm.email"
                    ></v-text-field>
                    <div class="d-flex align-center">
                        <v-btn
                            block
                            class="white_btn_md"
                            :disabled="!valid"
                            @click="sendRecover"
                            >
                                SOLICITAR RESTABLECIMIENTO
                        </v-btn>
                    </div>
                </v-form>
            </v-sheet>
        </v-col>
        <v-snackbar
            v-model="toast.toast"
            :timeout="toast.timeout"
            :color="toast.color"
            dark
            >
            {{ toast.message }}
        </v-snackbar>
    </v-row>
</template>
<script>
export default {
    
    data: (e) => ({
        fab: null,
        color: "",
        flat: null,

        //--- User Login/Signup ---
        logged_user: null,
        logged_user_token: null,

        loginUserDialog: false,
        validLoginForm: false,
        loginForm: {
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
        valid: true,
        toast:{
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
    }),

    methods:{
        showToast(msg,color){
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },
        getLoggedUser(){
            if(localStorage.getItem('token')){
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');
            }
        },
        async sendRecover(){
            if(this.$refs.loginForm.validate()){
                this.$store.commit('loader',true);
                try {
                    const response = await this.$API.user.forgot(this.loginForm);
                    this.$store.commit('loader',false);
                    this.showToast('Te enviamos un link de restablecimiento a tu bandeja de entrada',"success");
                    //this.$router.go();
                } catch (e) {
                    this.$store.commit('loader',false);
                    this.showToast('No existe un usuario asociado al correo electrónico que ingresaste',"red");
                    console.error(e);
                }
            }
        },
    }
}
</script>
<style scoped>
.login-container{
    height: 800px;
     width:100%;
     display: flex;
     justify-content: center;
     align-items: center;
}
.login-card-container{
    max-width: 450px;
    margin: auto;
    background: rgba(255, 255, 255, 0.418);
    text-align: left;
}
@media (max-width: 520px) {
    .login-container{
        padding-left: 10px;
        padding-right: 10px;
    }
}

</style>