<template>
    <div style="min-height:80vh;">
        <v-container>
            <v-row>
                <v-col cols="12" class="px-5">
                    <v-card class="pa-10">
                        <div 
                            v-html="information.terms">
                        </div>
                    </v-card>
                    
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        information:{},
    }),
    mounted(){
        this.getTermsConditions();
        this.$store.commit('loader',true);
        setTimeout(()=>{ 
            this.$store.commit('loader',false);
        }, 2000);
    },
    methods:{
        async getTermsConditions(){
            try{
                const data = await this.$API.configuration.termsConditions();
                this.information = data.data.data;
                console.log(data.data.data)
            }
            catch(e){
                console.error(e);
            } 
        },
    },
}
</script>

<style>
#calendar_title {
  text-transform: uppercase !important;
}

</style>