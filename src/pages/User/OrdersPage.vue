<template>
	<div class="bg_blue">
		<v-container>
			<div class="col-md-12">
				<p class="tit_h1_pink text_entrena">MI CUENTA</p>
			</div>
			<v-tabs
				v-model="userProfileTabs"
				:show-arrows="false"
				color="#E30E4F"
				background-color="transparent"
				dark
			>
				<v-tab to="#mi-cuenta">MI CUENTA</v-tab>
				<v-tab to="#mis-planes">MIS PLANES</v-tab>
				<v-tab to="#mis-ordenes">MIS ORDENES</v-tab>
				<v-tab to="#medios-pago">MEDIOS DE PAGO</v-tab>
			</v-tabs>
			<v-tabs-items v-model="userProfileTabs" id="custom-tab-items">
				<v-tab-item value="mi-cuenta">
					<div class="my-5">
						<v-card class="my-10 rounded-xl pa-10">
							<v-card-title
								class="tit_h1_staff_pink text_entrena txt_uppercase mb-6"
							>
								SEGURIDAD
							</v-card-title>
							<v-row class="px-5">
								<v-col>
									<div class="mb-2">
										<v-form
											ref="form_change_password"
											v-model="isChangePasswordFormValid"
											lazy-validation
										>
											<h3 class="mt-1">Cambiar mi contraseña</h3>
											<div class="subtitle mb-2">
												Aquí podrás cambiar tu contraseña para acceder a tu
												cuenta
											</div>

											<v-row no-gutters>
												<v-col cols="12" md="6">
													<div class="d-flex flex-column">
														<v-text-field
															v-model="last_password"
															:append-icon="
																showLastPassword ? 'mdi-eye' : 'mdi-eye-off'
															"
															:rules="[rules.required]"
															:type="showLastPassword ? 'text' : 'password'"
															:error="error"
															:error-messages="errorMessages"
															name="password"
															label="Contraseña Anterior"
															@click:append="
																showLastPassword = !showLastPassword
															"
														></v-text-field>

														<v-text-field
															v-model="new_password"
															:append-icon="
																showNewPassword ? 'mdi-eye' : 'mdi-eye-off'
															"
															:rules="[rules.required]"
															:type="showNewPassword ? 'text' : 'password'"
															:error="error"
															:error-messages="errorMessages"
															name="password"
															label="Nueva contraseña (min. 8 caracteres)"
															@click:append="showNewPassword = !showNewPassword"
														></v-text-field>

														<v-text-field
															v-model="new_password_confirm"
															:rules="pwdConfirm"
															:error="error"
															:error-messages="errorMessages"
															type="password"
															name="password"
															label="Confirmar contraseña (min. 8 caracteres)"
														></v-text-field>
													</div>
												</v-col>
											</v-row>

											<v-btn
												color="blue-grey darken-4"
												class="mt-2 mb-2"
												@click="submitChangePassword"
												:loading="loadingChangePassword"
												outlined
											>
												<v-icon left small>mdi-lock-reset</v-icon>
												Cambiar contraseña
											</v-btn>
										</v-form>
									</div>
								</v-col>
							</v-row>
						</v-card>
					</div>
				</v-tab-item>

				<v-tab-item value="mis-planes">
					<div class="my-5">
						<v-card class="my-10 rounded-xl pa-10">
							<v-card-title
								class="tit_h1_staff_pink text_entrena txt_uppercase mb-6"
							>
								MIS PLANES
							</v-card-title>
							<v-row class="px-5">
								<v-col>
									<div class="mb-2">
										<v-simple-table>
											<template v-slot:default>
												<thead>
													<tr>
														<th class="text-left">
															Plan
														</th>
														<th class="text-left">
															Fecha de Inicio
														</th>
														<th class="text-left">
															Fecha de Expiración
														</th>
														<th class="text-left">
															Fecha de Pago/Renovación
														</th>
														<th class="text-left">
															Monto
														</th>
														<th class="text-center">
															Estado
														</th>
														<th class="text-center">
															Renovación Automática
														</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													<tr
														v-for="(item, key) in user.plans"
														:key="'plan_' + key"
													>
														<td>{{ item.name }}</td>
														<td>{{ item.init_date | formatDate }}</td>
														<td>{{ item.expiration_date | formatDate }}</td>
														<td v-if="item.fecha_prox_renovacion != null">
															{{ item.fecha_prox_renovacion | formatDate }}
														</td>
														<td v-if="item.fecha_prox_renovacion == null">-</td>
														<td class="text-center">
															<v-chip
																class="ma-2"
																small
																:color="item.status ? 'success' : 'error'"
															>
																{{ item.status ? "Vigente" : "Expirado" }}
															</v-chip>
														</td>
														<td class="text-center">
															{{ item.renovacion_automatica ? "Activa" : "-" }}
														</td>
														<td>
															<v-btn
																@click="
																	cancelMembership(
																		item.id_suscripcion,
																		item.id_partner
																	)
																"
																small
																class="mx-2"
																color="error"
															>
																<v-icon dark small>
																	mdi-cancel
																</v-icon>
																Cancelar
															</v-btn>
															<!--<v-btn
																@click="
																	showDeleteDialog(
																		item.id_suscripcion,
																		item.id_partner,
																		item.expiration_date
																	)
																"
																small
																class="mx-2"
																color="error"
															>
																<v-icon dark small>
																	mdi-cancel
																</v-icon>
																Cancelar
															</v-btn>-->
														</td>
													</tr>
												</tbody>
											</template>
										</v-simple-table>
									</div>
								</v-col>
							</v-row>
						</v-card>
						<v-dialog v-model="dialogDelete" max-width="500px">
							<v-card>
								<v-card-title>Cancelar Suscripción</v-card-title>
								<v-card-text
									>Estas a punto de cancelar la renovación automatica de tu
									plan. Luego del {{ exp_date_pop | formatDate }} no tendrás más
									acceso a la plataforma. <br /><br />
									Si deseas, puedes dejar un comentario explicando el motivo de
									la cancelación: <br /><br />
									<v-text-field
										label="Motivo de cancelación"
										v-model="cancel_suscrip"
									></v-text-field>
									¿Estás seguro?
								</v-card-text>
								<v-card-actions>
									<v-btn color="error" text @click="dialogDelete = false"
										><v-icon dark small>
											mdi-close
										</v-icon>
										No</v-btn
									>
									<v-btn color="success" text @click="cancelarSuscripcion()"
										><v-icon dark small>
											mdi-check
										</v-icon>
										Si</v-btn
									>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</div>
				</v-tab-item>

				<v-tab-item value="mis-ordenes">
					<div class="my-2">
						<v-card
							class="my-10 rounded-xl pa-10 orders-main-container"
							:loading="loading"
						>
							<template slot="progress">
								<v-progress-linear
									color="deep-purple"
									height="10"
									indeterminate
								></v-progress-linear>
							</template>
							<v-card-title
								class="tit_h1_staff_pink text_entrena txt_uppercase mb-6"
							>
								MIS ORDENES
							</v-card-title>
							<v-card-text class="orders-container" v-if="hasOrders">
								<v-card
									v-for="(order, i) in orders"
									:key="i"
									class="order-card elevation-2"
								>
									<v-card-title
										style="color: black"
										class="d-flex flex-row justify-space-between"
									>
										<span>
											{{ order.created_at.split("T")[0] }}
										</span>

										<v-chip
											class="ma-2"
											:color="getColor(order.order_status.id)"
											label
											text-color="white"
										>
											{{ order.order_status.name }}
											<v-icon class="ml-1">
												{{ getIcon(order.order_status.id) }}
											</v-icon>
										</v-chip>
									</v-card-title>
									<v-card-text class="d-flex flex-column">
										<v-row>
											<v-col cols="12" sm="12" md="12">
												<v-text-field
													readonly
													background-color="white lighten-5"
													outlined
													label="Metodo de pago"
													hide-details="auto"
													:value="order.payment_method.name"
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="6" md="6">
												<v-text-field
													readonly
													background-color="white lighten-5"
													outlined
													label="Subtotal"
													hide-details="auto"
													:value="order.subtotal"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="6">
												<v-text-field
													readonly
													hide-details="auto"
													background-color="white lighten-5"
													outlined
													label="IGV"
													:value="order.igv"
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12" sm="12" md="12">
												<v-text-field
													readonly
													background-color="white lighten-5"
													outlined
													label="Total"
													:value="order.total"
												></v-text-field>
											</v-col>
										</v-row>
										<div
											class="
                        d-flex
                        flex-row
                        justify-space-between
                        align-center
                        footer
                      "
										>
											<!--<v-chip
                        class="ma-2"
                        :color="getColor(order.order_status.id)"
                        label
                        text-color="white"
                      >
                        {{ order.order_status.name }}
                        <v-icon class="ml-1">
                          {{ getIcon(order.order_status.id) }}
                        </v-icon>
                      </v-chip>-->

											<v-btn
												depressed
												color="primary"
												@click="openDetails(order)"
											>
												Detalles
												<v-icon class="ml-2"> mdi-eye </v-icon>
											</v-btn>
											<v-btn
												depressed
												link
												:to="'/confirmar-pago/' + order.hash"
												color="green"
												v-if="
													order.order_status.id == 5 &&
														order.id_payment_method == 2
												"
											>
												Pagar
												<v-icon class="ml-2"> mdi-check-circle </v-icon>
											</v-btn>

											<v-btn
												depressed
												link
												:to="'/pago-payme/' + order.hash"
												color="green"
												v-else-if="
													order.order_status.id == 5 &&
														order.id_payment_method == 1
												"
											>
												Pagar
												<v-icon class="ml-2"> mdi-check-circle </v-icon>
											</v-btn>

											<a
												v-else-if="
													order.order_status.id == 1 && order.invoice != null
												"
												:href="
													'https://lavikinga.bytesoluciones.net/print/document/' +
														order.invoice.external_id +
														'/a4'
												"
												style="text-decoration:none;"
												target="_blank"
												rel="invoice"
											>
												<v-btn depressed color="green">
													{{
														order.invoice.had_invoice == 0
															? "Boleta"
															: "Factura"
													}}
													<v-icon class="ml-2"> mdi-file </v-icon>
												</v-btn>
											</a>
										</div>
									</v-card-text>
								</v-card>
							</v-card-text>
							<v-card-text v-else>
								<p>
									<strong> No existen aún ordenes. </strong>
								</p>
							</v-card-text>
							<v-card-actions class="d-flex justify-center" v-if="hasOrders">
								<div>
									<v-pagination v-model="page" :length="total"></v-pagination>
								</div>
							</v-card-actions>
						</v-card>

						<v-dialog v-model="dialog" max-width="900">
							<v-card>
								<v-card-title
									class="d-flex flex-row justify-space-between align-center"
								>
									<strong>Orden #{{ selectedOrder.id }}</strong>

									<v-chip
										class="ma-2"
										:color="getColor(selectedOrder.order_status)"
										label
										text-color="white"
									>
										{{ selectedOrder.order_status_name }}
										<v-icon class="ml-2">
											{{ getIcon(selectedOrder.order_status) }}
										</v-icon>
									</v-chip>
								</v-card-title>
								<v-card-text>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												readonly
												background-color="white lighten-5"
												outlined
												label="Metodo de pago"
												hide-details="auto"
												:value="selectedOrder.payment_method"
											></v-text-field>
										</v-col>
									</v-row>

									<v-row>
										<v-col>
											<v-data-table
												:headers="headers"
												:items="selectedOrder.detail"
												:hide-default-header="false"
												:hide-default-footer="true"
												class="elevation-1"
											></v-data-table>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="12" sm="6" md="6">
											<v-text-field
												readonly
												background-color="white lighten-5"
												outlined
												label="Descuento"
												hide-details="auto"
												:value="selectedOrder.descuento"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="6">
											<v-text-field
												readonly
												background-color="white lighten-5"
												outlined
												label="Subtotal"
												hide-details="auto"
												:value="selectedOrder.subtotal"
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="12" sm="6" md="6">
											<v-text-field
												readonly
												background-color="white lighten-5"
												outlined
												label="IGV"
												hide-details="auto"
												:value="selectedOrder.igv"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="6">
											<v-text-field
												readonly
												background-color="white lighten-5"
												outlined
												label="TOTAL"
												hide-details="auto"
												:value="selectedOrder.total"
											></v-text-field>
										</v-col>
									</v-row>
								</v-card-text>
								<v-card-actions class="d-flex flex-wrap justify-end">
									<v-btn depressed color="primary" @click="dialog = false">
										Cerrar
										<v-icon class="ml-2"> mdi-close-circle </v-icon>
									</v-btn>

									<v-btn
										depressed
										link
										:to="'/pago-payme/' + selectedOrder.hash"
										color="green"
										v-if="
											selectedOrder.order_status == 5 &&
												selectedOrder.payment_method_id == 1
										"
									>
										Pagar
										<v-icon class="ml-2"> mdi-check-circle </v-icon>
									</v-btn>
									<v-btn
										depressed
										link
										:to="'/confirmar-pago/' + selectedOrder.hash"
										color="green"
										v-else-if="
											selectedOrder.order_status == 1 &&
												selectedOrder.payment_method_id == 1
										"
									>
										Pagar
										<v-icon class="ml-2"> mdi-check-circle </v-icon>
									</v-btn>
									<a
										v-else-if="
											selectedOrder.order_status == 1 &&
												selectedOrder.invoice_external_id != null
										"
										:href="
											'https://lavikinga.bytesoluciones.net/print/document/' +
												selectedOrder.invoice_external_id +
												'/a4'
										"
										style="text-decoration:none;"
										target="_blank"
										rel="invoice"
									>
										<v-btn depressed color="green">
											{{
												selectedOrder.had_invoice == 0 ? "Boleta" : "Factura"
											}}
											<v-icon class="ml-2"> mdi-file </v-icon>
										</v-btn>
									</a>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</div>
				</v-tab-item>
				<v-tab-item value="medios-pago">
					<div class="my-5">
						<v-card class="my-10 rounded-xl pa-10">
							<v-card-title
								class="tit_h1_staff_pink text_entrena txt_uppercase mb-6"
							>
								MEDIOS DE PAGO
							</v-card-title>
							<v-row class="px-5">
								<v-col>
									<div class="mb-2">
										<v-simple-table>
											<template v-slot:default>
												<thead>
													<tr>
														<th class="text-left">
															Tipo
														</th>
														<th class="text-left">
															Ult. Dígitos
														</th>
														<th class="text-center">
															Predeterminada
														</th>
														<th class="text-center">
															Acciones
														</th>
													</tr>
												</thead>
												<tbody>
													<tr
														v-for="(item, key) in user_cards"
														:key="'card_' + key"
													>
														<td>
															<img
																style="max-width: 40px"
																src="@/assets/img/icons/visa.png"
																v-if="item.card_brand == 'Visa'"
															/>
															<img
																style="max-width: 40px"
																src="@/assets/img/icons/mastercard.png"
																v-if="item.card_brand == 'Mastercard'"
															/>
															<img
																style="max-width: 40px"
																src="@/assets/img/icons/amex.png"
																v-if="item.card_brand == 'Amex'"
															/>
														</td>
														<td>**** {{ item.last_pan }}</td>
														<td style="text-align: center;">
															<v-badge
																color="success"
																content="Si"
																inline
																v-if="item.predeterminada == 1"
															></v-badge>
															<v-badge
																color="error"
																content="No"
																inline
																v-if="item.predeterminada == 0"
															></v-badge>
														</td>
														<td class="text-center">
															<v-btn
																@click="deleteCard(item.id_card)"
																class="mx-2"
																fab
																dark
																small
																color="error"
															>
																<v-icon dark>
																	mdi-delete
																</v-icon>
															</v-btn>
														</td>
													</tr>
												</tbody>
											</template>
										</v-simple-table>
									</div>
								</v-col>
								<v-col>
									<v-row class="px-5">
										<v-col>
											<p class="text-center">
												Si lo prefieres, también puedes añadir una nueva tarjeta
												pulsando el botón de abajo:<br /><br />
												<v-btn
													@click="openTarjetaAdd()"
													class="mx-2"
													color="error"
													v-if="show_btn_add == true"
												>
													<v-icon dark>
														mdi-plus
													</v-icon>
													Nueva Tarjeta
												</v-btn>
											</p>
											<div class="d-flex">
												<div id="demo" class="d-flex"></div>
											</div>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-card>
					</div>
				</v-tab-item>
			</v-tabs-items>

			<v-snackbar
				v-model="toast.toast"
				:timeout="toast.timeout"
				:color="toast.color"
				dark
			>
				{{ toast.message }}
			</v-snackbar>
		</v-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userProfileTabs: 0,
			user: {},
			orders: [],
			dialogDelete: false,
			selectedOrder: {
				detail: [],
				payment_method: "",
				payment_method_id: "",
				order_status: 0,
				order_status_name: 0,
				id: "",
				descuento: 0,
				total: 0,
				subtotal: 0,
				igv: 0,
				hash: "",
				invoice_external_id: "",
				had_invoice: "",
			},
			hasOrders: true,
			dialog: false,
			exp_date_pop: null,
			headers: [
				{
					text: "ID",
					align: "start",
					value: "id",
					sortable: false,
				},
				{ text: "Detalles", value: "product_name", sortable: false },
				{ text: "Precio", value: "price", sortable: false },
				{ text: "Cantidad", value: "quantity", sortable: false },
				{ text: "Precio total", value: "price_total", sortable: false },
			],
			page: 1,
			total: 0,
			loading: false,
			user_cards: [],
			// form error
			error: false,
			errorMessages: "",
			show_btn_add: true,
			// show password field
			showLastPassword: false,
			showNewPassword: false,
			loadingChangePassword: false,

			isChangePasswordFormValid: true,
			last_password: "",
			new_password: "",
			new_password_confirm: "",
			// input rules
			rules: {
				required: (value) => !!value || "Este campo es requerido",
				only_numbers: this.$UTILS.rules.only_numbers,
			},

			pwdRules: [(v) => !!v || "Este campo es requerido"],
			pwdConfirm: [
				(v) => !!v || "Este campo es requerido",
				(v) => v === this.new_password || "Contraseñas no coinciden",
			],

			toast: {
				toast: false,
				message: "",
				timeout: 3000,
				color: "success",
			},
			del_id_susc: null,
			del_id_part: null,
			cancel_suscrip: "",
		};
	},
	mounted() {
		this.getPartnerData().then(() => this.getOrdersByUser());
		this.getCards();
		/** Importamos Pay-me */
		let paymeScript = document.createElement("script");
		paymeScript.setAttribute(
			"src",
			"https://d23b52o2im4p82.cloudfront.net/flex-capture.min.js"
		);
		document.head.appendChild(paymeScript);
	},
	watch: {
		page(current, old) {
			this.getOrdersByUser(current);
		},
	},
	methods: {
		showToast(msg, color) {
			this.toast.color = color;
			this.toast.message = msg;
			this.toast.toast = true;
		},

		openDetails(order) {
			this.selectedOrder.detail = order.detail;
			this.selectedOrder.order_status = order.order_status.id;
			this.selectedOrder.order_status_name = order.order_status.name;
			this.selectedOrder.id = order.id;
			this.selectedOrder.payment_method = order.payment_method.name;
			this.selectedOrder.descuento = order.discount;
			this.selectedOrder.subtotal = order.subtotal;
			this.selectedOrder.total = order.total;
			this.selectedOrder.hash = order.hash;
			this.selectedOrder.payment_method_id = order.id_payment_method;
			this.selectedOrder.igv = order.igv;

			this.selectedOrder.invoice_external_id =
				order.invoice == null ? null : order.invoice.external_id;
			this.selectedOrder.had_invoice =
				order.invoice == null ? null : order.invoice.had_invoice;

			this.dialog = true;
		},
		async getPartnerData(id) {
			this.$store.commit("loader", true);
			try {
				const response = await this.$API.auth.auth(id);
				this.user = response.data;
				this.$store.commit("loader", false);
			} catch (e) {
				this.$store.commit("loader", false);
				console.error(e);
			}
		},
		async getOrdersByUser(page = 1) {
			try {
				this.loading = true;
				const response = await this.$API.order.getOrdersByUser(
					this.user.id,
					page
				);
				this.orders = response.data.data.orders.data;
				this.total = response.data.data.orders.last_page;
				this.hasOrders = response.data.data.orders.total != 0 ? true : false;
				this.loading = false;
			} catch (e) {
				console.error(e);
			}
		},
		submitChangePassword() {
			if (this.$refs.form_change_password.validate()) {
				this.changePassword();
			} else {
				return;
			}
		},

		getIcon(status) {
			let color = null;
			switch (status) {
				case 1:
					color = "mdi-check";
					break;
				case 2:
					color = "mdi-close-circle";
					break;
				case 3:
					color = "mdi-delete";
					break;
				case 4:
					color = "mdi-clock";
					break;
				case 5:
					color = "mdi-cash-multiple";
					break;
			}
			return color;
		},
		getColor(status) {
			let color = null;
			switch (status) {
				case 1:
					color = "green";
					break;
				case 2:
					color = "red";
					break;
				case 3:
					color = "gray";
					break;
				case 4:
					color = "secondary";
					break;
				case 5:
					color = "orange";
					break;
			}
			return color;
		},
		showDeleteDialog(id_suscripcion, id_partner, fecha_venc) {
			this.dialogDelete = true;
			this.exp_date_pop = fecha_venc;
			this.del_id_susc = id_suscripcion;
			this.del_id_part = id_partner;
		},
		async changePassword() {
			let vm = this;
			this.$store.commit("loader", true);
			try {
				vm.loadingChangePassword = true;
				let data = {
					old_password: vm.last_password,
					new_password: vm.new_password,
				};
				await this.$API.auth.change_password(data);
				vm.loadingChangePassword = false;

				this.$refs.form_change_password.reset();
				this.$store.commit("loader", false);
				this.showToast("Contraseña Restablecida", "success");
			} catch (error) {
				vm.loadingChangePassword = false;
				let err = {
					status: error.response.status,
					name: error.name,
					data: error.response.data,
					message: error.message,
				};
				vm.last_password = "";
				vm.new_password = "";
				vm.new_password_confirm = "";
				this.showToast(
					error.response.data.message + ". Vuelve a intentarlo",
					"error"
				);
				this.$store.commit("loader", false);
			}
		},
		async getCards() {
			try {
				this.loading = true;
				const response = await this.$API.business_partner.getCards();
				this.user_cards = response.data.data;
				this.loading = false;
			} catch (e) {
				console.error(e);
			}
		},

		async deleteCard(id) {
			try {
				this.loading = true;
				const response = await this.$API.business_partner.deleteCard(id);
				this.loading = false;
				this.showToast("Tarjeta eliminada correctamente!", "success");
				this.getCards();
			} catch (e) {
				console.error(e);
			}
		},

		cancelMembership(id_suscription) {
			let suscription = this.$UTILS.chrypter.encode(id_suscription);
			this.$router.push({
				path: "/cuenta/cancelar-membresia?sub=" + suscription,
			});
		},
		async cancelarSuscripcion() {
			try {
				this.$store.commit("loader", true);
				this.dialogDelete = false;
				if (this.cancel_suscrip == "") this.cancel_suscrip = "-";
				const response = await this.$API.business_partner.cancelSuscription(
					this.del_id_susc,
					this.cancel_suscrip
				);
				this.$store.commit("loader", false);
				this.showToast("Suscripción cancelada correctamente!", "success");

				this.getPartnerData(this.del_id_part);
			} catch (e) {
				console.error(e);
			}
		},
		async reqCallback(response) {
			try {
				let vm = this;

				this.card_data = response;
				//console.log(this.card_data);
				this.card_data.id_user = this.user.bp_id;
				const data = await this.$API.payme.saveToken(this.card_data);

				let token_resul = data.data.data;

				if (token_resul.success == true) {
					vm.$store.commit("loader", false);
					this.showToast("Tarjeta guardada correctamente!", "success");
					this.getCards();
				} else {
					alert("Error al generar token.");
					vm.$store.commit("loader", false);
				}
			} catch (e) {
				//this.$store.commit('loader',false);
				console.error(e);
			}
		},
		startCallback() {
			let vm = this;
			vm.$store.commit("loader", true);
			//console.log("-------Click en pagar-------");
		},

		errorOnPayCallback() {
			//console.log("-------Error al momento pagar-------");
		},
		abrirPayme() {
			this.selected_card = 0;
			var tokenRequest = {
				action: "tokenize",
				transaction: {
					meta: {
						internal_operation_number: Math.floor(Date.now())
							.toString()
							.substring(7),
						additional_fields: {
							user_id: this.user.id,
						},
					},
				},
				card_holder: [
					{
						first_name: this.user.name,
						last_name: this.user.lastname,
						email_address: this.user.email,
						identity_document_country: "PER",
						identity_document_type: "DNI",
						identity_document_identifier: this.user.nro_doc,
					},
				],
			};

			//console.log(tokenRequest);

			var token_key =
				"TvqvXinCnJKvnuHfYRReHlHevWHLL8YXOT38HxvOfWgUaN2gcgxi86xlr6J3YbXB";

			var capture = new FlexCapture({
				key: token_key,
				payload: tokenRequest,
				additionalFields: [],
			});

			capture.init(
				document.querySelector("#demo"),
				this.reqCallback,
				this.startCallback,
				this.errorOnPayCallback
			);
		},
		openTarjetaAdd() {
			this.show_btn_add = false;
			this.abrirPayme();
		},
	},
};
</script>
<style lang="scss" scoped>
#custom-tab-items {
	background-color: transparent !important;
	padding: 0px 0px !important;
}
.orders-container {
	display: grid;
	gap: 2rem;
	grid-auto-rows: 25rem;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	@media (max-width: 600px) {
		grid-auto-rows: 30rem;
		grid-template-columns: 100%;
	}
}
.order-card {
	//background: linear-gradient( 347deg, #0b152a 0%, #0d1b37 100%);
	background-color: #ffff;
	color: #0000;
	border-radius: 20px;
	height: 100%;
	width: 100%;
	p {
		color: #000;
	}
}
@media (max-width: 600px) {
	.footer {
		span {
			margin-left: 0px !important;
		}
	}
	.orders-main-container {
		padding: 0px !important;
	}
}
</style>
