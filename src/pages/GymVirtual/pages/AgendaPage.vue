<template>
    <div>
        <v-container>
            <div class="text-center my-3">
                <h1>MI AGENDA</h1>
            </div>
            <div class="text-center pt-5">
                <v-sheet
                    class="mx-auto"
                    max-width="240"
                >
                    <v-slide-group
                    show-arrows
                    v-model="model2"
                    center-active
                    @click:next="model2=model2+1; current_month=planMonths[model2]; model=null;"
                    @click:prev="model2=model2-1; current_month=planMonths[model2]; model=null;"
                    >
                    <v-slide-item
                        v-for="(n, index) in planMonths"
                        :key="'month_'+index"
                        v-slot="{ toggle }"

                    >
                        <v-btn
                        max-width="120"
                        min-width="120"
                        class="mx-2"
                        :input-value="current_month._month+'-'+current_month._year == n._month+'-'+n._year"
                        active-class="secondary white--text"
                        depressed
                        rounded
                        @click="toggle; current_month=n"
                        >
                        {{ months[n._month - 1] }}
                        </v-btn>
                    </v-slide-item>
                    </v-slide-group>
                </v-sheet>
            </div>
            <br>
            <div class="text-center py-5">
                <v-sheet
                    class="mx-auto"
                    max-width="1000"
                >
                    <v-slide-group
                    center-active
                    show-arrows
                    v-model="model"
                    >
                        <v-slide-item
                            v-for="(n,index) in planSectionsFilter()"
                            :key="'class_day_'+index"
                            v-slot="{ active, toggle }"
                        >
                            <!--; getActivities(index)-->
                            <v-btn
                            max-width="120"
                            min-width="120"
                            class="mx-3"
                            :input-value="index==model"
                            active-class="primary white--text"
                            depressed
                            rounded
                            @click="getActivities(index, n)"
                            >
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
                    <v-col v-else
                    cols="12" 
                    align="center" 
                    v-for="(activity, i) in current_date.activities"
                    :key="'activity_'+i"
                    >
                        <v-card
                        color="grey lighten-5"
                        class="my-3 mx-4"
                        elevation="3"
                        min-height="250"
                        max-width="1000"
                        >

                            <div class="text-left pa-3 px-10 d-flex"
                                v-bind:class="{ 
                                    'activity-class': activity.type=='class' || activity.type=='masterclass', 
                                    'activity-taller': activity.type=='taller', 
                                    'activity-descanso': activity.type=='descanso', 
                                    'activity-nutrition': activity.type=='nutricion', 
                                    'white--text': activity.type!='descanso' ,
                                    'black--text': activity.type=='descanso' 
                                }">
                                    <b>{{activity.name}}</b>
                                <v-spacer></v-spacer>
                                <!--<v-icon color="#EF476F">mdi-circle-medium</v-icon>-->
                                <div v-if="!activity.link_video && activity.link_class">
                                    <v-icon color="#FFFFFF">mdi-access-point</v-icon>
                                    &nbsp;&nbsp;
                                    <b>En vivo</b>
                                </div>
                                
                            </div>
                            <v-card-text>
                                <v-row height="250">
                                    <v-col cols="12" md="4" class="pa-4" align-items="center">
                                        <v-img
                                            src="https://i.vimeocdn.com/video/1216681987-4743218d2221b42f2acba382eceedf59e3a83c91aade0ff4b264a3deb6b2a295-d_640"
                                            height="180px"
                                            width="270"
                                            class="ma-auto"
                                        >
                                            
                                            <v-row class="fill-height ma-0"  align="center" justify="center" 
                                            style="background-color:#0000004d">
                                                <v-btn
                                                v-if="!activity.link_video && activity.link_class"
                                                :href="activity.link_class"
                                                target="_blank"
                                                icon
                                                class="white--text"
                                                >
                                                    <v-icon style="font-size: 50px" 
                                                    class="white--text"
                                                    color="#FFFFFF"
                                                    >mdi-access-point</v-icon>
                                                </v-btn>
                                                <v-btn
                                                v-if="activity.link_video"
                                                icon
                                                class="white--text"
                                                @click="getVideoActivity(activity)"
                                                
                                                >
                                                    <v-icon style="font-size: 50px" 
                                                    class="white--text"
                                                    color="#FFFFFF"
                                                    >mdi-motion-play-outline</v-icon>
                                                </v-btn>
                                            </v-row>
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" md="8" class="text-left align-center d-flex">
                                        <v-container>
                                            <h3>{{activity.name}}</h3>
                                            <div>HORA: {{activity.hour_class}}</div>
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
                                            <v-btn
                                            tile
                                            color="red"
                                            class="rounded"
                                            dark
                                            :href="activity.link_class"
                                            target="_blank"
                                            v-if="!activity.link_video && activity.link_class"
                                            >
                                                <v-icon left>
                                                    mdi-access-point
                                                </v-icon>
                                                Ingresar
                                            </v-btn>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>


            <v-dialog
                transition="dialog-bottom-transition"
                max-width="550"
                v-model="dialog"
            >
                <v-card>
                    <v-toolbar
                    color="primary"
                    dark
                    elevation="0"
                    >
                        ENTRENAMIENTO DE BRAZOS
                    </v-toolbar>
                    <v-card-text class="text-center d-flex align-center pt-10 justify-center">
                        <!--<div v-html="currrent_activity.iframe"></div>-->
                        <iframe :src="currrent_activity.iframe" width="640" height="328" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
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
                    <v-btn
                        text
                        @click="dialog  = false"
                    >Cerrar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </div>
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
            dat: "2022-01-19", 
            week: 3, 
            name: "Miercoles 19", 
            section: false,
            activities: []
        },
        colors: ['#0281a5','#0B233F','#E30E4F'],

        dialog: false,
        //iframe: '<iframe src=\"https://player.vimeo.com/video/393999309?h=0cd4c9c103&amp;app_id=122963\" width=\"426\" height=\"240\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"Creating Video With Your Phone: Getting Started\"></iframe>'
        currrent_activity: {
            iframe:'',
            name:'',
            hour_class:'',
            focus:'',
            material:''
        }
    }),
    mounted() {
         moment.locale('es');
         console.log(moment('2022-01-19 06:00').hour());
        let vm = this;
        vm.$store.commit('loader',true);
        
        vm.getBaseUrl();
        vm.calendar();
        vm.schedule();
    },
    methods:{
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
                console.log(data.data)
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
            vm.model = vm.planSections.findIndex((element) => element.dat == vm.current_date.dat );
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


        planSectionsFilter(){
            return this.planSections.filter((item)=>item.month==this.current_month._month);
        },

        getActivities(indx, date){
            this.model = indx;
            this.current_date = date;
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