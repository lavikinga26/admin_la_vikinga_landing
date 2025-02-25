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

                    <v-card min-height="200" v-if="indx == 3" min-width="200" class="box_rutina justify-center" :img="require('@/assets/img/gym_virtual/entrena_bebe.jpg')" color="#0A2240" @click="showReto(indx)">
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
            <v-row ref="retosdiv"></v-row>
            <v-row class="pa-2" v-show="show_reto1">
                    <v-col cols="12" md="3" v-for="(item, indx) in reto1" :key="indx">
                        <v-card min-height="200" min-width="200" class="box_rutina" :img="require('@/assets/img/gym_virtual/poto_en_la_nuca.jpg')" color="#0A2240" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" v-if="item.link_video == null && item.filename != null && item.link_external == null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/poto_en_la_nuca.jpg')" @click="openPlayer(item.link_video)" v-if="item.link_video != null && item.filename == null && item.link_external == null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/poto_en_la_nuca.jpg')" @click="openLink(item.link_external)" v-if="item.link_video == null && item.filename == null && item.link_external != null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" :img="require('@/assets/img/gym_virtual/vikinga_no_abandona.jpg')" color="#0A2240" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" v-if="item.link_video == null && item.filename != null && item.link_external == null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/vikinga_no_abandona.jpg')" @click="openPlayer(item.link_video)" v-if="item.link_video != null && item.filename == null && item.link_external == null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/vikinga_no_abandona.jpg')" @click="openLink(item.link_external)" v-if="item.id && (item.link_video == null || item.link_video == 'null') && item.filename == null && item.link_external != null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" :img="require('@/assets/img/gym_virtual/reto_nutricion.jpg')" color="#0A2240" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" v-if="item.link_video == null && item.filename != null && item.link_external == null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/reto_nutricion.jpg')" @click="openPlayer(item.link_video)" v-if="item.link_video != null && item.filename == null && item.link_external == null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/reto_nutricion.jpg')" @click="openLink(item.link_external)" v-if="item.id && (item.link_video == null || item.link_video == 'null') && item.filename == null && item.link_external != null">
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

                <v-row class="pa-2" v-show="show_reto4">
                    <v-col cols="12" md="3" v-for="(item, indx) in reto4" :key="indx">
                        <v-card min-height="200" min-width="200" class="box_rutina" :img="require('@/assets/img/gym_virtual/entrena_bebe.jpg')" color="#0A2240" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" v-if="item.link_video == null && item.filename != null && item.link_external == null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/entrena_bebe.jpg')" @click="openPlayer(item.link_video)" v-if="item.link_video != null && item.filename == null && item.link_external == null">
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
                        <v-card min-height="200" min-width="200" class="box_rutina" color="#0A2240" :img="require('@/assets/img/gym_virtual/entrena_bebe.jpg')" @click="openLink(item.link_external)" v-if="item.id && (item.link_video == null || item.link_video == 'null') && item.filename == null && item.link_external != null">
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
                <v-row style="margin-bottom: 300px;"></v-row>
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
        show_reto4: false,
        retos_list: [],
        groupList: [],
        dialogPlayer: false,
        now_playing: null,
        reto1: [],
        reto2: [],
        reto3: [],
        reto4: [],
        has_active_plan: false,
        show_message_plan: false,
        user: [],
        userPlans: []
    }),
    mounted() {
        this.auth();
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
        async auth() {
            let vm = this;
            try {
                const response = await this.$API.auth.auth();
                this.user = response.data;
                
                this.userPlans = response.data.plans;
                let fecha_actual = new Date();
                
                this.userPlans.map(function (item) {
                    let init_d = new Date(item.init_date);
                    let end_d = new Date(item.expiration_date);
                    if(fecha_actual <= new Date(item.expiration_date) && vm.has_active_plan == false){
                        vm.has_active_plan = true;
                    }
                });
                vm.show_message_plan = vm.has_active_plan === true ? false:true;
            } catch (e) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
        showReto(reto){
            let index = reto + 1;
            
            if(index==1){
                this.show_reto1 = true;
                this.show_reto2 = false;
                this.show_reto3 = false;
                this.show_reto4 = false;
            }else if(index==2){
                this.show_reto1 = false;
                this.show_reto2 = true;
                this.show_reto3 = false;
                this.show_reto4 = false;
            }else if(index==3){
                this.show_reto1 = false;
                this.show_reto2 = false;
                this.show_reto3 = true;
                this.show_reto4 = false;
            }else if(index==4){
                this.show_reto1 = false;
                this.show_reto2 = false;
                this.show_reto3 = false;
                this.show_reto4 = true;
            }
            /*const refVar = "retosdiv"
            this.$refs[refVar].scrollIntoView({ behavior: "smooth" });
            var container = this.$refs.retosdiv;
            container.scrollTop = container.scrollHeight + 120;*/
            //window.scrollTo(0, document.body.scrollHeight);

            var node = this.$refs['retosdiv'];
            var yourHeight = 68;

            // scroll to your element
            node.scrollIntoView({ behavior: "smooth" });

            // now account for fixed header
            var scrolledY = window.scrollY;

            if(scrolledY){
                window.scroll(0, scrolledY - yourHeight);
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
                this.reto4 = this.groupList[3].groupList;
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