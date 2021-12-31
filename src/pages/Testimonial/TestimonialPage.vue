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
                    
                    <p class="tit_h1_white text_entrena">TESTIMONIOS</p>
                </div>
            </div>
        </div>
        <!-- Fin -->
        <div v-if="cant > 0" class="container-fluig pt-3 pb-5">
            <v-row class="sectionTestimonial" style="background-color: #0b152a">
                <v-col cols="12" md="6" sm="12" class="d-flex align-center justify-center flex-column dataSection">
                    <div class="text-center">
                        <p class="tit_h1_pink text_entrena pt-4">
                            {{ mainTestimonial.title }}
                        </p>
                    </div>
                    <div class="text-center px-5">
                        <p style="color: white">
                            {{ mainTestimonial.description }}
                        </p>
                    </div>
                </v-col>
                
                <v-col cols="12" md="6" sm="12" class="d-flex align-center videoMain">
                    <iframe width="100%" height="100%" :src="loadURL(mainTestimonial.link).embed + '?autoplay=1&mute=0'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12" sm="12" class="gallery pt-1">
                    <div v-for="testimonial in testimonialsData" :key="testimonial.id" class="testimonialItem">
                        <div class="testimonialVideo">
                            <iframe width="100%" height="100%" :src="loadURL(testimonial.link).embed" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="testimonialFooter">
                            <div>
                                <v-btn
                                fab
                                dark
                                x-small
                                color="pink"
                                @click.stop="openDialog(testimonial)"
                                >
                                    <v-icon dark>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </div>
                        </div>

                    </div>
                </v-col>          
            </v-row>
        </div>
        <div v-else class="container-fluig pt-3 pb-5">
            <div class="row mt-4">
                <div class="col-md-12 text-center">
                    <div class="inline-block">
                        <span style="color:#0b152a; vertical-align: middle;"><b>Próximamente</b></span>&nbsp;
                    </div>
                </div>
            </div>
        </div>
        <v-dialog
        v-model="dialog"
        hide-overlay
        fullscreen
        scrollable
        >
            <v-card style="background-color: #0b152a" >
                <v-row>
                    <v-col cols="12" md="9" sm="12" class="d-flex align-center videoMain">
                        <iframe width="100%" height="100%" :src="currentTestimonial.link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    
                    </v-col>

                    <v-col cols="12" md="3" sm="12" class="d-flex align-center justify-center flex-column">
                        <div class="text-center">
                            <p class="tit_h1_pink text_entrena pt-4">
                                {{ currentTestimonial.title }}
                            </p>
                        </div>
                        <div class="text-center px-5">
                            <p style="color: white">
                                {{ currentTestimonial.description }}
                            </p>
                        </div>

                        <div class="d-flex justify-end">
                            <v-btn
                                fab
                                dark
                                x-small
                                color="pink"
                                @click.stop="dialog = !dialog; currentTestimonial = {}"
                                >
                                    <v-icon dark>
                                        mdi-close
                                    </v-icon>
                                </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showTestimonials:false,
            cant: 0,
            testimonialsData:[],
            mainTestimonial:{},
            dialog:false,
            currentTestimonial:{},
        }
    },
    methods:{
        async getTestimonials(){
            const response = await this.$API.testimonials.get();
            let data = response.data;
            if(response.status ==  200){
                this.cant = data.length;
                if(this.cant > 0){
                    this.showTestimonials = true;
                    this.mainTestimonial = data[0];
                    this.testimonialsData = data.splice(1,data.length);
                    console.log(this.mainTestimonial);
                    console.log(this.testimonialsData)
                }
            }
        },
        loadURL (link) {
            let data = { status:false, embed:"", normal:"" }
            const youtubeEmbedTemplate = 'https://www.youtube.com/embed/'
            const url = link.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)
            const YId = undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0]
            data.status = (YId === url[0]) ? false : true;
            const topOfQueue = youtubeEmbedTemplate.concat(YId)
            data.embed = topOfQueue;
            data.normal = "https://youtu.be/" + YId;
            return data;
        },
        openDialog(t){
            this.currentTestimonial = t;
            this.currentTestimonial.link = this.loadURL(t.link).embed;
            //console.log(this.currentTestimonial)
            this.dialog = true;
        }
    },
    mounted(){
        this.getTestimonials();
    }
}
</script>

<style>
.gallery{
    display: grid;
    gap: 0.1rem;
    grid-auto-rows: 18rem;
    grid-template-columns: repeat(auto-fill,minmax(22rem, 1fr));
}
.alignCenter{
    display: flex;
    align-content: center;
}
.sectionTestimonial{
    min-height: 350px;
}
.testimonialItem{
    background-color: #0b152a;
    color: white;
}
.testimonialItem p{
    text-align: left;
}
.testimonialVideo{
    width: 100%;
    height: 85%;
}
.testimonialFooter{
    height: 15%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 15px;
    align-items: center;
}
.dataSection{
    
}
.videoMain{
    height: auto;
}
 @media (max-width: 960px) {
    .sectionTestimonial{
        height: auto;
    }
    .videoMain{
        min-height: 350px;
    }
    .dataSection{
        padding: 10px 100px;
    }
 } 
  @media (max-width: 650px) {
    .sectionTestimonial{
        
        height: auto;
    }
    .videoMain{
        min-height: 300px;

    }
 } 
</style>