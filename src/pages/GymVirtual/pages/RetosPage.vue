<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <h1 class="text_plan_title_white">Retos</h1>
                </v-col>
            </v-row>

            <v-row style="border: 2px solid #293E58; border-radius: 16px;margin-bottom: 10px;">
                <v-col v-for="(item, indx) in groupList" :key="'col_' + indx" cols="12" md="4">
                    <v-card min-height="200" v-if="indx == 0" min-width="200" class="box_rutina justify-center" :img="require('@/assets/img/gym_virtual/poto_en_la_nuca.jpg')" color="#0A2240" @click="showReto(indx)">
                        <v-card-title>
                            <v-spacer />
                            <div class="text-center">
                                <h1 class="text_box_gym_sm" style="margin-top: 20px;">{{item.field}}</h1>
                            </div>
                            <v-spacer />
                        </v-card-title>
                    </v-card>

                    <v-card min-height="200" v-if="indx == 1" min-width="200" class="box_rutina justify-center" :img="require('@/assets/img/gym_virtual/vikinga_no_abandona.jpg')" color="#0A2240" @click="showReto(indx)">
                        <v-card-title>
                            <v-spacer />
                            <div class="text-center">
                                <h1 class="text_box_gym_sm" style="margin-top: 20px;">{{item.field}}</h1>
                            </div>
                            <v-spacer />
                        </v-card-title>
                    </v-card>

                    <v-card min-height="200" v-if="indx == 2" min-width="200" class="box_rutina justify-center" :img="require('@/assets/img/gym_virtual/reto_nutricion.jpg')" color="#0A2240" @click="showReto(indx)">
                        <v-card-title>
                            <v-spacer />
                            <div class="text-center">
                                <h1 class="text_box_gym_sm" style="margin-top: 20px;">{{item.field}}</h1>
                            </div>
                            <v-spacer />
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>

                <v-row class="pa-2" v-show="show_reto1">
                    <v-col cols="12" md="3" v-for="(item, indx) in reto1" :key="indx">
                        <v-card min-height="200" min-width="200" class="box_rutina" :img="require('@/assets/img/gym_virtual/poto_en_la_nuca.jpg')" color="#0A2240" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" v-if="item.id && item.link_video == null && item.link_video != 'null' && item.filename != null && item.link_external == null">
                            <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                            <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                            <v-btn
                            fab
                            small
                            color="#fff"
                            :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code"
                            target="_blank"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                            >
                            <v-icon color="#E7004C">
                                mdi-tray-arrow-down
                            </v-icon>
                            </v-btn>
                        </v-card>
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/poto_en_la_nuca.jpg')" @click="openPlayer(item.link_video)" v-if="item.id && item.link_video != null && item.link_video != 'null'">
                            <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                            <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                            <v-btn
                            fab
                            small
                            color="#fff"
                            @click="openPlayer(item.link_video)"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                            >
                            <v-icon color="#E7004C">
                                mdi-play
                            </v-icon>
                            </v-btn>
                        </v-card>
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/poto_en_la_nuca.jpg')" @click="openLink(item.link_video)" v-if="item.id && (item.link_video == null || item.link_video == 'null') && item.filename == null && item.link_external != null">
                            <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                            <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                            <v-btn
                            fab
                            small
                            color="#fff"
                            @click="openLink(item.link_external)"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                            >
                            <v-icon color="#E7004C">
                                mdi-link
                            </v-icon>
                            </v-btn>
                        </v-card>
                    </v-col>
                </v-row>


                <v-row class="pa-2" v-show="show_reto2">
                    <v-col cols="12" md="3" v-for="(item, indx) in reto2" :key="indx">
                        <v-card min-height="200" min-width="200" class="box_rutina" :img="require('@/assets/img/gym_virtual/vikinga_no_abandona.jpg')" color="#0A2240" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" v-if="item.id && item.link_video == null && item.link_video != 'null' && item.filename != null && item.link_external == null">
                            <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                            <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                            <v-btn
                            fab
                            small
                            color="#fff"
                            :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code"
                            target="_blank"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                            >
                            <v-icon color="#E7004C">
                                mdi-tray-arrow-down
                            </v-icon>
                            </v-btn>
                        </v-card>
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/vikinga_no_abandona.jpg')" @click="openPlayer(item.link_video)" v-if="item.id && item.link_video != null && item.link_video != 'null'">
                            <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                            <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                            <v-btn
                            fab
                            small
                            color="#fff"
                            @click="openPlayer(item.link_video)"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                            >
                            <v-icon color="#E7004C">
                                mdi-play
                            </v-icon>
                            </v-btn>
                        </v-card>
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/vikinga_no_abandona.jpg')" @click="openLink(item.link_video)" v-if="item.id && (item.link_video == null || item.link_video == 'null') && item.filename == null && item.link_external != null">
                            <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                            <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                            <v-btn
                            fab
                            small
                            color="#fff"
                            @click="openLink(item.link_external)"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                            >
                            <v-icon color="#E7004C">
                                mdi-link
                            </v-icon>
                            </v-btn>
                        </v-card>
                    </v-col>
                </v-row>


                <v-row class="pa-2" v-show="show_reto3">
                    <v-col cols="12" md="3" v-for="(item, indx) in reto3" :key="indx">
                        <v-card min-height="200" min-width="200" class="box_rutina" :img="require('@/assets/img/gym_virtual/reto_nutricion.jpg')" color="#0A2240" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" v-if="item.id && item.link_video == null && item.link_video != 'null' && item.filename != null && item.link_external == null">
                            <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                            <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                            <v-btn
                            fab
                            small
                            color="#fff"
                            :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code"
                            target="_blank"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                            >
                            <v-icon color="#E7004C">
                                mdi-tray-arrow-down
                            </v-icon>
                            </v-btn>
                        </v-card>
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/reto_nutricion.jpg')" @click="openPlayer(item.link_video)" v-if="item.id && item.link_video != null && item.link_video != 'null'">
                            <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                            <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                            <v-btn
                            fab
                            small
                            color="#fff"
                            @click="openPlayer(item.link_video)"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                            >
                            <v-icon color="#E7004C">
                                mdi-play
                            </v-icon>
                            </v-btn>
                        </v-card>
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/reto_nutricion.jpg')" @click="openLink(item.link_video)" v-if="item.id && (item.link_video == null || item.link_video == 'null') && item.filename == null && item.link_external != null">
                            <h1 class="text_box_gym_sm align-left" style="padding-top: 10px!important; position: absolute; bottom:40px; margin-left: 8px;">{{ item.title }}</h1>
                            <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;position: absolute; bottom:0px;" v-if="item.description != 'null'">{{ item.description }}</h4>
                            <v-btn
                            fab
                            small
                            color="#fff"
                            @click="openLink(item.link_external)"
                            style="position: absolute; bottom:15px; right:10px; padding:5px;"
                            >
                            <v-icon color="#E7004C">
                                mdi-link
                            </v-icon>
                            </v-btn>
                        </v-card>
                    </v-col>
                </v-row>
            </v-row>
        </v-container>
        <v-snackbar v-model="toast.toast" :timeout="toast.timeout" :color="toast.color" dark>
            {{ toast.message }}
        </v-snackbar>
        <v-dialog transition="dialog-bottom-transition" max-width="800" v-model="dialogPlayer">
            <v-card>
                <v-card-text class="text-center d-flex align-center pt-10 justify-center" v-if="dialogPlayer">
                    <iframe :src="now_playing" width="800" height="328" frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn text @click="dialogPlayer = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import axios from "axios";

