<template>
    <div class="bg_blue">
        <v-container>
            <div class="col-md-12">
                <p class="tit_h1_pink text_entrena">MI PERFIL</p>
            </div>
            <v-tabs v-model="userProfileTabs" :show-arrows="false" color="#E30E4F" background-color="transparent" dark>
                <v-tab to="#tabs-info-personal"><b>INFORMACIÓN PERSONAL</b></v-tab>
                <v-tab to="#tabs-info-health"><b>HISTORIA CLÍNICA</b></v-tab>
                <v-tab to="#tabs-info-progress"><b>MI REGISTRO</b></v-tab>
                <v-tab to="#tabs-info-workout"><b>MI ENTRENAMIENTO</b></v-tab>
            </v-tabs>
            <v-tabs-items v-model="userProfileTabs" id="custom-tab-items">
                <v-tab-item value="tabs-info-personal">
                    <v-card class="my-10 rounded-xl pa-10">
                        <profile-card></profile-card>
                    </v-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-health">
                    <health-card></health-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-progress">
                    <v-card class="my-10 rounded-xl pa-10">
                        <activity-card></activity-card>
                    </v-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-workout">
                    <v-card class="my-10 rounded-xl pa-10">
                        <workout-card></workout-card>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </div>
</template>
<script>
import ProfileCard from './components/ProfileCard.vue'
import ActivityCard from './components/ActivityCard.vue'
import WorkoutCard from './components/WorkoutCard.vue'
import HealthCard from './components/HealthCard.vue'
export default {
    components: { 
        'profile-card': ProfileCard,
        'activity-card': ActivityCard,
        'workout-card': WorkoutCard,
        'health-card': HealthCard
    },
    data: () => ({
        userProfileTabs: 0,

        base_url: '',
    }),
    watch: {
    },
    methods: {
    },
}
</script>
<style>
#custom-tab-items {
    background-color: transparent !important;
}
</style>