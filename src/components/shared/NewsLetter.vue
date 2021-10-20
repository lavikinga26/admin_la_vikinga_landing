<template>
    <div>
        <div class="ritekhela-fancy-title-two">
            <h2><b>NEWSLETTER</b></h2>
        </div>
        
        <v-list class="py-0" light>
            <template v-for="(item, index) in data_reg">
                <v-list-item :key="item.title"  link>
                    <!-- <v-list-item-content @click="$router.push(`/blog-post/edit/${item.id}`)"> -->
                    <v-list-item-content class="text-left">
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.summary"></v-list-item-subtitle>
                        <!-- <v-list-item-subtitle>
                        <v-chip
                            v-for="label in getLabels(item.tags)"
                            :key="label"
                            color="secondary"
                            class="font-weight-bold mt-1 mr-1"
                            outlined
                            small>
                            {{ label }}
                        </v-chip>
                        </v-list-item-subtitle> -->
                    </v-list-item-content>

                    <v-list-item-action>
                        <!-- <v-list-item-action-text v-text="item.time"></v-list-item-action-text> -->
                    </v-list-item-action>
                </v-list-item>

                <v-divider
                v-if="index + 1 < data_reg.length"
                :key="index"
                ></v-divider>
            </template>
            <template v-if="data_reg.length === 0">
                <div class="px-1 py-6 text-center">Sin datos para mostrar</div>
            </template>
        </v-list>
        <!-- Pagination -->
        <template>
            <v-pagination
                v-model="current_page" 
                :length="last_page"
                @input="getNewsLetter"
            ></v-pagination>
        </template>
        <!-- End -->
    </div>
</template>
<script>
export default {
    name:"newsletter",
    data: () => ({
        current_page: 1,
        last_page: 0,
        data_reg: [],
    }),
    mounted() {
        this.getNewsLetter();
    },
    methods: {
        async getNewsLetter(){
            try{
                const data = await this.$API.blog.newsletterWeb(this.current_page);
                this.data_reg = data.data.data;
                this.last_page = data.data.last_page;
            }
            catch(e){
                console.error(e);
            }
        },
    },
}
</script>
