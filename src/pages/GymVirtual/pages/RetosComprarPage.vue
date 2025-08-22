<template>
	<div>
		<v-container class="mb-5" v-if="has_active_plan === false">
			<v-row class="text-center">
				<v-col cols="12" v-if="show_message_plan === true">
					<h1 class="text-center text_box_title" style="margin-top: 10%;">
						Ups! No cuentas con ningún plan activo!
					</h1>
					<v-btn
						class="text_btn_white_title mt-5"
						color="secondary"
						@click="gohome"
						>Renovar/adquirir plan</v-btn
					>
				</v-col>
			</v-row>
		</v-container>
		<v-container class="pa-10" v-if="has_active_plan === true">
			<v-row>
				<v-col>
					<h1 class="text_plan_title_white mb-6">Retos</h1>
				</v-col>
			</v-row>

			<v-row
				style="border: 2px solid #293E58; border-radius: 16px;margin-bottom: 10px;"
			>
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
							:src="require('@/assets/img/gym_virtual/poto_en_la_nuca.jpg')"
							class="grayscale-img"
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
							<v-icon size="48" color="white">mdi-lock</v-icon>
							<h1 class="mt-4 text_box_gym_sm" style="text-align: left;">
								S/ {{ item.price_pen }}
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
		</v-container>
		<v-snackbar
			v-model="toast.toast"
			:timeout="toast.timeout"
			:color="toast.color"
			dark
		>
			{{ toast.message }}
		</v-snackbar>
		<v-dialog
			transition="dialog-bottom-transition"
			max-width="800"
			v-model="dialogPlayer"
		>
			<v-card>
				<v-card-text
					class="text-center d-flex align-center pt-10 justify-center"
					v-if="dialogPlayer"
				>
					<iframe
						:src="now_playing"
						width="800"
						height="328"
						frameborder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowfullscreen
					></iframe>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn text @click="dialogPlayer = false">Cerrar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
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
	}),
	mounted() {
		this.auth();
		this.getDownloads();
	},
	computed: {},
	created() {
		Array.prototype.groupBy = function(field) {
			let groupedArr = [];
			this.forEach(function(e) {
				//look for an existent group
				let group = groupedArr.find((g) => g["field"] === e[field]);
				if (group == undefined) {
					//add new group if it doesn't exist
					group = { field: e[field], groupList: [] };
					groupedArr.push(group);
				}
				//add the element to the group
				group.groupList.push(e);
			});

			return groupedArr;
		};
	},
	methods: {
		async auth() {
			let vm = this;
			try {
				const response = await this.$API.auth.auth();
				this.user = response.data;

				this.userPlans = response.data.plans;
				let fecha_actual = new Date();

				this.userPlans.map(function(item) {
					let init_d = new Date(item.init_date);
					let end_d = new Date(item.expiration_date);
					if (
						fecha_actual <= new Date(item.expiration_date) &&
						vm.has_active_plan == false
					) {
						vm.has_active_plan = true;
					}
				});
				vm.show_message_plan = vm.has_active_plan === true ? false : true;
			} catch (e) {
				localStorage.removeItem("user_data");
				localStorage.removeItem("token");
				window.location.replace("/auth/iniciar-sesion");
			}
		},
		showReto(reto) {
			let index = reto + 1;
		},

		async getDownloads() {
			this.$store.commit("loader", true);
			try {
				const response = await this.$API.business_partner.getRetosComprar();

				this.retos_list = response.data;

				this.groupList = this.retos_list;
				this.$store.commit("loader", false);
			} catch (e) {
				this.$store.commit("loader", false);
				console.error(e);
			}
		},
		openPlayer(video_link) {
			this.now_playing = video_link;
			this.dialogPlayer = true;
		},
		openLink(link) {
			window.open(link, "_blank");
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
	background-color: rgba(10, 34, 64, 0.6);
	z-index: 2;
	border-radius: 16px;
}

.absolute-title {
	position: absolute;
	top: 20px;
	width: 100%;
	z-index: 3;
}
</style>
