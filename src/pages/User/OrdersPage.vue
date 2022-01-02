<template>
    <div style="min-height: 70vh;">
        <v-card height="70vh">
            <v-navigation-drawer
            absolute
            permanent
            left
            class="primary"
            dark
            >
                <div class="ma-5" style="text-align: center;">
                        <v-avatar
                            color="orange"
                            size="62"
                            class="mb-5"
                            >
                        <span class="white--text text-h5">{{user.name.substring(0,1)}}</span>
                        </v-avatar>
                        <h4 class="white--text">
                            {{user.name}} {{user.lastname}}
                        </h4>
                </div>

                <v-divider></v-divider>

                <v-list dense>
                    <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-container class="fill-height">
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-btn
                    color="pink"
                    dark
                    @click.stop="drawer = !drawer"
                    >
                    Toggle
                    </v-btn>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Mi Cuenta', icon: 'mdi-account-outline' },
          { title: 'Mis Órdenes', icon: 'mdi-package-variant' },
          { title: 'Mi Contraseña', icon: 'mdi-key-chain-variant' },
         
        ],
        user:{}
      }
    },
    mounted(){
        this.getPartnerData();
    },
    methods:{
        async getPartnerData(id){
            try{
                const response = await this.$API.auth.auth(id);
                this.user=response.data;
            }
            catch(e){
                console.error(e);
            } 
        },
    }
  }
</script>