import FlipCountdown from 'vue2-flip-countdown';

export default {
    components: {
        axios,
        FlipCountdown
    },
    data: () => ({
        cabeceras: [
            {
                text: 'Ejercicio',
                align: 'start',
                sortable: false,
                value: 'ejercicio',
            },
            { text: 'Fecha', value: 'fecha' },
            { text: 'Peso (kg)', value: 'peso' },
            { text: 'Comentarios', value: 'comentarios' },
            { text: 'Acciones', value: 'acciones' }
        ],
        registrosTabla: [
            {
                ejercicio: 'Back Squat',
                fecha: "01/12/2023",
                peso: 6.0,
                comentarios: "Aumentar peso proxima semana",
                acciones: ""
            }
        ],
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
        show_reto1: false,
        show_reto2: false,
        show_reto3: false,
        retos_list: [],
        groupList: [],
        dialogPlayer: false,
        now_playing: null,
        reto1: [],
        reto2: [],
        reto3: []
    }),
    mounted() {
        this.getDownloads();
    },
    computed: {
    },
    created() {
        Array.prototype.groupBy = function (field) {
            let groupedArr = [];
            this.forEach(function (e) {
                //look for an existent group
                let group = groupedArr.find(g => g['field'] === e[field]);
                if (group == undefined) {
                    //add new group if it doesn't exist
                    group = { field: e[field], groupList: [] };
                    groupedArr.push(group);
                }
                //add the element to the group
                group.groupList.push(e);
            });

            return groupedArr;
        }
    },
    methods: {
        showReto(reto){
            let index = reto + 1;
            
            if(index==1){
                this.show_reto1 = true;
                this.show_reto2 = false;
                this.show_reto3 = false;
            }else if(index==2){
                this.show_reto1 = false;
                this.show_reto2 = true;
                this.show_reto3 = false;
            }else{
                this.show_reto1 = false;
            this.show_reto2 = false;
            this.show_reto3 = true;
            }
        },

        async getDownloads() {
            this.$store.commit('loader', true);
            try {
                const response = await this.$API.business_partner.getRetos();
                
                this.retos_list = response.data.data;
                
                //console.log(this.downloads_list.groupBy('name_category'))
                this.groupList = this.retos_list.groupBy('name_category');
                console.log(this.groupList);
                this.reto1 = this.groupList[0].groupList;
                this.reto2 = this.groupList[1].groupList;
                this.reto3 = this.groupList[2].groupList;
                this.$store.commit('loader', false);
            } catch (e) {
                this.$store.commit('loader', false);
                console.error(e);
            }
        },
        openPlayer(video_link) {
            this.now_playing = video_link;
            this.dialogPlayer = true;
        },
        openLink(link){
            window.open(link, '_blank')
        }
    }
}
</script>

<style>
.activity-class {
    background-color: #0B233F;
}

.activity-taller {
    background-color: #E30E4F;
}

.activity-descanso {
    background-color: #e9e9e9;
}

.activity-nutrition {
    background-color: #0480a4;
}
</style>