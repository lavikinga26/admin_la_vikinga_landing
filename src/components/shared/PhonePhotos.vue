<template>
  <div>
    <div class="container-fluid bg_blue pt-3">
      <div class="row mt-4 mt-5">
        <div class="col-md-6 text-center">
          <img src="@/assets/img/isotipo.png" alt="" />
          <p class="tit_h1_pink text_entrena" id="text-phones">
            ENTRENA<br />DONDE<br />QUIERAS
          </p>
        </div>
        <div class="col-md-6 phone-container">
          <div class="d-flex align-center" style="margin-bottom: -80px">
            <div style="margin-right: -35px">
              <div class="iphone iphone1">
                <div class="screen"></div>
              </div>
            </div>
            <div style="z-index: 100">
              <div class="iphone iphone2 iphone-center">
                <div class="screen" id="center-screen"></div>
              </div>
            </div>
            <div style="margin-left: -35px">
              <div class="iphone iphone3">
                <div class="screen"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div style="height: 100px"></div>
  </div>
</template>

<script>
export default {};
</script>
<style>
#text-phones{
  font-size: 4.5em;
}
.iphone {
  width: 200px;
  background: #000;
  position: relative;
  border-radius: 35px;
}
.iphone .screen {
  background: url("~@/assets/img/multimedia/mobile.png") no-repeat;
  height: 405px;
  width: 100%;
  background: url(/img/mobile.80461c2b.png) no-repeat;
  background-size: 100%;
}
#center-screen {
  height: 445px;
}
.iphone-center {
  width: 220px;
}

.iphone1 {
  background: url("~@/assets/img/multimedia/ENTRENA_DONDE_QUIERAS/DESAFIO_7.jpg")
    no-repeat;
  background-size: cover;
  background-position: center;
}
.iphone2 {
  background: url("~@/assets/img/multimedia/ENTRENA_DONDE_QUIERAS/DESAFIO_5.jpg")
    no-repeat;
  background-size: cover;
  background-position: center;
}
.iphone3 {
  background: url("~@/assets/img/multimedia/ENTRENA_DONDE_QUIERAS/DESAFIO_6.jpg")
    no-repeat;
  background-size: cover;
  background-position: center;
}
.phone-container {
  /*background: chocolate;*/
}

@media (max-width: 1160px) {
  .phone-container {
    display: flex;
    justify-content: center;
  }
  .iphone {
    width: 144px;
  }
  .iphone .screen {
    height: 291px;
  }
  .iphone-center {
    width: 160px;
  }
  #center-screen {
    height: 320px;
  }
  #text-phones{
    font-size: 3.5em;
  }
}
@media (max-width: 700px) {
  
  .phone-container {
    display: flex;
    justify-content: center;
  }
  .iphone {
    width: 108px;
  }
  .iphone .screen {
    height: 220px;
  }
  .iphone-center {
    width: 120px;
  }
  #center-screen {
    height: 245px;
  }
}
</style>