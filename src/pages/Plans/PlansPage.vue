<template>
    <div>
        <!--<div class="container-fluid bg_pink inscripciones">
            <div class="row">
                <div class="col-12 text-center">
                    <h1 class="tit_h1_white">INSCRIPCIONES</h1>
                </div>
            </div>
        </div> -->
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <div class="inline-block">
                        <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                        <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    </div>
                    
                    <p class="tit_h1_white text_entrena">INSCRIPCIONES</p>
                </div>
            </div>
        </div>

        <div class="container mt-4">
            <div class="row justify-center m-4">
                <h2 class="tit_h2_pink">¡ES HORA DE COMENZAR EL DESAFÍO!</h2>
            </div>
            <div class="row no-gutters mt-5">
                <div class="filtering col-sm-12 text-center">
                     <v-btn
                        class="ma-2 fb-btn"
                        color="secondary"
                        :outlined="category==0"
                        :text="category!=0"
                        @click="category=0;cleaning();"
                        >
                            TODOS
                    </v-btn>

                    <v-btn
                        class="ma-2 fb-btn"
                        color="secondary"
                        v-for="(item, i) in categories"
                        :key="i"
                        :outlined="category==item.id"
                        :text="category!=item.id"
                        @click="category=item.id;filtering();"
                        >
                        <span style="text-transform: uppercase !important;">{{item.name}}</span>
                    </v-btn>
                </div>
            </div>
            <v-row>
                <v-col
                    v-for="(plan,index) in plans"
                    :key="index"
                    cols="12"
                    sm="4"
                    align="center"
                >
                    <v-hover
                        v-slot="{ hover }"
                        close-delay="200"
                    >
                        <v-card
                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                        max-width="250"
                        
                        >
                            <v-img
                                lazy-src="https://picsum.photos/id/11/10/6"
                                max-height="400"
                                max-width="250"
                                class="rounded plan"
                                :src="base_url + plan.file_path.path + plan.file_path.filename"
                                @click="goToPlan(plan.identifier)"
                            ></v-img>
                        </v-card>
                    </v-hover>
                    <!--<v-img v-if="item.file_path" :src="base_url + item.file_path.path + item.file_path.filename" max-width="100px" max-height="80px" class="ma-3" style="border-radius:50%; min-height: 150px; min-width: 150px;"></v-img>
                    <v-img v-else :src="base_url + empty_url" max-width="100px" max-height="80px" class="ma-3" style="border-radius:50%; min-height: 150px; min-width: 150px;"></v-img>-->
                </v-col>
            </v-row>
        </div>

    </div>
</template>
<script>
export default {
    components: { 
     },

    data: () => ({
        category: 0,
        categories: [],
        plans:[],
        temp_plans:[],
        base_url: '',
    }),

    
    mounted() {
        let vm = this;
        vm.$store.commit('loader',true);
        vm.getBaseUrl();
        vm.categoryList();
        vm.list();
    },

    watch: {
    },

    methods: {
        filtering(){
            const plans = this.temp_plans;
            this.plans = plans.filter((item) => item.category_id == this.category);
        },
        cleaning(){
            this.plans = this.temp_plans;
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
        async categoryList(){
            let vm = this;
            try{
                const data = await this.$API.plans.categories();
                vm.categories = data.data.data;
                vm.$store.commit('loader',false);
                console.log(vm.data)
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },
        async list(){
            let vm = this;
            vm.$store.commit('loader',true);
            try{
                const data = await this.$API.plans.list();
                vm.plans = data.data.data;
                vm.temp_plans = data.data.data;
                vm.$store.commit('loader',false);
                console.log(vm.data)
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },
        goToPlan(identifier){
            this.$router.push({ path: '/plan/'+identifier });
        }
    },
}
</script>
<style>
  .fb-btn.v-btn--outlined {
    border: 3px solid #E30E4F;
  }
  .plan{
      cursor: pointer;
  }
</style>