<template>
    <v-app>
            <router-view :key="$route.path" />
        <loader></loader>
    </v-app>
</template>
<script>
export default {
    name: "FullTemplate",
    components: {
    },
    data: (e) => ({
        fab: null,
        color: "",
        flat: null,
        drawer: null,
    }),
}
</script>