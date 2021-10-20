<template>
    <div>
        <v-container>
            HOME PARALAX
        </v-container>
    </div>
</template>

<script>

export default {
    name: "App",
    components: {
    },

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

<style>
    *{
        text-transform: none !important;
        font-family:'Poppins', sans-serif  !important; 
    }
</style>