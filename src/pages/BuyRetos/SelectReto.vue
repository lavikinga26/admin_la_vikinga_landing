<template>
	<v-row>
		<v-col
			cols="12"
			md="4"
			class="d-none d-md-flex d-sm-none"
			style="position: relative;"
		>
			<div class="py-10 px-8" style="position: absolute; top:10px">
				<h3 class="title_pink" style="text-align: left">CLASES PARA TODOS <br/>LOS gustos y niveles</h3>
				<br/>
				<p class="subtitle-white">Sin importar tu punto de partida, o que tipo de entrenamiento te guste más lo tendrás en el Desafío</p>
			</div>
			<img
				src="@/assets/img/gym_virtual/register_1_img.png"
				alt="Imagen Login"
				style="width:100%; max-height:100vh;object-fit: cover;"
			/>
			<v-sheet
				style="position: absolute; left: 0; right: 0; bottom: 5px;"
				class="mx-auto transparent"
				elevation="0"
				max-width="450"
			>
				<v-carousel cycle :show-arrows="false" hide-delimiters height="320">
					<v-carousel-item class="ma-4">
						<v-card class="rounded-lg" style="background-color: rgba(10, 34, 64, 0.6);" width="540" outlined>
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
						<v-card class="rounded-lg" style="background-color: rgba(10, 34, 64, 0.6);" width="540" outlined>
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
						<v-card class="rounded-lg" style="background-color: rgba(10, 34, 64, 0.6);" width="540" outlined>
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
		<v-col cols="12" md="8" style="height: 100vh;">
            <div class="d-flex align-center justify-center mb-4 flex-column flex-md-row">
				<h1 class="title_pink mt-4 mr-md-4 mb-3 mb-md-0">RETOS</h1>
            </div>
            <div class="d-flex align-center justify-center mb-4 flex-column flex-md-row">
				<div class="toggle-switch">
                    <input v-model="currency" type="checkbox" id="switch" v-on:change="updCurrency()"/>
                    <label for="switch" class="switch-label">
                        <span class="switch-inner"></span>
                        <span class="switch-text-on">SOL</span>
                        <span class="switch-text-off">USD</span>
                    </label>
                </div>
            </div>
            <v-row class="mx-auto mb-4">
				<v-col
					v-for="(item, indx) in groupList"
					:key="'col_' + indx"
					cols="12"
					md="4"
				>
					<v-card
						min-height="280"
						class="box_rutina position-relative overflow-hidden"
						flat
						tile
						style="border-radius: 16px !important;"
					>
						<!-- Imagen con escala de grises -->
						<v-img
							:src="'https://apiweb.lavikingaoficial.com/storage/uploads/plan_files/' + item.img_path"
							height="280"
							cover
						></v-img>

						<!-- Título encima de la imagen -->
						<div class="absolute-title text-left white--text px-4">
							<h1 class="text_box_gym_sm_white">{{ item.name }}</h1>
							<p class="text-caption mt-1">{{ item.description }}</p>
						</div>

						<!-- Overlay oscuro + candado + botón -->
						<div
							class="overlay-dark pa-4 d-flex flex-column align-stretch justify-end"
						>
							<h1 class="mt-4 text_box_gym_sm" style="text-align: left;">
								{{ currency_id == 0 ? 'S/ ':'USD ' }} {{ currency_id == 0 ? item.price_pen:item.price_usd }}
							</h1>
							<v-btn
								color="secondary"
								class="mt-4 font-weight-bold"
								@click.stop="comprarReto(item)"
							>
								COMPRAR RETO
							</v-btn>
						</div>
					</v-card>
				</v-col>
			</v-row>
        </v-col>
	</v-row>
</template>

<script>
import moment from "moment-timezone";
import axios from "axios";

import FlipCountdown from "vue2-flip-countdown";

