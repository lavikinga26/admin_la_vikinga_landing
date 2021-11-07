<template>
    <v-menu class="secondary white--text" :close-on-content-click="false" :offset-x='isOffsetX' :offset-y='isOffsetY' :open-on-hover='isOpenOnHover' :transition='transition' :value="openMenu">
        <template v-slot:activator="{ on }">
            <v-btn v-if='icon' :color='color' v-on="on" small>
                <v-icon>{{ icon }}</v-icon>
            </v-btn>
            <v-list-item v-else-if='isSubMenu' class='d-flex justify-space-between white--text' v-on="on" :to="slug">
                {{ name }}<div class="flex-grow-1"></div><v-icon>mdi-chevron-right</v-icon>
            </v-list-item>
            <v-btn v-else :color='color' v-on="on"  @click="openMenu = true"  text small >{{ name }}</v-btn>
        </template>
        <v-list color="secondary white--text" dark>
            <template v-for="(item, index) in menuItems">
                    <v-divider v-if='item.isDivider' :key='index' />
                    <dan-menu v-else-if='item.menu.length>0' :key='index' :name='item.name' :menu-items='item.menu' @dan-menu-click='emitClickEvent' :is-open-on-hover=false :is-offset-x=true 
                        :to="item.slug" :is-offset-y=false :is-sub-menu=true />
                    <v-list-item class="white--text" v-else :key='index' :to="item.slug" @click='emitClickEvent(item)'>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
            </template>
        </v-list>
    </v-menu>
    
</template>
<script>
import DanMenu from "./Menu.vue";
export default {
    name: "dan-menu",
    data: () => ({
        openMenu: false
    }),
    props: {
        name: String,
        icon: String,
        menuItems: Array,
        slug: String,
        color: { type: String, default: "primary" },
        isOffsetX: { type: Boolean, default: false },
        isOffsetY: { type: Boolean, default: true },
        isOpenOnHover: { type: Boolean, default: false },
        isSubMenu: { type: Boolean, default: false },
        transition: { type: String, default: "scale-transition" }
    },
    components: {
        DanMenu
    },
    methods: {
        emitClickEvent(item) {
            //this.$emit("dan-menu-click", item);
            this.openMenu = false;
        }
    },
}
</script>
<style>
.v-btn{
    border-radius: none !important;
}
</style>