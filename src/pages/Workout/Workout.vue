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
                <template v-for="(item, i) in list_categories">
                    <v-btn :key="i"
                        @click="getListWorkout(item)"
                        :text="true"
                        :outlined="false"
                        tile
                        color="#E30E4F">
                        {{item.name}}
                    </v-btn>
                </template>
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
        
        <div class="container-fluid bg_blue pt-3 pb-5">
            <table>
                <tr>
                    <th style="width: 25%;"></th>
                    <th style="width: 20%;"></th>
                </tr>
                <tr>
                    <td style="text-align: center; padding-right:50px; padding-left:50px;">
                        <div class="centered-cell content-row">
                            <img style="width: 150px;" src="@/assets/img/isotipo.png" alt="Logo" />
                            <p style="color:white;"><b>ADQUIERE UN PLAN Y</b></p>
                            <p class="tit_h1_pink text_entrena">ENTRENA DONDE QUIERAS</p>
                        </div>
                    </td>
                    <td style="text-align: center; padding-right:50px; padding-left:50px;">
                        <img src="@/assets/img/img_celulares.png" style="max-width: 600px;" alt="" class="">
                    </td>
                </tr>
            </table>
        </div>
        <frequent-questions></frequent-questions>
    </div>
</template>

<script>
export default {
    data: () => ({
        list_categories: [],
        list_workout: [],
    }),
    mounted() {
        this.getListCategories();
    },
    methods:{
        async getListCategories(){
            try{
                const response = await this.$API.workouts.categories();
                this.list_categories = response.data.data;
                this.getListWorkout(this.list_categories[0]);
            }
            catch(e){
                console.error(e);
            }
        },
        async getListWorkout(item){
            try{
                const response    = await this.$API.workouts.list(item.id);
                this.list_workout = response.data.data;

                console.log(this.list_workout);
            }
            catch(e){
                console.error(e);
            }
        }
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