<template>
    <div>
        <v-container>
            <v-row>
                <v-col xs="12" sm="12" md="6" lg="6">
                    <h2 class="text_box_title">Próxima Clase</h2>
                    <v-card :img="require('../../../assets/img/gym_virtual/torso_intermedio.png')" height="300" class="box_gym_virtual" >
                        <v-badge
                        color="#E7004C"
                        content="Mi, 17 - 2pm"
                        inline
                        class="badge_pink"
                        ></v-badge>
                        <h1 class="text_box_gym align-center justify-center">Torso Intermedio</h1>
                    </v-card>

                    <h2 class="text_box_title mt-4">Rutinas</h2>
                    <v-card height="200" class="box_gym_virtual" color="#0A2240">
                        <v-card height="60" class="box_rutina" color="#E7004C">
                            <h4 class="font_rutina pt-2 pl-1">RUTINA PARA EL GIMNASIO</h4>
                            <v-btn class="white_btn" prepend-icon="save">Descargar <v-icon size="small">mdi-file-download-outline</v-icon></v-btn>
                        </v-card>
                    </v-card>

                    <h2 class="text_box_title mt-4">ÚLTIMAS CLASES GRABADAS</h2>
                    <v-card height="680" class="box_gym_virtual" color="#0A2240">
                        <v-row class="pa-3">
                            <v-col cols="12" md="12" sm="12" xs="12">
                                <v-card height="400" class="box_rutina" color="#E7004C" :img="require('../../../assets/img/gym_virtual/video.png')"></v-card>
                            </v-col>
                        </v-row>
                        <v-row class="pa-2">
                            <v-col cols="4" md="4" sm="12" xs="12">
                                <v-card height="200" class="box_rutina" color="#E7004C" :img="require('../../../assets/img/gym_virtual/video2.png')"></v-card>
                            </v-col>
                            <v-col cols="4" md="4" sm="12" xs="12">
                                <v-card height="200" class="box_rutina" color="#E7004C" :img="require('../../../assets/img/gym_virtual/video3.png')"></v-card>
                            </v-col>
                            <v-col cols="4" md="4" sm="12" xs="12">
                                <v-card height="200" class="box_rutina" color="#E7004C" :img="require('../../../assets/img/gym_virtual/video4.png')"></v-card>
                            </v-col>

                        </v-row>
                    </v-card>
                </v-col>
                <v-col xs="12" sm="12" md="6" lg="6">
                    <h2 class="text_box_title">Próximas Clases en vivo</h2>
                    <v-card height="300" class="box_gym_virtual" color="#0A2240">
                        <v-row class="pa-3">
                            <v-col cols="4" md="4" sm="12" xs="12">
                                <v-card height="270" class="box_gym_virtual" :img="require('../../../assets/img/gym_virtual/desafio1.png')" color="#0A2240">
                                    <v-badge
                                    color="#E7004C"
                                    content="Mi, 17 - 2pm"
                                    inline
                                    class="badge_pink"
                                    ></v-badge>
                                    <h4 class="font_box_prox_clase card_text_bottom">Torso Intermedio</h4>
                                </v-card>
                            </v-col>
                            <v-col cols="4" md="4" sm="12" xs="12">
                                <v-card height="270" class="box_gym_virtual" :img="require('../../../assets/img/gym_virtual/desafio2.png')" color="#0A2240">
                                    <v-badge
                                    color="#E7004C"
                                    content="Mi, 17 - 2pm"
                                    inline
                                    class="badge_pink"
                                    ></v-badge>
                                    <h4 class="font_box_prox_clase card_text_bottom">Torso Intermedio</h4>
                                </v-card>
                            </v-col>
                            <v-col cols="4" md="4" sm="12" xs="12">
                                <v-card height="270" class="box_gym_virtual" :img="require('../../../assets/img/gym_virtual/desafio3.png')" color="#0A2240">
                                    <v-badge
                                    color="#E7004C"
                                    content="Mi, 17 - 2pm"
                                    inline
                                    class="badge_pink"
                                    ></v-badge>
                                    <h4 class="font_box_prox_clase card_text_bottom">Torso Intermedio</h4>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>

                    <h2 class="text_box_title mt-4">Registro de Pesos</h2>
                    <v-card height="300" class="box_gym_virtual" color="#0A2240">
                        <v-row class="pa-3">
                            <v-col cols="12">
                                <v-card height="270" class="box_gym_virtual" color="#0A2240">
                                    <v-row class="pa-2">
                                        <v-col cols="12">
                                            <h4 class="text_title_registro_pesos">Ejercicio</h4>
                                            <v-select
                                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                                variant="outlined"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row class="pa-2">
                                        <v-col cols="6">
                                            <h4 class="text_title_registro_pesos">Peso (KG)</h4>
                                            <v-text-field variant="outlined"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <h4 class="text_title_registro_pesos">Fecha</h4>
                                            <v-text-field variant="outlined"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model=" toast.toast " :timeout=" toast.timeout " :color=" toast.color " dark>
            {{ toast.message }}
        </v-snackbar>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import axios from "axios";

