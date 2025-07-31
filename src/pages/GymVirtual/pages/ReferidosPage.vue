<template>
  <div>
    <v-container class="mb-5" v-if="has_active_plan === false">
        <v-row class="text-center">
            <v-col cols="12" v-if="show_message_plan === true">
                <h1 class="text-center text_box_title" style="margin-top: 10%;">Ups! No cuentas con ningún plan activo!</h1>
                <v-btn class="text_btn_white_title mt-5" color="secondary" @click="gohome">Renovar/adquirir plan</v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-container class="mb-5" v-if="has_active_plan === true">
      <h2 class="text_box_title mb-2">Refiere y gana</h2>
      <v-card class="pa-5" color="transparent" style="border: 2px solid #293E58!important; border-radius: 16px;">
      <!-- Sección de Referir -->
      <v-row class="mt-2">
        <v-col cols="12" md="6">
          <h3 class="white--text">Tu link de referencia</h3>
          <v-text-field
            dark
            v-model="referralLink"
            color="white"
            class="input-dark white--text"
            hide-details="false"
            outlined>
          </v-text-field>
          <v-btn block class="pink darken-1 white--text mt-4" @click="shareLink()">COPIAR ENLACE</v-btn>
          <p class="mt-3 white--text">Recibe <span class="green--text font-weight-bold"> días gratis</span> por cada persona que se registre a través de tu link</p>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="pa-3 dark-card text-center rounded-xl">
            <h3 class="white--text">Total de referidos</h3>
            <h1 class="white--text">{{totalReferals}}</h1>
            <p class="white--text">AMIGOS REFERIDOS</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="pa-3 dark-card text-center rounded-xl">
            <h3 class="white--text">Total recompensas</h3>
            <h1 class="white--text">{{totalDays}}</h1>
            <p class="white--text">DÍAS GANADOS POR INVITACIONES</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    
      <v-row class="mt-5">
        <v-col cols="12" md="8">
          <h2 class="text_box_title mt-5">Mis Referidos</h2>
          <v-card class="pa-5 mt-2" color="transparent" style="border: 2px solid #293E58!important; border-radius: 16px;">
            <v-table width="100%">
              <thead>
                <tr>
                  <th class="text-left d-block d-sm-table-cell">Fecha</th>
                  <th class="text-left d-block d-sm-table-cell">Usuario</th>
                  <th class="text-left d-block d-sm-table-cell">Recompensa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in referrals" :key="index">
                  <td class="d-block d-sm-table-cell">{{ user.created_at | formatDate }}</td>
                  <td class="user-info d-block d-sm-table-cell">
                    <img src="https://placehold.co/40" alt="Foto de usuario" />
                    {{ user.referred.name }}
                  </td>
                  <td class="reward d-block d-sm-table-cell">
                    <i class="fas fa-gift"></i> 15 días gratis
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <!-- Sección de Ranking -->
          <h2 class="text_box_title mt-5">Ranking</h2>
          <v-card class="pa-5 mt-2" color="transparent" style="border: 2px solid #293E58!important; border-radius: 16px;">
            <v-list  color="transparent" >
              <v-list-item v-for="(user, index) in ranking" :key="index">
                <v-list-item-avatar>
                  <img src="https://placehold.co/40" alt="Foto de usuario" /> 
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="white--text">
                    {{ index + 1 }}. {{ user.nombre }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <span class="white--text">{{ user.points }} días</span>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    
    
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: '',
      // referrals: [],
      referralLink: 'https://desafio.lavikingaoficial.com',
      headers: [
        { text: 'Fecha', value: 'date' },
        { text: 'Usuario', value: 'user' },
        { text: 'Recompensa del usuario', value: 'reward' },
        { text: 'Acción', value: 'action' }
      ],
      totalDays: 0,
      totalReferals: 0,
      has_active_plan: false,
      show_message_plan: false,
      referrals: [
        { date: '13/10/2024', user: 'Melissa Zeballos', reward: '15 días gratis' },
        { date: '11/10/2024', user: 'Renzo Gálvez', reward: '15 días gratis' },
        { date: '05/10/2024', user: 'Pedro Cartagena', reward: '15 días gratis' },
        { date: '28/09/2024', user: 'Mónica Peña', reward: '15 días gratis' }
      ],
      ranking: [
        { name: 'Melissa Zeballos', points: '125' },
        { name: 'Karla Perez', points: '100' },
      ]
    };
  },
  methods: {
    async auth() {
      let vm = this;
      try {
          const response = await this.$API.auth.auth();
          this.user = response.data;
          if (this.user.id_level != null) {
              this.id_level = this.user.id_level;
          }
          let fecha_actual = new Date();
          this.userPlans = response.data.plans;
          this.userPlans.map(function (item) {
              if(fecha_actual <= new Date(item.expiration_date) && vm.has_active_plan == false){
                  vm.has_active_plan = true;
              }
          });
          vm.show_message_plan = vm.has_active_plan === true ? false:true;
      } catch (e) {
          localStorage.removeItem('user_data');
          localStorage.removeItem('token');
          window.location.replace('/auth/iniciar-sesion');
      }
  },
    async generateCode() {
      const response = await this.$API.referral.getReferralCode();
      this.code = response.data.code;
      this.referralLink = `${this.referralLink}/referidos-registro?ref=${this.code}`
    },
    async loadReferrals() {
      const response = await this.$API.referral.getReferralDetails();
      this.referrals = response.data.referrals;
      this.totalDays = response.data.total_rewards;
      this.totalReferals = response.data.total_referrals;
    },
    async loadRanking() {
      const response = await this.$API.referral.getRanking();
      this.ranking = response.data.ranking;
      console.log(this.ranking);
    },
    shareLink() {
      navigator.clipboard.writeText(this.referralLink);
      alert('Link copiado al portapapeles');
    }
  },
  mounted() {
    this.generateCode()
    this.loadReferrals();
    this.loadRanking();
    this.auth();
  },
}
</script>

<style scoped>
.dark-bg {
  background-color: #0f172a;
}
.dark-card {
  background-color: #081A30;
  border-radius: 8px;
}
.input-dark input {
  color: white !important;
}
.table-dark {
  background-color: #1e293b;
}
.dark-list {
  background-color: #1e293b;
}


table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px; /* Separación entre filas */
}

th, td {
  padding: 15px;
  text-align: left;
}

th {
  background-color: #11233b;
  font-weight: 600;
  color: #fff;
  border-radius: 10px 10px 0 0; /* Bordes redondeados solo arriba */
}

tr {
  background-color: #1a2d48;
  color: #fff;
  border-radius: 10px;
}

td:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

td:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  vertical-align: middle;
}

.user-info {
  display: flex;
  align-items: center;
}

.reward {
  color: #21c55d;
  /*display: flex;*/
  align-items: center;
}

.reward i {
  margin-right: 5px;
}

.button {
  background-color: #e5004c;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #ff005a;
}

</style>
