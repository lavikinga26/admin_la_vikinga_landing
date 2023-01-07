<template>
    <div>
        <v-toolbar color="primary" dark class="mb-1">
            <v-toolbar-title class="tit_h2_pink" style="font-size: 3.0rem; color: white">GYM VIRTUAL</v-toolbar-title>
            <v-spacer></v-spacer>
        
            <span style="width: 250px;"><v-select :items="levels" v-model="id_level" label="Nivel" item-text="level"
                placeholder="Seleciona" item-value="id_level" v-on:change="filterByLevel()" class="mt-8" outlined></v-select></span>
            <span style="color: #fff; font-size: 0.9rem;"> | </span>
        
            <v-btn text small link @click="descargarPlan()">
                <v-icon color="#FFFFFF">mdi-download</v-icon> DESCARGAR PLAN
            </v-btn>
        </v-toolbar>
        <v-container>

            <div v-for="(n, index) in userPlans" :key="'plan_alert_'+index" class="text-left my-3">
                <v-alert border="top"
                    v-if="show_alert && new Date(n.expiration_date) > actual_date && (Math.ceil((new Date(n.expiration_date).getTime() - actual_date.getTime()) / (1000 * 3600 * 24)) <= 15)"
                    type="error" colored-border color="pink accent-4" elevation="2">
                    Recuerda que la membresía de tu plan <b>{{n.name}}</b> vence el <b>{{ n.expiration_date | formatDate
                    }}</b>. Renueva tu plan haciendo <a :href="'/inscripciones'"
                        style="text-decoration: none;"><b>CLICK AQUÍ</b>.</a>
                </v-alert>
            </div>

            <div class="text-center pt-5" style="display:none;">
                <v-sheet class="mx-auto" max-width="240">
                    <v-slide-group show-arrows v-model="model2" center-active
                        @click:next="model2=model2+1; current_month=planMonths[model2]; model=null;"
                        @click:prev="model2=model2-1; current_month=planMonths[model2]; model=null;">
                        <v-slide-item v-for="(n, index) in planMonths" :key="'month_'+index" v-slot="{ toggle }">
                            <v-btn max-width="120" min-width="120" class="mx-2"
                                :input-value="current_month._month+'-'+current_month._year == n._month+'-'+n._year"
                                active-class="secondary white--text" depressed rounded @click="toggle; current_month=n">
                                {{ months[n._month - 1] }}
                            </v-btn>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </div>
            <br>

            <div class="text-center py-5">
                <v-sheet class="mx-auto" max-width="1000">
                    <v-slide-group center-active show-arrows v-model="model">
                        <v-slide-item v-for="(n,index) in planSectionsFilter()" :key="'class_day_'+index"
                            v-slot="{ toggle }">
                            <!--; getActivities(index)-->
                            <v-btn max-width="120" min-width="120" class="mx-3" :input-value="index==model"
                                active-class="primary white--text" depressed rounded @click="getActivities(index, n)">
                                {{ n.dias_avb }}
                            </v-btn>
                        </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </div>
        </v-container>
        <div class="grey lighten-3" style="min-height:70vh;">
            <v-container>
                <v-row>
                    <v-col v-if="current_date.activities.length==0">
                        <v-container style="min-height:70vh;" class="d-flex align-center">
                            <div style="text-align: center; width: 100%" class="pa-10">
                                <img style="width: 180px;" src="@/assets/img/logo_vikinga_icon.png" alt="Logo" />
                                <p class="tit_h1_staff_pink text_entrena txt_uppercase mb-6" style="font-size: 2rem">
                                    SIN ACTIVIDADES
                                </p>
                            </div>
                        </v-container>
                    </v-col>
                    <v-col v-if="current_date.activities.length>0" cols="12" align="center">
                        <div class="text-center pa-3 px-10 activity-class" >
                            <b style="color:white;">CLASES EN VIVO</b>
                        </div>
                        <div v-for="(activity, i) in current_date.activities" :key="'col_activity_'+i">
                            <v-card color="grey lighten-5" class="my-3 mx-4" elevation="3" min-height="250"
                                max-width="1000" :key="'activity_'+i" v-if="activity.link_video == null">
                                <!--<div class="text-left pa-3 px-10 d-flex" v-bind:class="{ 
                                    'activity-class': activity.type=='class' || activity.type=='masterclass', 
                                    'activity-taller': activity.type=='taller', 
                                    'activity-descanso': activity.type=='descanso', 
                                    'activity-nutrition': activity.type=='nutricion', 
                                    'white--text': activity.type!='descanso' ,
                                    'black--text': activity.type=='descanso' 
                                }">
                                    <b>{{activity.name}}</b>
                                    <v-spacer></v-spacer>
                                    <div
                                        v-if="!activity.link_video && activity.link_class && isOnlive(current_date.dat, activity.hour_class)">
                                        <v-icon color="#FFFFFF">mdi-access-point</v-icon>
                                        &nbsp;&nbsp;
                                        <b>En vivo</b>
                                    </div>

                                </div>-->
                                <v-card-text>
                                    <v-row height="250">
                                        <v-col cols="12" md="4" class="pa-4" align-items="center" v-if="activity.id_level===3">
                                                <v-img src="@/assets/img/video_portada/avanzados.jpg" height="180px" width="270" class="ma-auto">
                                                <v-row class="fill-height ma-0" align="center" justify="center">
                                                    <v-btn
                                                        v-if="!activity.link_video && activity.link_class && isOnlive(current_date.dat, activity.hour_class)"
                                                        :href="activity.link_class" target="_blank" icon
                                                        class="white--text">
                                                        <v-icon style="font-size: 50px" class="white--text" color="#FFFFFF">
                                                            mdi-access-point</v-icon>
                                                    </v-btn>
                                                    <v-btn v-if="activity.link_video" icon class="white--text"
                                                        @click="getVideoActivity(activity)">
                                                        <v-icon style="font-size: 50px" class="white--text" color="#FFFFFF">
                                                            mdi-motion-play-outline</v-icon>
                                                    </v-btn>
                                                </v-row>
                                            </v-img>
                                        </v-col>
                                        <v-col cols="12" md="4" class="pa-4" align-items="center" v-if="activity.id_level===2">
                                            <v-img src="@/assets/img/video_portada/intermedio.jpg" height="180px" width="270" class="ma-auto">
                                                <v-row class="fill-height ma-0" align="center" justify="center">
                                                    <v-btn v-if="!activity.link_video && activity.link_class && isOnlive(current_date.dat, activity.hour_class)"
                                                        :href="activity.link_class" target="_blank" icon class="white--text">
                                                        <v-icon style="font-size: 50px" class="white--text" color="#FFFFFF">
                                                            mdi-access-point</v-icon>
                                                    </v-btn>
                                                    <v-btn v-if="activity.link_video" icon class="white--text" @click="getVideoActivity(activity)">
                                                        <v-icon style="font-size: 50px" class="white--text" color="#FFFFFF">
                                                            mdi-motion-play-outline</v-icon>
                                                    </v-btn>
                                                </v-row>
                                            </v-img>
                                        </v-col>
                                        <v-col cols="12" md="4" class="pa-4" align-items="center" v-if="activity.id_level===1">
                                            <v-img src="@/assets/img/video_portada/principiantes.jpg" height="180px" width="270" class="ma-auto">
                                                <v-row class="fill-height ma-0" align="center" justify="center">
                                                    <v-btn v-if="!activity.link_video && activity.link_class && isOnlive(current_date.dat, activity.hour_class)"
                                                        :href="activity.link_class" target="_blank" icon class="white--text">
                                                        <v-icon style="font-size: 50px" class="white--text" color="#FFFFFF">
                                                            mdi-access-point</v-icon>
                                                    </v-btn>
                                                    <v-btn v-if="activity.link_video" icon class="white--text" @click="getVideoActivity(activity)">
                                                        <v-icon style="font-size: 50px" class="white--text" color="#FFFFFF">
                                                            mdi-motion-play-outline</v-icon>
                                                    </v-btn>
                                                </v-row>
                                            </v-img>
                                        </v-col>
                                        <v-col cols="12" md="7" class="text-left align-center d-flex">
                                            <v-container>
                                                <v-row class="my-3">
                                                    <v-col cols="12" md="4">
                                                        <h3>{{activity.name}}</h3>
                                                        <div>HORA: {{current_date.dat + ' ' +activity.hour_class | formatTime}}
                                                        </div>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <h5>PROFESOR:</h5>
                                                        <div>{{activity.staff.name}}</div>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <h5>NIVEL:</h5>
                                                        <div>{{activity.level.level}}</div>
                                                    </v-col>
                                                </v-row>
                                                
                                                <v-row class="my-3">
                                                    <v-col cols="12" md="4">
                                                        <h5>TIEMPO:</h5>
                                                        <div>1:00 HR APROX.</div>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <h5>ENFOQUE:</h5>
                                                        <div>{{activity.focus}}</div>
                                                    </v-col>
                                                    <v-col cols="12" md="4">
                                                        <h5>MATERIAL:</h5>
                                                        <div>{{activity.material}}</div>
                                                    </v-col>
                                                </v-row>
                                                <v-btn tile color="secondary" class="rounded" dark
                                                    :href="activity.link_class" target="_blank"
                                                    v-if="!activity.link_video && activity.link_class">
                                                    <v-icon left>
                                                        mdi-access-point
                                                    </v-icon>
                                                    Ingresar
                                                </v-btn>
                                                <!--<p style="font-size: 0.7rem"
                                                    v-if="!activity.link_video && activity.link_class && !isOnlive(current_date.dat, activity.hour_class)"
                                                >
                                                    * Clase en vivo finalizada, en momentos podras ver el video.
                                                </p>-->
                                            </v-container>
                                        </v-col>
                                        <v-col cols="12" md="1" class="text-center align-center justify-center d-flex">
                                            <v-icon color="secondary" @click="saveAttempts(activity, current_date.dat, i); "
                                                v-if="activity.sessions.length==0">
                                                mdi-heart-outline
                                            </v-icon>
                                            <v-icon color="secondary" v-else>
                                                mdi-heart
                                            </v-icon>
                                        </v-col>

                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </div>
                        <div class="text-center pa-3 px-10 activity-class" >
                            <b style="color:white;">CLASES GRABADAS</b>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-sheet class="mx-auto" elevation="8" max-width="1920">
                            <v-slide-group v-model="carousel" active-class="success" class="py-6" show-arrows>
                                <v-slide-item v-for="(item, index) in clases_grabadas" :key="index" v-slot="{ active, toggle }">
                                    <v-card color="primary" class="card-outter mr-4" @click="getVideoActivity(item);" width="360" >
                                        <v-img src="@/assets/img/video_portada/avanzados.jpg" height="300"
                                            class=" white--text"v-if="item.id_level === 3">
                                            <v-card-title>
                                                <div style="border-left: 4px solid #E30E4F; text-align: left; " class="pl-1">
                                                    <span style="font-size: 18px; font-weight: bold;">{{ item.name}}</span><br>
                                                    <span style="font-size: 14px;">con {{ item.staff.name }}</span>
                                                </div>
                                                <p></p>
                                            </v-card-title>
                                        </v-img>

                                        <v-img src="@/assets/img/video_portada/intermedio.jpg" height="300" class=" white--text" v-if="item.id_level === 2">
                                            <v-card-title>
                                                <div style="border-left: 4px solid #E30E4F; text-align: left; " class="pl-1">
                                                    <span style="font-size: 18px; font-weight: bold;">{{ item.name}}</span><br>
                                                    <span style="font-size: 14px;">con {{ item.staff.name }}</span>
                                                </div>
                                                <p></p>
                                            </v-card-title>
                                        </v-img>

                                        <v-img src="@/assets/img/video_portada/principiantes.jpg" height="300" class=" white--text" v-if="item.id_level === 1">
                                            <v-card-title>
                                                <div style="border-left: 4px solid #E30E4F; text-align: left; " class="pl-1">
                                                    <span style="font-size: 18px; font-weight: bold;">{{ item.name}}</span><br>
                                                    <span style="font-size: 14px;">con {{ item.staff.name }}</span>
                                                </div>
                                                <p></p>
                                            </v-card-title>
                                        </v-img>
                                    </v-card>
                                    
                                </v-slide-item>
                            </v-slide-group>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>


            <v-dialog transition="dialog-bottom-transition" max-width="550" v-model="dialog">
                <v-card>
                    <v-toolbar color="primary" dark elevation="0">
                        {{currrent_activity.name}}
                    </v-toolbar>
                    <v-card-text class="text-center d-flex align-center pt-10 justify-center" v-if="dialog">
                        <!--<div v-html="currrent_activity.iframe"></div>-->
                        <iframe :src="currrent_activity.iframe" width="640" height="328" frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                    </v-card-text>
                    <div class="py-0">
                        <v-container class="mx-6">
                            <v-row>
                                <v-col cols="6" md="4">
                                    <h6>TIEMPO:</h6>
                                    <div style="font-size: 0.8rem">1:00 HR APROX.</div>
                                </v-col>
                                <v-col cols="6" md="4">
                                    <h6>ENFOQUE:</h6>
                                    <div style="font-size: 0.8rem">{{currrent_activity.focus}}</div>
                                </v-col>
                                <v-col cols="6" md="4">
                                    <h6>MATERIAL:</h6>
                                    <div style="font-size: 0.8rem">{{currrent_activity.material}}</div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialog  = false">Cerrar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            
        </div>
        <v-snackbar v-model="toast.toast" :timeout="toast.timeout" :color="toast.color" dark>
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
        model2:null,
        months: ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'],

        dates:[],
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
        colors: ['#0281a5','#0B233F','#E30E4F'],
        id_level: null,
        dialog: false,
        //iframe: '<iframe src=\"https://player.vimeo.com/video/393999309?h=0cd4c9c103&amp;app_id=122963\" width=\"426\" height=\"240\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"Creating Video With Your Phone: Getting Started\"></iframe>'
        currrent_activity: {
            iframe:'',
            name:'',
            hour_class:'',
            focus:'',
            material:''
        },
        levels:[],
        user: {},
        userPlans: {},
        actual_date: null,
        show_alert: true,
        original_activities: [],
        total_clases_vivo: 0,
        total_clases_grabadas: 0,
        clases_grabadas: [],
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
        slider: [
            "red",
            "green",
            "orange",
            "blue",
            "pink",
            "purple",
            "indigo",
            "cyan",
            "deep-purple",
            "light-green",
            "deep-orange",
            "blue-grey"
        ]
    }),
    mounted() {
        moment.locale('es');
        this.actual_date = new Date();
        let vm = this;
        vm.auth();
        vm.$store.commit('loader',true);
        
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
    methods:{
        async saveAttempts(activity, date, indx){
            try{
                this.current_date.activities[indx].sessions.push(1);
                let attempt = {
                    activity_id: activity.id,
                    status: 'finish',
                    _date: date
                };
                const data = await this.$API.gymVirtual.saveAttempt(attempt);
            }
            catch(e){
                console.error(e);
            } 
        },
        async auth() {
            let vm = this;
            try {
                const response = await this.$API.auth.auth();
                this.user = response.data;
                this.userPlans = response.data.plans;
                let fecha_actual = new Date();
                this.userPlans.map(function (item) {
                    let init_d = new Date(item.init_date);
                    if (init_d > fecha_actual || (Math.ceil((new Date(item.expiration_date).getTime() - init_d.getTime()) / (1000 * 3600 * 24)) >= 15)) {
                        vm.show_alert = false;
                    }
                });
            } catch (e) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
        getMonth(){
            let vm = this;
            vm.current_month = {
                month: this.months[Number(moment().format('MM'))-1],
                _month: moment().format('MM'),
                _year: moment().format('YYYY')
            };
            vm.model2 = vm.planMonths.findIndex((element) => element._month == vm.current_month._month );
        },
        async calendar(){
            let vm = this;
            try{
                const data = await this.$API.gymVirtual.calendar();
                //console.log(data.data)
                vm.planMonths = data.data.data;
                vm.getMonth()
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },
        getDate(){
            let vm = this;
           
            vm.current_date = {
                dat:  moment().format('YYYY-MM-DD'),
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

            //console.log(vm.clases_grabadas);
        },
        filterByLevel() {
            let vm = this;
            let id_level = vm.id_level;
            let filtrado = vm.original_activities.filter((element) => (element.id_level == id_level || element.id_level == "4"));
            vm.current_date.activities = filtrado;
            vm.clases_grabadas = filtrado.filter((element) => (element.link_video != null));
        },
        async schedule(){
            let vm = this;
            try{
                const data = await this.$API.gymVirtual.schedule();
                vm.planSections = data.data.data;
                vm.dates = vm.planSections.map(item => {
                    const container = {};
                    container.date = item.dias_avb;
                    container.month = item.month;
                    return container;
                });
                vm.getDate();
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },
        async getBaseUrl(){
            try{
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
            }
            catch(e){
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


        planSectionsFilter(){
            return this.planSections.filter((item)=>item.month==this.current_month._month);
        },

        getActivities(indx, date) {
            let vm = this;
            this.model = indx;
            this.current_date = date;

            let clases_vivo = vm.current_date.activities.filter((element) => (element.link_video != null));

            vm.total_clases_vivo = vm.current_date.activities.length - clases_vivo.length;

            vm.total_clases_grabadas = clases_vivo.length;

            vm.clases_grabadas = vm.current_date.activities.filter((element) => (element.link_video != null));

            console.log(vm.clases_grabadas);
        },

        showToast(msg, color) {
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },

        //--------VIDEO-----------
        getVideoActivity(activity){
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
            this.dialog= true;
        },

        descargarPlan() {
            let vm = this;
            let nivel = vm.levels.filter((element) => (element.id_level == vm.id_level));
            if (nivel.length===0) {
                this.showToast("Debe seleccionar un nivel primero.", "red");
            } else {
                window.open(nivel[0].url_plan);
            }
            
        },

        isOnlive(date, hour){

            let fecha_class = moment(date + ' ' + hour);//.add(1, 'hour')
            let fecha_class_2 = moment(date + ' ' + hour).add(1, 'hour');

            let now = moment();

            let response = (fecha_class <= now && fecha_class_2 >= now);
            return response;
        }
    }
}
</script>

<style>
.activity-class{
    background-color: #0B233F;
}
.activity-taller{
    background-color: #E30E4F;
}
.activity-descanso{
    background-color: #e9e9e9;
}
.activity-nutrition{
    background-color: #0480a4;
}
</style>