<template>
    <div>
        <!-- Encabezado -->
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <div class="inline-block">
                        <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                        <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    </div>
                    
                    <p class="tit_h1_white text_entrena">BIBLIOTECA DE VÍDEOS</p>
                </div>
            </div>
        </div>
        <div class="container-fluid pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <p class="tit_h2_pink text_entrena">DESCUBRE EL ENTRENAMIENTO QUE NECESITAS</p>
                </div>
            </div>
        </div>
        <div class="d-flex flex-row justify-center my-2" align="center">
            <v-spacer></v-spacer>
            <v-toolbar light elevation="0">
                <v-btn v-for="(item, i) in list_categories" :key="i"
                    @click="filterListWorkout(item)"
                    :text="category_id!=item.id"
                    :outlined="category_id==item.id"
                    tile
                    color="#E30E4F">
                    {{item.name}}
                </v-btn>
            </v-toolbar>
        </div>
        <!-- Fin -->

        <!-- Contenido -->
        <div class="container mt-10">
            <v-row>
                <v-col cols="12" md="4" sm="4" v-for="(item, i) in list_workout" :key="i">
                    <div class="parent-size">
                        <!-- <img
                            src="https://picsum.photos/id/11/10/6"
                            style="width: 100%"
                            class="img_staff"> -->
        
                        <div contenteditable="true"
                            v-html="item.video_url">
                        </div>
                    </div>
                    <div class="text-center">
                        <p class="tit_h3_team_blue">{{item.title}}</p>
                        <v-btn
                            tile
                            color="#E30E4F"
                            dark
                            large>
                            VER AHORA
                        </v-btn>
                    </div>
                    <br>
                    <br>
                </v-col>
            </v-row>
        </div>
        <!-- Fin -->
        <phones-photos></phones-photos>
        <frequent-questions></frequent-questions>
    </div>
</template>

<script>
export default {
    data: () => ({
        category_id: 0,
        list_categories: [],
        temp_list_workout: [],
        list_workout: [],
    }),
    mounted() {
        this.getListCategories();
    },
    methods:{
        async getListCategories(){
            this.$store.commit('loader',true);

            try{
                const response = await this.$API.workouts.categories();
                this.list_categories = response.data.data;
                this.getListWorkout();
            }
            catch(e){
                console.error(e);
            } finally {
                this.$store.commit('loader', false);
            }
        },
        async getListWorkout(){
            try{
                const response    = await this.$API.workouts.list();
                this.temp_list_workout = response.data.data;
                this.filterListWorkout(this.list_categories[0]);
            }
            catch(e){
                console.error(e);
            }
        },
        filterListWorkout(item){
            this.category_id = item.id;
            const filtered_list = this.temp_list_workout;
            this.list_workout = filtered_list.filter(obj => obj.category_id == item.id);
        },
    }
}
</script>

<style>
.inline-block {
   display: inline-block;
}
.parent-size img {
   height: 100%;
   width: 100%;
}
.centered-cell {
    text-align: center;
    top: 50%;
    left: 1%;
    right: 1%;
}
</style>