<template>
    <div>
        <v-container>
            <v-row>
                <v-col><h1 class="text_plan_title_white">Clases grabadas</h1></v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="8">
                    <h1 class="text_plan_title_white">Actividades</h1>
                </v-col>
                <v-col cols="12" md="2" class="select-clases formlogsel">
                    <v-select v-model="id_level" label="Coach" item-text="level" density="compact"
                        placeholder="Seleciona" item-value="id_level" color="#ffffff" outlined></v-select>
                </v-col>
                <v-col cols="12" md="2" class="select-clases formlogsel">
                    <v-select v-model="id_level" label="Clase" item-text="level"
                        placeholder="Seleciona" item-value="id_level" color="#ffffff" outlined></v-select>
                </v-col>
            </v-row>
            <v-row style="border: 2px solid #293E58; border-radius: 16px;">
                <v-col cols="12" md="3">
                    <v-card min-height="200" class="box_rutina" color="#E7004C" :img="require('../../../assets/img/gym_virtual/video2.png')"></v-card>
                </v-col>
                <v-col cols="12" md="3">
                    <v-card min-height="200" class="box_rutina" color="#E7004C" :img="require('../../../assets/img/gym_virtual/video2.png')"></v-card>
                </v-col>
                <v-col cols="12" md="3">
                    <v-card min-height="200" class="box_rutina" color="#E7004C" :img="require('../../../assets/img/gym_virtual/video2.png')"></v-card>
                </v-col>
                <v-col cols="12" md="3">
                    <v-card min-height="200" class="box_rutina" color="#E7004C" :img="require('../../../assets/img/gym_virtual/video2.png')"></v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model="toast.toast" :timeout="toast.timeout" :color="toast.color" dark>
            {{ toast.message }}
        </v-snackbar>

        <v-dialog v-model="registroPopup" activator="parent" width="auto">
            <v-card>
                <v-card-text>
                    <v-data-table :headers="cabeceras" :items="registrosTabla" :items-per-page="5"
                        class="elevation-1"></v-data-table>
                </v-card-text>
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
    }),
    mounted() {
    },
    computed: {
    },
    created() {
    },
    methods: {
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