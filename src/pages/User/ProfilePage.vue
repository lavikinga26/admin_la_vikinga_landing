<template>
    <div style="background: rgb(33,30,51); background: linear-gradient(356deg, rgba(33,30,51,1) 0%, rgba(41,46,69,1) 35%, rgba(31,39,58,1) 68%);">
        <v-container>
            <v-card class="my-10 rounded-xl pa-10">
                DESAFIOS
            </v-card>
            <v-card class="my-10 rounded-xl pa-10">
                <profile-card></profile-card>
            </v-card>
            <v-card class="my-10 rounded-xl pa-10">
                <activity-card></activity-card>
            </v-card>
            <v-card class="my-10 rounded-xl pa-10">
                <workout-card></workout-card>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import ProfileCard from './components/ProfileCard.vue'
import ActivityCard from './components/ActivityCard.vue'
import WorkoutCard from './components/WorkoutCard.vue'
export default {
    components: { 
        'profile-card': ProfileCard,
        'activity-card': ActivityCard,
        'workout-card': WorkoutCard
    },
    data: () => ({
        categories: [],
        staff:[],
        base_url: '',
    }),
    watch: {
    },
    methods: {
    },
}
</script>
<style>
    
</style>