<template>
    <div>
        <v-container v-if="has_active_plan === true">
            <v-row>
                <v-col>
                    <h1 class="text_plan_title_white">Horarios</h1>
                </v-col>
            </v-row>
            <v-row style="border: 2px solid #293E58; border-radius: 16px;margin-bottom: 10%;">
                <div class="fill" v-if="banner.path != ''">
        <div class="fill-image" v-if="banner.link != null">
            <a :href="banner.link">
                <img :src="banner.path" class="bannerimg" alt="" style="width: 100%;">
            </a>
        </div>
        <div class="fill-image" v-else>
            <img :src="banner.path" alt="" class="bannerimg" style="width: 100%;">
        </div>
    </div>
            </v-row>
        </v-container>
        <v-snackbar v-model="toast.toast" :timeout="toast.timeout" :color="toast.color" dark>
            {{ toast.message }}
        </v-snackbar>
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
        base_url:"",
        banner:{
            link:"",
            path:"",
        }
    }),
    mounted() {
        this.auth();
        this.loadBanner();
    },
    computed: {
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
                this.userPlans = response.data.plans;
                let fecha_actual = new Date();
                this.userPlans.map(function (item) {
                    if(fecha_actual <= new Date(item.expiration_date) && vm.has_active_plan == false){
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
        async loadBanner(){
            const response  = await this.$API.gym_banner.list('home');
            this.banner.link = response.data.data.link;
            this.banner.path = this.$baseURL + response.data.data.file_path.path + response.data.data.file_path.filename; 
            console.log(this.banner);
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