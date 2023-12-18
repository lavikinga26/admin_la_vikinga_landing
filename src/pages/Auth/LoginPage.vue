<template>
    <v-row no-gutters align="center">
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login" style="width:100%;"/>
        </v-col>
        <v-col cols="12" md="6">
            <h1 class="title_pink mb-4">INICIAR SESIÓN</h1>
            <v-sheet width="350" class="mx-auto">
                <v-form
                    ref="loginForm"
                    class="formlog"
                    v-model="valid"
                    lazy-validation
                >
                    <div>Usuario</div>
                    <v-text-field
                        outlined
                        type="email"
                        :rules="emailRules"
                        v-model="loginForm.email"
                    ></v-text-field>
                    <div>Contraseña</div>
                    <v-text-field
                        outlined
                        :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (show_pwd = !show_pwd)"
                        :type="show_pwd ? 'password' : 'text'"
                        :rules="rules"
                        v-model="loginForm.password"
                        @keydown.enter="loginUser"
                    ></v-text-field>
                    <div class="text-right mb-4">
                        <a href="/auth/olvide-contrasena" style="font-size: 0.8rem; color: #000; font-family:'Poppins-Regular';"><b>¿Olvidaste tu contraseña?</b></a>
                    </div>
                        <v-btn
                            class="text_btn_white_title"
                            block
                            depressed
                            color="secondary"
                            :disabled="!valid"
                            @click="loginUser"
                            >
                                INICIAR SESIÓN
                        </v-btn>
                </v-form>
            </v-sheet>
        </v-col>
    </v-row>
    <!--<div>
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
    </div>-->
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


</style>