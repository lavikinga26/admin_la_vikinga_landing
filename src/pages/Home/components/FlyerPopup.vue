<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="700"
      persistent
    >
        <v-card color="primary" class="pa-3">
            <v-btn
              icon
              color="white"
              style="position: absolute; z-index: 1; right: 10px;"
              @click="close()"
              
            >
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
            <v-img
                :src="banner.path"
            >
            </v-img>

        </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        banner: {
            link: null,
            path: null
        }
      }
    },

    created() {
        this.getFlyer();
    },
    methods:{
        async getFlyer(){
            const response  = await this.$API.gym_banner.list('home');
            this.banner = response.data.data;
            this.banner.path = this.$baseURL + response.data.data.file_path.path + response.data.data.file_path.filename; 
            if(this.banner.id){
                if(this.banner.recurrent == 1){
                    this.dialog = true;
                }
                else{
                    if(localStorage.getItem('flyer_recurrent')){
                        this.dialog = false;
                        localStorage.setItem('flyer_recurrent', 1);
                    }
                    else{
                        this.dialog = true;
                        localStorage.setItem('flyer_recurrent', 1);
                    }
                }
            }
            console.log(this.banner);
        },
        close(){
            this.dialog = false;
            localStorage.setItem('flyer_recurrent', 1);
        }
    },
  }
</script>