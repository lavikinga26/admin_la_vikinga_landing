<template>
    <v-row>
        <v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="position: relative;"
		>
			<img
				src="@/assets/img/gym_virtual/register-4.png"
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
        <v-col cols="12" md="8" style="height: 100vh; overflow-y:auto;">
            <v-sheet class="mx-auto mb-5" max-width="450">
                    <v-stepper
                    non-linear
                    value="5"
                    elevation="0"
                    >
                        <v-stepper-header>
                            <v-stepper-step
                            step="1"
                            complete
                            ></v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                            step="2"
                            complete
                            ></v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step 
                            step="3"
                            complete
                            ></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step 
                            step="4"
                            complete
                            ></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step 
                            step="5"
                            ></v-stepper-step>
                        </v-stepper-header>
                    </v-stepper>
                </v-sheet>
            <h1 class="title_pink mb-4">Realizar pago</h1>
            <v-sheet max-width="500" class="mx-auto">
                <v-card elevation="0" class="pa-5">
                    <div class="mt-2 mb-2 d-flex">
                        <stripe-checkout
                            ref="checkoutRef"
                            mode="subscription"
                            :pk="publishableKey"
                            :line-items="lineItems"
                            :success-url="successURL"
                            :cancel-url="cancelURL"
                            @loading="v => loading = v"
                        />
                        <button @click="submit">Subscribe!</button>
                    </div>
                </v-card>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
import axios from "axios";
import API from "../../api/axios";
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
    components: { 
        axios,
        StripeCheckout
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

        loading: false,
        publishableKey: "pk_test_51QNKpFBlXSdF8U4GkdWvPXphGUVjMG2bpAutMe0wGRztDCSpFrP0uwfnqsUZLTsCulJd6m6cWSPMxNtuejj5LqCC00K1EHim3Y",
        lineItems: [
            {
                price: 'price_1QNKrbBlXSdF8U4GSR6qi5IE', // The id of the recurring price you created in your Stripe dashboard
                quantity: 1,
            },
        ],
        successURL: 'https://bytesoluciones.com/vikinga.php',
        cancelURL: 'https://bytesoluciones.com/vikinga2.php',
    }),

    
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.hash;
        vm.getOrder();
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
                const data_auth = await this.$API.payme.authTransaction(vm.selected_card);
                let auth_resul = data_auth.data;

                let datos_upd = {};
                datos_upd.hash_order = vm.slug;
                
                this.$router.push({ path: '/resultado-pago/'+vm.slug });


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

        submit () {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
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