import callAPI from "@/api/axios"

export default {
    /*getUser(){
        return callAPI('get', 'api/user/');
    },*/
    
    configuration:{
        configuration(){
            return callAPI('get', 'api/v1/configuration/configuration');
        },
        menu_header(){
            return callAPI('get', 'api/v1/landing/menu');
        },
        frequent_questions(){
            return callAPI('get', 'api/v1/configuration/frequent-questions');
        },
        getBaseUrl(){
            return callAPI('get', 'api/v1/configuration/get-base-url');
        },
        getTypeInvoice(){
            return callAPI('get', 'api/v1/configuration/type-invoices');
        },
        getTypeDocument(type){
            return callAPI('get', 'api/v1/configuration/type-documents/'+type);
        },
        getPaymentMethods(){
            return callAPI('get', 'api/v1/configuration/payment-methods');
        },
        
    },

    user:{
        login(data){
            return callAPI('post', 'api/v1/auth/login', { data: data });
        },
        register(data){
            return callAPI('post', 'api/v1/auth/register', { data: data });
        },
    },
    business_partner:{
        getPartner(id){
            return callAPI('get', 'api/v1/business-partner/get-partner/'+id);
        },
    },

    team:{
        staff(){
            return callAPI('get', 'api/v1/team/staff');
        },
        sponsors(){
            return callAPI('get', 'api/v1/team/sponsors');
        },
    },
    plans:{
        list(){
            return callAPI('get', 'api/v1/plans/list');
        },
        categories(){
            return callAPI('get', 'api/v1/plans/categories');
        },
        read(id){
            return callAPI('get', 'api/v1/plan/'+id);
        },
    },
    workouts:{
        list(){
            return callAPI('get', 'api/v1/workouts/list');
        },
        categories(){
            return callAPI('get', 'api/v1/workouts/categories');
        },
    },
    calendar:{
        listEvents(){
            return callAPI('get', 'api/v1/calendar-events/listEvents');
        },
    },
    contact:{
        saveContactInfo(data){
            return callAPI('post', 'api/v1/contact/save-contact-info', { data: data });
        },
    },
    
    order:{
        register(data){
            return callAPI('post', 'api/v1/order/create', { data: data });
        },
        payment(id){
            return callAPI('get', 'api/v1/order/payment/'+id );
            
        }
    }
}