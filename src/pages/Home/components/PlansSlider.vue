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
                v-slot="{ active, toggle }"
            >
                <v-card
                color="primary"
                class="ma-4"
                height="800"
                width="300"
                @click="toggle"
                >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <v-scale-transition>
                        <div class="item">
                            <div class="blog-entry" style="margin: 0px 50px !important;">
                                <!--<a href="#" class="block-20 d-flex align-items-start" >
                                    <img :src="base_url + item.file_path.path + item.file_path.filename" alt="">
                                </a>-->
                                <div>
                                    <v-img
                                        lazy-src="https://picsum.photos/id/11/10/6"
                                        max-height="400"
                                        max-width="250"
                                        :src="base_url + item.file_path.path + item.file_path.filename"
                                    ></v-img>
                                </div>
                                <div class="text p-2 bd_desc_carousel">
                                    <ul>
                                        <li>{{item.title}}</li>
                                        <li>{{item.description}}</li>
                                    </ul>
                                    <p class="price_carousel text-center">
                                        S/. {{item.cost}}
                                    </p>
                                    <p class="text-center">
                                    <v-btn color="secondary"
                                        depressed
                                        class="px-2">
                                        <span class="ma-3">COMPRAR AHORA</span>
                                    </v-btn>
                                    </p>
                                </div>
                            </div>
                        </div>

                    <v-icon
                        v-if="active"
                        color="white"
                        size="48"
                        v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                    </v-scale-transition>
                </v-row>
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
                console.log(vm.data)
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        }
    },
}
</script>