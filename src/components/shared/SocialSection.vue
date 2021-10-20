<template>
    <div class="widget widget_social_media">
        <div class="ritekhela-fancy-title-two">
            <h2><b>Siguenos en Nuestras Redes Sociales</b></h2>
        </div>
        <v-row class="justify-center">
            <v-col cols="6" md="2">
                <ul>
                    <li>
                        <a :href="social_media_links.twitter" class="twitter" target="_blank">
                            <v-icon color="white">mdi-twitter</v-icon>
                            <span><b>Twitter</b></span>
                            <small>{{social_media.twitter}}</small>
                        </a>
                    </li>
                </ul>
            </v-col>
            <v-col cols="6" md="2">
                <ul>
                    <li>
                        <a :href="social_media_links.facebook" class="fb" target="_blank">
                            <v-icon color="white">mdi-facebook</v-icon>
                            <span><b>Facebook</b></span>
                            <small>{{social_media.facebook}}</small>
                        </a>
                    </li>
                </ul>
            </v-col>
            <v-col cols="6" md="2">
                <ul>
                    <li>
                        <a :href="social_media_links.instagram" class="" target="_blank">
                            <v-icon color="white">mdi-instagram</v-icon>
                            <span><b>Instagram</b></span>
                            <small>{{social_media.instagram}}</small>
                        </a>
                    </li>
                </ul>
            </v-col>
            <v-col cols="6" md="2">
                <ul>
                    <li>
                        <a :href="social_media_links.tiktok" class="tiktok" target="_blank">
                            <img src="@/assets/img/tik-tok.png" style="max-width: 20px; filter: brightness(0) invert(1);">
                            <span><b>Tik-Tok</b></span>
                            <small>{{social_media.tiktok}}</small>
                        </a>
                    </li>
                </ul>
            </v-col>
            <v-col cols="6" md="2">
                <ul>
                    <li>
                        <a :href="social_media_links.youtube" class="you_tube" target="_blank">
                            <v-icon color="white">mdi-youtube</v-icon>
                            <span><b>Youtube</b></span>
                            <small>{{social_media.youtube}}</small>
                        </a>
                    </li>
                </ul>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props: ['data_config'],
    data: () => ({
        social_media: null,
        social_media_links: null,
    }),
    created () {
        this.social_media = JSON.parse(this.data_config.social_media);
        this.social_media_links = JSON.parse(this.data_config.social_media_links);
    },
    methods:{
    }
}
</script>