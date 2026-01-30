<template>
    <v-row style="background: #fff;">
        <whatsapp />
		<v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="position: relative;"
		>
			<div class="py-10 px-8" style="position: absolute; top:10px">
				<h3 class="title_pink" style="text-align: left">CONSIGUE RESULTADOS <br/>ENTRENANDO DESDE <br/> CASA</h3>
				<br/>
				<p class="subtitle-white">Durante las clases en vivo, recibirás apoyo para mejorar tu técnica y te  animaremos a completar cada entrenamiento de la mejor manera.</p>
			</div>
			<img
				src="@/assets/img/gym_virtual/register-3.png"
				alt="Imagen Login"
				style="width:100%; max-height:100vh;object-fit: cover;"
			/>
			<v-sheet
				style="position: absolute; left: 0; right: 0; bottom: 10px;"
				class="mx-auto transparent"
				elevation="0"
				max-width="450"
			>
				<v-carousel cycle :show-arrows="false" hide-delimiters height="320">
					<v-carousel-item class="ma-4">
						<v-card class="rounded-lg" color="#0A2240" width="540" outlined>
							<div class="align-center justify-center">
								<p
									class="pa-3 align-center white--text"
									style="text-align:center; font-size: 13px;"
								>
									<v-rating
										:value="5"
										background-color="indigo"
										color="yellow darken-3"
										disabled
									></v-rating>
									Me gusta la buena vibra de los entrenadores y que sufren igual
									o más que yo. Y que me acompañen a ir aumentando la carga
									progresivamente, pero sobre todo a no dejar de moverme 💪.<br /><br />
									<span style="font-weight:bold; color: #E7004C">Carolina</span>
								</p>
							</div>
						</v-card>
					</v-carousel-item>
					<v-carousel-item class="ma-4">
						<v-card class="rounded-lg" color="#0A2240" width="540" outlined>
							<div class="align-center justify-center">
								<p
									class="pa-3 align-center white--text"
									style="text-align:center;font-size: 13px;"
								>
									<v-rating
										:value="5"
										background-color="indigo"
										color="yellow darken-3"
										disabled
									></v-rating>
									Las clases son todas excelentes, y me ayudan las explicaciones
									y correcciones. Amo las rutinas, y que sean grabadas así las
									puedo hacer a la hora que mas me conviene. Y el tener el pdf
									también me ayuda a que a veces lo hago cuando no tengo buena
									señal, y lo puedo hacer sola por lo que me han enseñado.<br /><br />
									<span style="font-weight:bold; color: #E7004C"
										>Gabriela Francke</span
									>
								</p>
							</div>
						</v-card>
					</v-carousel-item>
					<v-carousel-item class="ma-4">
						<v-card class="rounded-lg" color="#0A2240" width="540" outlined>
							<div class="align-center justify-center">
								<p
									class="pa-3 align-center white--text"
									style="text-align:center;font-size: 13px;"
								>
									<v-rating
										:value="5"
										background-color="indigo"
										color="yellow darken-3"
										disabled
									></v-rating>
									Me gusta todo, osea la intensidad, la exigencia, la paciencia
									con la q Sol , Nico y Maggy nos motivan a entrenar, y sobre
									todo enseñan, me han ayudado a ser más disciplinada aun no lo
									soy al 100% pero estoy encaminada!!<br /><br />
									<span style="font-weight:bold; color: #E7004C"
										>Monica Hurtado</span
									>
								</p>
							</div>
						</v-card>
					</v-carousel-item>
				</v-carousel>
			</v-sheet>
		</v-col>
        <v-col 
            cols="12"
			md="8"
			class="pa-4"
			style="height: 100vh; overflow-y:auto;"
        >
            <h1 class="title_pink mb-4" style="margin-top: 5%">Realizar pago</h1>
            <v-sheet max-width="500" class="mx-auto">
                <v-card elevation="0" class="pa-5">
                    <div class="py-2 d-flex align-center">
                        <h2>Pago con tarjetas de crédito/débito</h2>  
                    </div>

                    <h4 style="font-weight: 100;" class="mx-3" v-if="usercc.length > 0">Selecciona una de tus tarjetas</h4>
                    <v-radio-group
                    v-model="selected_card"
                    column
                    color="secondary"
                    class="mt-0"
                    >
                        <template v-for="(item, index) in usercc">
                            <v-card :key="index" class="ma-3 pa-3">
                                <div class="d-flex align-center">    
                                    <div>
                                        <v-radio
                                            :value="item"
                                            color="secondary"
                                        ></v-radio>
                                    </div>
                                    
                                    <div>
                                        <img style="max-width: 40px" src="@/assets/img/icons/visa.png" v-if="item.card_brand == 'Visa'"/>
                                        <img style="max-width: 40px" src="@/assets/img/icons/mastercard.png" v-if="item.card_brand == 'Mastercard'"/>
                                        <img style="max-width: 40px" src="@/assets/img/icons/amex.png" v-if="item.card_brand == 'Amex'"/>
                                    </div>
                                    <div style="margin-left: 20px;">
                                        <h4> ****{{item.last_pan}}</h4>
                                        <!--<p style="font-size: 0.8rem; margin-bottom: 0px;">
                                            {{item.description}}
                                        </p>
                                        <div style="font-size: 0.8rem; margin-bottom: 0px;"
                                            v-html="item.card_brand">
                                        </div>-->
                                    </div>
                                </div>
                            </v-card>
                        </template>
                    </v-radio-group>
                    
                    <div class="mt-2 mb-2 d-flex">
                        <v-btn color="secondary"
                            outlined
                            class="px-2"
                            @click="abrirPayme()"
                            v-if="hide_btn==false">
                            <span class="ma-3">Nueva Tarjeta</span>
                        </v-btn>

                        <v-btn color="secondary"
                            depressed
                            class="btn_pay_cc"
                            @click="authPayment()"
                            v-if="selected_card!=0">
                            <span class="ma-3">Pagar</span>
                        </v-btn>
                    </div>

                    <div class="d-flex">
                        <div id="demo" class="d-flex"></div>
                    </div>
                </v-card>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
