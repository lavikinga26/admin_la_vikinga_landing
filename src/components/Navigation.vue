<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary light>
      <v-list>
        <v-list-item class="d-flex justify-center">
          <img style="width: 70%" src="@/assets/img/logo.png" alt="Logo" />
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list dense>
        <v-list-item to="/carrito">
          <v-list-item-content>
            <v-list-item-title style="padding-right: 10px; height: 45px"
              class="subtitile-1 d-flex justify-space-between align-center">
              <span>CARRITO</span>
              <div>
                <v-badge color="secondary" :content="cartCount" :value="cartCount" style="padding-top: 0px" overlap>
                  <v-icon>mdi-shopping-outline</v-icon>
                </v-badge>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group v-if="isLogged" :value="false">
          <template v-slot:activator>
            <v-list-item-title>CUENTA</v-list-item-title>
          </template>

          <v-list :value="true" no-action sub-group>
            <v-list-item link to="/cuenta/mi-perfil">
              <v-list-item-title>Mi Perfil</v-list-item-title>
            </v-list-item>

            <v-divider class="white"></v-divider>
            <v-list-item link to="/cuenta/mis-ordenes">
              <v-list-item-title>Mi Cuenta</v-list-item-title>
            </v-list-item>

            <v-divider class="white"></v-divider>
            <v-list-item link to="/gym-virtual/agenda">
              <v-list-item-title>Gym Virtual</v-list-item-title>
            </v-list-item>

            <v-divider class="white"></v-divider>
            <v-list-item link to="/cuenta/descargables">
              <v-list-item-title>Descargables</v-list-item-title>
            </v-list-item>
            <v-divider class="white"></v-divider>
            <v-list-item link to="/cuenta/mi-biblioteca">
              <v-list-item-title>Mi Biblioteca</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>

      <v-divider />
      <v-list dense>
        <div v-for="(item, i) in items" :key="i" :to="item.slug">
          <v-list-group v-if="item.menu.length > 0" :value="false">
            <template v-slot:activator>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </template>

            <v-list :value="true" no-action sub-group>
              <v-list-item v-for="(subitem, i) in item.menu" :key="i" :to="subitem.slug">
                <v-list-item-content>
                  <v-list-item-title class="subtitile-1">{{
                    subitem.name
                    }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list-group>

          <v-list-item v-else-if="!item.slug.includes('https://')" :to="item.slug">
            <v-list-item-content>
              <v-list-item-title class="subtitile-1">{{
                item.name
                }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <a v-else :href="item.slug" style="text-decoration: none">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="subtitile-1">{{
                  item.name
                  }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </a>
        </div>
      </v-list>
      <v-list>
        <v-list-item class="d-flex justify-center" v-if="!isLogged">
          <v-btn color="secondary" small class="px-2 rounded-pill" style="width: 100%" link to="/auth/iniciar-sesion">
            <span class="ma-3">INCIAR SESIÓN</span>
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item class="d-flex justify-center" v-else @click="LogoutSession">
          <v-btn color="secondary" depressed small class="px-2 rounded-pill" style="width: 100%" link
            to="/cuenta/mis-ordenes">
            <span class="ma-3">CERRAR SESIÓN</span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

      <!--<v-toolbar-title>
                    <router-link to="/inicio">
                        <v-img src="@/assets/img/logo.png" max-width="150px" />
                    </router-link>
            </v-toolbar-title>
            <v-spacer />-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="mr-4" v-if="isXs" />
      <div v-if="!isXs" class="d-flex justify-space-between align-center pa-4" style="width: 100%">
        <div>
          <template v-for="(item, i) in items">
            <dan-menu v-bind:key="i" v-if="item.menu.length > 0" :name="item.name" :slug="item.slug"
              :menu-items="item.menu" @dan-menu-click="onMenuItemClick"></dan-menu>
            <v-btn text :href="item.slug" target="_blank" v-else-if="item.slug.includes('https://')" :key="i" medium
              class="px-1" small>
              <span >{{ item.name }}</span>
            </v-btn>
            <v-btn text :to="item.slug" v-else small :key="i" medium class="px-1">
              <span >{{ item.name }}</span>
            </v-btn>
            <span v-if="i < items.length - 1" style="color: #0b233f; font-size: 0.9rem" v-bind:key="i + 100">
              |
            </span>
          </template>
        </div>
        <div class="mt-5 mr-5">
          <router-link to="/">
            <img style="width: 130px;" src="@/assets/img/logo.png" alt="Logo" />
          </router-link>
        </div>
        <div>
          <v-btn color="secondary" v-if="!isLogged" depressed small class="px-2 rounded-pill" link
            to="/auth/iniciar-sesion">
            <span class="ma-3">INCIAR SESIÓN</span>
          </v-btn>
          <v-btn color="secondary" v-if="isLogged" depressed small class="px-2 rounded-pill" link
            to="/gym-virtual/agenda">
            <span class="ma-3">
              <v-icon>mdi-weight-lifter</v-icon> INGRESAR AL GYM
            </span>
          </v-btn>
          <v-menu offset-y v-if="isLogged" min-width="200px" class="secondary white--text">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="secondary" icon class="px-2 rounded-pill" v-bind="attrs" v-on="on">
                <v-icon>mdi-account-circle-outline</v-icon>
              </v-btn>
            </template>
            <v-list class="secondary white--text">
              <v-list-item link class="white--text" to="/cuenta/mi-perfil">
                <v-list-item-title class="white--text">Mi Perfil</v-list-item-title>
              </v-list-item>
              <v-divider class="white"></v-divider>
              <v-list-item link class="white--text" to="/cuenta/mis-ordenes">
                <v-list-item-title class="white--text">Mi Cuenta</v-list-item-title>
              </v-list-item>
              <v-divider class="white"></v-divider>
              <v-list-item link class="white--text" to="/gym-virtual/agenda">
                <v-list-item-title class="white--text">Gym Virtual</v-list-item-title>
              </v-list-item>
              <v-divider class="white"></v-divider>
              <v-list-item link class="white--text" to="/cuenta/descargables">
                <v-list-item-title class="white--text">Descargables</v-list-item-title>
              </v-list-item>
              <v-divider class="white"></v-divider>
              <v-list-item link class="white--text" to="/cuenta/mi-biblioteca">
                <v-list-item-title class="white--text">Mi Biblioteca</v-list-item-title>
              </v-list-item>
              <v-divider class="white"></v-divider>
              <v-list-item @click="LogoutSession" link class="white--text" to="/cuenta/mis-ordenes">
                <v-list-item-title class="white--text">Cerrar Sesión</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn color="secondary" icon class="px-2 rounded-pill" link to="/carrito">
            <v-badge color="secondary" :content="cartCount" :value="cartCount" overlap>
              <v-icon>mdi-shopping-outline</v-icon>
            </v-badge>
          </v-btn>
        </div>
      </div>
  </div>
</template>

<script>
import DanMenu from "../components/shared/Menu.vue";

export default {
  data: () => ({
    drawer: null,
    isXs: false,
    items: [],
  }),
  props: {
    color: String,
    flat: Boolean,
  },
  components: {
    DanMenu,
  },

  mounted() {
    this.onResize();
    this.menu();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    async menu() {
      let vm = this;
      try {
        const data = await this.$API.configuration.menu_header();
        vm.items = data.data.data;
      } catch (e) {
        console.error(e);
      }
    },
    onMenuItemClick(item) {
      // console.log(`onMenuItemClick(), item=${item}`);
      if (item.action) {
        item.action();
      }
    },

    LogoutSession() {
      window.localStorage.clear();
      this.$router.go();
    },
  },

  computed: {
    isLogged() {
      return this.$store.getters.isLoggedIn;
    },
    StoreCart() {
      return this.$store.getters.StoreCart;
    },
    cartCount() {
      return this.StoreCart.length;
    },
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
};
</script>



<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>

<style>
* {
  text-transform: none !important;
  /*font-family:'Montserrat', sans-serif  !important;*/
  letter-spacing: 0em;
}
.v-menu__content {
  position: absolute;
  display: inline-block;
  max-width: 80%;
  overflow-y: auto;
  overflow-x: hidden;
  contain: content;
  will-change: transform;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  border-radius: 0px !important;
}
</style>