<template>
    <div class="bg_blue">
        <v-container>
            <div class="col-md-12">
                <p class="tit_h1_pink text_entrena">MI PERFIL</p>
            </div>
            <v-tabs v-model="userProfileTabs" :show-arrows="false" color="#E30E4F" background-color="transparent" dark>
                <v-tab to="#tabs-info-personal">INFORMACIÓN PERSONAL</v-tab>
                <v-tab to="#tabs-info-health">HISTORIA CLÍNICA</v-tab>
                <v-tab to="#tabs-info-progress">SEGUIMIENTO CORPORAL</v-tab>
                <v-tab to="#tabs-info-nutrition">SEGUIMIENTO NUTRICIONAL</v-tab>
                <v-tab to="#tabs-info-training">ENTRENAMIENTO</v-tab>
            </v-tabs>
            <v-tabs-items v-model="userProfileTabs" id="custom-tab-items">
                <v-tab-item value="tabs-info-personal">
                    <profile-card></profile-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-health">
                    <health-card></health-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-progress">
                    <activity-card></activity-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-nutrition">
                    <nutrition-card></nutrition-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-training">
                    <workout-card></workout-card>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </div>
</template>
<script>
import ProfileCard from './components/ProfileCard.vue'
import HealthCard from './components/HealthCard.vue'
import ActivityCard from './components/ActivityCard.vue'
import NutritionCard from './components/NutritionCard.vue'
import WorkoutCard from './components/WorkoutCard.vue'
export default {
    components: { 
        'profile-card': ProfileCard,
        'health-card': HealthCard,
        'activity-card': ActivityCard,
        'nutrition-card': NutritionCard,
        'workout-card': WorkoutCard,
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