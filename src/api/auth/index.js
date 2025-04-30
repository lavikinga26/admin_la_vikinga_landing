import callAuthAPI from "@/api/authService"

export default {
    auth:{
        auth(){
            return callAuthAPI('post', 'api/v1/auth/user');
        },
        change_password(data){
            return callAuthAPI('post', 'api/v1/auth/change-password', { data: data });
        }
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
        },
        saveAttempt(data){
            return callAuthAPI('post', 'api/v1/gymvirtual/save-attempt', {data: data});
        },
        getActivitiesRecorded(id) {
            return callAuthAPI('get', 'api/v1/gymvirtual/getActivitiesRecorded/'+id);
        },
        getActivitiesUpcoming(id) {
            return callAuthAPI('get', 'api/v1/gymvirtual/getActivitiesUpcoming/'+id);
        },
        getActivitiesRecordedFilters(id_level, id_coach, enfoque, pageNum) {
            return callAuthAPI('get', 'api/v1/gymvirtual/getActivitiesRecordedFilter/'+id_level+'/'+id_coach+'/'+enfoque+'/'+pageNum);
        },
        savePeso(data){
            return callAuthAPI('post', 'api/v1/pesos/guardarPeso', {data: data});
        },
        getPesos(id_bp, id_ejercicio) {
            return callAuthAPI('get', 'api/v1/pesos/getPesos/'+id_bp+'/'+id_ejercicio);
        },
    },


    business_partner:{
        getPartner(id){
            return callAuthAPI('get', 'api/v1/business-partner/get-partner/'+id);
        },
        getWorkoutList(){
            return callAuthAPI('get', 'api/v1/business-partner/get-workout-list');
        },

        updateProfileInfo(id, data){
            return callAuthAPI('post', 'api/v1/business-partner/update-profile-info/'+id, {data: data});
        },
        updateHealthInfo(id, data){
            return callAuthAPI('post', 'api/v1/business-partner/update-health-info/'+id, {data: data});
        },
        updateProgressInfo(id, data){
            return callAuthAPI('post', 'api/v1/business-partner/update-progress-info/'+id, {data: data});
        },
        updateNutritionInfo(id, data){
            return callAuthAPI('post', 'api/v1/business-partner/update-nutrition-info/'+id, {data: data});
        },
        updateTrainingInfo(id, data){
            return callAuthAPI('post', 'api/v1/business-partner/update-training-info/'+id, {data: data});
        },

        uploadProfilePhoto(data){
            return callAuthAPI('post', 'api/v1/business-partner/upload-profile-photo', {data: data});
        },
        uploadBodyPicture(data){
            return callAuthAPI('post', 'api/v1/business-partner/upload-body-photo', {data: data});
        },
        getBadge(){
            return callAuthAPI('get', 'api/v1/gymvirtual/get-badge');
        },
        getDownloads(){
            return callAuthAPI('get', 'api/v1/business-partner/downloads');
        },
        getDownloadsGym(id_level){
            return callAuthAPI('get', 'api/v1/business-partner/downloadsgym/'+id_level);
        },
        getLibrary(){
            return callAuthAPI('get', 'api/v1/business-partner/library');
            
        },
        getCards() {
            return callAuthAPI('get', 'api/v1/business-partner/getCards');
        },
        deleteCard(id){
            return callAuthAPI('get', 'api/v1/business-partner/deleteCard/'+id);
        },
        cancelSuscription(id, motivo){
            return callAuthAPI('get', 'api/v1/business-partner/cancelSuscription/'+id+'/'+motivo);
        },
        reactivateSuscription(id){
            return callAuthAPI('get', 'api/v1/business-partner/reactivateSuscription/'+id);
        },
        updateLevel(level){
            return callAuthAPI('get', 'api/v1/business-partner/updateLevel/'+level);
        },
        getRetos(){
            return callAuthAPI('get', 'api/v1/business-partner/retosgym');
        },
        updateData(data){
            return callAuthAPI('post', 'api/v1/business-partner/updateData', {data: data});
        },
        updateTimezone(id_timezone){
            return callAuthAPI('get', 'api/v1/business-partner/updateTimezone/'+id_timezone);
        },

        // Campaña retencion
        checkActiveRetention(data){
            return callAuthAPI('post', 'api/v1/retention/check/', data);
        },
        // Actualiza plan    retencion
        updatePlan(data){
            return callAuthAPI('post', 'api/v1/subscription/plan/update/', data);
        },
    },
    rating:{
        saveRating(data){
            return callAuthAPI('post', 'api/v1/rating/storeRating', {data: data});
        },
    },
    referral:{
        getReferralCode(){
            return callAuthAPI('post','api/v1/generate-referral-code');
        },
        getReferralDetails(){
            return callAuthAPI('get','api/v1/referral-details');
        },
        getRanking(){
            return callAuthAPI('get','api/v1/getRanking');
        }
    }
}