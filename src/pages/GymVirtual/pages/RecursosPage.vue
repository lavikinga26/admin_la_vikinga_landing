<template>
    <div>
        <v-container class="mb-5" v-if="has_active_plan === false">
            <v-row class="text-center">
                <v-col cols="12" v-if="show_message_plan === true">
                    <h1 class="text-center text_box_title" style="margin-top: 10%;">Ups! No cuentas con ningún plan activo!</h1>
                    <v-btn class="text_btn_white_title mt-5" color="secondary" @click="gohome">Renovar/adquirir plan</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-if="has_active_plan === true">
            <v-row>
                <v-col>
                    <h1 class="text_plan_title_white">Recursos</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12">
                    <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        color="secondary"
                        dark
                    >
                        <v-tab
                        v-for="(item, indx) in groupList"
                        :key="'tab_' + indx"
                        >
                        {{ item.field }}
                        </v-tab>
                    </v-tabs>
                </v-col>
            </v-row>
            <v-row style="border: 2px solid #293E58; border-radius: 16px;margin-bottom: 10%;">
                <v-tabs-items v-model="tab" style="background: transparent!important;width:100%!important; margin-bottom: 5%;">
                    <v-tab-item
                      v-for="(item, indx) in groupList"
                      :key="'tab_item_' + indx"
                      
                    >
                        <v-row class="pa-2">
                            <v-col cols="12" md="3" v-for="(item, indx) in item.groupList" :key="indx">
                                <v-card min-height="200" min-width="200" class="box_rutina" color="#E7004C" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" v-if="item.id && flag_mostrar == 1 && item.link_video == null && item.link_video != 'null'">
                                    <h1 class="text_box_gym_sm_blue align-left" style="padding-top: 10px!important;">{{ item.title }}</h1>
                                    <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;" v-if="item.description != 'null'">{{ item.description }}</h4>
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
                                <v-card min-height="200" min-width="200" class="box_rutina" color="#E7004C" @click="openPlayer(item.link_video)" v-if="item.id && flag_mostrar == 1 && item.link_video != null && item.link_video != 'null'">
                                    <h1 class="text_box_gym_sm_blue align-left" style="padding-top: 10px!important;">{{ item.title }}</h1>
                                    <h4 style="padding: 0px 10px; color: #fff; font-family: 'Poppins-Regular'; font-size: 12px;" v-if="item.description != 'null'">{{ item.description }}</h4>
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
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs-items>
            </v-row>
            <v-row>
                <v-col cols="12" md="12" class="hidden-md-and-up">
                    <div style="height: 200px;"></div>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model="toast.toast" :timeout="toast.timeout" :color="toast.color" dark>
            {{ toast.message }}
        </v-snackbar>

        <v-dialog transition="dialog-bottom-transition" max-width="800" v-model="dialogPlayer">
            <v-card>
                <!--<v-toolbar color="primary" dark elevation="0">
                {{ currrent_activity.name }}
            </v-toolbar>-->
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
        downloads_list: [],
        user: {},
        groupList: [],
        tab: null,
        flag_mostrar: 1,
        dialogPlayer: false,
        now_playing: null,
        has_active_plan: false,
        show_message_plan: false,
        id_level: 0,
    }),
    mounted() {
        this.auth();
        
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
        gohome(){
            window.location.replace('https://desafio.lavikingaoficial.com');
        },
        async auth() {
            let vm = this;
            try {
                const response = await this.$API.auth.auth();
                this.user = response.data;
                if (this.user.id_level != null) {
                    this.id_level = this.user.id_level;
                }
                this.getDownloads();
                this.userPlans = response.data.plans;
                let fecha_actual = new Date();
                this.userPlans.map(function (item) {
                    var dateExp = new Date(item.expiration_date+" 23:59:59");
                    var day = 60 * 60 * 24 * 1000;
                    var newExpDate = new Date(dateExp.getTime() + day);

                    if(fecha_actual <= newExpDate && vm.has_active_plan == false){
                        vm.has_active_plan = true;
                    }
                });
                vm.show_message_plan = vm.has_active_plan === true ? false:true;
                var planes = this.userPlans;
            } catch (e) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
        async getDownloads() {
            this.$store.commit('loader', true);
            try {
                const response = await this.$API.business_partner.getDownloadsGym(this.id_level);
                this.downloads_list = response.data.data;

                //console.log(this.downloads_list.groupBy('name_category'))
                this.groupList = this.downloads_list.groupBy('name_category');
                this.$store.commit('loader', false);
            } catch (e) {
                this.$store.commit('loader', false);
                console.error(e);
            }
        },
        openPlayer(video_link) {
            this.now_playing = video_link;
            this.dialogPlayer = true;
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
}</style>