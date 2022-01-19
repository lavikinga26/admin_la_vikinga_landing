<template>
  <div class="banner fill" v-if="banner.path != ''">
      <div class="fill-image" v-if="banner.link != null">
          <a :href="banner.link">
              <img :src="banner.path" alt="">
          </a>
      </div>
      <div class="fill-image" v-else>
          <img :src="banner.path" alt="">
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            base_url:"",
            banner:{
                link:"",
                path:"",
            }
        }
    },
    methods:{
        async loadBanner(){
            const response  = await this.$API.gym_banner.list();
            this.banner.link = response.data.data.link;
            this.banner.path = this.$baseURL + response.data.data.file_path.path + response.data.data.file_path.filename; 
            console.log(this.banner);
        }
    },

    mounted(){
        this.loadBanner();
    }
}
</script>

<style>
.banner{
    height: 250px;
    width: 100%;
}
.fill {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}
.fill-image{
    height: 100%;
    min-width: 80%;
}
.fill-image a{
    height: 100%;
    width: 100%;
    display: block;
}
img{
    height: 100%;
    width: 100%;
    object-fit: contain;
}
</style>