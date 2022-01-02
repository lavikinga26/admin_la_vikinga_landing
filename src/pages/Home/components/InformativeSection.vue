<template>
    <div v-if="showSection" class="container-fluid mt-15 bg_suplementacion" style="height: 800px;" :style="{ backgroundImage: 'url(' + img + ')' }">
            <div class="row">
                <div class="col-12 text-center suplementacion_titulo">
                    <img src="@/assets/img/isotipo.png" alt="" style="width: 90px" class="my-15">
                    <p class="tit_h1_white text-center" style="font-family: 'MachProCondBold' !important;">
                        {{title}}
                    
                    </p>
                </div>

                <div class="col-4 d-sm-none d-md-block"></div>
                <div class="col-md-4 col-sm-12 text-center text_suplementacion">
                    <p>{{subtitle}}</p>
                    <v-btn v-show="buttonTitle != null && buttonAction != null" color="secondary"
                        :href="buttonAction"
                        depressed
                        class="px-2">
                        <span class="ma-3">{{buttonTitle}}</span>
                    </v-btn>
                </div>
                <div class="col-4 d-sm-none d-md-block"></div>
            </div>
        </div>
</template>

<script>
export default {
    data: () => ({
        title:"",
        img:"",
        buttonTitle:"",
        buttonAction:"",
        subtitle:"",
        showSection: false,
    }),
    mounted(){
        this.getInformative();
    },
    methods:{
        async getInformative(){
            try{
                let response = await this.$API.informative.get();
                if(Object.keys(response.data).length === 0){
                    this.showSection = false;
                }else{
                    this.title = response.data.title
                    this.img = this.$baseURL + response.data.file_path.path + response.data.file_path.filename;
                    this.buttonTitle = response.data.button;
                    this.buttonAction = response.data.link;
                    this.subtitle = response.data.subtitle;

                    this.showSection = true;
                }
            }catch(e){
                console.error(e);
                this.showSection = false
            }
        },
    }
}
</script>

<style>

</style>