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
            class="pa-4"
            center-active
            show-arrows
            >
            <v-slide-item
                v-for="(item, n) in plans"
                :key="n"
                v-slot="{ s, toggle }"
            >
                <v-card
                color="primary"
                class="ma-4 card-outter"
                height="740"
                width="300"
                @click="toggle"
                >
                    <v-img
                        lazy-src="https://picsum.photos/id/11/10/6"
                        max-height="400"
                        :src="base_url + item.file_path.path + item.file_path.filename"
                    ></v-img>
                    <v-card-text 
                        max-height="200">
                            <div class="item">
                                <div class="blog-entry">
                                    <div class="text p-2 bd_desc_carousel">
                                        <ul>
                                            <li>{{item.description}}</li>
                                        </ul>
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
                console.log( data.data.data)
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