import axios from "axios";
import API from "../../api/axios";
export default {
    components: { 
        axios
     },

    data: () => ({
        category: 0,
        order:{},
        usercc:{},
        selected_card: 0,
        base_url: '',
        slug:'',
        rules: [
            value => !value || value.size < 2000000 || '',
        ],
        hide_btn: false,
        img_file: null,
        img_url: "../images/default-image.png",
        
        toast:{
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },

        uploadSuccess: false,
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.hash;
        vm.getOrder();

        /** Importamos Pay-me */
        let paymeScript = document.createElement('script');
        paymeScript.setAttribute('src', 'https://d23b52o2im4p82.cloudfront.net/flex-capture.min.js');
        document.head.appendChild(paymeScript);

        
    },

    watch: {
    },

    methods: {
        
        showToast(msg,color){
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },

        async authPayment(){
            let vm = this;
            vm.$store.commit('loader',true);
            try{
                /*console.log("CARD: ");
                console.log(vm.selected_card);*/
                vm.selected_card.hash_order = vm.slug;
                const data_auth = await this.$API.payme.authTransactionRetos(vm.selected_card);
                let auth_resul = data_auth.data;

                let datos_upd = {};
                datos_upd.hash_order = vm.slug;
                
                this.$router.push({ path: '/gym-virtual/retos-resultado-pago/'+vm.slug });

                /*if(auth_resul.success == true){
                    datos_upd.status = 1;
                    console.log("retorna true");
                    const upd_order = await this.$API.payme.updOrderStatus(datos_upd);
                }else if(auth_resul.success == false){
                    datos_upd.status = 2;
                    console.log("retorna false");
                    const upd_order = await this.$API.payme.updOrderStatus(datos_upd);
                }else{
                    datos_upd.status = 1;
                    const upd_order = await this.$API.payme.updOrderStatus(datos_upd);
                }*/

                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },

        async getOrder(){
            let vm = this;
            vm.$store.commit('loader',true);
            try{
                //console.log("HASH: "+vm.slug);
                const data = await this.$API.order.getAllOrderInfo(vm.slug);
                //console.log(data.data.data);
                vm.order = data.data.data.order;
                const ucards = await this.$API.payme.getUserCards(vm.order.customer);
                vm.usercc = ucards.data.data.cards;
                if(vm.usercc.length == 0){
                    this.abrirPayme();
                }
                vm.$store.commit('loader',false);
            }
            catch(e){
                console.error(e);
                vm.$store.commit('loader',false);
            }
        },

        async reqCallback(response) {
            try{
                let vm = this;
                
                this.card_data = response;
                //console.log(this.card_data);
                this.card_data.id_user = this.order.customer.id;
                const data = await this.$API.payme.saveToken(this.card_data);

                let token_resul = data.data.data;

                if(token_resul.success == true){
                    //console.log("TOKEN CREADO");

                    token_resul.ucard.hash_order = vm.slug;

                    const data_auth = await this.$API.payme.authTransactionRetos(token_resul.ucard);

                    this.$router.push({ path: '/gym-virtual/retos-resultado-pago/'+vm.slug });
                    vm.$store.commit('loader',false);
                    //console.log(data_auth);
                }else{
                    alert("Error al generar token.");
                    vm.$store.commit('loader',false);
                }
                
            }catch(e){
                //this.$store.commit('loader',false);
                console.error(e);
            } 
        },

        startCallback() {
            let vm = this;
            vm.$store.commit('loader',true);
            //console.log("-------Click en pagar-------");
        },

        errorOnPayCallback() {
            //console.log("-------Error al momento pagar-------");
        },

        abrirPayme(){
            this.hide_btn = true;
            this.selected_card = 0;
            var tokenRequest = {
                    "action": "tokenize",
                    "transaction": {
                    "meta": {
                        "internal_operation_number": Math.floor(Date.now()).toString().substring(7),
                        "additional_fields": {
                            "user_id": this.order.customer.id_user
                        }
                    }
                },
                "card_holder": [
                    {
                        "first_name": this.order.customer.name,
                        "last_name": this.order.customer.lastname,
                        "email_address": this.order.customer.email,
                        "identity_document_country": "PER",
                        "identity_document_type": "DNI",
                        "identity_document_identifier": "00000000"
                    }
                ]
            };

            //console.log(tokenRequest);

            var token_key = "TvqvXinCnJKvnuHfYRReHlHevWHLL8YXOT38HxvOfWgUaN2gcgxi86xlr6J3YbXB";

            var capture = new FlexCapture({
                "key": token_key,
                "payload": tokenRequest,
                "additionalFields": []
            });

            capture.init(document.querySelector('#demo'), this.reqCallback, this.startCallback, this.errorOnPayCallback);
        },

    },
}
</script>
<style>
    .fb-btn.v-btn--outlined {
        border: 1px solid #E30E4F;
    }
    .rounded-lg .round-radius{
        border-radius: 5px !important; 
    }
</style>