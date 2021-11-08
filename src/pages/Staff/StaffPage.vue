<template>
    <div>
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <div class="inline-block">
                        <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                        <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    </div>
                    
                    <p class="tit_h1_white text_entrena">STAFF</p>
                </div>
            </div>
        </div>

        <div class="container mt-10">
            <v-row>
                <v-col
                    v-for="(st,index) in staff"
                    :key="index"
                    cols="12"
                    md="6"
                    sm="6"
                >

                    <staff-card
                        :image="base_url + st.file_path.path + st.file_path.filename"
                        :name="st.name"
                        :phrase="st.phrase"
                        :description="st.description"
                    >
                    </staff-card>
                </v-col>
            </v-row>
        </div>

    </div>
</template>
<script>
import StaffCard from "./components/StaffCard.vue";
export default {
    components: { 
        'staff-card': StaffCard
     },

    data: () => ({
        categories: [],
        staff:[],
        base_url: '',
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.slug;
        vm.$store.commit('loader',true);
        vm.getBaseUrl();
        vm.list();
    },

    watch: {
    },

    methods: {
        async getBaseUrl(){
            try{
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
        
        async list(){
            let vm = this;
            try{
                const data = await this.$API.team.staff();
                vm.staff = data.data.data;
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