export default {
	components: {
		axios,
		FlipCountdown,
	},
	data: () => ({
		cabeceras: [
			{
				text: "Ejercicio",
				align: "start",
				sortable: false,
				value: "ejercicio",
			},
			{ text: "Fecha", value: "fecha" },
			{ text: "Peso (kg)", value: "peso" },
			{ text: "Comentarios", value: "comentarios" },
			{ text: "Acciones", value: "acciones" },
		],
		registrosTabla: [
			{
				ejercicio: "Back Squat",
				fecha: "01/12/2023",
				peso: 6.0,
				comentarios: "Aumentar peso proxima semana",
				acciones: "",
			},
		],
		toast: {
			toast: false,
			message: "",
			timeout: 3000,
			color: "success",
		},
		retos_list: [],
		groupList: [],
		dialogPlayer: false,
		now_playing: null,
		has_active_plan: false,
		show_message_plan: false,
		user: [],
		userPlans: [],
		userCompras: [],
		selectedReto: [],
		showPaymentForm: false,
		cart: [],
		total: 0,
		currencyId: 0,
		had_invoice: false,
		requiredRule: [(v) => !!v || "Campo obligatorio"],
		toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
		showRetos: true,
		currency: false,
		currency_id: 0,
		show_currency_sw: true,
		retosFullList: [],
	}),
	async mounted() {
		this.getDownloads();
        await this.getIpData();
		this.fetchIpData();
		//this.getCompras();
		//this.getPaymentMethods();
	},
	methods: {
		formatPrice(price) {
            // Convierte el precio a número y elimina .00 si no hay decimales significativos
            const numPrice = parseFloat(price);
            return numPrice % 1 === 0 ? numPrice.toFixed(0) : numPrice.toFixed(2);
        },
		updCurrency(){
			this.currency_id = !this.currency ? 0 : 1;
		},
		showReto(reto) {
			let index = reto + 1;
		},
		volver() {
			this.showPaymentForm = false;
			this.$store.commit("loader", true);
			const timeoutId = setTimeout(() => {
				this.showRetos = true;
				this.show_currency_sw = true;
				this.$store.commit("loader", false);
			}, 2000);
		},
		async getDownloads() {
			this.$store.commit("loader", true);
			try {
				const response = await this.$API.retos.listAll();

				this.retos_list = response.data;

				this.groupList = this.retos_list;

				console.log(this.groupList);
				this.$store.commit("loader", false);
			} catch (e) {
				this.$store.commit("loader", false);
				console.error(e);
			}
		},
		openToastAlert(open, message, color) {
            this.toast = {
                toast: open,
                message: message,
                color: color
            }
        },
        comprarReto(item) {
			this.$store.commit("loader", true);
            this.selectedReto = item;
            localStorage.removeItem("planSeleccionado");
            if(this.currency_id == 0){
                var itemv = {
                    id:item.id,
                    title: item.name,
                    price: parseFloat(item.price_pen),
                    amount: parseFloat(item.price_pen),
                    currency: "S/ ",
                    currency_id: 1,
                    code: "reto1",
                    priceCompare: parseFloat(item.price_pen),
                    priceTotal: parseFloat(item.price_pen),
                    quantity: 1
                };
                this.total = parseFloat(item.price_pen);
            }else{
                var itemv = {
                    id:item.id,
                    title: item.name,
                    price: parseFloat(item.price_usd),
                    amount: parseFloat(item.price_usd),
                    currency: "USD ",
                    currency_id: 2,
                    code: "reto1",
                    priceCompare: parseFloat(item.price_usd),
                    priceTotal: parseFloat(item.price_usd),
                    quantity: 1
                };
                this.total = parseFloat(item.price_usd);
            }
			localStorage.planSeleccionado = JSON.stringify(itemv);
            this.$store.dispatch("addItem", itemv);
            this.$router.push({ path: "/retos/step2" });
		},

        async getIpData(){
			await fetch('https://api.ipify.org?format=json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Error al obtener la IP');
				}
				return response.json();
			})
			.then(data => {
				this.dataIP = data.ip;
			})
			.catch(error => {
				console.error('Error:', error);
			});
		},
		async fetchIpData() {
            this.loading = true;
            this.error = null;
            try {
                this.ipData = this.data_config;
				if (this.ipData?.countryCode === 'PE') {
					this.currency = false;
					this.currency_id = 0;
				} else {
					this.currency = true;
					this.currency_id = 1;
				}
				
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
	},
};
</script>

<style>
.activity-class {
	background-color: #0b233f;
}

.activity-taller {
	background-color: #e30e4f;
}

.activity-descanso {
	background-color: #e9e9e9;
}

.activity-nutrition {
	background-color: #0480a4;
}

.grayscale-img {
	filter: grayscale(100%);
}

.overlay-dark {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(10, 34, 64, 0.5);
	z-index: 2;
	border-radius: 16px;
}

.absolute-title {
	position: absolute;
	top: 20px;
	width: 100%;
	z-index: 3;
}

.toggle-switch {
	position: relative;
	width: 80px;
	height: 40px;
}

input[type="checkbox"] {
	display: none;
}

.switch-label {
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
	width: 100%;
	height: 100%;
	background-color: #0a2240; /* Color para el estado OFF */
	border-radius: 20px;
	overflow: hidden;
	transition: background-color 0.3s ease;
}

.switch-inner {
	position: absolute;
	left: 4px;
	width: 32px;
	height: 32px;
	background-color: #fff;
	border-radius: 50%;
	transition: left 0.3s ease, background-color 0.3s ease;
}

.switch-text-on,
.switch-text-off {
	position: absolute;
	width: 50%;
	text-align: center;
	font-weight: bold;
	color: white;
	font-size: 12px;
}

.switch-text-on {
	left: 0;
	color: #0a2240; /* Color del texto ON */
}

.switch-text-off {
	right: 0;
	color: #fff; /* Color del texto OFF */
}

input[type="checkbox"]:checked + .switch-label {
	background-color: #0a2240; /* Color para el estado ON */
}

input[type="checkbox"]:checked + .switch-label .switch-inner {
	left: 44px; /* Ajuste para la posición al activarse */
	background-color: #fff;
}
input[type="checkbox"]:checked + .switch-label .switch-text-on {
	color: #fff; /* Color del texto ON */
}

input[type="checkbox"]:checked + .switch-label .switch-text-off {
	color: #0a2240; /* Color del texto ON */
}
</style>
