<template>
    <v-app>
            <router-view :key="$route.path" />
        <loader></loader>
    </v-app>
</template>
<script>
import Loader from "../components/shared/Loader.vue"
export default {
    name: "FullTemplate",
    components: {
        Loader
    },
    data: (e) => ({
        fab: null,
        color: "",
        flat: null,
        drawer: null,
    }),
}
</script>