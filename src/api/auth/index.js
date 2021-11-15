import callAuthAPI from "@/api/authService"

export default {
    auth:{
        auth(){
            return callAuthAPI('post', 'api/v1/auth/user');
        },
    },
}