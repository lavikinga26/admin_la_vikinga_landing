<template>
  <v-footer dark padless>
    <v-card flat tile class="primary white--text text-center">
      <div class="ritekhela-footer-widget">
        <div class="container">
            <div class="row">
                <aside class="widget col-md-4 widget_about_info">
                    <a href="/"><img src="@/assets/img/footer_logo.png" alt="" style="max-width: 500px;"></a>
                </aside>
                <aside class="widget col-md-4 widget_about_info">
                    <div class="footer_widget_title"> <h2>INFORMACIÓN DE CONTACTO</h2> </div>
                    <ul>
                        <template v-if="data_config">
                            <li>
                                <v-icon small class="white--text">mdi-map-marker</v-icon>
                                <span class="text-min">{{data_config.address}}</span>
                            </li>
                            <li>
                                <v-icon small class="white--text">mdi-phone</v-icon>
                                <span class="text-min">{{data_config.phone}}</span>
                            </li>
                            <li>
                                <v-icon small class="white--text">mdi-email</v-icon>
                                <span class="text-min">{{data_config.email}}</span>
                            </li>
                        </template>
                    </ul>
                </aside>
                <aside class="widget col-md-4">
                </aside>
            </div>
            <div class="row">
                <aside class="col-12">
                    <template v-if="data_config">
                        <social-section :data_config="data_config"></social-section>
                    </template>
                </aside>
            </div>
        </div>
    </div>
    <div class="ritekhela-copyright">
        <div class="container">
            <div class="row">
                <div class="col-md-12" style="font-size: 15px;">
                    <p><a href="#" target="_blank" style="color: #fff;">La Vikinga © 2021. All Rights Reserved.</a></p>
                    <a href="#" class="ritekhela-back-top"><v-icon small class="white--text">mdi-chevron-up</v-icon></a>
                </div>
            </div>
        </div>
    </div>
    </v-card>
  </v-footer>
</template>

<style scoped>
.v-card {
    width: 100%;
}
</style>

<script>
import SocialSection from "../components/shared/SocialSection.vue";

export default {
    components: {
        SocialSection,
    },
    data: function () {
        return {
            data_config: null,
        }
    },
    created(){
        this.getConfiguracion();
    },
    methods:{
        async getConfiguracion(){
            try{
                const data = await this.$API.landing.configuration();
                this.data_config = data.data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
    }
};
</script>
<style>
.text-min{
    font-size: 13px;
}
.footer_widget_title h2 {
    display: inline-block;
    color: #ffffff;
    margin-bottom: 0px;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 600;
    padding: 0px 15px;
    border-radius: 80px;
    border-left: 0px solid !important;
    border-right: 0px solid !important;
    margin-top: 30px;
}
.widget_about_info ul li i {
    float: left;
    padding: 12px;
    font-size: 15px;
    border-right: 1px solid rgba(0, 0, 0, 0.25);
    margin-right: 5px !important;
    width: 40px;
}
</style>