<template>
    <div style="position: relative;margin-bottom: 15px;">
        <div class="primary white--text ritekhela-subheader">
            <v-row no-gutters class="pa-1 px-4">
                <v-col cols="12" sm="12" md="8" class="pa-3 my-auto">
                    <h2 class="mx-15">{{breadcrumb_title}}</h2>
                </v-col>
                <v-col cols="12" sm="12" md="4" class="pa-3 white--text">
                    <v-breadcrumbs :items="breadcrumbs">
                        <template v-slot:divider>
                        <v-icon class="white--text">mdi-chevron-right</v-icon>
                        </template>
                    </v-breadcrumbs>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
export default {
    name:"custom-breadcrumb",
    props:{
      breadcrumb_title:{
        type:String,
        default:"",

      },
      breadcrumbs:{
        type:Array,
        default:[
            {
                text: "Inicio",
                disabled: false,
                href: "#",
            },
            {
                text: "",
            },
        ]
      },
    },
    data: () => ({
        
    }),
}
</script>

<style>
  .v-breadcrumbs__item {
    align-items: center;
    display: inline-flex;
    text-decoration: none;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    color: white !important;
    font-size: 0.9rem;
    font-weight: 500;
}
  *{
    text-transform: none !important;
    /*font-family:'Montserrat', sans-serif  !important; */
  }
  .ritekhela-subheader:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -15px;
    /*border-left: 460px solid transparent;
    border-right: 460px solid transparent;*/
    border-top: 15px solid;
    margin-left: -440px;
}
.ritekhela-team-view1-text:before, .ritekhela-gallery-view1 h2:before, .ritekhela-latest-result-list:before, .ritekhela-team-view2-wrap:before, .ritekhela-testimonials-view1-inner:after, .ritekhela-subheader:before, .ritekhela-pagination ul li a:before, .ritekhela-contact-list i:after {
    border-top-color: #004A8D;
}
</style>