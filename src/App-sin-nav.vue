<template>
    <v-app id="inspire">
        <v-main class="mt-2 fixed_main">
            <router-view :key="$route.path" />
            <v-scale-transition>
                <v-btn fab v-show="fab" v-scroll="onScroll" dark fixed bottom right color="secondary" @click="toTop">
                    <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
            </v-scale-transition>
        </v-main>
        <loader></loader>
    </v-app>
</template>

<style>
@import 'https://d23b52o2im4p82.cloudfront.net/css/flex-capture.css';
</style>
<script>
import navigation from "./components/Navigation";
import foote from "./components/Footer";
import Loader from "./components/shared/Loader.vue"

export default {
    name: "App",
    components: {
        foote,
        Loader
    },

    data: (e) => ({
        fab: null,
        color: "",
        flat: null,
        drawer: null,
        business_partner: {},
        //--- User Login/Signup ---
        logged_user: null,
        logged_user_token: null,
        userdrop_items: [
            { title: 'Mi Perfil', action: action => { e.myProfile() } },
            { title: 'Salir', action: action => { e.LogoutSession() } },
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
        profileForm: {
            info_personal: null,
        },
        base_url: null
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
    computed: {
        isLogged() {
            return this.$store.getters.isLoggedIn;
        },
        StoreCart() {
            return this.$store.getters.StoreCart;
        },
        cartCount() {
            return this.StoreCart.length;
        },
    },
    methods: {
        LogoutSession() {
            window.localStorage.clear();
            this.$router.go();
        },
        onScroll(e) {
            if (typeof window === "undefined") return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 60;
        },
        toTop() {
            this.$vuetify.goTo(0);
        },

        async getBaseUrl() {
            try {
                const data = await this.$API.configuration.getBaseUrl();
                console.log(data);
                this.base_url = data.data;
            }
            catch (e) {
                console.error(e);
            }
        },

        //--- Login/Signup Functions ---
        async getLoggedUser() {
            if (localStorage.getItem('token')) {
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');

                const response = await this.$API.business_partner.getPartner(this.logged_user.id);
                this.business_partner = Object.assign(response.data.data[0]);

                console.log(this.business_partner);
            }
        },
        myProfile() {
            console.log("myProfile called!");
        },
        LogoutSession() {
            window.localStorage.clear();
            this.$router.go();
        },
        async loginUser() {
            if (this.$refs.loginForm.validate()) {
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
        async siginUser() {
            if (this.$refs.signupForm.validate()) {
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

        loginUserDialog() {
            if (!this.loginUserDialog) {
                // console.log('Dialog is closing');
                this.$refs.loginForm.reset();
                this.validLoginForm = false;
            }
        },
        signupUserDialog() {
            if (!this.signupUserDialog) {
                // console.log('Dialog is closing');
                this.$refs.signupForm.reset();
                this.validSignupForm = false;
            }
        },
    },

};
</script>

<style lang="scss" scoped>
* {
    text-transform: none !important;
    /*font-family:'Montserrat', sans-serif;*/
}

// .v-dialog .v-card {
//     overflow-y: visible !important;
//     overflow-x: visible !important;
// }
.v-dialog .v-card__title {
    background: #004a8d !important;
    color: white !important;
}

.v-dialog .v-card__text {
    background: #004a8d !important;
    color: white !important;
}
</style>
