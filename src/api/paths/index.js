import callAPI from "@/api/axios"

export default {
    /*getUser(){
        return callAPI('get', 'api/user/');
    },*/
    
    configuration:{
        configuration(params){
            return callAPI('get', 'api/v1/configuration/configuration?data='+params);
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
        getInformation(){
            return callAPI('get', 'api/v1/la-vikinga/information');
        },
        termsConditions(){
            return callAPI('get', 'api/v1/terms-conditions');
        },
        privacyPolicy(){
            return callAPI('get', 'api/v1/privacy-policy');
        },
        
        
        getCountriesList(){
            return callAPI('get', 'api/v1/configuration/get-countries-list');
        },
    },

    user:{
        login(data){
            return callAPI('post', 'api/v1/auth/login', { data: data });
        },
        register(data){
            return callAPI('post', 'api/v1/auth/register', { data: data });
        },

        forgot(data) {
            return callAPI('post', 'api/v1/auth/forgot-password', { data: data });
        },
        verify_recovery(data) {
            return callAPI('post', 'api/v1/auth/verify-recovery', { data: data });
        },
        reset_password(data) {
            return callAPI('post', 'api/v1/auth/reset-password', { data: data });
        }
    },

    team:{
        staff(){
            return callAPI('get', 'api/v1/team/staff');
        },
        sponsors(){
            return callAPI('get', 'api/v1/team/sponsors');
        },
    },
    countries:{
        search(iso){
            return callAPI('get', 'api/v1/searchbyiso/'+iso);
        }
    },
    levels:{
        list(data){
            return callAPI('post', 'api/v1/getLevels', { data: data });
        }
    },
    timezones:{
        list(){
            return callAPI('get', 'api/v1/timezonesList', {});
        }
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
        category(id){
            return callAPI('get', 'api/v1/plans/category/'+id);
        }
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
    gym_banner:{
        list(type){
            return callAPI('get', 'api/v1/gym-banner/'+type);
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
        },
        getAllOrderInfo(id){
            return callAPI('get', 'api/v1/order/getAllOrderInfo/'+id );
        }, 
        getOrdersByUser(id,page){
            return callAPI('get','api/v1/order/getOrdersByUser/'+id+"?page="+page);
        }, 
        validateEmail(data){
            return callAPI('post', 'api/v1/order/validate-email', { data: data });
        },
        generatePostInvoice(hash){
            return callAPI('get', 'api/v1/generatePostInvoice/'+hash );
        },
    },

    coupon:{
        validate(data){
            return callAPI('post', 'api/v1/coupon/validate', { data: data });
        },
    },
    sliders:{
        list(){
            return callAPI('get','api/v1/slider/list');
        }
    },
    informative:{
        get(){
            return callAPI('get','api/v1/informative');
        }
    },
    payme:{
        saveToken(data){
            return callAPI('post', 'api/v1/payme/saveToken', { data: data });
        },
        authTransaction(data){
            return callAPI('post', 'api/v1/payme/authTransaction', { data: data });
        },
        getUserCards(data){
            return callAPI('post', 'api/v1/payme/getUserCards', { data: data });
        }
    },
    stripe:{
        saveToken(data){
            return callAPI('post', 'api/v1/stripe/stripeSaveToken', { data: data });
        },
        authTransaction(data){
            return callAPI('post', 'api/v1/stripe/authTransaction', { data: data });
        },
        getUserCards(data){
            return callAPI('post', 'api/v1/stripe/getUserCards', { data: data });
        },
        authTransactionUserToken(data){
            return callAPI('post', 'api/v1/stripe/authTransactionUserToken', { data: data });
        },
    },
    testimonials:{
        get(){
            return callAPI('get','api/v1/testimonials');
        }
    },
    blog:{
        getCategories(){
            return callAPI('get','api/v1/blog/categories');
        },
        getLastPost(){
            return callAPI('get','api/v1/blog/last');
        },
        getLastPosts(){
            return callAPI('get','api/v1/blog/lasts');
        },
        getPostsByCategory(id,page){
            return callAPI('get','api/v1/blog/category/posts?page='+page+'&id='+id);
            
        },
        searchPosts(page,data){
            return callAPI('get','api/v1/blog/search?page='+page+'&search='+data);
        },
        getBySlug(slug){
            return callAPI('get','api/v1/blog/slug/' + slug);
        }
    },
}