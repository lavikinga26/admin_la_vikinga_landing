<template>
    <div>
        <!-- Encabezado -->
        <div class="container-fluid bg_pink pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <div class="inline-block">
                        <span style="color:white; vertical-align: middle;"><b>INICIO</b></span>&nbsp;
                        <img src="@/assets/img/lista_icon.png" style="max-width: 20px; filter: brightness(0) invert(1); vertical-align: middle;">
                    </div>
                    
                    <p class="tit_h1_white text_entrena">BLOG</p>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <!-- <v-row style="background-color: #0b152a" class="px-1 main-post">-->
            <v-row class="px-1 main-post">
                <v-col cols="12" md="6" sm="12" class="d-flex align-center justify-center">
                    <div class="text-center main-content">
                        <!-- <p class="tit_h1_pink text_entrena pt-4">
                            {{last.title}}
                        </p> -->
                        <p class="tit_h2_pink text_entrena">
                            {{last.title}}
                        </p>
                        <!-- <h4 style="color: #E30E4F; font-weight:100; text-align:center">
                            {{`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, q` | uppercase}}
                        </h4> -->
                        <h4>
                            {{last.summary | uppercase}}
                        </h4>
                        <!--
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, q
                        </p>-->
                        <div>
                            <router-link :to=" '/post/' + last.slug" style="text-decoration: none">
                                <v-btn
                                rounded
                                large
                                dark
                                link
                                color="primary"
                                class="mt-5"
                                @click.stop="openDialog(last)"
                                >
                                Ver más
                                </v-btn>
                            </router-link>
                        </div>
                    
                    </div>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                    <div v-if="img != null"  class="fill main-image" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
                    <div v-else class="no-photo fill" ></div>
                </v-col>
            </v-row>
            <v-row class="pt-5 px-3 pb-2">
                <v-col
                cols="12"
                md="3"
                sm="3"
                >
                    <v-text-field
                        v-model="search"
                        clearable
                        label="Buscar"
                        class="py-1"
                        type="text"
                        placeholder="Titulo, Creador, Contenido.."
                        filled
                        rounded
                        dense 
                        outlined
                    >

                        <template v-slot:append>
                            <v-fade-transition leave-absolute>
                                <v-progress-circular
                                v-if="loading"
                                size="24"
                                color="info"
                                indeterminate
                                ></v-progress-circular>
                                <v-icon
                                @click="searchData()"
                                >
                                    mdi-magnify
                                </v-icon>
                            </v-fade-transition>
                        </template>
                    </v-text-field>

                    <v-card
                    class="mx-auto"
                    width="100%"
                    flat
                    outlined
                    >
                        <v-list>
                            <v-subheader>
                                <strong>CATEGORIAS</strong>
                            </v-subheader>
                            <v-list-item-group v-model="selectedCategory">
                                <v-list-item v-for="(item, i) in categories" :key="i" :value="item.id">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.description"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>

                <v-col
                cols="12"
                md="9"
                sm="9"
                >
                    <h3>{{ postTitle }}</h3>
                    <div class="gallery pt-2">
                        <div v-for="(post,i) in posts" :key="i" class="card-posts">
                            <div class="card-image fill" :style="{ backgroundImage: 'url('+base_url+post.image.path+post.image.filename + ')' }">
                                <!-- image -->
                            </div>
                            <div class="card-content">
                                <!-- contenido -->
                                <p class="tit_h3_team_pink" style="color: #E30E4F; font-weight:100; text-align:center">
                                    {{post.title}}
                                </p>
                                <p class="text-center" style="font-size:12px;">
                                    {{post.summary}}
                                </p>
                                <div class="card-details">
                                    <v-chip
                                    color="secondary"
                                    >
                                        {{post.category.description}}
                                    </v-chip>
                                    <router-link :to=" '/post/' + post.slug" style="text-decoration: none">
                                        <v-btn
                                        rounded
                                        x-small
                                        large
                                        dark
                                        link
                                        color="secondary"
                                        >
                                            Ver más
                                        </v-btn>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <!--
                        <v-card v-for="(post,i) in posts" :key="i" class="py-1">
                            <v-row>
                                <v-col
                                cols="12"
                                md="6"
                                sm="6"
                                > 
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <div class="text-overline mb-4">
                                                Creado el {{ post.created_at.split('T')[0] }}
                                            </div>
                                            <v-list-item-title class="text-h5 mb-1">
                                                {{post.title}}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>{{post.user_id.name}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <div cols="12" md="6" sm="12" class="d-flex align-center no-photo" witdh></div>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" md="6" sm="12" class="d-flex align-center">
                                    <div v-if="post.image != null"  class="fill" :style="{ backgroundImage: 'url('+base_url+post.image.path+post.image.filename + ')' }"></div>
                                    <div v-else class="fill no-photo"></div>
                                </v-col>
                            </v-row>
                            <v-card-actions class="pt-5">
                                <v-chip
                                color="secondary"
                                >
                                {{post.category.description}}
                                </v-chip>
                                <v-spacer></v-spacer>
                                <v-btn
                                    outlined
                                    rounded
                                    text
                                    @click.stop="openDialog(post)"
                                >
                                    Leer más
                                </v-btn>
                            </v-card-actions>
                        </v-card>-->
                    </div>
                </v-col>
                <v-col>
                    <v-pagination
                        v-show="pagination"
                        :length="total"
                        v-model="page"
                    ></v-pagination>
                </v-col>
            </v-row>
            <v-dialog
            v-model="dialog"
            max-width="800px"

            >
                <v-card>
                    <v-card-title class="text-h5">
                        {{ selectedPost.title }}
                    </v-card-title>

                    <v-card-subtitle>
                        {{selectedSubtitle}}
                    </v-card-subtitle>

                    <v-card-text>
                        <div v-html="renderContent()"></div>
                        <div height="250px" v-if="selectedPost.image != null" class="fill image-post" :style="{ backgroundImage: 'url('+ base_url+selectedPost.image.path + selectedPost.image.filename + ')' }">
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn
                            outlined
                            rounded
                            text
                            @click="dialog = !dialog"
                            >
                                    Cerrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
        <!-- Fin -->
</template>

<script>
export default {
    data(){
        return {
            pagination:false,
            dialog:false,
            categories:[],
            posts:[],
            last:{},
            base_url:'',
            img:'',
            selectedCategory:"",
            loading:false,
            postTitle:"ULTIMOS POSTS",
            selectedPost:{},
            selectedSubtitle:'',
            total:0,
            page:0,
            search:"",
            isSearch:false,
        }
    },
    methods:{
        openDialog(post){
            this.selectedPost = post;
            this.selectedSubtitle = post.user_id.name + ' - ' + post.created_at.split('T')[0]
           this.dialog = true;
        },
        renderContent(){
            return this.selectedPost.content;
        },
        async getCategories(){
            try{
                const response = await this.$API.blog.getCategories();
                this.categories = response.data;
            }catch(e){
                console.error(e)
            }
        },
        async getLastPosts(){
            try{
                const response = await this.$API.blog.getLastPosts();
                this.posts = response.data;
            }catch(e){
                console.error(e)
            }
        },
        async getLastPost(){
            try{
                const response = await this.$API.blog.getLastPost();
                this.last = response.data;
                if(this.last.image == null){
                    this.img = null;
                }else{
                    this.img = this.base_url + this.last.image.path + this.last.image.filename;
                }
            }catch(e){
                console.error(e)
            }
        },
        async getPostsByCategory(id,page = 1){
            this.isSearch = false;
            this.pagination = true;
            const response = await this.$API.blog.getPostsByCategory(id,page);
            this.posts = response.data.data;
            if(this.posts.length == 0){
                this.postTitle = "SIN RESULTADOS"
            }else{
                this.postTitle = "CATEGORIA "+this.posts[0].category.description;
                this.postTitle = this.postTitle.toUpperCase();
            }
            this.total = response.data.last_page;
        },
        async searchData(page = 1){
            this.isSearch = true;
            this.pagination = true;
            const response = await this.$API.blog.searchPosts(page,this.search);
            console.log(response)
            this.posts = response.data.data;
            if(this.posts.length == 0){
                this.postTitle = "SIN RESULTADOS"
            }else{
                this.postTitle = "Resultados para "+this.search;
                this.postTitle = this.postTitle.toUpperCase();
                this.total = response.data.last_page;
            }
            this.loading = false;
            this.total = response.data.last_page;
        }
    },
    created(){
        this.getCategories();
        this.getLastPost();
        this.getLastPosts();
        this.base_url = this.$baseURL;
    },
    watch:{
        selectedCategory(old,current){
            this.pagination = true;
            this.isSearch = false;
            if(old == undefined || old == ""){
                this.getPostsByCategory(current,1);
            }else{
                this.getPostsByCategory(old,1);
            }
        },
        page(current,old){
            if(this.isSearch == false){
                this.getPostsByCategory(this.selectedCategory,current);
            }
            else{
                this.searchData(current);
                console.log(current)
            }
        }
    }
}
</script>

<style scoped>
    .fill {
        overflow: hidden;
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
    }
    .main-post{
        min-height: 450px;
    }
    .no-photo{
        background-image: url('~@/assets/img/isotipo.png');
        background-color: black;
    }
    .image-post{
        height: 350px;
    }

    .gallery{
        display: grid;
        gap: 1rem;
        grid-auto-rows: 25rem;
        grid-template-columns: repeat(auto-fill,minmax(20rem, 1fr));
    }
    .card-posts{
        background-color: #0b152a;
        color:white;
        border-radius: 10px;
    }
    .main-image{

    }
    .main-content{

    }
    .card-image{
        height: 40%;
        background-color: turquoise;
        -webkit-border-top-left-radius: 10px;
        -webkit-border-top-right-radius: 10px;
        -moz-border-radius-topleft: 10px;
        -moz-border-radius-topright: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .card-details{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .card-content{
        height: 60%;
        padding: 5px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    @media (max-width: 960px){
        .main-image{
            min-height: 450px;
        }
        .main-content{
            min-height: 450px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    @media (max-width: 925px){
        .gallery{
            grid-template-columns: 100%;
            padding-right: 50px;
            padding-left: 50px;
        }
    }
</style>