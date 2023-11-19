<template>
      <v-app id="inspire">
        <v-navigation-drawer
            color="#0A2240"
            class="d-none d-md-flex"
            permanent
            app
        >
            <v-list>
                <v-list-item class="d-flex justify-left">
                <img src="@/assets/img/logo_white.png" alt="Logo" />
                </v-list-item>
            </v-list>
            <v-divider color="white" class="divider_white"></v-divider>
            <v-list>
                <v-list-item link to="/gym-virtual/agenda" class="item_menu">
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 11.8459V15.8568C6 16.6969 6 17.1173 6.16349 17.4381C6.3073 17.7204 6.5366 17.9496 6.81885 18.0934C7.1394 18.2568 7.55925 18.2568 8.39768 18.2568H15.6023C16.4408 18.2568 16.86 18.2568 17.1805 18.0934C17.4628 17.9496 17.6929 17.7204 17.8367 17.4381C18 17.1176 18 16.6979 18 15.8595V11.8459C18 11.4451 17.9997 11.2446 17.9509 11.0582C17.9077 10.8929 17.8369 10.7365 17.7409 10.5952C17.6327 10.4357 17.4822 10.3035 17.1806 10.0396L13.5806 6.88958C13.0206 6.39962 12.7406 6.15476 12.4255 6.06158C12.1479 5.97947 11.852 5.97947 11.5743 6.06158C11.2595 6.15469 10.9799 6.39932 10.4208 6.88854L6.81958 10.0396C6.51798 10.3035 6.36753 10.4357 6.25928 10.5952C6.16334 10.7365 6.09191 10.8929 6.04873 11.0582C6 11.2446 6 11.4451 6 11.8459Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title class="font_menu">Mi Gym</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/gym-virtual/agenda">
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14.625 18H9.375M5 12.6268V7.7735C5 6.80275 5 6.317 5.19074 5.94622C5.35852 5.62008 5.62604 5.3551 5.95532 5.18892C6.32967 5 6.82008 5 7.80017 5H16.2002C17.1803 5 17.6696 5 18.044 5.18892C18.3733 5.3551 18.6417 5.62008 18.8094 5.94622C19 6.31664 19 6.80179 19 7.77066V12.6293C19 13.5982 19 14.0827 18.8094 14.4531C18.6417 14.7792 18.3733 15.0451 18.044 15.2113C17.67 15.4 17.1809 15.4 16.2027 15.4H7.7973C6.81912 15.4 6.3293 15.4 5.95532 15.2113C5.62604 15.0451 5.35852 14.7792 5.19074 14.4531C5 14.0823 5 13.5976 5 12.6268ZM14.1875 10.2L10.25 7.6V12.8L14.1875 10.2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title class="font_menu">Clases Grabadas</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/gym-virtual/agenda">
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.6825 9.05217L18.3895 8.8901C18.3439 8.86493 18.3216 8.8523 18.2996 8.83921C18.081 8.70908 17.8968 8.52927 17.7624 8.31415C17.7489 8.29251 17.7361 8.26981 17.71 8.22495C17.684 8.18014 17.6708 8.15744 17.6587 8.13496C17.5381 7.91116 17.4729 7.66175 17.469 7.40791C17.4686 7.38239 17.4687 7.35631 17.4696 7.30447L17.4753 6.96616C17.4845 6.42478 17.4891 6.15325 17.4125 5.90956C17.3445 5.69311 17.2308 5.49374 17.0789 5.32455C16.9072 5.13331 16.6696 4.99687 16.1938 4.72433L15.7986 4.49796C15.3241 4.22618 15.0868 4.09025 14.8349 4.03843C14.6121 3.99258 14.3821 3.9947 14.1601 4.04425C13.9095 4.10017 13.6752 4.23965 13.2067 4.51844L13.2041 4.51971L12.9209 4.68825C12.8761 4.7149 12.8535 4.72833 12.831 4.74074C12.6083 4.86382 12.3597 4.93188 12.105 4.94001C12.0794 4.94082 12.0532 4.94082 12.001 4.94082C11.9491 4.94082 11.9219 4.94082 11.8963 4.94001C11.6411 4.93184 11.3919 4.86342 11.1689 4.73982C11.1464 4.72737 11.1242 4.71383 11.0793 4.68705L10.7943 4.51699C10.3227 4.23556 10.0866 4.09463 9.83456 4.03843C9.61162 3.9887 9.38087 3.98733 9.15721 4.03376C8.90467 4.0862 8.6673 4.22314 8.19257 4.49702L8.19046 4.49796L7.80018 4.72312L7.79586 4.72575C7.3254 4.99716 7.08961 5.1332 6.91937 5.32367C6.7683 5.49269 6.65538 5.69174 6.5878 5.90762C6.51141 6.15164 6.51548 6.42375 6.52468 6.96769L6.5304 7.30552C6.53127 7.35668 6.53277 7.3821 6.53239 7.40726C6.52861 7.66162 6.46252 7.91154 6.34158 8.13574C6.32962 8.15791 6.31674 8.18008 6.291 8.22437C6.26524 8.26869 6.25277 8.29073 6.23942 8.31212C6.10438 8.52839 5.91933 8.70924 5.6994 8.8396C5.67765 8.85249 5.65472 8.86489 5.60967 8.88971L5.32031 9.04911C4.83887 9.31431 4.5982 9.44703 4.42308 9.63591C4.26817 9.80299 4.15114 10.0012 4.0797 10.217C3.99895 10.461 3.99901 10.7346 4.00026 11.2817L4.00129 11.7289C4.00253 12.2724 4.00423 12.544 4.08516 12.7863C4.15676 13.0007 4.27294 13.1977 4.42699 13.3638C4.60112 13.5515 4.83939 13.6834 5.31718 13.9476L5.60397 14.1062C5.65277 14.1332 5.67733 14.1465 5.70087 14.1606C5.91881 14.2911 6.10241 14.4714 6.23629 14.6865C6.25075 14.7097 6.26464 14.7338 6.2924 14.782C6.31983 14.8296 6.33385 14.8535 6.34654 14.8773C6.46392 15.0982 6.52677 15.3437 6.53105 15.5935C6.53152 15.6205 6.53112 15.6478 6.53019 15.7026L6.52468 16.0268C6.51541 16.5726 6.51138 16.8458 6.58822 17.0905C6.6562 17.307 6.76983 17.5063 6.92171 17.6755C7.0934 17.8668 7.33141 18.0031 7.80721 18.2757L8.20233 18.502C8.6768 18.7738 8.91394 18.9096 9.16584 18.9614C9.38868 19.0072 9.61878 19.0055 9.84082 18.9559C10.0918 18.8999 10.3269 18.7599 10.7967 18.4804L11.0798 18.3118C11.1246 18.2852 11.1473 18.2718 11.1698 18.2594C11.3925 18.1363 11.6408 18.0679 11.8955 18.0598C11.9212 18.0589 11.9473 18.0589 11.9995 18.0589C12.0518 18.0589 12.0779 18.0589 12.1036 18.0598C12.3589 18.0679 12.6088 18.1366 12.8318 18.2602C12.8514 18.271 12.8711 18.2828 12.9056 18.3034L13.2067 18.483C13.6783 18.7645 13.914 18.905 14.166 18.9612C14.3889 19.011 14.6199 19.013 14.8435 18.9665C15.096 18.9141 15.3339 18.7769 15.8083 18.5032L16.2045 18.2746C16.6752 18.003 16.9113 17.8669 17.0816 17.6763C17.2326 17.5073 17.3457 17.3083 17.4133 17.0925C17.4891 16.8502 17.4846 16.5802 17.4755 16.0441L17.4696 15.6945C17.4687 15.6433 17.4686 15.6179 17.469 15.5927C17.4728 15.3383 17.5378 15.0883 17.6587 14.8641C17.6706 14.8419 17.6836 14.8196 17.7093 14.7754C17.735 14.7311 17.7484 14.709 17.7617 14.6876C17.8968 14.4714 18.082 14.2904 18.3019 14.16C18.3234 14.1473 18.3455 14.1351 18.3895 14.1108L18.391 14.1102L18.6804 13.9508C19.1618 13.6855 19.403 13.5527 19.5781 13.3638C19.733 13.1967 19.8499 12.9988 19.9213 12.783C20.0016 12.5404 20.001 12.2684 19.9997 11.7277L19.9987 11.2709C19.9974 10.7274 19.9968 10.4559 19.9158 10.2135C19.8442 9.99913 19.7274 9.80211 19.5734 9.63603C19.3994 9.44849 19.1608 9.31655 18.6839 9.05285L18.6825 9.05217Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.79901 11.5001C8.79901 13.2575 10.2323 14.6822 12.0003 14.6822C13.7683 14.6822 15.2015 13.2575 15.2015 11.5001C15.2015 9.74261 13.7683 8.31792 12.0003 8.31792C10.2323 8.31792 8.79901 9.74261 8.79901 11.5001Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title class="font_menu">Retos</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/gym-virtual/agenda">
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 15.3333H9.94118M5 11.1667H12.4118M16.5294 10.3333V17M16.5294 17L19 14.5M16.5294 17L14.0588 14.5M5 7H14.8824" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title class="font_menu">Recursos</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/gym-virtual/agenda">
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8.74773 8.25H7.75363C6.69695 8.25 6.16905 8.25 5.79322 8.46543C5.46341 8.65447 5.20989 8.95309 5.07751 9.30927C4.92674 9.71489 5.01352 10.2352 5.18702 11.2755L5.18739 11.2774L5.94625 15.8274C6.07498 16.5993 6.13977 16.9854 6.33249 17.275C6.50237 17.5303 6.74084 17.7321 7.02075 17.8576C7.3383 17.9999 7.72966 18 8.5127 18H15.4875C16.2705 18 16.6616 17.9999 16.9792 17.8576C17.2591 17.7321 17.4977 17.5303 17.6676 17.275C17.8603 16.9854 17.9248 16.5993 18.0535 15.8274L18.8124 11.2774L18.8131 11.2743C18.9865 10.2348 19.0732 9.71473 18.9225 9.30927C18.7901 8.95309 18.5372 8.65447 18.2074 8.46543C17.8316 8.25 17.3028 8.25 16.2461 8.25H15.2523M8.74773 8.25H15.2523M8.74773 8.25C8.74773 6.45507 10.2038 5 12 5C13.7962 5 15.2523 6.45507 15.2523 8.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title class="font_menu">Tienda</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-divider color="white" class="divider_white"></v-divider>
            <v-list v-if="isLogged">
                <v-list-item class="d-flex justify-left">
                    <img src="@/assets/img/logo_white.png" alt="Logo" />
                </v-list-item>
                <v-list-item>
                    <v-list-item-title class="font_menu">nicole bouroncle</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
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
        getLoggedUser() {
            if (localStorage.getItem('token')) {
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');
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
        getLoggedUser() {
            if (localStorage.getItem('token')) {
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');

                this.getPartnerData(this.logged_user.id);
            } else {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
        //--- End ---
    },

    computed: {
        isLogged() {
            return this.$store.getters.isLoggedIn;
        },
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