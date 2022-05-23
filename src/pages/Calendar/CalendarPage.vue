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
                    
                    <p class="tit_h1_white text_entrena">CALENDARIO</p>
                </div>
            </div>
        </div>
        <div class="container-fluid pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <div id="calendar_title" v-if="$refs.myCalendar" class="tit_h2_pink text_entrena">
                        {{ $refs.myCalendar.title }}
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin -->
        
        <!-- Contenido -->
        <div class="container mt-10">
            <v-row>
                <v-col>
                    <!--<v-sheet height="64">
                        <v-toolbar flat>
                            <v-btn outlined class="mr-4" color="grey darken-2" @click="dateFocus = ''">
                                Hoy
                            </v-btn>
                            <v-spacer></v-spacer>

                            <v-btn fab text small color="grey darken-2" @click="$refs.myCalendar.prev()">
                                <v-icon small>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn fab text small color="grey darken-2" @click="$refs.myCalendar.next()">
                                <v-icon small>mdi-chevron-right</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>

                            <v-menu bottom right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                                        <span>{{ typeFilterToLabel[typeFilter] }}</span>
                                        <v-icon right>mdi-menu-down</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="typeFilter = 'day'">
                                        <v-list-item-title>Día</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="typeFilter = 'week'">
                                        <v-list-item-title>Semana</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="typeFilter = 'month'">
                                        <v-list-item-title>Mes</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-toolbar>
                    </v-sheet>-->
                    <v-sheet height="600">
                        <v-calendar
                            ref="myCalendar"
                            v-model="dateFocus"
                            color="primary"
                            :events="data_events"
                            :event-color="getEventColor"
                            :type="typeFilter"
                            @click:event="showEvent"
                            @change="updateCalendarRange"
                        ></v-calendar>
                        <v-menu
                            v-model="selectedOpen"
                            :close-on-content-click="false"
                            :activator="selectedElement"
                            offset-x>

                            <v-card color="grey lighten-4" min-width="300px" flat>
                                <v-card-text class="text-center">
                                    <div><strong>{{ selectedEvent.start | formatDate }} {{ selectedEvent.start | formatTime }}</strong></div>
                                    <div><b>{{ selectedEvent.name}}</b></div>
                                </v-card-text>
                            </v-card>
                        </v-menu>
                    </v-sheet>
                </v-col>
            </v-row>
        </div>
        <!-- Fin -->
        <phones-photos></phones-photos>
        <!--<frequent-questions></frequent-questions>-->
    </div>
</template>

<script>
export default {
    data: () => ({
        typeFilter: 'month',
        typeFilterToLabel: {
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            '4day': '4 Days',
        },
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        
        dateFocus: '',
        selectedElement: null,
        selectedOpen: false,
        selectedEvent:{},
        data_events:[],
    }),
    methods:{
        async updateCalendarRange () {
            try{
                const response = await this.$API.calendar.listEvents();
                const events = []
                for (let i = 0; i < response.data.length; i++) {
                    const allDay = this.rnd(0, 3) === 0
                    const element = response.data[i]
                    events.push({
                        name: element.name,
                        start: new Date(element.event_date),
                        end: new Date(element.event_date),
                        color: this.colors[this.rnd(0, this.colors.length - 1)],
                        timed: !allDay,
                        details:{ team_guest: element.team_guest, team_local:element.team_local }
                    })
                }
                this.data_events = events;

            } catch(e){
                console.error(e);
            }
        },
        showEvent ({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open();
            }

            nativeEvent.stopPropagation()
        },
        getEventColor (event) {
            return event.color;
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
    },
}
</script>

<style>
#calendar_title {
  text-transform: uppercase !important;
}

</style>