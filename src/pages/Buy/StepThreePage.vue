<template>
    <v-row no-gutters>
        <v-col cols="12" md="6" class="d-none d-md-flex d-sm-none">
            <img src="@/assets/img/gym_virtual/login_img.jpg" alt="Imagen Login"  style="width:100%; max-height:100vh;"/>
        </v-col>
        <v-col cols="12" md="6" style="height: 100vh; overflow-y:auto;">
            <h1 class="title_pink mt-4 mb-4">DETALLES DE PAGO</h1>
            <v-container class="mx-auto" style="width:450px">
                <v-row>
                    <v-col cols="8"><b>Total</b></v-col>
                    <v-col cols="4"><b>S/ 93</b></v-col>
                </v-row>
                <hr/>
                <v-row class="mt-5">
                    <v-col cols="8">
                        <label class="text_field_form">Cupón de descuento</label>
                        <v-text-field class="register_form" outlined type="text"></v-text-field>
                    </v-col>
                    <v-col cols="4"><v-btn depressed class="btn_blue_form mt-5" style="bottom:0!important;">APLICAR CUPÓN</v-btn></v-col>
                    <v-col cols="12">
                        <v-checkbox v-model="factura" label="Solicitar factura"></v-checkbox>
                    </v-col>
                </v-row>
                <v-row v-if="factura == true">
                    <v-col cols="6">
                        <label class="text_field_form">RUC</label>
                        <v-text-field class="register_form" outlined type="text"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <label class="text_field_form">Razón social</label>
                        <v-text-field class="register_form" outlined type="text"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label class="text_field_form">Domicilio fiscal</label>
                        <v-text-field class="register_form" outlined type="text"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-tabs center-active centered class="tabs_selector_payment" v-model="tab_payment">
                <v-tab key="1">TARJETA DE CRÉDITO/DÉBITO</v-tab>
                <v-tab key="2">TRANSFERENCIA BANCARIA</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab_payment">
                <v-tab-item key="1">
                    <v-container class="mx-auto" style="width:450px">
                        <v-row>
                            <v-col cols="12">
                                <h2 style="font-size:1em; font-family:'Poppins-Regular';">Pago con tarjetas de crédito/débito</h2> 
                            </v-col>
                            <v-col cols="12">
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
                                                    <h4> ****{{ item.last_pan }}</h4>
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
                            </v-col>
                            <v-col cols="12">
                                <v-btn color="secondary"
                                    outlined
                                    class="px-2"
                                    @click="abrirPayme()"
                                    v-if="hide_btn == false">
                                    <span class="ma-3">Nueva Tarjeta</span>
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <div class="d-flex">
                                    <div id="demo" class="d-flex"></div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-tab-item>
                <v-tab-item key="2">
                    <v-container class="mx-auto" style="width:450px">
                        <v-row>
                            <p class="centered_paragraph">Sólo queda realizar la transferencia para iniciar el Desafío.</p>
                        </v-row>
                        
                        <v-row>
                            <v-col cols="8"><b>Total</b></v-col>
                            <v-col cols="4"><b>S/ 93</b></v-col>
                        </v-row>
                        <hr/>
                        <v-row>
                            <v-col cols="12">
                                <v-file-input label="Imágen comprobante"
                                    accept="image/png, image/jpeg, image/bmp"
                                    ref="file"
                                    @change="onFileChange"
                                    prepend-icon="mdi-camera"
                                ></v-file-input>
                                <v-img :src="img_url"
                                    contain
                                    max-height="300"
                                    max-width="600"
                                    class="ma-5"
                                />
                                <v-btn block dark color="secondary" @click="submitFiles()">
                                    <v-icon>mdi-tray-arrow-up</v-icon>
                                    &nbsp;&nbsp;ACTUALIZAR
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-tab-item>
            </v-tabs-items>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data: (e) => ({
        model: null,
        plans: [],
        base_url: '',
        data_config: {},
        tab_payment: "1",
        factura: false,
        hide_btn: false,
        selected_card: 0,
        usercc: {},
        user: {}
    }),
    mounted() {
        let vm = this;
        vm.slug = this.$route.params.slug;
        vm.getConfiguracion();
        vm.auth();
        vm.getBaseUrl();
        vm.list();
        /** Importamos Pay-me */
        let paymeScript = document.createElement('script');
        paymeScript.setAttribute('src', 'https://d23b52o2im4p82.cloudfront.net/flex-capture.min.js');
        document.head.appendChild(paymeScript);
    },
    methods: {
        async auth() {
            let vm = this;
            try {
                const response = await this.$API.auth.auth();
                this.user = response.data;
            } catch (e) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                window.location.replace('/auth/iniciar-sesion');
            }
        },
        async authPayment() {
            let vm = this;
            vm.$store.commit('loader', true);
            try {
                /*console.log("CARD: ");
                console.log(vm.selected_card);*/
                vm.selected_card.hash_order = vm.slug;
                const data_auth = await this.$API.payme.authTransaction(vm.selected_card);
                let auth_resul = data_auth.data;

                let datos_upd = {};
                datos_upd.hash_order = vm.slug;

                this.$router.push({ path: '/resultado-pago/' + vm.slug });

                vm.$store.commit('loader', false);
            }
            catch (e) {
                console.error(e);
                vm.$store.commit('loader', false);
            }
        },
        async getConfiguracion() {
            try {
                const data = await this.$API.configuration.configuration();
                this.data_config = data.data.data;
            }
            catch (e) {
                console.error(e);
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
        async list() {
            let vm = this;
            try {
                const data = await this.$API.plans.list();
                vm.plans = data.data.data;
                vm.temp_plans = data.data.data;
                const ucards = await this.$API.payme.getUserCards(vm.user);
                vm.usercc = ucards.data.data.cards;
                if (vm.usercc.length == 0) {
                    this.abrirPayme();
                }

                vm.$store.commit('loader', false);
            }
            catch (e) {
                console.error(e);
                vm.$store.commit('loader', false);
            }
        },
        async reqCallback(response) {
            try {
                let vm = this;

                this.card_data = response;
                //console.log(this.card_data);
                this.card_data.id_user = this.order.customer.id;
                const data = await this.$API.payme.saveToken(this.card_data);

                let token_resul = data.data.data;

                if (token_resul.success == true) {
                    //console.log("TOKEN CREADO");

                    token_resul.ucard.hash_order = vm.slug;

                    const data_auth = await this.$API.payme.authTransaction(token_resul.ucard);

                    this.$router.push({ path: '/resultado-pago/' + vm.slug });
                    vm.$store.commit('loader', false);
                    //console.log(data_auth);
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
            this.hide_btn = true;
            this.selected_card = 0;
            /*var tokenRequest = {
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
                        "identity_document_type": this.order.customer.document_type.name,
                        "identity_document_identifier": this.order.customer.nro_doc
                    }
                ]
            };*/
            var tokenRequest = {
                "action": "tokenize",
                "transaction": {
                    "meta": {
                        "internal_operation_number": Math.floor(Date.now()).toString().substring(7),
                        "additional_fields": {
                            "user_id": 45
                        }
                    }
                },
                "card_holder": [
                    {
                        "first_name": "fabricio",
                        "last_name": "vela",
                        "email_address": "fabriciovt@gmail.com",
                        "identity_document_country": "PER",
                        "identity_document_type": "DNI",
                        "identity_document_identifier": "73044100"
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
    }
}
</script>
<style scoped></style>