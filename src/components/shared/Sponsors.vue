<template>
    <div>
        <v-row no-gutters class="pa-4">
            <v-col cols="12">
                <div class="ritekhela-fancy-title">
                    <div class="ritekhela-fancy-title-inner">
                        <h3><b>Partners Oficiales</b></h3>
                    </div>
                </div>
                <div class="ritekhela-partner-view1">
                    <ul class="sponsors" style="text-align: center;">
                        <li  v-for="item in data_reg" :key="item.name">
                            <a icon :href="item.site_url" target="_blank">
                                <!--<img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="sponsor" />-->
                                <v-img v-if="item.file_path" :src="base_url + item.file_path.path + item.file_path.filename" max-width="180px" max-height="80px" class="ma-3" style="border-radius:10px; margin-right: auto !important; margin-left: auto !important;"></v-img>
                                
                                <v-img v-else :src="base_url + empty_url" max-width="180px" max-height="80px" class="ma-3" style="border-radius:10px; margin-right: auto !important; margin-left: auto !important;"></v-img>
                            </a>
                        </li>
                    </ul>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  data: () => ({
    data_reg: [],
    empty_url: "/images/default-image.png",
    base_url: "",
  }),

  created() {
        this.getBaseUrl();
        this.getRegistros();
  },

  watch: {
  },

  methods: {
        async getBaseUrl(){
            try{
                const data = await this.$API.shop.getBaseUrl();
                this.base_url = data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
        async getRegistros(){
            try{
                const data = await this.$API.club.sponsors();
                this.data_reg = data.data.data;
            }
            catch(e){
                console.error(e);
            }
        }
  },
};
</script>

<style>
  *{
    text-transform: none !important;
    font-family:'Montserrat', sans-serif  !important;
  }

  
h3 {
  font-size: 24px;
  font-weight: 500;
  color: #000;
}

.main-menu { 
  margin-top: 0;
}
.main-menu ul {
  margin: 0;
  padding: 0;
  position: relative;
}
.main-menu ul,
.main-menu li {
  list-style: none none;
}
.main-menu li {
  display: inline-block;
  clear: none;
}
.main-menu a {
  display: grid;
  grid-template-columns: 24px auto;
  grid-template-rows: 24px;
  grid-column-gap: 8px;
  grid-row-gap: 0;  
  padding: 16px;
  text-decoration: none;
  color: #fff;
  opacity: 0.75;
}
.main-menu a:hover {
  opacity: 1; 
  background-color: #FFD520; 
  color: #222;
}
.main-menu img {
  width: 24px;
  height: 24px;
}
.main-menu span {
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  align-self: center;
}
.main-menu a.nav-orioles:hover {
  background-color: #DF4601;
  color: #fff;
}
.main-menu a.nav-ravens:hover {
  background-color: #241773;
  color: #fff;
}
.main-menu a.nav-terps:hover {
  background-color: #E03A3E;
  color: #fff;
}
.main-menu a.nav-msgbrd:hover img {
    -webkit-filter: invert(1);
  filter: invert(1);

}
.main-menu a.nav-more {
  position: absolute;
  right: 0;
  top: 0;
}
.main-menu a.nav-more:hover {
  background-color: #222;
  color: #fff;
}
.main-menu .view-more-menu-options:hover .nav-more {
  background-color: #222;
  color: #fff;
  opacity: 1;
}
.main-menu .subnav {
  display: none;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.main-menu .view-more-menu-options:hover .subnav {
  display: block;
  width: 320px;
  position: absolute;
  right: 0;
  margin: 0;
  padding: 0;
  top: 56px;
  background-color: #222;
  max-height: calc(100vh - 146px);
  overflow: auto;
}

.subnav li {
  display: block;
  grid-template-columns: 24px 256px;
}
.subnav li:hover img {
  -webkit-filter: invert(1);
  filter: invert(1);
}

.view-more-menu-options:hover {
  background-color: #222;
}

.content {
  width: calc(100vw - 32px);
  min-width: 320px;
  max-width: 928px;
  margin: 16px auto;
  grid-area: content;
}
.content img {
  width: 100%;
  max-width: 928px;
  height: auto;
  margin: 0 auto;
}

.feature-article-teaser {
  box-sizing: border-box;
  background: #fff;
  margin: 32px auto;
  max-width: 928px;
}
.feature-article-teaser img {
  width: 100%;
  height: auto;
  margin-bottom: 16px;
}
.feature-article-teaser h3 {
  margin: 0;
}
.feature-article-teaser h3 a {
  display: block;
  width: 100%;
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  color: #555;
  line-height: 1;
}
.feature-article-teaser p {
  margin: 0;
}
.feature-article-teaser p a {
  display: block;
  width: 100%;
  text-decoration: none;
  margin: 0;
  font-size: 14px;
  font-weight: 200;
  font-family: helvetica, arial, sans-serif;
  color: #555;
  line-height: 1.5;
  letter-spacing: 1px;
}
.feature-article-teaser_content {
  padding: 0 32px 32px 32px;
}
.feature-article-teaser .meta {
  display: block;
  font-size: 12px;
  line-height: 1;
  padding: 16px 0 0;
  border-top: 1px solid #979797;
  margin-top: 16px;
  text-align: left;
  color: #444;
  font-family: helvetica;
  letter-spacing: 1px;
}
.feature-article-teaser .tag {
  margin-right: 0;
}

.recent-articles {
  box-sizing: border-box;
  padding: 32px;
  background: #fff;
  margin: 32px auto;
  max-width: 928px;
}
.recent-articles section.article {
  display: block;
  display: grid;
  grid-template-columns: 240px auto;
  grid-template-rows: auto;
  grid-template-areas:
    "image content";
  grid-column-gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #979797;
  padding-bottom: 18px;
}
.recent-articles .article:last-child {
  border-bottom: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}
section.article img {
  grid-area: image;
  width: 240px;
  height: auto;
}
section.article .preview {
  grid-area: content;
}
.preview h3 {
  margin: 0;
}
.preview h3 a {
  display: block;
  width: 100%;
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  color: #555;
  line-height: 1;
}
.preview p {
  margin: 0;
}
.preview p a {
  display: block;
  width: 100%;
  text-decoration: none;
  margin: 0;
  font-size: 14px;
  font-weight: 200;
  font-family: helvetica, arial, sans-serif;
  color: #555;
  line-height: 1.5;
  letter-spacing: 1px;
}
.preview .meta {
  display: block;
  width: 100%;
  margin: 0 0 4px 0;
  line-height: 1;
}
.tag {
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  color: #fe6022;
  display: inline-block;
  margin-right: 8px;
}
.published-on {
  font-size: 12px;
  font-weight: 200;
  color: #444;
  display: inline-block;
}

footer {
  display: block;
  clear: both;
  background-color: #eaab00;
  font-size: 24px;
  height: auto;
  padding: 32px 64px;
  text-align: center;
  grid-area: footer;
}

.sponsors ul {
  display: block;
  list-style: none none;
  text-align: center;
  margin: 0;
  padding: 0;
}
.sponsors li {
  display: inline-block;
  height: 96px;
  clear: none;
  margin: 16px;
}
.sponsors img {
  height: 96px;
}

.extended-nav {
  margin-top: 64px;
  margin-bottom: 64px;
}
.extended-nav ul {
  list-style: none;
  column-count: 5;
  column-gap: 16px;
  padding: 0;
  margin: 0;
}
.extended-nav li {
  list-style: none;
  margin: 2px 0;
  text-align: left;
  display: block;
}
.extended-nav ul li a {
  text-decoration: none;
  color: #000;
  font-size: 12px;
  line-height: 1.618;
}


</style>