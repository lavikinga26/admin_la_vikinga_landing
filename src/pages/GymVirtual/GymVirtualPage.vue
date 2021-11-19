<template>
    <div>
        <v-toolbar
          color="primary"
          dark
        >
            <v-toolbar-title class="tit_h2_pink" style="font-size: 3.0rem; color: white">PLAN VIKINGA</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                text 
                small
                link
                :to="'/gym-virtual/calendario'"
            >
                <!--<v-icon>mdi-calendar-blank-outline</v-icon>-->
                CALENDARIO
            </v-btn>
            <span style="color: #fff; font-size: 0.9rem;"> | </span>
            <v-btn 
                text 
                small
                link
                :to="'/gym-virtual/agenda'"
            >
                <!--<v-icon>mdi-view-agenda-outline</v-icon>-->
                AGENDA
            </v-btn>
            <span style="color: #fff; font-size: 0.9rem;"> | </span>
            <v-btn 
                text 
                small
                link
                :to="'/gym-virtual/galeria'"
            >
                <!--<v-icon>mdi-animation-play-outline</v-icon>-->
                GALERÍA
            </v-btn>
        </v-toolbar>

        <div class="d-flex flex-grow-1 flex-column">
            <router-view :key="$route.fullPath" class="flex-grow-1"></router-view>
        </div>
    </div>
</template>