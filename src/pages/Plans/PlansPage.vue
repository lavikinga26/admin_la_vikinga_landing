<template>
    <div>
        <div class="container-fluid bg_pink inscripciones">
            <div class="row">
                <div class="col-12 text-center">
                    <h1 class="tit_h1_white">INSCRIPCIONES</h1>
                </div>
            </div>
        </div> 

        <div class="container mt-4">
            <div class="row justify-center m-4">
                <h2 class="tit_h2_pink">¡ES HORA DE COMENZAR EL DESAFÍO!</h2>
            </div>
            <div class="row no-gutters">
                <div class="filtering col-sm-12 text-center">
                     <v-btn
                        class="ma-2 fb-btn"
                        color="secondary"
                        :outlined="category==0"
                        :text="category!=0"
                        @click="category=0"
                        >
                            TODOS
                    </v-btn>

                    <v-btn
                        class="ma-2 fb-btn"
                        color="secondary"
                        v-for="(item, i) in categories"
                        :key="i"
                        :outlined="category==item.id"
                        :text="category!=item.id"
                        @click="category=item.id"
                        >
                        Outlined Button
                    </v-btn>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    components: { 
     },

    data: () => ({
        category: 0,
        categories: [],
        plans:[]
    }),

    mounted() {
        this.$store.commit('loader',true);
        setTimeout(()=>{ 
            this.$store.commit('loader',false);
        }, 5000);
    },

    watch: {
    },

    methods: {
    },
}
</script>
<style>
  .fb-btn.v-btn--outlined {
    border: 3px solid #E30E4F;
  }
</style>