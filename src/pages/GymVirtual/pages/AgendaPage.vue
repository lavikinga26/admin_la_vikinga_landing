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
        <v-container class="mb-5" v-if="has_active_plan === true">
            <v-row v-if="id_level == null" class="hidden-md-and-down">
                <v-col cols="12">
                    <div key="popup_level" class="text-left">
                        <v-alert type="info" color="#E7004C" elevation="0">
                            <b>IMPORTANTE:</b> Selecciona tu nivel para mostrarte las mejores opciones de entrenamiento.
                        </v-alert>
                    </div>
                </v-col>
            </v-row>

            <v-row v-if="banners.length > 0">
                <v-col cols="12">
                    <v-carousel
                        hide-delimiter-background
                        cycle
                        :show-arrows="false"
                        hide-delimiters
                        height="150px"
                        class="rounded-xl hidden-md-and-down">
                        <v-carousel-item
                            v-for="(item,i) in banners"
                            :key="i"
                            :src="base_url + item.file_path.path + item.file_path.filename"
                            gradient="to right, rgba(231, 0, 76, 0.8), rgba(255, 200, 120, 0.7)"
                        >
                            <v-container
                                fill-height
                                fluid
                            >
                                <v-layout>
                                    <v-flex xs12>
                                        <v-row align="center">
                                            <v-col cols="12" md="10" xl="10" sm="12" xs="12" align="left">
                                                <h2 v-show="item.title != null && item.title != '' " class="display-2 font-weight-bold mb-4 white--text ml-4" style="font-family: 'MachProCondBold'!important;" id="main-title"> {{ item.title }}</h2>
                                                <h3 v-show="item.subtitle != null && item.subtitle != '' " class="font-weight-light white--text ml-4" id="main-subtitle">
                                                {{item.subtitle}}
                                                </h3>
                                            </v-col>
                                            <v-col cols="12" md="2" xl="2" sm="12" xs="12" align="center">
                                                <v-btn
                                                    v-show="item.link != null && item.link != '' "
                                                    rounded
                                                    outlined
                                                    large
                                                    dark
                                                    link
                                                    class="mt-5"
                                                    :href="item.link"
                                                >
                                                    Ver más
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-carousel-item>
                    </v-carousel>


                    <v-carousel
                        hide-delimiter-background
                        cycle
                        :show-arrows="false"
                        hide-delimiters
                        height="220px"
                        class="rounded-xl hidden-md-and-up">
                        <v-carousel-item
                            v-for="(item,i) in banners"
                            :key="i"
                            :src="base_url + item.file_path.path + item.file_path.filename"
                            gradient="to right, rgba(231, 0, 76, 0.8), rgba(255, 200, 120, 0.7)"
                        >
                            <v-container
                                fill-height
                                fluid
                            >
                                <v-layout>
                                    <v-flex xs12>
                                        <v-row align="center">
                                            <v-col cols="12" md="10" xl="10" sm="12" xs="12" align="left">
                                                <h3 v-show="item.title != null && item.title != '' " class="display-2 font-weight-bold mb-4 white--text ml-2" style="font-family: 'MachProCondBold'!important;" id="main-title"> {{ item.title }}</h3>
                                                <h4 v-show="item.subtitle != null && item.subtitle != '' " class="font-weight-light white--text ml-2" id="main-subtitle">
                                                {{item.subtitle}}
                                                </h4>
                                            </v-col>
                                            <v-col cols="12" md="2" xl="2" sm="12" xs="12" align="center">
                                                <v-btn
                                                    v-show="item.link != null && item.link != '' "
                                                    rounded
                                                    outlined
                                                    large
                                                    dark
                                                    link
                                                    :href="item.link"
                                                >
                                                    Ver más
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                    <h2 class="text_box_title" v-if="clases_vivo.length >0">Próxima Clase</h2>
                    <v-card :img="base_url + clases_vivo[0].path+ clases_vivo[0].filename" height="350" class="box_gym_virtual" :href="clases_vivo[0].link_class" target="_blank" v-if="clases_vivo.length > 0">
                        <v-badge
                            color="#E7004C"
                            :content="getDateBadge(clases_vivo[0].horarios, 'es-ES', clases_vivo[0].hour_class)"
                            inline
                            class="badge_pink_class"
                            v-if="showRutinas"
                        ></v-badge>
                        <v-sheet style="background:transparent;">
                            <v-row>
                                <v-col cols="4"></v-col>
                                <v-col cols="7"><h1 class="text_main_class" style="margin-top: 35%; right: 0;">{{ clases_vivo[0].nombreclase }}</h1></v-col>
                            </v-row>
                            <v-row class="align-center" v-if="timerOutput.days >=0 && timerOutput.hours >= 0 && timerOutput.minutes >= 0">
                                <v-col cols="2"> </v-col>
                                <v-col cols="3" style="text-align: center;">
                                    <div class="countdown">
                                        <span>{{ timerOutput.days }}</span>
                                    </div>
                                    <span class="countdownTxt">Días</span>
                                </v-col>
                                <v-col cols="3" style="text-align: center;">
                                    <div class="countdown">
                                        <span>{{ timerOutput.hours }}</span>
                                    </div>
                                    <span class="countdownTxt">Horas</span>
                                </v-col>
                                <v-col cols="3" style="text-align: center;">
                                    <div class="countdown">
                                        <span>{{ timerOutput.minutes }}</span>
                                    </div>
                                    <span class="countdownTxt">Minutos</span>
                                </v-col>
                            </v-row>
                            <v-row class="align-center" v-else>
                                <v-col cols="5"></v-col>
                                <v-col cols="7">
                                    <v-btn class="text_btn_white_title" color="secondary">Ingresar a clase</v-btn>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </v-card>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                        <h2 class="text_box_title" v-if="clases_vivo.length > 0">Próximas Clases en vivo</h2>
                        <v-card class="box_gym_virtual" color="#0A2240" v-if="clases_vivo.length > 0">
                            <v-row class="pa-3">
                                <v-col cols="12" md="4" sm="12" xs="12" v-for="(item, n) in clases_vivo.slice(1)" :key="n">
                                    <v-card height="320" class="box_gym_virtual" :img="base_url + item.path + item.filename" color="#0A2240" :href="item.link_class">
                                        <v-badge
                                            color="#E7004C"
                                            :content="getDateBadge(item.horarios, 'es-ES', item.hour_class)"
                                            inline
                                            class="badge_pink_class"
                                            v-if="showRutinas"
                                        ></v-badge>
                                        <div>
                                            <h4 class="font_box_prox_clase card_text_bottom" style="background: white; padding: 1px;">{{ item.nombreclase }}</h4>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                    
                <v-row>
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                    <h2 v-if="showRutinas" class="text_box_title mt-4">Rutinas</h2>
                    <v-row v-if="showRutinas" class="rutina_download_tab mt-2 mr-4 ml-1 mb-2" v-for="(item, n) in filtrarRutinas(downloads_list)" :key="n">
                        <v-col cols="10">
                            <a :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" target="_blank" style="text-decoration: none;"><h4 class="font_rutina pt-2 pl-1">{{ item.title }}</h4></a>
                        </v-col>
                        <v-col cols="2">
                            <v-btn class="white_btn text-center" prepend-icon="save" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" target="_blank" style="float:right;"><v-icon size="large">mdi-file-download-outline</v-icon></v-btn>
                        </v-col>
                    </v-row>

                    <h2 v-if="showRutinas==false" class="text_box_title mt-4">Recursos</h2>
                    <v-row v-if="showRutinas==false" class="rutina_download_tab mt-2 mr-4 ml-1 mb-2" v-for="(item, n) in filtrarRecursos(downloads_list)" :key="n">
                        <v-col cols="10">
                            <a :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" target="_blank" style="text-decoration: none;"><h4 class="font_rutina pt-2 pl-1">{{ item.title }}</h4></a>
                        </v-col>
                        <v-col cols="2">
                            <v-btn class="white_btn text-center" prepend-icon="save" :href="'https://apiweb.lavikingaoficial.com/api/download-file/' + item.code" target="_blank" style="float:right;"><v-icon size="large">mdi-file-download-outline</v-icon></v-btn>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="8"><h2 class="text_box_title mt-4">ÚLTIMAS CLASES GRABADAS</h2></v-col>
                        <v-col cols="4"><router-link to="/gym-virtual/clases-grabadas"><h5 class="mt-4" style="float:right; color: #fff;" >Ver todas<v-icon size="large" style="color: #fff!important;">mdi-chevron-right</v-icon></h5></router-link></v-col>
                    </v-row>
                    <v-card class="box_gym_virtual" color="#0A2240">
                        <v-row class="pa-3" v-if="clases_grabadas[0]">
                            <v-col cols="12" md="12" sm="12" xs="12">
                                <v-card :img="base_url + clases_grabadas[0].path + clases_grabadas[0].filename" height="300" class="box_gym_virtual" @click="openPlayer(clases_grabadas[0].link_video)">
                                    <v-badge
                                        color="#E7004C"
                                        :content="getDateBadge(clases_grabadas[0].horarios, 'es-ES', clases_grabadas[0].hour_class)"
                                        inline
                                        class="badge_pink_class"
                                        v-if="showRutinas"
                                    ></v-badge>
                                    <div>
                                        <h1 class="font_box_prox_clase card_text_bottom_focus" style="background: white; padding: 5px; margin-bottom: 11px;">{{ clases_grabadas[0].nombreclase }}</h1>
                                    </div>
                                    <div>
                                        <h1 class="font_box_prox_clase_white card_text_bottom" style="background: #e30e4f; padding: 5px;">{{ clases_grabadas[0].focus }}</h1>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="pa-2 hidden-md-and-down" v-if="clases_grabadas[0]">
                            <v-col cols="12" md="4" sm="12" xs="12">
                                <v-card min-height="200" class="box_rutina" color="#E7004C" :img="base_url + clases_grabadas[1].path + clases_grabadas[1].filename" @click="openPlayer(clases_grabadas[1].link_video)">
                                    <v-badge
                                        color="#E7004C"
                                        :content="getDateBadge(clases_grabadas[1].horarios, 'es-ES', clases_grabadas[1].hour_class)"
                                        inline
                                        class="badge_pink_class"
                                        v-if="showRutinas"
                                    ></v-badge>
                                    <div>
                                        <h1 class="font_box_prox_clase card_text_bottom_focus" style="background: white; padding: 5px; margin-bottom: 11px;">{{ clases_grabadas[1].nombreclase }}</h1>
                                    </div>
                                    <div>
                                        <h1 class="font_box_prox_clase_white card_text_bottom" style="background: #e30e4f; padding: 5px;">{{ clases_grabadas[1].focus }}</h1>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4" sm="12" xs="12" v-if="clases_grabadas[0]">
                                <v-card min-height="200" class="box_rutina" color="#E7004C" :img="base_url + clases_grabadas[2].path + clases_grabadas[2].filename" @click="openPlayer(clases_grabadas[2].link_video)">
                                    <v-badge
                                        color="#E7004C"
                                        :content="getDateBadge(clases_grabadas[2].horarios, 'es-ES', clases_grabadas[2].hour_class)"
                                        inline
                                        class="badge_pink_class"
                                        v-if="showRutinas"
                                    ></v-badge>
                                    <div>
                                        <h1 class="font_box_prox_clase card_text_bottom_focus" style="background: white; padding: 5px; margin-bottom: 11px;">{{ clases_grabadas[2].nombreclase }}</h1>
                                    </div>
                                    <div>
                                        <h1 class="font_box_prox_clase_white card_text_bottom" style="background: #e30e4f; padding: 5px;">{{ clases_grabadas[2].focus }}</h1>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="4" sm="12" xs="12" v-if="clases_grabadas[0]">
                                <v-card min-height="200" class="box_rutina" color="#E7004C" :img="base_url + clases_grabadas[3].path + clases_grabadas[3].filename" @click="openPlayer(clases_grabadas[3].link_video)">
                                    <v-badge
                                        color="#E7004C"
                                        :content="getDateBadge(clases_grabadas[3].horarios, 'es-ES', clases_grabadas[3].hour_class)"
                                        inline
                                        class="badge_pink_class"
                                        v-if="showRutinas"
                                    ></v-badge>
                                    <div>
                                        <h1 class="font_box_prox_clase card_text_bottom_focus" style="background: white; padding: 5px; margin-bottom: 11px;">{{ clases_grabadas[3].nombreclase }}</h1>
                                    </div>
                                    <div>
                                        <h1 class="font_box_prox_clase_white card_text_bottom" style="background: #e30e4f; padding: 5px;">{{ clases_grabadas[3].focus }}</h1>
                                    </div>
                                </v-card>
                            </v-col>

                        </v-row>
                        <v-row class="pa-2 hidden-md-and-up">
                            <v-col cols="6" md="4" sm="6" xs="6" v-if="clases_grabadas[0]">
                                <v-card min-height="200" class="box_rutina" color="#E7004C" :img="base_url + clases_grabadas[1].path + clases_grabadas[1].filename" @click="openPlayer(clases_grabadas[1].link_video)">
                                    <v-badge
                                            color="#E7004C"
                                            :content="getDateBadge(clases_grabadas[1].horarios, 'es-ES', clases_grabadas[1].hour_class)"
                                            inline
                                            class="badge_pink_class"
                                            v-if="showRutinas"
                                        ></v-badge>
                                    <h1 class="font_box_prox_clase card_text_bottom_focus" style="padding-top: 90px!important;">{{ clases_grabadas[1].nombreclase }}</h1>
                                    <h1 class="font_box_prox_clase_white card_text_bottom" style="padding-top: 90px!important;">{{ clases_grabadas[1].focus }}</h1>
                                </v-card>
                            </v-col>
                            <v-col cols="6" md="4" sm="6" xs="6" v-if="clases_grabadas[0]">
                                <v-card min-height="200" class="box_rutina" color="#E7004C" :img="base_url + clases_grabadas[2].path + clases_grabadas[2].filename" @click="openPlayer(clases_grabadas[2].link_video)">
                                    <v-badge
                                            color="#E7004C"
                                            :content="getDateBadge(clases_grabadas[2].horarios, 'es-ES', clases_grabadas[2].hour_class)"
                                            inline
                                            class="badge_pink_class"
                                            v-if="showRutinas"
                                        ></v-badge>
                                    <h1 class="font_box_prox_clase card_text_bottom_focus" style="padding-top: 90px!important;">{{ clases_grabadas[2].nombreclase }}</h1>
                                    <h1 class="font_box_prox_clase_white card_text_bottom" style="padding-top: 90px!important;">{{ clases_grabadas[2].focus }}</h1>
                                </v-card>
                            </v-col>

                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                    <h2 class="text_box_title mt-4">Registro de Pesos</h2>
                    <v-card class="box_gym_virtual formlog" color="#0A2240">
                        <v-row class="pa-2">
                            <v-col cols="12">
                                <h4 class="text_title_registro_pesos">Ejercicio</h4>
                                <v-select
                                    :items="ejercicios_list"
                                    v-model="peso.ejercicio_selected"
                                    class="select_ejercicios"
                                    outlined
                                    v-on:change="getPesos()"
                                >
                                    <template slot="selection" slot-scope="data">
                                        <span :class="data.item.textColor">{{ data.item.text }}</span>
                                    </template>
                                    <template slot="item" slot-scope="data">
                                        <span :class="data.item.textColor">{{ data.item.text }}</span>
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row class="pa-2">
                            <v-col cols="6">
                                <h4 class="text_title_registro_pesos">Peso (KG)</h4>
                                <v-text-field v-model="peso.peso_kg" outlined class="text_peso" color="#293E58"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <h4 class="text_title_registro_pesos">Fecha</h4>
                                <v-menu
                                    v-model="menuTestDate"
                                    :close-on-content-click="false"
                                    :nudge-right="-10"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="formatTestDate"
                                            v-bind="attrs"
                                            v-on="on"
                                            readonly
                                            outlined
                                            color="#ffffff"
                                            class="text_peso"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker outlined hide-details v-model="peso.date" color="#293E58" @input="menuTestDate = false" locale="es-ES"></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row class="pa-2">
                            <v-col cols="12">
                                <h4 class="text_title_registro_pesos">Comentarios</h4>
                                <v-text-field v-model="peso.comentarios" outlined color="#293E58"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-btn class="text_btn_white_title" block depressed color="secondary" @click="savePeso()">Añadir Registro</v-btn>
                                
                            </v-col>
                            <v-col cols="6">
                                <v-btn class="text_btn_white_border" block depressed outlined @click="registroPopup = true">Ver Registros</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <apexchart type="line" height="350" style="width:93%!important;" :options="chartOptions" :series="series"></apexchart>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model=" toast.toast " :timeout=" toast.timeout " :color=" toast.color " dark>
            {{ toast.message }}
        </v-snackbar>
        
        <v-dialog
            v-model="registroPopup"
            activator="parent"
            width="auto"
            >
            <v-card>
                <v-card-text>
                    <v-data-table
                        :headers="cabeceras"
                        :items="registrosTabla"
                        :items-per-page="5"
                        class="elevation-1"
                    ></v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="editarRegistro"
            activator="parent"
            width="auto"
            >
            <v-card>
                <v-card-text>
                    <v-row class="pa-2">
                        <v-col cols="6">
                            <h4 class="text_title_registro_pesos">Peso (KG)</h4>
                            <v-text-field v-model="peso_edit.peso_kg" outlined class="text_peso" color="#293E58"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <h4 class="text_title_registro_pesos">Fecha</h4>
                            <v-menu
                                v-model="menuTestDate"
                                :close-on-content-click="false"
                                :nudge-right="-10"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="formatTestDate"
                                        v-bind="attrs"
                                        v-on="on"
                                        readonly
                                        outlined
                                        color="#ffffff"
                                        class="text_peso"
                                    ></v-text-field>
                                </template>
                                <v-date-picker outlined hide-details v-model="peso_edit.date" color="#293E58" @input="menuTestDate = false" locale="es-ES"></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row class="pa-2">
                        <v-col cols="12">
                            <h4 class="text_title_registro_pesos">Comentarios</h4>
                            <v-text-field v-model="peso_edit.comentarios" outlined color="#293E58"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-btn class="text_btn_white_title" block depressed color="secondary" @click="savePeso()">Editar Registro</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <apexchart type="line" height="350" style="width:93%!important;" :options="chartOptions" :series="series"></apexchart>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>

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
export default {
    components: {
        axios
    },
    data: () => ({
        base_url: "",
        menuTestDate: false,
        editarRegistro: false,
        peso: {
            date: null,
            ejercicio_selected: 1,
            peso_kg: null,
            comentarios: ""
        },
        peso_edit: {},
        cabeceras: [
            {
                text: 'Ejercicio',
                align: 'start',
                sortable: false,
                value: 'ejercicio',
            },
            { text: 'Fecha', value: 'fecha' },
            { text: 'Peso (kg)', value: 'peso' },
            { text: 'Comentarios', value: 'comentarios' }
        ],
        registrosTabla: [],
        model: null,
        planMonths: [],
        planSections: [],
        carousel: null,
        model: null,
        now_playing: null,
        ejercicio_selected: 1,
        model2: null,
        dialogPlayer: false,
        months: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],

        dates: [],
        current_month: {
            month: '',
            _month: '',
            _year: ''
        },
        current_date: {
            dat: "2022-12-17",
            week: 52,
            name: "Martes 17",
            section: false,
            activities: []
        },
        registroPopup: false,
        colors: ['#0281a5', '#0B233F', '#E30E4F'],
        id_level: null,
        dialog: false,
        currrent_activity: {
            iframe: '',
            name: '',
            hour_class: '',
            focus: '',
            material: ''
        },
        levels: [],
        user: {},
        userPlans: {},
        actual_date: null,
        show_alert: true,
        original_activities: [],
        total_clases_vivo: 0,
        total_clases_grabadas: 0,
        clases_grabadas: [],
        clases_grabadas_org: [],
        clases_vivo: [],
        clases_vivo_org: [],
        downloads_list: [],
        groupList: [],
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
        show_descarga_plan: false,
        dialogRating: false,
        comentario_rating: '',
        rating: null,
        ejercicios_list:[
            { text: "Back Squat", value: 1, textColor: "select_text_color" },
            { text: "Front Squat", value: 2, textColor: "select_text_color" },
            { text: "Sumo Squat", value: 3, textColor: "select_text_color" },
            { text: "Peso Muerto", value: 4, textColor: "select_text_color" },
            { text: "Peso Muerto Rumano", value: 5, textColor: "select_text_color" },
            { text: "Hip Thrust", value: 6, textColor: "select_text_color" },
            { text: "Lunges con barra", value: 7, textColor: "select_text_color" },
            { text: "Brench press", value: 8, textColor: "select_text_color" },
            { text: "Shoulder Press", value: 9, textColor: "select_text_color" },
            { text: "Remo con Barra", value: 10, textColor: "select_text_color" },
        ],
        item: null,
        has_active_plan: false,
        show_message_plan: false,
        series: [{
            name: "KG",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chartOptions: {
            chart: {
                background: '#0A2240',
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            colors: ['#E7004C'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            /*title: {
                text: 'Product Trends by Month',
                align: 'left'
            },*/
            grid: {
                row: {
                    colors: ['transparent', 'transparent'],
                    opacity: 0.5
                },
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: '#fff',
                        opacity: 0.5
                    },
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                labels: {
                    show: true,
                    style: {
                        colors: '#fff',
                        opacity: 0.5
                    },
                },
            }
        },
        countDownToTime: null,
        timerOutput: null,
        empty_url: "/images/default-image.png",
        base_url: "",
        banners: [],
        timezone: null,
        id_timezone: 0,
        showRutinas: true
    }),
    async mounted() {
        let vm = this;
        moment.locale('es');
        vm.$store.commit('loader', true);
        this.actual_date = new Date();
        vm.getBaseUrl();
        await vm.auth();
        vm.$store.commit('loader', false);
        setInterval(() => { this.startTimer() }, 1000);
        vm.getSliders();
    },
    computed: {
        columns() {
            if (this.$vuetify.breakpoint.xl) {
                return 3;
            }

            if (this.$vuetify.breakpoint.lg) {
                return 3;
            }

            if (this.$vuetify.breakpoint.md) {
                return 2;
            }

            return 1;
        },
        formatTestDate: {
            get: function () {
                return this.formatDate(this.peso.date);
            },
            set: function (newValue) {
                return this.formatDate(newValue);
            }
        },
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
        async getSliders(){
            var tmpban = [];
            let response = await this.$API.sliders.list();
            var bannerslist = response.data.data;
            var planes = this.userPlans;
            bannerslist.forEach(function (item, index) {
                let busPlan = planes.find(c => c.course_id == item.plan_id);
                if(busPlan != undefined){
                    tmpban.push(item);
                }
            });
            this.banners = tmpban;
            this.base_url = this.$baseURL;
        },
        goplan(){
            window.location.replace('https://desafio.lavikingaoficial.com/?paquete=desafiobronce');
        },
        gohome(){
            window.location.replace('https://desafio.lavikingaoficial.com');
        },
        async getPesos() {
            var vm = this;
            vm.registrosTabla = [];
            this.$store.commit('loader', true);
            try {
                const response = await this.$API.gymVirtual.getPesos(this.user.bp_id, this.peso.ejercicio_selected);
                let pesos = response.data.data;
                pesos.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date)
                });
                let fechasArr = [];
                let pesosArr = [];
                var find_ejercicio = vm.ejercicios_list.find(c => c.value == this.peso.ejercicio_selected);
                pesos.forEach(function (peso) {
                    let fechaformat = vm.formatDate(peso.date);
                    fechasArr.push(fechaformat);
                    pesosArr.push(peso.peso);
                    let nuevaFila = {
                        ejercicio: find_ejercicio.text,
                        fecha: fechaformat,
                        peso: peso.peso,
                        comentarios: peso.comentario
                    };
                    vm.registrosTabla.push(nuevaFila);
                });

                this.series = [{
                    data: pesosArr
                }]
                this.chartOptions = {
                    ...this.chartOptions, ...{
                        xaxis: {
                            categories: fechasArr
                        }
                    }
                }
                this.$store.commit('loader', false);
            } catch (e) {
                this.$store.commit('loader', false);
                console.error(e);
            }
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        async getLoggedUser() {
            if (localStorage.getItem('token')) {
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');

                const response = await this.$API.business_partner.getPartner(this.logged_user.id);
                this.business_partner = Object.assign(response.data.data[0]);
                this.id_level = this.business_partner.id_level;
                this.id_timezone = this.business_partner.id_timezone;
                this.timezone = this.business_partner.timezone.timezone;
                this.id_timezone = this.business_partner.timezone.id_timezone;
                this.getActivitiesRecordedFilters();
            }
        },
        startTimer () {
            const timeNow = new Date().getTime();
            const timeDifference = this.countDownToTime - timeNow;
            const millisecondsInOneSecond = 1000;
            const millisecondsInOneMinute = millisecondsInOneSecond * 60;
            const millisecondsInOneHour = millisecondsInOneMinute * 60;
            const millisecondsInOneDay = millisecondsInOneHour * 24;
            const differenceInDays = timeDifference / millisecondsInOneDay;
            const remainderDifferenceInHours = (timeDifference % millisecondsInOneDay) / millisecondsInOneHour;
            const remainderDifferenceInMinutes = (timeDifference % millisecondsInOneHour) / millisecondsInOneMinute;
            const remainderDifferenceInSeconds = (timeDifference % millisecondsInOneMinute) / millisecondsInOneSecond;
            const remainingDays = Math.floor(differenceInDays);
            const remainingHours = Math.floor(remainderDifferenceInHours);
            const remainingMinutes = Math.floor(remainderDifferenceInMinutes);
            const remainingSeconds = Math.floor(remainderDifferenceInSeconds);
            this.timerOutput = {
                days: remainingDays, hours: remainingHours, minutes: remainingMinutes, seconds: remainingSeconds
            };
        },
        filtrarRutinas(groupList) {
            return groupList.filter((item) => item.name_category == "RUTINAS");
        },
        filtrarRecursos(groupList) {
            return groupList.filter((item) => item.name_category == "RECURSOS");
        },
        showRatingDialog() {
            this.dialogRating = true;
        },
        async getDownloads() {
            this.$store.commit('loader', true);
            try {
                const response = await this.$API.business_partner.getDownloadsGym(this.id_level);
                this.downloads_list = response.data.data;
                this.groupList = this.downloads_list.groupBy('name_category');
                this.$store.commit('loader', false);
            } catch (e) {
                this.$store.commit('loader', false);
                console.error(e);
            }
        },
        async savePeso() {
            this.$store.commit('loader', true);
            try {
                this.peso.bp_id = this.user.bp_id;
                const data = await this.$API.gymVirtual.savePeso(this.peso);
                this.peso = {
                    date: null,
                    ejercicio_selected: this.peso.ejercicio_selected,
                    peso_kg: null,
                    comentarios: ""
                };
                this.$store.commit('loader', false);
                this.showToast("Registro guardado correctamente!", "green");
                this.getPesos();
            }
            catch (e) {
                this.$store.commit('loader', false);
                console.error(e);
            }
        },
        
        async saveAttempts(activity, date, indx) {
            try {
                this.current_date.activities[indx].sessions.push(1);
                let attempt = {
                    activity_id: activity.id,
                    status: 'finish',
                    _date: date
                };
                const data = await this.$API.gymVirtual.saveAttempt(attempt);
            }
            catch (e) {
                console.error(e);
            }
        },
        async auth() {
            let vm = this;
            try {
                const response = await this.$API.auth.auth();
                this.user = response.data;
                if (this.user.id_level != null) {
                    this.id_level = this.user.id_level;
                }
                this.timezone = this.user.timezone.timezone;
                this.id_timezone = this.user.timezone.id_timezone;
                this.userPlans = response.data.plans;
                let fecha_actual = new Date();
                var flag = 0;
                this.userPlans.map(function (item) {
                    let init_d = new Date(item.init_date);
                    let end_d = new Date(item.expiration_date);
                    if (init_d > fecha_actual || (Math.ceil((new Date(item.expiration_date).getTime() - init_d.getTime()) / (1000 * 3600 * 24)) >= 15)) {
                        vm.show_alert = false;
                    }

                    if (fecha_actual.getTime() <= end_d.getTime()) {
                        vm.show_descarga_plan = true;
                    }

                    if(fecha_actual <= new Date(item.expiration_date) && vm.has_active_plan == false){
                        vm.has_active_plan = true;
                    }
                    if(item.course_id == 8 && fecha_actual <= new Date(item.expiration_date) && flag == 0){
                        vm.showRutinas = false;
                    }else if(item.course_id != 8 && fecha_actual <= new Date(item.expiration_date)){
                        vm.showRutinas = true;
                        flag = 1;
                    }
                });
                if(vm.has_active_plan == true){
                    vm.getActivitiesRecorded();
                    vm.getActivitiesUpcoming();
                    vm.getPesos();
                    vm.getDownloads();
                }
                vm.show_message_plan = vm.has_active_plan === true ? false:true;
                var planes = this.userPlans;
            } catch (e) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
        getMonth() {
            let vm = this;
            vm.current_month = {
                month: this.months[Number(moment().format('MM')) - 1],
                _month: moment().format('MM'),
                _year: moment().format('YYYY')
            };
            vm.model2 = vm.planMonths.findIndex((element) => element._month == vm.current_month._month);
        },
        async filterByLevel() {
            let vm = this;
            let id_level = vm.id_level;
            vm.clases_grabadas = vm.clases_grabadas_org;
            vm.clases_vivo = vm.clases_vivo_org;
            //console.log(vm.clases_grabadas);
            let filtro = vm.clases_grabadas.filter((element) => ((element.id_level == id_level || element.id_level == "4") && element.link_video != null));

            let filtro2 = vm.clases_vivo.filter((element) => ((element.id_level == id_level || element.id_level == "4") && element.link_video == null));

            vm.clases_grabadas = filtro;
            vm.clases_vivo = filtro2;

            const data = await this.$API.business_partner.updateLevel(id_level);
        },
        async schedule() {
            let vm = this;
            try {
                const data = await this.$API.gymVirtual.schedule();
                vm.planSections = data.data.data;
                vm.dates = vm.planSections.map(item => {
                    const container = {};
                    container.date = item.dias_avb;
                    container.month = item.month;
                    return container;
                });
                vm.getDate();
                vm.$store.commit('loader', false);
            }
            catch (e) {
                console.error(e);
                vm.$store.commit('loader', false);
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

        async loadLevels(page = 1, per_page = 50, sortDesc = 0, sortBy = '') {
            let vm = this;
            try {
                const response = await this.$API.levels.list('?page=' + page + '&itemsPerPage=' + per_page + '&sortDesc=' + sortDesc + '&sortBy=' + sortBy);
                this.levels = response.data.data;
                this.levels.splice(3, 1);
            } catch (e) {
                this.loadingTable = false;
                console.error(e);
            }
        },


        planSectionsFilter() {
            return this.planSections.filter((item) => item.month == this.current_month._month);
        },


        showToast(msg, color) {
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },

        //--------VIDEO-----------
        getVideoActivity(activity) {
            this.currrent_activity = {
                iframe: activity.link_video,
                name: activity.name,
                hour_class: activity.hour_class,
                focus: activity.focus,
                material: activity.material
            }
            this.dialog = true;
        },

        descargarPlan() {
            let vm = this;
            let nivel = vm.levels.filter((element) => (element.id_level == vm.id_level));
            if (nivel.length === 0) {
                this.showToast("Debe seleccionar un nivel primero.", "red");
            } else {
                window.open(nivel[0].url_plan);
            }
        },

        isOnlive(date, hour) {

            let fecha_class = moment(date + ' ' + hour);//.add(1, 'hour')
            let fecha_class_2 = moment(date + ' ' + hour).add(1, 'hour');

            let now = moment();

            let response = (fecha_class <= now && fecha_class_2 >= now);
            return response;
        },

        async getActivitiesRecorded() {
            const data = await this.$API.gymVirtual.getActivitiesRecorded(this.id_level);
            let clasesGrabadas = data.data.data;
            this.clases_grabadas = clasesGrabadas;
        },

        async getActivitiesUpcoming() {
            const data = await this.$API.gymVirtual.getActivitiesUpcoming(this.id_level);
            let clasesVivo = data.data.data;
            this.clases_vivo = clasesVivo;
            let fecha = clasesVivo[0]._date;
            let hora = clasesVivo[0].hour_class;
            let fullDatetime = fecha+" "+hora+":00";
            this.countDownToTime = new Date(fullDatetime).getTime();
        },

        getDateBadge(dateStr, locale, hour)
        {
            /*var date = new Date(dateStr + " " + hour + ":00");
            var fecha = null;
            if(this.timezone != "America/Lima"){
                fecha = date.toLocaleDateString('en-GB', { timeZone: "America/Lima" });
                let hora = date.toLocaleTimeString(locale, { timeZone: "America/Lima" });
                fecha = fecha.split("/");
                
                date = new Date(fecha[2]+"-"+fecha[1]+"-"+fecha[0]+" "+hora);
            }
            fecha = date.toLocaleDateString(locale, { weekday: 'short', timeZone: this.timezone });
            let ndia = date.toLocaleDateString(locale, { day: 'numeric', timeZone: this.timezone });
            let dia = fecha.charAt(0).toUpperCase() + fecha.slice(1);
            let time = date.toLocaleString(locale, { hour: 'numeric', hour12: true, timeZone: this.timezone });
            return dia + ", "+ ndia + " - "+ time;*/
            Object.filter = (obj, predicate) => 
                Object.keys(obj)
                    .filter( key => predicate(obj[key]) )
                    .reduce( (res, key) => (res[key] = obj[key], res), {} );

            var filtered = Object.filter(dateStr, val => val.timezone == this.timezone);
            let fechaclase = Object.values(filtered)[0];
            //console.log(fechaclase.fecha);
            return fechaclase.fecha;
        },
        openPlayer(video_link) {
            this.now_playing = video_link;
            this.dialogPlayer = true;
        },
        convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("es-ES", {timeZone: tzString}));   
        }

    }
}
</script>

<style>.activity-class {
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