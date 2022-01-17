<template>
    <div>
        <v-container>
            <div class="d-flex justify-center">
                <v-card max-width="500" min-width="500" elevation="1" class="pa-5">
                    <div class="py-2 d-flex align-center">
                        <!--div style="width: 40%" class="text-center">
                            <img style="width: 100px" src="@/assets/img/icons/mobile-payment.png" />
                        </div>-->
                        <div style="width: 100%" class="text-center">
                            <h3 style="font-weight: 400;">
                                Recupera tu Contraseña
                            </h3>
                            <h4>Hola <b>{{name}}</b>, ingresa una nueva contraseña </h4>
                            <div class="error--text mt-2 mb-4">{{ error }}</div>
                        </div>     
                        
                    </div>
                    <br>
                    <v-text-field
                        v-model="newPassword"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required]"
                        :type="showPassword ? 'text' : 'password'"
                        :error="errorNewPassword"
                        :error-messages="errorNewPasswordMessage"
                        name="password"
                        label="Contraseña nueva"
                        outlined
                        class="mt-4"
                        @change="resetErrors"
                        @keyup.enter="confirmPasswordReset"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>

                    <v-btn
                        :loading="send"
                        block
                        depressed
                        x-large
                        color="secondary"
                        @click="confirmPasswordReset"
                    >Cambiar contraseña</v-btn>
                </v-card>
            </div>
            
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
import axios from "axios";
export default {
    components: { 
        axios
     },

    data: () => ({
        isLoading: true,
        send:false,

        showNewPassword: true,
        newPassword: '',

        // form error
        errorNewPassword: false,
        errorNewPasswordMessage: '',

        // show password field
        showPassword: false,
        name:"",
        email:"",
        hash:"",


        status: 'Resetting password',
        error: null,

        // input rules
        rules: {
            required: (value) => (value && Boolean(value)) || 'Required'
        },
        
        toast:{
            toast: false,
            message: '',
            timeout: 3000,
            color: "success"
        },

        uploadSuccess: false,
    }),

    mounted(){
        let vm = this;
        vm.hash = vm.$route.params.hash;
        console.log(vm.$route.params.hash);
        
        let result = vm.verifyRecovery();

        if(!result){
        //vm.$router.push("/auth/iniciar-sesion");
        //window.location.replace("/");
        }
    },

    watch: {
    },

    methods: {
        
        showToast(msg,color){
            this.toast.color = color;
            this.toast.message = msg;
            this.toast.toast = true;
        },

        async confirmPasswordReset() {
            let vm =this;
            this.$store.commit('loader',true);
            vm.send = true;

            try{
                const response = await this.$API.user.reset_password({hash:vm.hash,email:vm.email,password:vm.newPassword});
                this.name = response.data.data.name;
                this.$store.commit('loader',false);
                setTimeout(()=>{ 
                    this.showToast('Contraseña Restablecida',"success");
                    this.$router.push({ path: '/auth/iniciar-sesion' });
                }, 2000);
                //window.location.replace('/')
        
            }catch(e){
                this.$store.commit('loader',false);
                this.showToast('Upps! Intentaló nuevamente',"error");
                vm.send = false;
            }

            
        },
        resetErrors() {
            this.errorNewPassword = false
            this.errorNewPasswordMessage = ''
        },
            
        async verifyRecovery(){
            this.$store.commit('loader',true);
            let vm= this;
            try{
                let result = await this.$API.user.verify_recovery({hash:vm.hash});
                vm.name = result.data.data.name.split(' ')[0];
                vm.email = result.data.data.email;
                this.$store.commit('loader',false);
                return true; 
            }catch(e){
                console.log(e);
                this.$store.commit('loader',false);
                return false;
            }
        }
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