<template>
    <div>
        <div class="pa-5 my-5">
            <div class="text-center my-3">
                <h1>CALENDARIO {{current_month.month}} {{current_month._year}}</h1>
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
        </div>
        <div class="grey lighten-2 d-flex align-center" style="height:450px">
            <v-sheet
                class="mx-auto transparent"
                elevation="0"
                max-width="100%"
            >
                <v-slide-group
                v-model="model"
                class="py-4"
                center-active
                show-arrows
                >
                

                    <!--v-if="n.month == current_month._month"-->
                    <v-slide-item
                        v-slot="{ toggle }"
                        v-for="(n, indx) in planSectionsFilter()"
                        :key="indx"
                    >
                    <!--; getActivities(indx)-->
                        <v-card
                        :color="indx==model ? 'pink lighten-5' : 'grey lighten-5'"
                        class="my-4 mx-1"
                        height="280"
                        width="180"
                        elevation="3"
                        @click="toggle"
                        >
                            <div class="primary white--text text-center py-2">
                                {{n.name | uppercase}}
                            </div>

                            <div class="pa-4" v-if="n.activities.length>0">
                                <section v-for="(activity, index) in n.activities" :key="'activity_'+index">
                                    <h5>{{activity.name}}</h5>
                                    <a class="mb-3" style="font-size: 0.7rem"> VER VIDEO</a>
                                </section>
                            </div>
                            
                            <div class="pa-4 d-flex align-center" v-else style="text-align:center; height: 90%;">
                                <div>
                                    <img style="width: 50%;" src="@/assets/img/logo_vikinga_icon.png" alt="Logo" />
                                    <p class="tit_h1_staff_pink text_entrena txt_uppercase mb-6" style="font-size: 1.5rem">
                                        PRÓXIMANENTE
                                    </p>  
                                </div>
                            </div>

                            <v-card-actions class="card-actions text-center" v-if="n.activities.length>0">
                                <v-row align="center">
                                    <v-col cols="12" align="center">
                                        <v-btn color="secondary"
                                            depressed
                                            small
                                            to="/gym-virtual/agenda"
                                            class="px-2">
                                            <span class="ma-3">VER DÍA</span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                
                            </v-card-actions>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </div>
            
    </div>
</template>
<script>
import moment from 'moment-timezone'
export default {
    data: () => ({
        model: null,
        model2:null,
        months: ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'],
        planMonths: [],
        planSections: [],
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
        //console.log(moment(this.current_month._month, 'M').format('M'));
        //console.log(moment().format('MM-YYYY'))//.subtract(10, 'days').calendar());
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
        getDate(){
            let vm = this;
           
            vm.current_date = {
                dat:  moment().format('YYYY-MM-DD'),
                week: moment().format('W'), 
                name: moment().format('dddd DD'),
            }
            vm.model = vm.planSections.findIndex((element) => element.dat == vm.current_date.dat );
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
        async schedule(){
            let vm = this;
            try{
                const data = await this.$API.gymVirtual.schedule();
                console.log(data.data)
                vm.planSections = data.data.data;
                vm.getDate();
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },
        planSectionsFilter(){
            //n.month == current_month._month
            return this.planSections.filter((item)=>item.month==this.current_month._month);
        },
        getActivities(indx){
            console.log(this.model)
        }
    }
}
</script>
<style>
.card-actions {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>