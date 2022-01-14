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
                    @click:next="model2=model2+1; current_month=planMonths[model2] "
                    @click:prev="model2=model2-1; current_month=planMonths[model2] "
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
                        <template  v-for="(n,index) in dates">
                            <v-slide-item
                                :key="'class_day_'+index"
                                v-slot="{ active, toggle }"
                                v-if="n.month == current_month._month"
                            >
                                <v-btn
                                max-width="120"
                                min-width="120"
                                class="mx-3"
                                :input-value="index==model"
                                active-class="primary white--text"
                                depressed
                                rounded
                                @click="toggle; getActivities(index)"
                                >
                                {{ n.date }} {{index}} {{model}}
                                </v-btn>
                            </v-slide-item>
                        </template>
                    </v-slide-group>
                </v-sheet>
            </div>
        </v-container>
        <div class="grey lighten-2">
            <v-container>
                <v-row>
                    <v-col cols="12" 
                    align="center">
                        <v-card
                        color="grey lighten-5"
                        class="my-3 mx-4"
                        elevation="3"
                        min-height="250"
                        max-width="1000"
                        >
                            <div class="primary white--text text-left pa-3 px-15">
                                ENTRENAMIENTO FUERZA PRINCIPIANTES
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
                                                <v-icon style="font-size: 50px" class="white--text">mdi-motion-play-outline</v-icon>
                                            </v-row>
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" md="8" class="text-left align-center d-flex">
                                        <v-container>
                                            <h3>ENTRENAMIENTO BRAZOS</h3>
                                            <div>HORA: 07:00 AM</div>
                                            <v-row class="my-3">
                                                <v-col cols="12" md="4">
                                                    <h5>TIEMPO:</h5>
                                                    <div>1:00 HR APROX.</div>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <h5>ENFOQUE:</h5>
                                                    <div>BRAZOS</div>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <h5>MATERIAL:</h5>
                                                    <div>MANCUERNAS</div>
                                                </v-col>
                                            </v-row>
                                            <v-btn
                                            tile
                                            color="light-blue lighten-2"
                                            class="rounded"
                                            dark
                                            >
                                                <v-icon left>
                                                    mdi-video
                                                </v-icon>
                                                Entrar a clase
                                            </v-btn>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>
<script>
import moment from 'moment-timezone'
  export default {
    data: () => ({
        model: null,
        planMonths: [],
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
            section: false, activities: []
        },
    }),
    mounted() {
         moment.locale('es');
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
        getActivities(indx){
            console.log(this.model)
        }
    }
  }
</script>
<style>
</style>