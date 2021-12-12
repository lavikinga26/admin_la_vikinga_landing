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
                :src="require(`@/assets/img/multimedia/BANNER/${item}`)"
                gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.5)"
            >
                <v-container
                    fill-height
                    fluid
                    pa-10 mt-0
                >
                    <v-layout fill-height align-center pb-4 mb-4>
                        <v-flex xs12>
                            <v-row align="center">
                                <v-col cols="12" md="5" xl="8">
                                <h2 class="display-2 font-weight-bold mb-4 white--text" style="font-family: 'MachProCondBold'!important;">ACEPTA PARA TRANSFORMAR</h2>
                                <h3 class="font-weight-light white--text">
                                    
                                    ¡Una VIKINGA no abandona!
                                </h3>
                                <v-btn
                                    rounded
                                    outlined
                                    large
                                    dark
                                    link
                                    class="mt-5"
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
        <!--<v-carousel
            hide-delimiter-background
            show-arrows-on-hover>
            <v-carousel-item
                v-for="(item,i) in banners"
                :key="i"  
                :src="base_url + item.file_path.path + item.file_path.filename"
                style="background-position: top center"
                link
                :to="item.link"
            >
                <v-container
                    fill-height
                    fluid
                    pa-10 mt-0
                >
                    <v-layout fill-height align-center pb-4 mb-4>
                        <v-flex xs12>
                            <v-row align="center">
                                <v-col cols="12" md="5" xl="8">
                                <h2 class="display-2 font-weight-bold mb-4 white--text">{{item.title}}</h2>
                                <h3 class="font-weight-light white--text">
                                    {{item.subtitle}}
                                </h3>
                                <v-btn
                                    v-if="item.link"
                                    rounded
                                    outlined
                                    large
                                    dark
                                    link
                                    :to="item.link"
                                    class="mt-5"
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
        </v-carousel>-->
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
        banners: [
            'DESAFIO_1.jpg',
            'DESAFIO_2.jpg',
            'DESAFIO_3.jpg',
        ],
    }),
    mounted() {
        //this.getBaseUrl();
        //this.getRegistros();
    },
    methods:{
        async getBaseUrl(){
            try{
                const data = await this.$API.shop.getBaseUrl();
                this.base_url = data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
        /*async getRegistros(){
            try{
                const data = await this.$API.landing.banners();
                this.banners = data.data.data;
            }
            catch(e){
                console.error(e);
            }
        }*/
    },
}
</script>
<style>
.v-image__image--cover {
    background-position: top center !important;
    background-size: cover;
}
</style>