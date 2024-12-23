<template>
  <div>
    <v-container class="mb-5">
      <v-card class="pa-5 dark-bg">
      <h2 class="white--text">SISTEMA DE REFERIDOS</h2>

      <!-- Sección de Referir -->
      <v-row class="mt-5">
        <v-col cols="12">
          <h3 class="white--text">REFERIR</h3>
          <v-card dark elevation="0" color="#0A2240" outlined class="pa-5 rounded-xl">
            <v-row class="mt-5">
              <v-col cols="6">
                <h3 class="white--text">Tu link de referencia</h3>
                <v-text-field
                  dark
                  v-model="referralLink"
                  append-outer-icon="mdi-content-copy"
                  color="white"
                  class="input-dark white--text"
                  hide-details="false"
                  outlined>
                </v-text-field>
                <v-btn block class="pink darken-1 white--text mt-4" @click="shareLink()">COMPARTIR</v-btn>
                <p class="mt-3 white--text">Recibe <span class="green--text font-weight-bold">15 días gratis</span> por cada persona que se registre a través de tu link</p>
              </v-col>
              <v-col cols="3">
                <v-card class="pa-3 dark-card text-center rounded-xl">
                  <h3 class="white--text">Total de referidos</h3>
                  <h1 class="white--text">{{totalReferals}}</h1>
                  <p class="white--text">AMIGOS REFERIDOS</p>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card class="pa-3 dark-card text-center rounded-xl">
                  <h3 class="white--text">Total recompensas</h3>
                  <h1 class="white--text">{{totalDays}}</h1>
                  <p class="white--text">DÍAS GANADOS POR INVITACIONES</p>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <h3 class="mt-5 white--text">MIS REFERIDOS</h3>
      <v-card elevation="0" color="#0A2240" outlined class="pa-5 rounded-xl">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Recompensa del usuario</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in referrals" :key="index">
              <td>19/12/2024</td>
              <td class="user-info">
                <img src="https://via.placeholder.com/40" alt="Foto de usuario" />
                Melissa Zeballos
              </td>
              <td class="reward">
                <i class="fas fa-gift"></i> 15 días gratis
              </td>
              <td>
                <button class="button">Reclamar Recompensa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>

      <!-- Sección de Ranking -->
      <h3 class="mt-5 white--text">RANKING</h3>
      <v-list class="dark-list">
        <v-list-item v-for="(user, index) in ranking" :key="index">
          <v-list-item-avatar>
            <v-img :src="user.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ index + 1 }}. {{ user.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <span class="white--text">{{ user.points }} pts.</span>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
      <!--<div>
        <h3>Mi Código de Referido</h3>
        <p v-if="code">Código: {{ code }}</p>
        <button @click="generateCode">Generar Código</button>
        <h3>Referidos</h3>
        <ul>
          <li v-for="ref in referrals" :key="ref.id">
            {{ ref.referred.name }} - {{ ref.created_at }} - {{ ref.reward_days }} días
          </li>
        </ul>
      </div>-->
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: '',
      // referrals: [],
      referralLink: 'https://lavikingaoficial.com',
      headers: [
        { text: 'Fecha', value: 'date' },
        { text: 'Usuario', value: 'user' },
        { text: 'Recompensa del usuario', value: 'reward' },
        { text: 'Acción', value: 'action' }
      ],
      totalDays: 0,
      totalReferals: 0,
      referrals: [
        { date: '13/10/2024', user: 'Melissa Zeballos', reward: '15 días gratis' },
        { date: '11/10/2024', user: 'Renzo Gálvez', reward: '15 días gratis' },
        { date: '05/10/2024', user: 'Pedro Cartagena', reward: '15 días gratis' },
        { date: '28/09/2024', user: 'Mónica Peña', reward: '15 días gratis' }
      ],
      ranking: [
      ]
    };
  },
  methods: {
    async generateCode() {
      const response = await this.$API.referral.getReferralCode();
      this.code = response.data.code;
      this.referralLink = `${this.referralLink}/referidos-registro/${this.code}`
    },
    async loadReferrals() {
      const response = await this.$API.referral.getReferralDetails();
      this.referrals = response.data.referrals;
      this.totalDays = response.data.total_rewards;
      this.totalReferals = response.data.total_referrals;
    },
    shareLink() {
      navigator.clipboard.writeText(this.referralLink);
      alert('Link copiado al portapapeles');
    }
  },
  mounted() {
    this.generateCode()
    this.loadReferrals();
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
