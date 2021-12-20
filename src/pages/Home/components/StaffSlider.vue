<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="sub_h2_black">CONOCE A NUESTRO</h2>
                <h1 class="tit_h1_pink">STAFF</h1>
            </div>

            <div class="col-12">
                
                <v-slide-group
                class="pa-4"
                center-active
                show-arrows
                >
                    <v-slide-item
                        v-for="(n,index) in staff"
                        :key="'staff'+index"
                        v-slot="{ active }"
                    >
                        <v-hover v-slot="{ hover }">
                            <v-card
                            :color="active ? 'primary' : 'grey lighten-1'"
                            class="ma-4"
                            height="300px"
                            width="230"
                            >
                                <v-img
                                    :src="base_url + n.file_path.path + n.file_path.filename"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="300px"
                                >
                                <!--class="img_staff"-->
                                    <v-expand-transition>
                                        <div
                                            v-if="hover"
                                            class="d-flex transition-fast-in-fast-out primary v-card--reveal text-h2 white--text"
                                            style="height: 100%;"
                                        >
                                            <div class="text-center" >
                                                <img src="@/assets/img/isotipo.png" alt="" style="width: 50px" class="my-5">
                                                <h5 style="font-family: 'MachProCondBold';
                                                color: #E30E4F;
                                                font-size: 1.3rem; line-height: 1em;
                                                text-transform: uppercase !important;">{{n.name}}</h5>
                                                <p style="font-size: 0.6rem;line-height: 1rem;">{{n.phrase}}</p>
                                                <p style="font-size: 0.8rem;line-height: 1rem;" class="px-2">
                                                    {{n.description}}
                                                </p>
                                            </div>
                                            
                                        </div>
                                    </v-expand-transition>

                                </v-img>
                            </v-card>
                        </v-hover>
                    </v-slide-item>
                </v-slide-group>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data: () => ({
        model: null,
        staff:[],
        base_url: '',
    }),

    
    mounted() {
        let vm = this;
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
                const data = await this.$API.team.staff();
                vm.staff = data.data.data;
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