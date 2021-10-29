<template>
    <div>
        <div class="container-fluid bg_pink inscripciones">
            <div class="row">
                <div class="col-12 text-center">
                    <h1 class="tit_h1_white">INSCRIPCIONES</h1>
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
                    <v-img
                        lazy-src="https://picsum.photos/id/11/10/6"
                        max-height="400"
                        max-width="250"
                        :src="base_url + plan.file_path.path + plan.file_path.filename"
                    ></v-img>

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
        vm.slug = this.$route.params.slug;
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
                const data = await this.$API.plans.category();
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
        }
    },
}
</script>
<style>
  .fb-btn.v-btn--outlined {
    border: 3px solid #E30E4F;
  }
</style>