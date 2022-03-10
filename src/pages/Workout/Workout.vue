<template>
    <div class="mb-10">
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
        <div class="d-flex flex-row justify-center my-2 flex-wrap" align="center">
                <v-btn v-for="(item, i) in list_categories" :key="i"
                    @click="filterListWorkout(item)"
                    :text="category_id!=item.id"
                    :outlined="category_id==item.id"
                    tile
                    color="#E30E4F">
                    {{item.name}}
                </v-btn>
        </div>
        <!-- Fin -->

        <!-- Contenido -->
        <div class="container mt-10 mb-15">
            <v-row>
                <v-col cols="12" md="4" sm="4" v-for="(item, i) in list_workout" :key="i">
                    <v-card
                        class="mx-auto"
                        max-width="374"
                        dark
                        color="#0b152a"
                        style="border-radius: 10px !important;"
                    >
                        <v-img
                            src="https://i.vimeocdn.com/video/1216681987-4743218d2221b42f2acba382eceedf59e3a83c91aade0ff4b264a3deb6b2a295-d_640"
                            height="180px"
                            cover
                        >
                            
                            <v-row class="fill-height ma-0"  align="center" justify="center" 
                            style="background-color:#0000004d">
                                <v-btn
                                icon
                                class="white--text"
                                @click="getVideoActivity(item)"
                                >
                                    <v-icon style="font-size: 50px" 
                                    class="white--text"
                                    color="#FFFFFF"
                                    >mdi-motion-play-outline</v-icon>
                                </v-btn>
                            </v-row>
                        </v-img>
                        <v-card-text>
                            <p class="tit_h3_team_white" style="font-weight:100; text-align:center">
                                {{item.title}}
                            </p>
                            <p class="text-center" style="font-size:14px;">
                                {{item.description}}
                            </p>
                        </v-card-text>
                    </v-card>

                </v-col>
            </v-row>
        </div>

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
                    {{currrent_activity.name}}
                </v-toolbar>
                <v-card-text class="text-center d-flex align-center pt-10 justify-center" v-if="dialog">
                    <!--<div v-html="currrent_activity.iframe"></div>-->
                    <iframe :src="currrent_activity.iframe" width="640" height="328" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                </v-card-text>
            
                <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="dialog  = false"
                >Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
        dialog: false,
        currrent_activity: {
            iframe:'',
            name:'',
        }
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
            }
        },
        async getListWorkout(){
            this.$store.commit('loader',true);
            try{
                const response    = await this.$API.workouts.list();
                this.temp_list_workout = response.data.data;
                this.filterListWorkout(this.list_categories[0]);
            }
            catch(e){
                console.error(e);
            }finally {
                this.$store.commit('loader', false);
            }
        },
        filterListWorkout(item){
            this.category_id = item.id;
            const filtered_list = this.temp_list_workout;
            this.list_workout = filtered_list.filter(obj => obj.category_id == item.id);
        },
        getVideoActivity(video){
            if(video.video_url.includes('vimeo')){
                this.currrent_activity = {
                    iframe: video.video_url,
                    name: video.title,
                }
                this.dialog= true;
            }
            else{
                window.open(video.video_url, "_blank");
            }
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


.gallery{
    display: grid;
    gap: 1rem;
    grid-auto-rows: 25rem;
    grid-template-columns: repeat(auto-fill,minmax(20rem, 1fr));
}
.card-posts{
    background-color: #0b152a;
    color:white;
    border-radius: 10px;
}
.card-image{
    height: 40%;
    background-color: turquoise;
    -webkit-border-top-left-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    -moz-border-radius-topleft: 10px;
    -moz-border-radius-topright: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.card-details{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-content{
    height: 60%;
    padding: 5px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
@media (max-width: 960px){
    .main-image{
        min-height: 450px;
    }
    .main-content{
        min-height: 450px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
@media (max-width: 925px){
    .gallery{
        grid-template-columns: 100%;
        padding-right: 20px;
        padding-left: 20px;
    }
}
</style>