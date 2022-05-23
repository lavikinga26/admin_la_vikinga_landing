<template>
    <div>
        <div class="container-fluid bg_blue pt-3 pb-5">
            <div class="mt-4">
                <div class="col-md-12 text-center">
                    <p class="tit_h1_pink text_entrena">MARCAS ALIADAS</p>
                </div>

                
                <div ref="" class="flex-wrap d-flex justify-center align-center px-5">
                    <div v-for="item in data_reg" :key="item.name" class="ma-5 align-center">
                        <v-img contain v-if="item.file_path" :src="base_url + item.file_path.path + item.file_path.filename" max-width="120px" max-height="80px" class="ma-3" style="border-radius:10px; margin-right: auto !important; margin-left: auto !important; cursor:pointer;" @click="goPage(item.site_url)"></v-img>
                        <v-img contain v-else :src="base_url + empty_url" max-width="120px" max-height="80px" class="ma-3" style="border-radius:10px; margin-right: auto !important; margin-left: auto !important;"></v-img>
                    </div>
                </div>
            </div>
        </div>
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
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
            }
            catch(e){
                console.error(e);
            } 
        },
        async getRegistros(){
            try{
                const data = await this.$API.team.sponsors();
                this.data_reg = data.data.data;
            }
            catch(e){
                console.error(e);
            }
        },
        goPage(url){
            window.open(url);
        }
    },
};
</script>

<style>

</style>