export default {
    components: {
        axios
    },
    data: () => ({
        model: null,
        planMonths: [],
        planSections: [],
        carousel: null,
        model: null,
        model2: null,
        months: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],

        dates: [],
        current_month: {
            month: '',
            _month: '',
            _year: ''
        },
        current_date: {
            dat: "2022-12-17",
            week: 52,
            name: "Martes 17",
            section: false,
            activities: []
        },
        colors: ['#0281a5', '#0B233F', '#E30E4F'],
        id_level: null,
        dialog: false,
        //iframe: '<iframe src=\"https://player.vimeo.com/video/393999309?h=0cd4c9c103&amp;app_id=122963\" width=\"426\" height=\"240\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"Creating Video With Your Phone: Getting Started\"></iframe>'
        currrent_activity: {
            iframe: '',
            name: '',
            hour_class: '',
            focus: '',
            material: ''
        },
        levels: [],
        user: {},
        userPlans: {},
        actual_date: null,
        show_alert: true,
        original_activities: [],
        total_clases_vivo: 0,
        total_clases_grabadas: 0,
        clases_grabadas: [],
        clases_grabadas_org: [],
        clases_vivo: [],
        clases_vivo_org: [],
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
        show_descarga_plan: false,
        dialogRating: false,
        comentario_rating: '',
        rating: null
    }),
    mounted() {
        moment.locale('es');
        this.actual_date = new Date();
        let vm = this;
        vm.auth();
        vm.$store.commit('loader', true);

        vm.getBaseUrl();
        vm.calendar();
        vm.schedule();
        vm.loadLevels();
    },
    computed: {
        columns() {
            if (this.$vuetify.breakpoint.xl) {
                return 3;
            }

            if (this.$vuetify.breakpoint.lg) {
                return 3;
            }

            if (this.$vuetify.breakpoint.md) {
                return 2;
            }

            return 1;
        }
    },
    methods: {
        showRatingDialog() {
            this.dialogRating = true;
        },
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
        async saveAttempts(activity, date, indx) {
            try {
                this.current_date.activities[indx].sessions.push(1);
                let attempt = {
                    activity_id: activity.id,
                    status: 'finish',
                    _date: date
                };
                const data = await this.$API.gymVirtual.saveAttempt(attempt);
            }
            catch (e) {
                console.error(e);
            }
        },
        async auth() {
            let vm = this;
            try {
                const response = await this.$API.auth.auth();
                this.user = response.data;
                if (this.user.id_level != null) {
                    this.id_level = this.user.id_level;
                }
                this.userPlans = response.data.plans;
                let fecha_actual = new Date();
                this.userPlans.map(function (item) {
                    let init_d = new Date(item.init_date);
                    let end_d = new Date(item.expiration_date);
                    if (init_d > fecha_actual || (Math.ceil((new Date(item.expiration_date).getTime() - init_d.getTime()) / (1000 * 3600 * 24)) >= 15)) {
                        vm.show_alert = false;
                    }

                    if (fecha_actual.getTime() <= end_d.getTime()) {
                        vm.show_descarga_plan = true;
                    }
                });
            } catch (e) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
        getMonth() {
            let vm = this;
            vm.current_month = {
                month: this.months[Number(moment().format('MM')) - 1],
                _month: moment().format('MM'),
                _year: moment().format('YYYY')
            };
            vm.model2 = vm.planMonths.findIndex((element) => element._month == vm.current_month._month);
        },
        async calendar() {
            let vm = this;
            try {
                const data = await this.$API.gymVirtual.calendar();
                //console.log(data.data)
                vm.planMonths = data.data.data;
                vm.getMonth()
                vm.$store.commit('loader', false);
            }
            catch (e) {
                console.error(e);
                vm.$store.commit('loader', false);
            }
        },
        getDate() {
            let vm = this;

            vm.current_date = {
                dat: moment().format('YYYY-MM-DD'),
                week: moment().format('W'),
                name: moment().format('dddd DD'),
                activities: []
            }
            vm.model = vm.planSections.findIndex((element) => element.dat == vm.current_date.dat);
            //vm.current_date = moment().format('YYYY-MM-DD');
            vm.current_date.activities = vm.planSections[vm.model].activities;
            vm.original_activities = vm.current_date.activities;
            let mes_actual = this.planSectionsFilter();
            vm.model = mes_actual.findIndex((element) => element.dat == vm.current_date.dat);

            let clases_vivo = vm.current_date.activities.filter((element) => (element.link_video == null));

            vm.total_clases_vivo = vm.current_date.activities.length - clases_vivo.length;

            vm.total_clases_grabadas = clases_vivo.length;

            vm.clases_grabadas = vm.current_date.activities.filter((element) => (element.link_video != null));
            vm.clases_grabadas_org = vm.clases_grabadas;

            vm.clases_vivo = vm.current_date.activities.filter((element) => (element.link_video == null));
            vm.clases_vivo_org = vm.clases_vivo;

            if (vm.id_level != null) {
                vm.clases_grabadas = vm.clases_grabadas_org.filter((element) => ((element.id_level == vm.id_level || element.id_level == "4") && element.link_video != null));

                vm.clases_vivo = vm.clases_vivo_org.filter((element) => ((element.id_level == vm.id_level || element.id_level == "4") && element.link_video == null));
            }

        },
        async filterByLevel() {
            let vm = this;
            let id_level = vm.id_level;
            vm.clases_grabadas = vm.clases_grabadas_org;
            vm.clases_vivo = vm.clases_vivo_org;
            //console.log(vm.clases_grabadas);
            let filtro = vm.clases_grabadas.filter((element) => ((element.id_level == id_level || element.id_level == "4") && element.link_video != null));

            let filtro2 = vm.clases_vivo.filter((element) => ((element.id_level == id_level || element.id_level == "4") && element.link_video == null));

            vm.clases_grabadas = filtro;
            vm.clases_vivo = filtro2;

            const data = await this.$API.business_partner.updateLevel(id_level);
        },
        async schedule() {
            let vm = this;
            try {
                const data = await this.$API.gymVirtual.schedule();
                vm.planSections = data.data.data;
                vm.dates = vm.planSections.map(item => {
                    const container = {};
                    container.date = item.dias_avb;
                    container.month = item.month;
                    return container;
                });
                vm.getDate();
                vm.$store.commit('loader', false);
            }
            catch (e) {
                console.error(e);
                vm.$store.commit('loader', false);
            }
        },
        async getBaseUrl() {
            try {
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
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


        planSectionsFilter() {
            return this.planSections.filter((item) => item.month == this.current_month._month);
        },

        getActivities(indx, date) {
            let vm = this;
            this.model = indx;
            this.current_date = date;

            let clases_vivo = vm.current_date.activities.filter((element) => (element.link_video != null));

            vm.total_clases_vivo = vm.current_date.activities.length - clases_vivo.length;

            vm.total_clases_grabadas = clases_vivo.length;
            vm.clases_grabadas = vm.current_date.activities.filter((element) => (element.link_video != null));
            vm.clases_grabadas_org = vm.clases_grabadas;

            vm.clases_vivo = vm.current_date.activities.filter((element) => (element.link_video == null));
            vm.clases_vivo_org = vm.clases_vivo;
            if (vm.id_level != null) {
                vm.clases_grabadas = vm.clases_grabadas_org.filter((element) => ((element.id_level == vm.id_level || element.id_level == "4") && element.link_video != null));

                vm.clases_vivo = vm.clases_vivo_org.filter((element) => ((element.id_level == vm.id_level || element.id_level == "4") && element.link_video == null));
            }

        },

        showToast(msg, color) {
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },

        //--------VIDEO-----------
        getVideoActivity(activity) {
            /*axios.get('https://vimeo.com/api/oembed.json?url='+'https://vimeo.com/393999309').then(function(data) {
                console.log(data.data)
            }.bind(this)).catch(function(e) {
                this.showToast(e.response.data.message,"red");
            });*/
            this.currrent_activity = {
                iframe: activity.link_video,
                name: activity.name,
                hour_class: activity.hour_class,
                focus: activity.focus,
                material: activity.material
            }
            this.dialog = true;
        },

        descargarPlan() {
            let vm = this;
            let nivel = vm.levels.filter((element) => (element.id_level == vm.id_level));
            if (nivel.length === 0) {
                this.showToast("Debe seleccionar un nivel primero.", "red");
            } else {
                window.open(nivel[0].url_plan);
            }

        },

        isOnlive(date, hour) {

            let fecha_class = moment(date + ' ' + hour);//.add(1, 'hour')
            let fecha_class_2 = moment(date + ' ' + hour).add(1, 'hour');

            let now = moment();

            let response = (fecha_class <= now && fecha_class_2 >= now);
            return response;
        }
    }
}
</script>

<style>.activity-class {
    background-color: #0B233F;
}

.activity-taller {
    background-color: #E30E4F;
}

.activity-descanso {
    background-color: #e9e9e9;
}

.activity-nutrition {
    background-color: #0480a4;
}</style>