<template>
    <v-app id="inspire">
        <v-navigation-drawer
            color="#0A2240"
            v-model="drawer"
            :permanent="$vuetify.breakpoint.mdAndUp"
            absolute
            left
            app
        >
            <v-list>
                <v-list-item class="d-flex justify-left">
                    <img src="@/assets/img/logo_white.png" alt="Logo" />
                    
                </v-list-item>
            </v-list>
            <v-divider color="white" class="divider_white"></v-divider>
            <v-list>
                <v-list-item link to="/gym-virtual/agenda" class="item_menu" >
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 11.8459V15.8568C6 16.6969 6 17.1173 6.16349 17.4381C6.3073 17.7204 6.5366 17.9496 6.81885 18.0934C7.1394 18.2568 7.55925 18.2568 8.39768 18.2568H15.6023C16.4408 18.2568 16.86 18.2568 17.1805 18.0934C17.4628 17.9496 17.6929 17.7204 17.8367 17.4381C18 17.1176 18 16.6979 18 15.8595V11.8459C18 11.4451 17.9997 11.2446 17.9509 11.0582C17.9077 10.8929 17.8369 10.7365 17.7409 10.5952C17.6327 10.4357 17.4822 10.3035 17.1806 10.0396L13.5806 6.88958C13.0206 6.39962 12.7406 6.15476 12.4255 6.06158C12.1479 5.97947 11.852 5.97947 11.5743 6.06158C11.2595 6.15469 10.9799 6.39932 10.4208 6.88854L6.81958 10.0396C6.51798 10.3035 6.36753 10.4357 6.25928 10.5952C6.16334 10.7365 6.09191 10.8929 6.04873 11.0582C6 11.2446 6 11.4451 6 11.8459Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title :class="currentRoute == '/gym-virtual/agenda' ? 'font_menu_active': 'font_menu'">Mi Gym</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/gym-virtual/clases-grabadas">
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14.625 18H9.375M5 12.6268V7.7735C5 6.80275 5 6.317 5.19074 5.94622C5.35852 5.62008 5.62604 5.3551 5.95532 5.18892C6.32967 5 6.82008 5 7.80017 5H16.2002C17.1803 5 17.6696 5 18.044 5.18892C18.3733 5.3551 18.6417 5.62008 18.8094 5.94622C19 6.31664 19 6.80179 19 7.77066V12.6293C19 13.5982 19 14.0827 18.8094 14.4531C18.6417 14.7792 18.3733 15.0451 18.044 15.2113C17.67 15.4 17.1809 15.4 16.2027 15.4H7.7973C6.81912 15.4 6.3293 15.4 5.95532 15.2113C5.62604 15.0451 5.35852 14.7792 5.19074 14.4531C5 14.0823 5 13.5976 5 12.6268ZM14.1875 10.2L10.25 7.6V12.8L14.1875 10.2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title :class="currentRoute == '/gym-virtual/clases-grabadas' ? 'font_menu_active' : 'font_menu'">Clases Grabadas</v-list-item-title>
                </v-list-item>

                <!--<v-list-item link to="/gym-virtual/retos">
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.6825 9.05217L18.3895 8.8901C18.3439 8.86493 18.3216 8.8523 18.2996 8.83921C18.081 8.70908 17.8968 8.52927 17.7624 8.31415C17.7489 8.29251 17.7361 8.26981 17.71 8.22495C17.684 8.18014 17.6708 8.15744 17.6587 8.13496C17.5381 7.91116 17.4729 7.66175 17.469 7.40791C17.4686 7.38239 17.4687 7.35631 17.4696 7.30447L17.4753 6.96616C17.4845 6.42478 17.4891 6.15325 17.4125 5.90956C17.3445 5.69311 17.2308 5.49374 17.0789 5.32455C16.9072 5.13331 16.6696 4.99687 16.1938 4.72433L15.7986 4.49796C15.3241 4.22618 15.0868 4.09025 14.8349 4.03843C14.6121 3.99258 14.3821 3.9947 14.1601 4.04425C13.9095 4.10017 13.6752 4.23965 13.2067 4.51844L13.2041 4.51971L12.9209 4.68825C12.8761 4.7149 12.8535 4.72833 12.831 4.74074C12.6083 4.86382 12.3597 4.93188 12.105 4.94001C12.0794 4.94082 12.0532 4.94082 12.001 4.94082C11.9491 4.94082 11.9219 4.94082 11.8963 4.94001C11.6411 4.93184 11.3919 4.86342 11.1689 4.73982C11.1464 4.72737 11.1242 4.71383 11.0793 4.68705L10.7943 4.51699C10.3227 4.23556 10.0866 4.09463 9.83456 4.03843C9.61162 3.9887 9.38087 3.98733 9.15721 4.03376C8.90467 4.0862 8.6673 4.22314 8.19257 4.49702L8.19046 4.49796L7.80018 4.72312L7.79586 4.72575C7.3254 4.99716 7.08961 5.1332 6.91937 5.32367C6.7683 5.49269 6.65538 5.69174 6.5878 5.90762C6.51141 6.15164 6.51548 6.42375 6.52468 6.96769L6.5304 7.30552C6.53127 7.35668 6.53277 7.3821 6.53239 7.40726C6.52861 7.66162 6.46252 7.91154 6.34158 8.13574C6.32962 8.15791 6.31674 8.18008 6.291 8.22437C6.26524 8.26869 6.25277 8.29073 6.23942 8.31212C6.10438 8.52839 5.91933 8.70924 5.6994 8.8396C5.67765 8.85249 5.65472 8.86489 5.60967 8.88971L5.32031 9.04911C4.83887 9.31431 4.5982 9.44703 4.42308 9.63591C4.26817 9.80299 4.15114 10.0012 4.0797 10.217C3.99895 10.461 3.99901 10.7346 4.00026 11.2817L4.00129 11.7289C4.00253 12.2724 4.00423 12.544 4.08516 12.7863C4.15676 13.0007 4.27294 13.1977 4.42699 13.3638C4.60112 13.5515 4.83939 13.6834 5.31718 13.9476L5.60397 14.1062C5.65277 14.1332 5.67733 14.1465 5.70087 14.1606C5.91881 14.2911 6.10241 14.4714 6.23629 14.6865C6.25075 14.7097 6.26464 14.7338 6.2924 14.782C6.31983 14.8296 6.33385 14.8535 6.34654 14.8773C6.46392 15.0982 6.52677 15.3437 6.53105 15.5935C6.53152 15.6205 6.53112 15.6478 6.53019 15.7026L6.52468 16.0268C6.51541 16.5726 6.51138 16.8458 6.58822 17.0905C6.6562 17.307 6.76983 17.5063 6.92171 17.6755C7.0934 17.8668 7.33141 18.0031 7.80721 18.2757L8.20233 18.502C8.6768 18.7738 8.91394 18.9096 9.16584 18.9614C9.38868 19.0072 9.61878 19.0055 9.84082 18.9559C10.0918 18.8999 10.3269 18.7599 10.7967 18.4804L11.0798 18.3118C11.1246 18.2852 11.1473 18.2718 11.1698 18.2594C11.3925 18.1363 11.6408 18.0679 11.8955 18.0598C11.9212 18.0589 11.9473 18.0589 11.9995 18.0589C12.0518 18.0589 12.0779 18.0589 12.1036 18.0598C12.3589 18.0679 12.6088 18.1366 12.8318 18.2602C12.8514 18.271 12.8711 18.2828 12.9056 18.3034L13.2067 18.483C13.6783 18.7645 13.914 18.905 14.166 18.9612C14.3889 19.011 14.6199 19.013 14.8435 18.9665C15.096 18.9141 15.3339 18.7769 15.8083 18.5032L16.2045 18.2746C16.6752 18.003 16.9113 17.8669 17.0816 17.6763C17.2326 17.5073 17.3457 17.3083 17.4133 17.0925C17.4891 16.8502 17.4846 16.5802 17.4755 16.0441L17.4696 15.6945C17.4687 15.6433 17.4686 15.6179 17.469 15.5927C17.4728 15.3383 17.5378 15.0883 17.6587 14.8641C17.6706 14.8419 17.6836 14.8196 17.7093 14.7754C17.735 14.7311 17.7484 14.709 17.7617 14.6876C17.8968 14.4714 18.082 14.2904 18.3019 14.16C18.3234 14.1473 18.3455 14.1351 18.3895 14.1108L18.391 14.1102L18.6804 13.9508C19.1618 13.6855 19.403 13.5527 19.5781 13.3638C19.733 13.1967 19.8499 12.9988 19.9213 12.783C20.0016 12.5404 20.001 12.2684 19.9997 11.7277L19.9987 11.2709C19.9974 10.7274 19.9968 10.4559 19.9158 10.2135C19.8442 9.99913 19.7274 9.80211 19.5734 9.63603C19.3994 9.44849 19.1608 9.31655 18.6839 9.05285L18.6825 9.05217Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.79901 11.5001C8.79901 13.2575 10.2323 14.6822 12.0003 14.6822C13.7683 14.6822 15.2015 13.2575 15.2015 11.5001C15.2015 9.74261 13.7683 8.31792 12.0003 8.31792C10.2323 8.31792 8.79901 9.74261 8.79901 11.5001Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title :class="currentRoute == '/gym-virtual/retos' ? 'font_menu_active' : 'font_menu'">Retos</v-list-item-title>
                </v-list-item>-->
                <v-list-item link to="/gym-virtual/recursos">
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 15.3333H9.94118M5 11.1667H12.4118M16.5294 10.3333V17M16.5294 17L19 14.5M16.5294 17L14.0588 14.5M5 7H14.8824" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title :class="currentRoute == '/gym-virtual/recursos' ? 'font_menu_active' : 'font_menu'">Recursos</v-list-item-title>
                </v-list-item>
                <v-list-item link href="https://shop.lavikingaoficial.com/">
                    <v-list-item-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15.8889 19C15.8889 16.8522 14.1478 15.1111 12 15.1111C9.85223 15.1111 8.11111 16.8522 8.11111 19M15.8889 19H16.5135C17.383 19 17.8178 19 18.1502 18.8306C18.4429 18.6815 18.6815 18.4429 18.8306 18.1502C19 17.8178 19 17.383 19 16.5135V7.48649C19 6.617 19 6.1816 18.8306 5.84918C18.6815 5.55648 18.4429 5.31868 18.1502 5.16955C17.8174 5 17.3825 5 16.5113 5H7.48904C6.61785 5 6.18193 5 5.84918 5.16955C5.55648 5.31868 5.31868 5.55648 5.16955 5.84918C5 6.18193 5 6.61785 5 7.48904V16.5113C5 17.3825 5 17.8174 5.16955 18.1502C5.31868 18.4429 5.55648 18.6815 5.84918 18.8306C6.1816 19 6.617 19 7.48649 19H8.11111M15.8889 19H8.11111M12 12.7778C10.7113 12.7778 9.66667 11.7331 9.66667 10.4444C9.66667 9.15578 10.7113 8.11111 12 8.11111C13.2887 8.11111 14.3333 9.15578 14.3333 10.4444C14.3333 11.7331 13.2887 12.7778 12 12.7778Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title class="font_menu">Tienda</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-divider color="white" class="divider_white"></v-divider>
            <v-list v-if="isLogged">
                <v-list-item class="d-flex justify-left">
                    <v-avatar class="profile rounded-circle" color="grey" size="90" tile>
                        <v-img 
                            v-if="business_partner.file_path" 
                            :src="base_url + business_partner.file_path.path + business_partner.file_path.filename">
                        </v-img>
                    </v-avatar>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title class="font_menu">{{ business_partner.name }} {{ business_partner.lastname }}</v-list-item-title>
                </v-list-item>
                <v-list-item  class="formlog formlogsel">
                    <v-select :items="levels" v-model="id_level" label="Nivel" item-text="level"
                    placeholder="Seleciona" item-value="id_level" class="mt-8" color="#ffffff" outlined v-on:change="filterByLevel()"></v-select>
                </v-list-item>
                <v-list-item link to="/cuenta/mi-perfil">
                    <v-list-item-icon>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.8889 15C11.8889 12.8522 10.1478 11.1111 8 11.1111C5.85223 11.1111 4.11111 12.8522 4.11111 15M11.8889 15H12.5135C13.383 15 13.8178 15 14.1502 14.8306C14.4429 14.6815 14.6815 14.4429 14.8306 14.1502C15 13.8178 15 13.383 15 12.5135V3.48649C15 2.617 15 2.1816 14.8306 1.84918C14.6815 1.55648 14.4429 1.31868 14.1502 1.16955C13.8174 1 13.3825 1 12.5113 1H3.48904C2.61785 1 2.18193 1 1.84918 1.16955C1.55648 1.31868 1.31868 1.55648 1.16955 1.84918C1 2.18193 1 2.61785 1 3.48904V12.5113C1 13.3825 1 13.8174 1.16955 14.1502C1.31868 14.4429 1.55648 14.6815 1.84918 14.8306C2.1816 15 2.617 15 3.48649 15H4.11111M11.8889 15H4.11111M8 8.77778C6.71134 8.77778 5.66667 7.73311 5.66667 6.44444C5.66667 5.15578 6.71134 4.11111 8 4.11111C9.28866 4.11111 10.3333 5.15578 10.3333 6.44444C10.3333 7.73311 9.28866 8.77778 8 8.77778Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </v-list-item-icon>
                    <v-list-item-title class="font_menu">Editar Perfil</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="LogoutSession">
                <v-list-item-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 14.25L14.25 12M14.25 12L12 9.75M14.25 12H6M6 8.43602V8.40015C6 7.56007 6 7.13972 6.16349 6.81885C6.3073 6.5366 6.5366 6.3073 6.81885 6.16349C7.13972 6 7.56007 6 8.40015 6H15.6001C16.4402 6 16.8597 6 17.1805 6.16349C17.4628 6.3073 17.6929 6.5366 17.8367 6.81885C18 7.1394 18 7.55925 18 8.39768V15.6027C18 16.4411 18 16.8604 17.8367 17.1809C17.6929 17.4632 17.4628 17.6929 17.1805 17.8367C16.86 18 16.4408 18 15.6023 18H8.39768C7.55925 18 7.1394 18 6.81885 17.8367C6.5366 17.6929 6.3073 17.4629 6.16349 17.1807C6 16.8598 6 16.4401 6 15.6V15.5625" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </v-list-item-icon>
                <v-list-item-title class="font_menu">Salida</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-row no-gutters class="hidden-md-and-up">
            <v-col cols="10"><img class="pa-2" style="width: 100px;" src="@/assets/img/logo_vikinga_icon_white.png" alt="Logo" /></v-col>
            <v-col cols="2">
                <img class="pa-2" style="width: 55px;" src="@/assets/img/menu_alt_white.png" @click.stop="drawer = !drawer" alt="Logo" /></v-col>
        </v-row>
        <v-row v-if="id_level == null" class="hidden-md-and-up">
            <v-col cols="12">
                <div key="popup_level" class="text-left">
                    <v-alert type="info" color="#E7004C" elevation="0">
                        <b>IMPORTANTE:</b> <a @click.stop="drawer = !drawer" style="color: #fff; font-weight:bold;">Haz click <span style="text-decoration: underline;">aquí</span></a> para seleccionar tu nivel y mostrarte las mejores opciones de entrenamiento.
                    </v-alert>
                </div>
            </v-col>
        </v-row>
        
        <v-main class="mt-2 fixed_main">
            
            <router-view :key="$route.path" /> 
            
            <v-scale-transition> 
                <v-btn
                    dark
                    fixed
                    top
                    right
                    color="secondary"
                    class="boton_flotante"
                    @click="openDialogRating">
                    DÉJANOS TU OPINIÓN
                </v-btn>
            </v-scale-transition>
        </v-main>
        <loader></loader>
        <v-dialog v-model="dialogRating" max-width="500px">
            <v-card clas="pa-4">
            <v-card-title class="font_box_prox_clase_modal justify-center">Déjanos tu opinión</v-card-title>
            <v-card-text class="justify-center" style="color:#000; font-family:'Poppins-Regular';">Nos gustaria saber que puntaje le darías al Desafío Gym Virtual:<br/><br/>
                <v-rating
                    v-model="rating"
                    background-color="pink lighten-3"
                    color="pink"
                    large
                    class="text-center justify-center"
                ></v-rating><br/>
                Déjanos tu comentario:
                <v-text-field label="Comentario" v-model="comentario_rating" outlined></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn class="btn_pink_blue_submit" text @click="dialogRating = false">Cancelar</v-btn>
                <v-btn class="btn_pink_white_submit" text @click="saveRating()">Enviar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
      </v-app>
