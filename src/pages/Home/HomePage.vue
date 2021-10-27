<template>
    <div>
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>
        <v-container>
            HOME PARALAX

            <slick
  ref="slick"
  :options="slickOptions"
  @afterChange="handleAfterChange"
  @beforeChange="handleBeforeChange"
  @breakpoint="handleBreakpoint"
  @destroy="handleDestroy"
  @edge="handleEdge"
  @init="handleInit"
  @reInit="handleReInit"
  @setPosition="handleSetPosition"
  @swipe="handleSwipe"
  @lazyLoaded="handleLazyLoaded"
  @lazyLoadError="handleLazeLoadError">
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
</slick>


        </v-container>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {  },

    data: () => ({
        fab: null,
        color: "",
        flat: null,
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
};
</script>

<style >
    *{
        text-transform: none !important;
        font-family:'Montserrat', sans-serif  !important;
    }



.vueperslides__arrow {color: #333;}
.vueperslides__bullet {border-color: #E73C7E;box-shadow: none;}

.vueperslide {
  color: #fff;
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  transition: .3s ease-in-out;
  opacity: 0.3;
  transform: scale(0.8);
}

.offset-slide--first .vueperslides__track-inner {
  transform: translate3d(33.333%, 0, 0) !important;
}

.offset-slide--last .vueperslides__track-inner {
  transform: translate3d(-133.33%, 0, 0) !important;
}
</style>