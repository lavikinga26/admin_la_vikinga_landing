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
                <h2 class="tit_h1_white" style="text-align:center; padding-bottom: 20px">UNA VIKINGA NO ABANDONA</h2>
                <div class="rounded-xl pa-8 login-card-container" style="">
                    <v-form
                        ref="loginForm"
                        v-model="valid"
                        lazy-validation
                    >
                        <div class="sub_h2_white_login" >USUARIO</div>
                        <v-text-field
                            solo
                            type="email"
                            :rules="emailRules"
                            v-model="loginForm.email"
                        ></v-text-field>
                        <div class="sub_h2_white_login" >CONTRASEÑA</div>
                        <v-text-field
                            solo
                            :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="() => (show_pwd = !show_pwd)"
                            :type="show_pwd ? 'password' : 'text'"
                            :rules="rules"
                            v-model="loginForm.password"
                            @keydown.enter="loginUser"
                        ></v-text-field>
                        <div class="d-flex align-center">
                            <a href="/auth/olvide-contrasena" class="secondary--text" style="font-size: 0.8rem; text-decoration: underline;"><b>OLVIDE MI CONTRASEÑA</b></a>
                            <v-spacer></v-spacer>
                            <v-btn
                                depressed
                                color="secondary"
                                class="ml-5"
                                :disabled="!valid"
                                @click="loginUser"
                                >
                                    ENTRAR
                            </v-btn>
                        </div>
                    </v-form>
                </div>
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
        toast:{
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
        async loginUser(){
            if(this.$refs.loginForm.validate()){
                this.$store.commit('loader',true);
                try {
                    this.loginForm.token_name = "LaVikinga2021";
                    const response = await this.$API.user.login(this.loginForm);
                    const user = response.data.data.user;
                    const token = response.data.data.token;

                    localStorage.setItem('user_data', JSON.stringify(user));
                    localStorage.setItem('token', token);
                    setTimeout(()=>{ 
                        this.$store.commit('loader',false);
                        window.location.replace('/gym-virtual/agenda');
                        //this.$router.push({ path: '/gym-virtual/calendario' });
                    }, 3000);
                    //this.$router.go();
                } catch (e) {
                    this.showToast('Correo Electrónico y/o contraseña incorrecta',"error");
                    this.$store.commit('loader',false);
                    console.error(e);
                }
            }else{
                this.toast.color = "red";
                this.toast.message = "Usuario y/o contraseña incorrecta.";
                this.toast.toast = true;
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