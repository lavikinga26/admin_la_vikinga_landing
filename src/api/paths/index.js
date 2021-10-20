import callAPI from "@/api/axios"

export default {
    getUser(){
        return callAPI('get', 'api/user/');
    },
    
    landing:{
        configuration(){
            return callAPI('get', 'api/v1/configuration/configuration');
        },
    },
}