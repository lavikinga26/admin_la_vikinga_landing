<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      light
    >
      <v-list>
        <v-list-item>
            <img style="width: 70%;" src="@/assets/img/logo.png" alt="Logo" />
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          :to="item.slug"
        >
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{
              item.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      light
      elevation="0"
      class="ma-5"
    >
      <!--<v-toolbar-title>
            <router-link to="/inicio">
                <v-img src="@/assets/img/logo.png" max-width="150px" />
            </router-link>
      </v-toolbar-title>
      <v-spacer />-->
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
      <div v-else>

        <template
          v-for="(item, i) in items">
          <dan-menu
            v-bind:key="i"
            v-if="item.menu.length>0"
            :name='item.name' :slug="item.slug" :menu-items='item.menu' @dan-menu-click='onMenuItemClick'
          ></dan-menu>
          <v-btn text :to="item.slug"
            v-else
            :key="i" medium class="px-2">
            <span class="ma-3">{{item.name}}</span>
          </v-btn>

        </template>
      </div>
    </v-toolbar>
  </div>
</template>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>

<script>
import DanMenu from "../components/shared/Menu.vue";

export default {
  data: () => ({
    drawer: null,
    isXs: false,
    items: [],
     fileMenuItems: [
      {
        name: "Menu Item 1",
        action: () => {
          console.log("menu-item-1");
        }
      },
      { isDivider: true },
      { name: "Menu Item 2" },
      {
        name: "Sub 1",
        menu: [
          { name: "1.1" },
          { name: "1.2" },
          {
            name: "Sub-menu 2",
            menu: [
              { name: "2.1" },
              { name: "2.2" },
              {
                name: "Sub-menu 3",
                menu: [
                  { name: "3.1" },
                  { name: "3.2" },
                  {
                    name: "Sub-menu 4",
                    menu: [{ name: "4.1" }, { name: "4.2" }, { name: "4.3" }]
                  }
                ]
              }
            ]
          }
        ]
      },

      { name: "Menu Item 3" },
      { isDivider: true },
      {
        name: "Menu Item 4",
        action: () => {
          console.log("menu-item-4");
        }
      },
      {
        name: "Menu Item 5",
        action: () => {
          console.log("menu-item-5");
        }
      }
    ]
  }),
  props: {
    color: String,
    flat: Boolean,
  },
  components: {
    DanMenu
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    async menu(){
      let vm = this;
      try{
        const data = await this.$API.landing.menu_header();
        vm.items = data.data.data;
      }
      catch(e){
        console.error(e);
      }
    },
    onMenuItemClick(item) {
      console.log(`onMenuItemClick(), item=${item}`);
      if (item.action) {
        item.action();
      }
    }
  },

  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    this.onResize();
    this.menu();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>

<style>
  *{
    text-transform: none !important;
    /*font-family:'Montserrat', sans-serif  !important;*/
    letter-spacing: 0.0em;
  }
  .v-menu__content {
    position: absolute;
    display: inline-block;
    max-width: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    contain: content;
    will-change: transform;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    border-radius: 0px !important;
    border-top: 5px solid #004A8D;
    border-bottom: 2px solid #004A8D;
  }
</style>