</template>
<script>
import Loader from "../components/shared/Loader.vue"
    export default {
        name: "SidebarTemplate",
        components: {
            Loader
        },
        data: (e) => ({
            fab: null,
            color: "",
            flat: null,
            drawer: null,
            business_partner: {},
            logged_user: null,
            logged_user_token: null,
            levels: [],
            id_level: null,
            base_url: null,
            dialogRating: false,
            rating: 0,
            comentario_rating: "",
            currentRoute: null
        }),
        created() {
            this.getLoggedUser();

            const top = window.pageYOffset || 0;
            if (top <= 60) {
                this.color = "primary";
                this.flat = true;
            }
            this.currentRoute = this.$router.currentRoute.path;
        },
        mounted() {
            let vm = this;
            vm.loadLevels();
            vm.getBaseUrl();
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
    watch: {
        $route(to, from) {
            this.currentRoute = this.$router.currentRoute.path;
        }
    },
    methods: {
        async saveRating() {
            try {
                let rating = {
                    stars: this.rating,
                    comentario: this.comentario_rating
                };
                const data = await this.$API.rating.saveRating(rating);
                this.dialogRating = false;
                this.showToast("Gracias por tus comentarios!", "green");

            }
            catch (e) {
                console.error(e);
            }
        },
        async loadLevels(page = 1, per_page = 50, sortDesc = 0, sortBy = '') {
            let vm = this;
            try {
                const response = await this.$API.levels.list('?page=' + page + '&itemsPerPage=' + per_page + '&sortDesc=' + sortDesc + '&sortBy=' + sortBy);
                this.levels = response.data.data;
                this.levels.splice(3, 1);
            } catch (e) {
                this.loadingTable = false;
                console.error(e);
            }
        },
        openDialogRating() {
            this.dialogRating = true;
        },
        async filterByLevel() {
            let vm = this;
            let id_level = vm.id_level;

            const data = await this.$API.business_partner.updateLevel(id_level);
            location.reload();
        },
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

                this.id_level = this.business_partner.id_level;
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
    }
</script>