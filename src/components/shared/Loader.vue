<template>
    <div class="modal loader load" v-if="$store.state.loader">
        <!--<img class="img-loader img-loading" src="../assets/images/loader.png">-->
        <!--<hollow-dots-spinner style="margin: auto;" :animation-duration="1000" :size="100" :color="'#FFF'"/>-->
        <v-dialog
                v-model="$store.state.loader"
                persistent
                width="500"
                height="500"
                class="elevation-0"
                content-class="elevation-0"
                style="box-shadow: none !important;"
            >
            <v-card
                color="transparent"
                dark
                class="align-center elevation-0"
                style="display: flex;"
            >
                <v-card-text 
                color="white"
                class="text-center">
                    <div style="height:300px">
                        <spring-spinner style="margin: auto; margin-top: 50px;" :animation-duration="3000" :size="100" :color="'#FFF'"/>          
                    </div>
                </v-card-text>
            </v-card>
            </v-dialog>
    </div>
</template>
<script>
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import { HollowDotsSpinner } from 'epic-spinners'
import { BreedingRhombusSpinner  } from 'epic-spinners'
import { ScalingSquaresSpinner  } from 'epic-spinners'
import { TrinityRingsSpinner  } from 'epic-spinners'
import { SpringSpinner } from 'epic-spinners'

export default ({
    components: {
        HollowDotsSpinner,
        FulfillingBouncingCircleSpinner,
        BreedingRhombusSpinner,
        ScalingSquaresSpinner,
        TrinityRingsSpinner,
        SpringSpinner
    },
})
</script>

<style lang="scss" scoped>
.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 90%;
    box-shadow: none !important;
}
.modal{
    position: absolute;
    height: 100%;
    width: 100%;
}
.vdialog {
    box-shadow: none !important;
}
</style>