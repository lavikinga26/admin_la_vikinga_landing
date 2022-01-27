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
                    <profile-card
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></profile-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-health">
                    <health-card 
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></health-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-progress">
                    <activity-card 
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></activity-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-nutrition">
                    <nutrition-card
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></nutrition-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-training">
                    <workout-card
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></workout-card>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </div>
</template>
<script>
import moment from 'moment-timezone'
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
        business_partner: null,
    }),
    created() {
        this.getBaseUrl();
        this.getLoggedUser();
        this.auth();
    },
    mounted() {
        moment.locale('es');
        this.auth();
    },
    methods: {
        async auth(){
            try {
                const response = await this.$API.auth.auth();
            } catch (e) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
        async getBaseUrl(){
            try{
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
        async getPartnerData(id){
            this.$store.commit('loader',true);
            try{
                const response = await this.$API.business_partner.getPartner(id);
                this.business_partner = Object.assign(response.data.data[0]);

            } catch(e){
                console.error(e);

            } finally{
                this.$store.commit('loader',false);
            }
        },
        getLoggedUser(){
            if(localStorage.getItem('token')){
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');

                this.getPartnerData(this.logged_user.id);
            }else{
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
    },
    watch: {
    },
}
</script>
<style>
#custom-tab-items {
    background-color: transparent !important;
}
</style>