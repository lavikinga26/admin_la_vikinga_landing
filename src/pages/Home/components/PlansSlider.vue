<template>
    <div style="background-color: #0b152a">
        <v-sheet
            class="mx-auto"
            elevation="'0'"
            max-width="1150"
            color="#0b152a"
            dark
        >
            <v-slide-group
            v-model="model"
            class="pa-0"
            center-active
            
            >
            <v-slide-item
                v-for="(item, n) in plans"
                :key="n"
                v-slot="{ toggle }"
            >
                <v-card
                color="primary"
                class="ma-4 card-outter"
                height="800"
                width="300"
                @click="toggle"
                >
                    <v-img
                        v-if="item.file_path"
                        lazy-src="@/assets/img/lazy_img.jpg"
                        height="360"
                        max-height="360"
                        :src="base_url + item.file_path.path + item.file_path.filename"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        class=" white--text align-end"
                    >
                        <v-card-title>
                            <div style="border-left: 4px solid #E30E4F; text-align: left; word-break: keep-all;" class="pl-1">
                                {{item.title}}
                            </div>
                        </v-card-title>
                    </v-img>
                    <v-card-text 
                        max-height="200">
                            <div class="item">
                                <div class="blog-entry">
                                    <div class="text p-2 bd_desc_carousel" v-html="item.content">
                                        <!--<ul>
                                            <li>{{item.description}}</li>
                                        </ul>-->

                                    </div>
                                </div>
                            </div>
                    </v-card-text>
                    <v-card-actions class="card-actions mb-8">
                        <v-row align="center">
                            <v-col cols="12" align="center" class="py-0">
                                <span class="price_carousel text-center" style="font-family: 'MachProCondBold' !important;">
                                    S/. {{item.cost}}
                                </span>  
                            </v-col>
                            <v-col cols="12" align="center">
                                <v-btn color="secondary"
                                    :disabled="!data_config.allow_sale"
                                    :href="'/plan/'+item.identifier"
                                    depressed
                                    large
                                    class="px-2">
                                    <span class="ma-3">COMPRAR AHORA</span>
                                </v-btn>
                            </v-col>
                        </v-row>
                        
                    </v-card-actions>
                </v-card>
            </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>
<script>
  export default {
    data: () => ({
        model: null,
        plans:[],
        base_url: '',
        data_config: {}
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.slug;
        vm.$store.commit('loader',true);
        vm.getBaseUrl();
        vm.list();
    },

    watch: {
    },

    methods: {

        async getConfiguracion(){
            try{
                const data = await this.$API.configuration.configuration();
                this.data_config = data.data.data;
            }
            catch(e){
                console.error(e);
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
        async list(){
            let vm = this;
            try{
                const data = await this.$API.plans.list();
                vm.plans = data.data.data;
                vm.temp_plans = data.data.data;
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        }
    },
}
</script>

<style>
.card-outter {
    position: relative;
    padding-bottom: 50px;
}
.card-actions {
    position: absolute;
    bottom: 0;
}
.price_carousel{
    font-family: "MachProCondBold" !important;
}
</style>