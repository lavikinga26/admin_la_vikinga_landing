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
                        <img src="@/assets/img/lista_icon.png"
                            style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    </div>

                    <p class="tit_h1_white text_entrena">INSCRIPCIONES</p>
                </div>
            </div>
        </div>

        <div v-if="data_enrollment.enable_next_enrollment==0" class="container mt-4">
            <div class="row justify-center m-4">
                <h2 class="tit_h2_pink" style="text-align:center;">Para comenzar, elige el plan que mejor se adapte a tí</h2>
            </div>
            <div class="row no-gutters mt-5">
                <div class="filtering col-sm-12 text-center">
                    <v-btn class="ma-2 fb-btn" color="secondary" :outlined="category==0" :text="category!=0"
                        @click="category=0;cleaning();">
                        TODOS
                    </v-btn>

                    <v-btn class="ma-2 fb-btn" color="secondary" v-for="(item, i) in categories" :key="i"
                        :outlined="category==item.id" :text="category!=item.id"
                        @click="category=item.id;category_info=item.description;category_slug=item.slug;filtering();">
                        <span style="text-transform: uppercase !important;">{{item.name}}</span>
                    </v-btn>
                </div>
            </div>
            <div v-if="category!=0" style="text-align:center;" class="mb-10">
                <div class="d-flex justify-center">
                    <div style="width: 70%; text-align:center;">
                        {{category_info}}
                    </div>
                </div>
                <v-btn class="ma-2 fb-btn" color="secondary" x-large @click="goToCategory()">
                    Ver más
                </v-btn>
            </div>
            <v-row>
                <v-col v-for="(plan,index) in plans" :key="index" cols="12" sm="4" align="center">
                    <v-hover v-slot="{ hover }" close-delay="200">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" max-width="350">
                            <v-img lazy-src="@/assets/img/lazy_img.jpg" max-height="600" height="420" max-width="350"
                                class="rounded plan white--text align-end"
                                :src="base_url + plan.file_path.path + plan.file_path.filename"
                                @click="goToPlan(plan.identifier)" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                <v-card-title>
                                    <div style="border-left: 4px solid #E30E4F; text-align: left; word-break: keep-all;"
                                        class="pl-1">
                                        {{plan.title}}
                                    </div>
                                </v-card-title>
                            </v-img>
                        </v-card>
                    </v-hover>
                    <!--<v-img v-if="item.file_path" :src="base_url + item.file_path.path + item.file_path.filename" max-width="100px" max-height="80px" class="ma-3" style="border-radius:50%; min-height: 150px; min-width: 150px;"></v-img>
                    <v-img v-else :src="base_url + empty_url" max-width="100px" max-height="80px" class="ma-3" style="border-radius:50%; min-height: 150px; min-width: 150px;"></v-img>-->
                </v-col>

                <v-col cols="12">

                </v-col>
            </v-row>
        </div>


        <div v-if="data_enrollment.enable_next_enrollment==1" class="container mt-4">
            <div class="row justify-center m-4">
                <h2 class="tit_h2_pink" style="text-align:center;">{{data_enrollment.enrollment_message}}</h2>
            </div>
            <div class="row justify-center m-4">
                <h2 class="tit_h2_pink" style="text-align:center;">{{data_enrollment.next_enrollment_date | formatDate}}
                </h2>
            </div>
        </div>
<whatsapp />
    </div>
</template>
<script>
export default {
    components: { 
     },

    data: () => ({
        category: 0,
        category_info: '',
        category_slug: '',
        categories: [],
        plans:[],
        temp_plans:[],
        base_url: '',
        name:['DESAFÍO EXPERIENCIA', 'DESAFÍO BRONCE','DESAFÍO EXPERIENCIA'],
        data_config: {},
        data_enrollment: {}
    }),

    
    mounted() {
        let vm = this;
        vm.$store.commit('loader',true);
        vm.getBaseUrl();
        vm.categoryList();
        vm.getConfiguracion();
        vm.list();this.$store.commit('loader',true);
        setTimeout(()=>{ 
            this.$store.commit('loader',false);
        }, 2000);
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
        async getConfiguracion(){
            try{
                const data = await this.$API.configuration.configuration();
                this.data_config = data.data.data;
                this.data_enrollment = JSON.parse(data.data.data.next_enrollment_date);
            }
            catch(e){
                console.error(e);
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
        async categoryList(){
            let vm = this;
            try{
                const data = await this.$API.plans.categories();
                vm.categories = data.data.data;
            }
            catch(e){
                console.error(e);
            }
        },
        async list(){
            let vm = this;
            try{
                const data = await this.$API.plans.list();
                vm.plans = data.data.data;
                vm.temp_plans = data.data.data;
                console.log(vm.data)
            }
            catch(e){
                console.error(e);
            }
        },
        goToPlan(identifier){
            this.$router.push({ path: '/plan/'+identifier });
        },
        goToCategory(){
            this.$router.push({ path: '/inscripciones/'+this.category_slug });
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