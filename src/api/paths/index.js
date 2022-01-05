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
    },
    business_partner:{
        getPartner(id){
            return callAPI('get', 'api/v1/business-partner/get-partner/'+id);
        },
        getWorkoutList(){
            return callAPI('get', 'api/v1/business-partner/get-workout-list');
        },

        updateProfileInfo(id, data){
            return callAPI('post', 'api/v1/business-partner/update-profile-info/'+id, {data: data});
        },
        updateHealthInfo(id, data){
            return callAPI('post', 'api/v1/business-partner/update-health-info/'+id, {data: data});
        },
        updateProgressInfo(id, data){
            return callAPI('post', 'api/v1/business-partner/update-progress-info/'+id, {data: data});
        },
        updateNutritionInfo(id, data){
            return callAPI('post', 'api/v1/business-partner/update-nutrition-info/'+id, {data: data});
        },
        updateTrainingInfo(id, data){
            return callAPI('post', 'api/v1/business-partner/update-training-info/'+id, {data: data});
        },

        uploadProfilePhoto(data){
            return callAPI('post', 'api/v1/business-partner/upload-profile-photo', {data: data});
        },
        uploadBodyPicture(data){
            return callAPI('post', 'api/v1/business-partner/upload-body-photo', {data: data});
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
            return callAPI('get','api/v1/blog/search?page='+page,{data:data});
        },
        getBySlug(slug){
            return callAPI('get','api/v1/blog/slug/' + slug);
        }
    },
}