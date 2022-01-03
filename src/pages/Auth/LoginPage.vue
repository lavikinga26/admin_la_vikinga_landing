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
        <div class="bg_login" style="height: 800px; width:100%">
            <div style="width: 30%; margin: auto; text-align: center; padding-top: 200px; height: 100%;">
                <h2 class="tit_h1_white">UNA VIKINGA NO ABANDONA</h2>
                <div class="ma-auto rounded-xl pa-10" style="width: 450px; background: rgba(255,255,255,0.5); text-align: left;">
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
                            type="password"
                            :rules="rules"
                            v-model="loginForm.password"
                        ></v-text-field>
                        <div class="d-flex align-center">
                            <a class="white--text" style="font-size: 0.8rem">OLVIDE MI CONTRASEÑA</a>
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
            token_name: '',
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
    }),

    methods:{
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
                        window.location.replace('/cuenta/mi-perfil');
                        //this.$router.push({ path: '/gym-virtual/calendario' });
                    }, 3000);
                    
                    //this.$router.go();
                } catch (e) {
                    this.$store.commit('loader',false);
                    console.error(e);
                }
            }
        },
    }
}
</script>