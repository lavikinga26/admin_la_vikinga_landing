<template>
    <div class="bg_blue">
        <v-container>
            <div class="col-md-12">
                <p class="tit_h1_pink text_entrena">MI CUENTA</p>
            </div>
            <v-tabs v-model="userProfileTabs" :show-arrows="false" color="#E30E4F" background-color="transparent" dark>
                <v-tab to="#mi-cuenta">MI CUENTA</v-tab>
                <v-tab to="#mis-ordenes">MIS ORDENES</v-tab>
            </v-tabs>
            <v-tabs-items v-model="userProfileTabs" id="custom-tab-items">
                <v-tab-item value="mi-cuenta">
                    <div class="my-5">
                        <v-card class="my-10 rounded-xl pa-10">
                        INFO CUENTA
                        </v-card>
                    </div>
                </v-tab-item>
                <v-tab-item value="mis-ordenes">
                    <div class="my-5">
                        <v-card class="my-10 rounded-xl pa-10">
                        INFO ORDENES
                        </v-card>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        userProfileTabs: 0,
        user:{}
      }
    },
    mounted(){
        this.getPartnerData();
    },
    methods:{
        async getPartnerData(id){
            try{
                const response = await this.$API.auth.auth(id);
                this.user=response.data;
            }
            catch(e){
                console.error(e);
            } 
        },
    }
  }
</script>