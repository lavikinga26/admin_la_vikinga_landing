<template>
	<v-container>
		<div class="col-md-12">
			<p class="text_title_white text_entrena">Cancelar Trial</p>
		</div>
		<v-row>
			<v-col
				v-if="view === 'cards'"
				cols="12"
				md="12"
				class="d-none d-md-flex d-sm-none fade-slide"
				style="position: relative;"
			>
				<div class="card-container">
					<h2 class="trial-title">AÚN ESTÁS EN PERÍODO DE PRUEBA</h2>

					<div class="card green-border">
						<div class="card-content">
							<div class="text-section">
								<p class="card-title">Actualiza tu plan actual</p>
								<p class="price">S/120<span class="per-month">/MES</span></p>
							</div>
							<button class="button button-green" @click="goToPlanConfirmation">
								MEJORAR PLAN
							</button>
						</div>
					</div>

					<div class="card green-border">
						<div class="card-content">
							<div class="text-section">
								<p class="card-title">Te quedan 3 días de prueba</p>
								<p class="subtitle">Necesito más tiempo para decidir</p>
							</div>
							<button
								class="button button-green-outline"
								@click="goToExtensionConfirmation"
							>
								EXTENDER PRUEBA
							</button>
						</div>
					</div>

					<div>
						<button class="button disabled">CANCELAR PRUEBA GRATUITA</button>
					</div>
				</div>
			</v-col>

			<v-col
				v-if="view === 'confirmation-plan'"
				cols="12"
				md="12"
				class="d-none d-md-flex d-sm-none fade-slide"
				style="position: relative;"
			>
				<div class="confirmation-card">
					<h2 class="congrats">¡FELICIDADES!</h2>
					<p class="message">
						Tu plan ha sido actualizado con éxito, el próximo cobro se realizará
						el día <strong>10/12/2024</strong> por un monto de
						<strong>S/75</strong> correspondiente al plan anual.
					</p>
					<button class="button dark">FINALIZAR</button>
				</div>
			</v-col>

			<v-col
				v-if="view === 'confirmation-extension'"
				cols="12"
				md="12"
				class="d-none d-md-flex d-sm-none fade-slide"
				style="position: relative;"
			>
				<div class="confirmation-card">
					<h2 class="congrats">¡SIGUE DISFRUTANDO!</h2>
					<p class="message">
						Has obtenido 7 días más de prueba, luego del
						<strong>17/10/2024</strong> se realizará el cobro por un monto de
						<strong>S/93</strong> correspondiente al plan mensual.
					</p>
					<button class="button dark">FINALIZAR</button>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	data() {
		return {
			view: "cards", // puede ser: 'cards', 'confirmation-plan', 'confirmation-extension'
		};
	},
	methods: {
		goToPlanConfirmation() {
			this.view = "confirmation-plan";
		},
		goToExtensionConfirmation() {
			this.view = "confirmation-extension";
		},
	},
};
</script>

<style>
hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid #ccc;
	margin: 1em 0;
	padding: 0;
}
</style>

<style scoped>
.card-container {
	background: #ffffff;
	border-radius: 20px;
	padding: 24px;
	max-width: 800px;
	margin: auto;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
	font-family: "MachProCondBold", sans-serif;
}

.trial-title {
	color: #e7004c;
	font-size: 24px;
	text-align: left;
	font-weight: bold;
	margin-bottom: 24px;
	text-transform: uppercase;
}

.card {
	border-radius: 12px;
	padding: 16px;
	margin-bottom: 16px;
}

.green-border {
	border: 2px solid #44bd5e;
}

.card-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.text-section {
	max-width: 70%;
}

.card-title {
	font-size: 16px;
	font-weight: bold;
	margin: 0;
	color: #000;
}

.subtitle {
	font-size: 14px;
	color: #555;
	margin: 4px 0 0;
}

.price {
	color: #44bd5e;
	font-size: 24px;
	font-weight: bold;
	margin: 0;
}

.per-month {
	font-size: 16px;
	margin-left: 4px;
}

.button {
	border: none;
	border-radius: 8px;
	font-size: 16px;
	padding: 10px 16px;
	font-weight: bold;
	font-family: "MachProCondBold", sans-serif;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
}

.button-green {
	background-color: #44bd5e;
	border: 2px solid #44bd5e;
	color: white;
}

.button-green-outline {
	background-color: transparent;
	border: 2px solid #44bd5e;
	color: #44bd5e;
}

.disabled {
	text-align: center;
	opacity: 0.8;
	font-size: 24px;
}

.button.disabled {
	background: none;
	border: none;
	color: #d9d9d9;
	cursor: not-allowed;
	border: 2px solid #d9d9d9;
}

.confirmation-card {
	background-color: #ffffff;
	padding: 32px 24px;
	border-radius: 20px;
	text-align: center;
	max-width: 450px;
	margin: auto;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
}

.congrats {
	color: #e7004c;
	font-size: 40px;
	margin-bottom: 16px;
	text-transform: uppercase;
	font-family: "MachProCondBold", sans-serif;
}

.message {
	color: #000;
	font-size: 16px;
	line-height: 1.5;
	margin-bottom: 24px;
}

.message strong {
	font-weight: bold;
}

.button.dark {
	background-color: #0d1e3f;
	color: white;
	padding: 12px 24px;
	border: none;
	border-radius: 12px;
	font-family: "MachProCondBold", sans-serif;
	font-size: 24px;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out;
}

.button.dark:hover {
	background-color: #09152e;
}
</style>
