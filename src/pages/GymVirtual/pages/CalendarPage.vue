<template>
    <div>
        <div class="pa-5 my-5">
            <div class="text-center my-3">
                <h1>CALENDARIO NOVIEMBRE 2021</h1>
            </div>
            <div class="text-center pt-5">
                <v-sheet
                    class="mx-auto"
                    max-width="240"
                >
                    <v-slide-group
                    multiple
                    show-arrows
                    >
                    <v-slide-item
                        v-for="(n, index) in planMonths"
                        :key="'month_'+index"
                        v-slot="{ active, toggle }"
                    >
                        <v-btn
                        max-width="120"
                        min-width="120"
                        class="mx-2"
                        :input-value="active"
                        active-class="secondary white--text"
                        depressed
                        rounded
                        @click="toggle"
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
                <v-slide-item
                    v-for="(n, index) in planSections"
                    :key="'section_'+index"
                    v-slot="{ active, toggle }"
                >
                    <v-card
                    :color="active ? 'grey lighten-5' : 'grey lighten-5'"
                    class="my-4 mx-1"
                    height="280"
                    width="180"
                    elevation="3"
                    @click="toggle"
                    >
                        <div class="primary white--text text-center py-2">
                            {{n.name | uppercase}}
                        </div>
                        <!--<div class="pa-4">
                            <h5>FUERZA PRINCIPIANTES</h5>
                            <p class="mb-3" style="font-size: 0.7rem"> VER VIDEO</p>
                            <h5>FUERZA AVANZADO</h5>
                            <p class="mb-3" style="font-size: 0.7rem"> VER VIDEO</p>
                            <h5>TALLER: NUTRICIÓN</h5>
                        </div>-->

                        <div class="pa-4">
                            <section v-for="(activity, index) in n.activities" :key="'activity_'+index">
                                <h5>{{activity.name}}</h5>
                                <p class="mb-3" style="font-size: 0.7rem"> VER VIDEO</p>
                            </section>
                        </div>

                        <v-card-actions class="card-actions text-center">
                            <v-row align="center">
                                <v-col cols="12" align="center">
                                    <v-btn color="secondary"
                                        depressed
                                        small
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
export default {
    data: () => ({
        model: null,
        months: ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'],
        planMonths: [],
        planSections: []
    }),

    mounted() {
        let vm = this;
        vm.$store.commit('loader',true);
        vm.getBaseUrl();
        vm.calendar();
        vm.schedule();
    },

    methods:{
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
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
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