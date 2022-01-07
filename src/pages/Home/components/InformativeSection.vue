<template>
    <div v-if="showSection" class="container-fluid mt-15 bg_suplementacion" style="height: 800px;" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.7)), url(' + img + ')' }">
            <div class="row">
                <div class="col-12 text-center suplementacion_titulo">
                    <img src="@/assets/img/isotipo.png" alt="" style="width: 90px" class="my-15">
                    <div class="main-title-container">
                        <p class="tit_h1_white text-center main-title" style="font-family: 'MachProCondBold' !important;">
                            {{title}}
                        </p>
                    </div>
                </div>

                <div class="col-4 d-sm-none d-md-block"></div>
                <div class="col-md-4 col-sm-12 text-center text_suplementacion">
                    <div class="informative-subtitle">
                        <p>{{subtitle}}</p>
                    </div>
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
                if(Object.keys(response.data.data).length === 0){
                    this.showSection = false;
                }else{
                    this.title = response.data.data.title
                    this.img = this.$baseURL + response.data.data.file_path.path + response.data.data.file_path.filename;
                    this.buttonTitle = response.data.data.button;
                    this.buttonAction = response.data.data.link;
                    this.subtitle = response.data.data.subtitle;

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
.main-title{
    
}
.main-title-container{

}
.informative-subtitle{

}
@media (max-width: 1000px) {
    .main-title{
        font-size: 3em;
    }
    .informative-subtitle, .main-title-container{
        padding-left: 25px;
        padding-right: 25px;
    }
}
@media (max-width: 630px) {
    .main-title{
        font-size: 2.5em;
    }
}
@media (max-width: 370px) {
    .main-title{
        font-size: 2em;
    }
}
</style>