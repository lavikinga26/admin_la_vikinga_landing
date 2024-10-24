<template>
    <div>
        <v-container>
            <div class="col-md-12">
                <p class="text_title_white text_entrena">MI GYM</p>
            </div>
            <v-alert type="info" color="#E7004C" elevation="0" v-if="user_cards.length === 1">
                <b>IMPORTANTE:</b> Recuerda que para eliminar la tarjeta de crédito/débito actual, debes añadir una nueva primero.
            </v-alert>
            <v-tabs v-model="userProfileTabs" :show-arrows="false" color="#E30E4F" background-color="transparent" dark>
                <v-tab to="#tabs-info-personal">INFORMACIÓN PERSONAL</v-tab>
                <v-tab to="#tabs-info-membresia">MEMBRESÍA</v-tab>
                <v-tab to="#tabs-info-metodo">MÉTODO DE PAGO</v-tab>
            </v-tabs>
            <v-tabs-items v-model="userProfileTabs" id="custom-tab-items">
                <v-tab-item value="tabs-info-personal">
                    <profile-card
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></profile-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-membresia">
                    <v-card class="rounded-xl" color="transparent">
                        <v-card-title class="text_title_white text_entrena txt_uppercase mb-6">
                            MIS PLANES
                        </v-card-title>
                        <v-row class="px-5">
                            <v-col>
                            <div class="mb-2">
                                <v-simple-table class="tablaplanes">
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
                                    <tr v-for="(item, key) in user.plans" :key="'plan_' + key">
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.init_date | formatDate }}</td>
                                        <td>{{ item.expiration_date | formatDate }}</td>
                                        <td v-if="item.fecha_prox_renovacion != null">{{ item.fecha_prox_renovacion | formatDate }}</td>
                                        <td v-if="item.fecha_prox_renovacion == null">-</td>
                                        <td class="text-center">
                                        <v-chip class="ma-2" small :color="item.status ? 'success' : 'error'">
                                            {{ item.status ? 'Vigente' : 'Expirado' }}
                                        </v-chip>
                                        </td>
                                        <td class="text-center">

                                            {{ item.renovacion_automatica ? 'Activa' : '-' }}
            
                                        </td>
                                        <td>
                                        <v-btn @click="showDeleteDialog(item.id_suscripcion, item.id_partner, item.expiration_date)" small class="mx-2" color="error"
                                            v-if="item.renovacion_automatica == 1">
                                            <v-icon dark small>
                                            mdi-cancel
                                            </v-icon> Cancelar
                                        </v-btn>
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
                            <v-card-text>Estas a punto de cancelar la renovación automatica de tu plan. Luego del {{ exp_date_pop | formatDate }} no tendrás más acceso a la plataforma. <br/><br/>
                            Si deseas, puedes dejar un comentario explicando el motivo de la cancelación: <br/><br/>
                            <v-text-field label="Motivo de cancelación" v-model="cancel_suscrip"></v-text-field>
                            ¿Estás seguro?
                            </v-card-text>
                            <v-card-actions>
                            <v-btn color="error" text @click="dialogDelete = false"><v-icon dark small>
                                mdi-close
                            </v-icon> No</v-btn>
                            <v-btn color="success" text @click="cancelarSuscripcion()"><v-icon dark small>
                                mdi-check
                            </v-icon> Si</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                </v-tab-item>
                <v-tab-item value="tabs-info-metodo">
                    <v-card class="rounded-xl" color="transparent">
                        <v-card-title class="text_title_white text_entrena txt_uppercase">
                            MEDIOS DE PAGO
                        </v-card-title>
                        <v-row class="px-5">
                            <v-col>
                            <div class="mb-2">
                                <v-simple-table class="tablaplanes">
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
                                    <tr v-for="(item, key) in user_cards" :key="'card_' + key">
                                        <td>
                                        <img style="max-width: 40px" src="@/assets/img/icons/visa.png" v-if="item.card_brand == 'Visa'" />
                                        <img style="max-width: 40px" src="@/assets/img/icons/mastercard.png" v-if="item.card_brand == 'Mastercard'" />
                                        <img style="max-width: 40px" src="@/assets/img/icons/amex.png" v-if="item.card_brand == 'Amex'" />
                                        </td>
                                        <td>**** {{ item.last_pan }}</td>
                                        <td style="text-align: center;">
                                        <v-badge color="success" content="Si" inline v-if="item.predeterminada == 1"></v-badge>
                                        <v-badge color="error" content="No" inline v-if="item.predeterminada == 0"></v-badge>
                                        </td>
                                        <td class="text-center">
                                        <v-btn @click="deleteCard(item.id_card)" class="mx-2" fab dark small color="error" v-if="item.predeterminada == 0">
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
                                    <p class="text-center inner_text_white">
                                    Si lo prefieres, también puedes añadir una nueva tarjeta pulsando el botón de abajo:<br /><br />
                                    <v-btn @click="openTarjetaAdd()" class="mx-2 btn_outlined_pink" color="transparent" outlined v-if="show_btn_add == true">
                                        Nueva Tarjeta
                                    </v-btn></p>
                                    <div class="d-flex">
                                    <div id="demo" class="d-flex"></div>
                                    </div>
                                </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <!--<v-tab-item value="tabs-info-health">
                    <health-card 
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></health-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-progress">
                    <activity-card 
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></activity-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-nutrition">
                    <nutrition-card
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></nutrition-card>
                </v-tab-item>
                <v-tab-item value="tabs-info-training">
                    <workout-card
                        v-if="base_url && business_partner"
                        :base_url.sync="base_url"
                        :business_partner.sync="business_partner"
                    ></workout-card>
                </v-tab-item>-->
            </v-tabs-items>
        </v-container>
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
            <v-card-title>Cancelar Suscripción</v-card-title>
            <v-card-text>Estas a punto de cancelar la renovación automatica de tu plan. Luego del {{ exp_date_pop | formatDate }} no tendrás más acceso a la plataforma. <br/><br/>
                Si deseas, puedes dejar un comentario explicando el motivo de la cancelación: <br/><br/>
                <v-text-field label="Motivo de cancelación" v-model="cancel_suscrip"></v-text-field>
                ¿Estás seguro?
            </v-card-text>
            <v-card-actions>
                <v-btn color="error" text @click="dialogDelete = false"><v-icon dark small>
                mdi-close
                </v-icon> No</v-btn>
                <v-btn color="success" text @click="cancelarSuscripcion()"><v-icon dark small>
                mdi-check
                </v-icon> Si</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="toast.toast" :timeout="toast.timeout" :color="toast.color" dark>
                {{ toast.message }}
              </v-snackbar>
    </div>
