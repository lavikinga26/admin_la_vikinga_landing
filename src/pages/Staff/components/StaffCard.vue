<template>
    <div>
        <v-row>
            <v-col cols="6" md="6" sm="6">
                <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="400"
                    height="300"
                    max-width="250"
                    :src="image"
                    class="img_staff"
                ></v-img>
            </v-col>
            <v-col cols="6" md="6" sm="6" class="pr-15">
                <p class="tit_h1_staff_pink text_entrena txt_uppercase mb-6">
                    {{phrase}}
                </p>
                <div class="tit_h3_team_pink txt_uppercase">
                    {{name}}
                </div>
                <hr class="divider my-3">
                <p class="txt_staff_description">
                    {{description}}
                </p>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: "staff-card",
    props: {
        image: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            default: "",
        },
        phrase: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        }
    },
    data() {
    return {
        rules: [(v) => !!v || "Campo es obligatorio"],
    };
  },
  created() {},
  methods: {}
}
</script>