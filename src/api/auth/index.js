import callAuthAPI from "@/api/authService"

export default {
    auth:{
        auth(){
            return callAuthAPI('post', 'api/v1/auth/user');
        },
    },

    gymVirtual:{
        calendar(){
            return callAuthAPI('get', 'api/v1/gymvirtual/calendar');
        },
        schedule(){
            return callAuthAPI('get', 'api/v1/gymvirtual/schedule');
        },
        week(){
            return callAuthAPI('get', 'api/v1/gymvirtual/week');
        },
        day(){
            return callAuthAPI('get', 'api/v1/gymvirtual/day');
        }
    }
}