</template>
<script>
import moment from 'moment-timezone'
import ProfileCard from './components/ProfileCard.vue'
import HealthCard from './components/HealthCard.vue'
import ActivityCard from './components/ActivityCard.vue'
import NutritionCard from './components/NutritionCard.vue'
import WorkoutCard from './components/WorkoutCard.vue'
export default {
    components: { 
        'profile-card': ProfileCard,
        'health-card': HealthCard,
        'activity-card': ActivityCard,
        'nutrition-card': NutritionCard,
        'workout-card': WorkoutCard,
    },
    data: () => ({
        userProfileTabs: 0,
        base_url: '',
        business_partner: null,
        user: {},
        user_cards: [],
        show_btn_add: true,
        dialogDelete: false,
        toast: {
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },
        del_id_susc: null,
        del_id_part: null,
        cancel_suscrip: ""
    }),
    created() {
        this.getBaseUrl();
        this.getLoggedUser();
        this.auth();
    },
    mounted() {
        moment.locale('es');
        this.auth();
        this.getCards();
        /** Importamos Pay-me */
        let paymeScript = document.createElement('script');
        paymeScript.setAttribute('src', 'https://d23b52o2im4p82.cloudfront.net/flex-capture.min.js');
        document.head.appendChild(paymeScript);
    },
    methods: {
        showToast(msg, color) {
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },
        showDeleteDialog(id_suscripcion, id_partner, fecha_venc) {
            this.dialogDelete = true;
            this.exp_date_pop = fecha_venc;
            this.del_id_susc = id_suscripcion;
            this.del_id_part = id_partner;
        },
        async auth() {
            try {
                const response = await this.$API.auth.auth();
            } catch (e) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
        async getBaseUrl() {
            try {
                const data = await this.$API.configuration.getBaseUrl();
                this.base_url = data.data;
            }
            catch (e) {
                console.error(e);
            }
        },
        async getPartnerData(id) {
            this.$store.commit('loader', true);
            try {
                const response = await this.$API.business_partner.getPartner(id);
                this.business_partner = Object.assign(response.data.data[0]);
                const response2 = await this.$API.auth.auth(id);
                this.user = response2.data;
            } catch (e) {
                console.error(e);

            } finally {
                this.$store.commit('loader', false);
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
                this.showToast('Tarjeta eliminada correctamente!', "success");
                this.getCards();
            } catch (e) {
                console.error(e);
            }
        },
        async cancelarSuscripcion() {
            try {
                this.$store.commit('loader', true);
                this.dialogDelete = false;
                if (this.cancel_suscrip == "") this.cancel_suscrip = "-";
                const response = await this.$API.business_partner.cancelSuscription(this.del_id_susc, this.cancel_suscrip);
                this.$store.commit('loader', false);
                this.showToast('Suscripción cancelada correctamente!', "success");

                this.getPartnerData(this.business_partner.id);
            } catch (e) {
                console.error(e);
            }
        },
        openTarjetaAdd() {
            this.show_btn_add = false;
            this.abrirPayme();
        },
        getLoggedUser() {
            if (localStorage.getItem('token')) {
                this.logged_user = JSON.parse(localStorage.getItem('user_data'));
                this.logged_user_token = localStorage.getItem('token');

                this.getPartnerData(this.logged_user.id);
            } else {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
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
                    vm.$store.commit('loader', false);
                    this.showToast('Tarjeta guardada correctamente!', "success");
                    this.getCards();
                } else {
                    alert("Error al generar token.");
                    vm.$store.commit('loader', false);
                }

            } catch (e) {
                //this.$store.commit('loader',false);
                console.error(e);
            }
        },
        startCallback() {
            let vm = this;
            vm.$store.commit('loader', true);
            //console.log("-------Click en pagar-------");
        },

        errorOnPayCallback() {
            //console.log("-------Error al momento pagar-------");
        },
        abrirPayme() {
            this.selected_card = 0;
            var tokenRequest = {
                "action": "tokenize",
                "transaction": {
                    "meta": {
                        "internal_operation_number": Math.floor(Date.now()).toString().substring(7),
                        "additional_fields": {
                            "user_id": this.user.id
                        }
                    }
                },
                "card_holder": [
                    {
                        "first_name": this.user.name,
                        "last_name": this.user.lastname,
                        "email_address": this.user.email,
                        "identity_document_country": "PER",
                        "identity_document_type": "DNI",
                        "identity_document_identifier": this.user.nro_doc
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
    watch: {
    },
}
</script>
<style>
#custom-tab-items {
    background-color: transparent !important;
}
</style>