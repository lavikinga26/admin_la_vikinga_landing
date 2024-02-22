<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" md="6"><h1 class="text_plan_title_white">Clases grabadas</h1></v-col>
                <v-col cols="12" md="3" class="select-clases formlogsel">
                        <v-select v-model="id_staff" :items="staff" label="Coach" item-text="name" density="compact"
                            placeholder="Seleciona" item-value="id" color="#ffffff" outlined clearable v-on:change="getActivitiesRecordedFilters"></v-select>
                    </v-col>
                    <v-col cols="12" md="3" class="select-clases formlogsel">
                        <v-select v-model="enfoque" :items="enfoqueItems" label="Enfoque" item-text="label"
                            placeholder="Seleciona" item-value="term" color="#ffffff" outlined clearable v-on:change="getActivitiesRecordedFilters"></v-select>
                    </v-col>
            </v-row>
            <v-row style="border: 2px solid #293E58; border-radius: 16px;">
                <v-col cols="12" md="3" v-for="(clase, n) in clases_grabadas" :key="n">
                    <v-card min-height="200" class="box_rutina" color="#E7004C" :img="base_url + clase.path + clase.filename" @click="openPlayer(clase.link_video)">
                        <v-badge
                            color="#E7004C"
                            :content="getDateBadge(clase._date, 'es-ES', clase.hour_class)"
                            inline
                            class="badge_pink_class"
                        ></v-badge>
                        <h1 class="font_box_prox_clase card_text_bottom_focus" style="padding-top: 90px!important;">{{ clase.nombreclase }}</h1>
                        <h1 class="font_box_prox_clase_white card_text_bottom" style="padding-top: 90px!important;">{{ clase.focus }}</h1>
                        
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-pagination
                        v-model="pagina"
                        class="my-4"
                        :length=total_paginas
                        @input="getActivitiesRecordedFilters()"
                        color="#e30e4f"
                    ></v-pagination>
                </v-col>
            </v-row>
            <v-row style="margin-bottom: 100px;"></v-row>
        </v-container>
        <v-snackbar v-model="toast.toast" :timeout="toast.timeout" :color="toast.color" dark>
            {{ toast.message }}
        </v-snackbar>
        <v-dialog transition="dialog-bottom-transition" max-width="900" v-model="dialogPlayer">
            <v-card style="background: #000!important;">
                <v-card-text class="text-center d-flex align-center pt-5 justify-center" v-if="dialogPlayer">
                    <iframe :src="now_playing" width="900" height="400" frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn depressed @click="dialogPlayer = false" color="error">Cerrar</v-btn>
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
        now_playing: "",
        dialogPlayer:false,
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
        staff: [],
        clases_grabadas: [],
        id_level: 0,
        id_staff: null,
        enfoque: null,
        total_paginas: 0,
        pagina: 1,
        enfoqueItems: [
            { label: "Full Body", term: "FULL BODY" },
            { label: "Pecho", term: "PECHO" },
            { label: "Gluteos", term: "GLUTEOS" },
            { label: "Torso", term: "TORSO" },
            { label: "Piernas", term: "PIERNAS" },
            { label: "Taller", term: "TALLER" },
        ]
    }),
    mounted() {
        this.getBaseUrl();
        this.getLoggedUser();
        this.listStaff();
        
    },
    computed: {
    },
    created() {
    },
    methods: {
        openPlayer(video_link) {
            this.now_playing = video_link;
            this.dialogPlayer = true;
        },
        async getLoggedUser() {
            if (localStorage.getItem('token')) {
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');

                const response = await this.$API.business_partner.getPartner(this.logged_user.id);
                this.business_partner = Object.assign(response.data.data[0]);
                this.id_level = this.business_partner.id_level;
                this.getActivitiesRecordedFilters();
            }
        },
        async getBaseUrl() {
            try {
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
            }
            catch (e) {
                console.error(e);
            }
        },
        async listStaff() {
            let vm = this;
            vm.$store.commit('loader', true);
            try {
                const data = await this.$API.team.staff();
                vm.staff = data.data.data;
                vm.$store.commit('loader', false);
            }
            catch (e) {
                console.error(e);
                vm.$store.commit('loader', false);
            }
        },
        async getActivitiesRecordedFilters() {
            this.$store.commit('loader', true);
            const data = await this.$API.gymVirtual.getActivitiesRecordedFilters(this.id_level, this.id_staff, this.enfoque, this.pagina);
            let clasesGrabadas = data.data.data;
            this.clases_grabadas = clasesGrabadas;
            this.total_paginas = data.data.total_pages;
            this.$store.commit('loader', false);
        },
        getDateBadge(dateStr, locale, hour) {
            var date = new Date(dateStr + " " + hour + ":00");
            let fecha = date.toLocaleDateString(locale, { weekday: 'short', timeZone: 'America/Lima' });
            let dia = fecha.charAt(0).toUpperCase() + fecha.slice(1);
            let time = date.toLocaleString(locale, { hour: 'numeric', hour12: true });
            let month = date.toLocaleDateString(locale, { month: 'short', timeZone: 'America/Lima' });
            let mes = month.charAt(0).toUpperCase() + month.slice(1);
            return mes + ", "+dia + " " + date.getDate().toString().padStart(2, '0') + " - " + time;
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