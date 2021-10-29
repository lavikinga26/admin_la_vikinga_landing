<template>
    <div>
        <div class="container-fluid bg_blue pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <p class="tit_h1_pink text_entrena">MARCAS ALIADAS</p>
                    <img src="assets/images/logos_marcas.png" alt="" class="img-fluid logos_aliados">
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
        // this.getBaseUrl();
        // this.getRegistros();
    },

    watch: {
    },

    methods: {
        /*async getBaseUrl(){
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
        }*/
    },
};
</script>

<style>

</style>