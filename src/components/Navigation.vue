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
      class="ma-4"
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
      <div v-else class="d-flex justify-space-between align-center" style="width: 100%;">
        <div>
          <template
            v-for="(item, i) in items">
            <dan-menu
              v-bind:key="i"
              v-if="item.menu.length>0"
              :name='item.name' :slug="item.slug" :menu-items='item.menu' @dan-menu-click='onMenuItemClick'
            ></dan-menu> 
            <v-btn text :href="item.slug" target="_blank"
              v-else-if="item.slug.includes('https://')"
              :key="i" medium class="px-1"
              small>
              <span class="ma-2">{{item.name}}</span>
            </v-btn>
            <v-btn text :to="item.slug"
              v-else
              small
              :key="i" medium class="px-1">
              <span class="ma-2">{{item.name}}</span>
            </v-btn>
            <span v-if="i < items.length-1" style="color: #0b233f; font-size: 0.9rem;" v-bind:key="i+100"> | </span>
          </template>
        </div>
        <div>
          <v-btn color="secondary"
              depressed
              small
              class="px-2 rounded-pill"
              link
              to="/auth/iniciar-sesion">
              <span class="ma-3">INCIAR SESIÓN</span>
          </v-btn>
          <v-btn color="secondary"
              icon
              class="px-2 rounded-pill"
              link
              to="/cuenta/mi-perfil">
              <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>
          <v-btn color="secondary"
              icon
              class="px-2 rounded-pill"
              link
              to="/carrito">
              <v-icon>mdi-shopping-outline</v-icon>
          </v-btn>
        </div>
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
        const data = await this.$API.configuration.menu_header();
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
  }
</style>