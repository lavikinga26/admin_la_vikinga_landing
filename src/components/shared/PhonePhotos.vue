<template>
    <div>
        <div class="container-fluid bg_blue pt-3">
            <div class="row mt-4  mt-5">
                <div class="col-md-6 text-center">
                    <img src="@/assets/img/isotipo.png" alt="">
                    <p class="tit_h1_pink text_entrena">ENTRENA<br/>DONDE<br/>QUIERAS</p>
                </div>
                <div class="col-md-6">


                    <div class="d-flex align-center" style="margin-bottom: -80px;">
                        <div style="margin-right: -35px;">
                            <div class="iphone iphone1">
                                <div class="screen"></div>
                            </div>
                        </div>
                        <div style="z-index: 100;">
                            <div class="iphone iphone2" style="width: 220px;">
                                <div class="screen" style="height: 445px;"></div>
                            </div>
                        </div>
                        <div style="margin-left: -35px;">
                            <div class="iphone iphone3">
                                <div class="screen"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div style="height:100px"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style>


    .iphone {
        width: 200px;
        background: #000;
        
        position: relative;
        border-radius: 35px;
    }
    .iphone .screen {
        background:url('~@/assets/img/multimedia/mobile.png') no-repeat;
        height: 405px;
        width: 100%;
        background: url(/img/mobile.80461c2b.png) no-repeat;
        background-size: 100%;
    }

    .iphone1{
        background:url('~@/assets/img/multimedia/ENTRENA_DONDE_QUIERAS/DESAFIO_7.jpg') no-repeat;
        background-size: cover;
        background-position: center;
    }
    .iphone2{
        background:url('~@/assets/img/multimedia/ENTRENA_DONDE_QUIERAS/DESAFIO_5.jpg') no-repeat;
        background-size: cover;
        background-position: center;
    }
    .iphone3{
        background:url('~@/assets/img/multimedia/ENTRENA_DONDE_QUIERAS/DESAFIO_6.jpg') no-repeat;
        background-size: cover;
        background-position: center;
    }
</style>