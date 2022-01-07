<template>
    <div>
        <v-carousel
            hide-delimiter-background
            cycle
             :show-arrows="false"
                height="700">
            <v-carousel-item
                v-for="(item,i) in banners"
                :key="i"  
                :src="base_url + item.file_path.path + item.file_path.filename"
                gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.7)"
            >
                <v-container
                    fill-height
                    fluid
                    pa-10 mt-0
                >
                    <v-layout fill-height align-center pb-4 mb-4>
                        <v-flex xs12>
                            <v-row align="center">
                                <v-col cols="12" md="12" xl="12" align="center">
                                <h2 v-show="item.title != null && item.title != '' " class="display-2 font-weight-bold mb-4 white--text" style="font-family: 'MachProCondBold'!important;" id="main-title"> {{ item.title }}</h2>
                                <h3 v-show="item.subtitle != null && item.subtitle != '' " class="font-weight-light white--text" id="main-subtitle">
                                   {{item.subtitle}}
                                </h3>
                                <v-btn
                                    v-show="item.link != null && item.link != '' "
                                    rounded
                                    outlined
                                    large
                                    dark
                                    link
                                    class="mt-5"
                                    :href="item.link"
                                    target="_blank"
                                >
                                    Ver más
                                </v-btn>
                                </v-col>
                                <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
                            </v-row>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
export default {
    data: () => ({
        model: 0,
        color: '',
        colors: [
            'black',
            'secondary',
            'yellow darken-2',
            'red',
            'orange',
        ],
        empty_url: "/images/default-image.png",
        base_url: "",
        banners: [],
    }),
    created() {

        this.getSliders();
    },
    methods:{
        async getSliders(){
            let response = await this.$API.sliders.list();
            this.banners = response.data.data;
            this.base_url = this.$baseURL;
        }
    },
}
</script>
<style>
.v-image__image--cover {
    background-position: top center !important;
    background-size: cover;
}
#main-title{
    font-size: 4.5em !important;
}
#main-subtitle{
    font-size: 2em !important;
}
@media (max-width: 1000px){
    #main-title{
        font-size: 4em !important;
    }
    #main-subtitle{
        font-size: 1.5em !important;
    }
}
@media (max-width: 640px){
    #main-title{
        font-size: 3em !important;
    }
    #main-subtitle{
        font-size: 1em !important;
    }
}


</style>