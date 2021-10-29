import callAPI from "@/api/axios"

export default {
    getUser(){
        return callAPI('get', 'api/user/');
    },
    
    landing:{
        configuration(){
            return callAPI('get', 'api/v1/configuration/configuration');
        },
        menu_header(){
            return callAPI('get', 'api/v1/landing/menu');
        },
        frequent_questions(){
            return callAPI('get', 'api/v1/configuration/frequent-questions');
        },
    },

}