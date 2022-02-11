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
        }
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
            
        }
    },
}