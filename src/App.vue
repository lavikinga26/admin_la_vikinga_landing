<template>
    <v-app>
        <div class="primary secondary--text d-flex flex-row py-2 px-15" align="center">
            <v-spacer></v-spacer>
            <span>¡ENTRENA DESDE CUALQUIER PARTE DEL MUNDO!</span>
            <v-spacer></v-spacer>
        </div>
        <div class="d-flex flex-row justify-center my-2" align="center">
            <img style="width: 150px;" src="@/assets/img/logo.png" alt="Logo" />
        </div>

        <navigation :color="'white'" :flat="flat" />
        <v-main class="mt-2">
            <router-view  :key="$route.path" /> 
            <v-scale-transition> 
                <v-btn
                    fab
                    v-show="fab"
                    v-scroll="onScroll"
                    dark
                    fixed
                    bottom
                    right
                    color="secondary"
                    @click="toTop">
                    <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
            </v-scale-transition>
        </v-main>
        <foote />

        <!-- Login User Dialog -->
        <v-dialog v-model="loginUserDialog" max-width="400px" transition="dialog-top-transition">
            <v-card>
                <div style="position: relative; width: 400px; heigth: 400px;">
                    <v-btn small absolute top right dark @click="loginUserDialog = false" color="#004a8d" class="elevation-0">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </div>
                <v-card-title>
                    <span class="headline"><b>INICIAR SESIÓN</b></span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="loginForm" v-model="validLoginForm" @submit.prevent="loginUser()" lazy-validation>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="loginForm.email" placeholder="Email" :rules="emailRules" outlined background-color="white" autocomplete="off"></v-text-field>
                                <v-text-field v-model="loginForm.password" placeholder="Contraseña" :rules="[rules.required]" type="password" outlined background-color="white" autocomplete="off"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-btn type="submit" :disabled="!validLoginForm" color="#990000" dark block><b>Iniciar Sesión</b></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Fin -->
        <!-- Sigin User Dialog -->
        <v-dialog v-model="signupUserDialog" max-width="400px" transition="dialog-top-transition">
            <v-card>
                <div style="position: relative; width: 400px; heigth: 400px;">
                    <v-btn small absolute top right dark @click="signupUserDialog = false" color="#004a8d" class="elevation-0">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </div>
                <v-card-title>
                    <span class="headline"><b>REGISTRARME</b></span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="signupForm" v-model="validSignupForm" @submit.prevent="siginUser()" lazy-validation>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="signupForm.name" placeholder="Nombre" :rules="[rules.required]" outlined background-color="white" autocomplete="off"></v-text-field>
                                <v-text-field v-model="signupForm.email" placeholder="Email" :rules="emailRules" outlined background-color="white" autocomplete="off"></v-text-field>
                                <v-text-field v-model="signupForm.password" placeholder="Contraseña" :rules="[rules.required]" outlined background-color="white" type="password" autocomplete="off"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <!-- <v-btn color="blue darken-1" text @click="signupUserDialog = false">Cancelar</v-btn> -->
                            <v-btn type="submit" :disabled="!signupUserDialog" color="#990000" dark block><b>Registrarme</b></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Fin -->
        <loader></loader>
    </v-app>
</template>

<script>
import navigation from "./components/Navigation";
import foote from "./components/Footer";
import Loader from "./components/shared/Loader.vue"

export default {
    name: "App",
    components: {
        navigation,
        foote,
        Loader
    },

    data: (e) => ({
        fab: null,
        color: "",
        flat: null,

        //--- User Login/Signup ---
        logged_user: null,
        logged_user_token: null,
        userdrop_items: [
            { title: 'Mi Perfil', action: action => {e.myProfile() }  },
            { title: 'Salir', action: action => {e.signOut() } },
        ],

        loginUserDialog: false,
        validLoginForm: false,
        loginForm: {
            token_name: '',
        },

        signupUserDialog: false,
        validSignupForm: false,
        signupForm: {

        },
        //--- End ---

        //--- Form Rules ---
        rules: {
            required: (value) => (value && Boolean(value)) || 'Campo requerido'
        },
        emailRules: [
            (v) => !!v || 'Correo Electrónico es obligatorio',
            (v) => /.+@.+\..+/.test(v) || 'Correo Electrónico debe ser válido'
        ],
        //--- End ---
    }),

    created() {
        this.getLoggedUser();

        const top = window.pageYOffset || 0;
        if (top <= 60) {
            this.color = "primary";
            this.flat = true;
        }
    },

    methods: {
        onScroll(e) {
            if (typeof window === "undefined") return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 60;
        },
        toTop() {
            this.$vuetify.goTo(0);
        },

        //--- Login/Signup Functions ---
        getLoggedUser(){
            if(localStorage.getItem('token')){
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');
            }
        },
        myProfile(){
            console.log("myProfile called!");
        },
        signOut(){
            window.localStorage.clear();
            this.$router.go();
        },
        async loginUser(){
            if(this.$refs.loginForm.validate()){
                try {
                    this.loginForm.token_name = "RealAviles2021";
                    const response = await this.$API.user.login(this.loginForm);
                    const user = response.data.data.user;
                    const token = response.data.data.token;

                    localStorage.setItem('user_data', JSON.stringify(user));
                    localStorage.setItem('token', token);

                    this.$router.go();
                } catch (e) {
                    console.log(e);
                }
            }
        },
        async siginUser(){
            if(this.$refs.signupForm.validate()){
                try {
                    const response = await this.$API.user.register(this.signupForm);
                    alert("Usuario registrado satisfactoriamente");
                    this.$router.go();
                    // const user = response.data;
                    // const token = response.data.token;
                } catch (e) {
                    console.log(e);
                }
            }
        },
        //--- End ---
    },

    watch: {
        fab(value) {
            if (value) {
                this.color = "primary";
                this.flat = false;
            } else {
                this.color = "primary";
                this.flat = true;
            }
        },

        loginUserDialog(){
            if(!this.loginUserDialog){
                // console.log('Dialog is closing');
                this.$refs.loginForm.reset();
                this.validLoginForm = false;
            }
        },
        signupUserDialog(){
            if(!this.signupUserDialog){
                // console.log('Dialog is closing');
                this.$refs.signupForm.reset();
                this.validSignupForm = false;
            }
        },
    },

};
</script>

<style lang="scss" scoped>
    *{
        text-transform: none !important;
        font-family:'Montserrat', sans-serif  !important;
    }
    // .v-dialog .v-card {
    //     overflow-y: visible !important;
    //     overflow-x: visible !important;
    // }
    .v-dialog .v-card__title {
        background: #004a8d !important;
        color: white!important;
    }
    .v-dialog .v-card__text {
        background: #004a8d !important;
        color: white!important;
    }
</style>