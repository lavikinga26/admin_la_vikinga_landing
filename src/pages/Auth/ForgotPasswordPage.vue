<template>
    <div>
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <div class="inline-block">
                        <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                        <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    </div>
                    
                    <p class="tit_h1_white text_entrena">GYM VIRTUAL</p>
                </div>
            </div>
        </div>
        <div class="bg_login login-container">
            <div>
                <div class="rounded-xl pa-8 login-card-container" style="">
                    <h2 style="text-align:center; padding-bottom: 20px;" class="white--text">¿Se te olvidó tu contraseña?</h2>
                    <p style="text-align: center;" class="white--text">Ingrese la dirección de correo electrónico de tu cuenta y te enviaremos un enlace para restablecer tu contraseña.</p>
                    <v-form
                        ref="loginForm"
                        v-model="valid"
                        lazy-validation
                    >
                        <div class="sub_h2_white_login" >CORREO ELECTRÓNICO</div>
                        <v-text-field
                            solo
                            type="email"
                            :rules="emailRules"
                            v-model="loginForm.email"
                        ></v-text-field>
                        <div class="d-flex align-center">
                            <v-btn
                                depressed
                                block
                                color="secondary"
                                :disabled="!valid"
                                @click="sendRecover"
                                >
                                    Solicitar restablecimiento de contraseña
                            </v-btn>
                        </div>
                    </v-form>
                </div>
            </div>
            <v-snackbar
                v-model="toast.toast"
                :timeout="toast.timeout"
                :color="toast.color"
                dark
                >
                {{ toast.message }}
            </v-snackbar>
        </div>
    </div>
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