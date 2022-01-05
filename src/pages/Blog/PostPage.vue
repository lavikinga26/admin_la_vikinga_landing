<template>
    <div>
        
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
        <div class="container">
            <div class="post-header">
                <div>
                    <p class="tit_h2_pink text_entrena">
                        {{post.title}}
                    </p>
                </div>
                <div class="post-header-details">
                    <h3>{{ post.created_at.split('T')[0] }}</h3>
                    <p>{{ post.user_id }}</p>
                </div>
            </div>
            <div v-html="post.content">
                
            </div>
            <!-- <div class="fill photo" :style="{ backgroundImage: 'url('+ base_url+post.image.path + post.image.filename + ')' }">

            </div>-->
            <div class="image-post">
                <v-img
                contain
                max-height="500px"
                max-width="500px"
                :src="base_url+post.image"
                ></v-img>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            slug:"",
            post: {
                title:'',
                user_id:'',
                content:'',
                created_at:'',
                image:''
            },
            base_url:""
        }
    },
    methods:{
        async getBySlug(){
            const response = await this.$API.blog.getBySlug(this.slug);
            //this.post = response.data;
            this.post.title = response.data.title;
            this.post.user_id = response.data.user_id.name;
            this.post.content = response.data.content;
            this.post.created_at = response.data.created_at;
            this.post.image = response.data.image.path + response.data.image.filename;  
        }
    },
    created(){
        this.slug = this.$route.params.slug;
        this.getBySlug();
        this.base_url = this.$baseURL;
    },
}
</script>

<style scoped>
.post-header{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
}
    .fill {
        overflow: hidden;
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
    }
    .photo{
        min-height: 350px;
    }
    .image-post{
        display: flex;
        justify-content: center;
    }
</style>