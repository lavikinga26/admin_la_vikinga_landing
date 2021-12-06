import axios from "axios";
// const baseURL = 'http://lavikinga.bytesoluciones.com/';
const baseURL = 'http://admin_la_vikinga.test/';
// const baseURL = 'http://admin_la_vikinga.test/';
const headers = { 
    'Accept': 'aplicaition/json' ,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*',
};
const withCredentials = true;

const instance = axios.create({
    baseURL,
    headers,
    withCredentials
});

//if(localStorage.getItem('user_token')){
    instance.defaults.headers.common['Authorization'] =  'Bearer '+ localStorage.getItem('token');
//}


const call = async (_type, _endpoint, _body) => {

    var _data = undefined;
    switch (_type) {
        case 'get':
        _data = await instance.get(_endpoint);
        break;
        case 'post':
        _data = await instance.post(_endpoint, _body);
        break;
        case 'put':
        _data = await instance.put(_endpoint, _body);
        break;
        case 'delete':
        _data = await instance.delete(_endpoint, _body);
        break;
        default:
        throw new Error('Not allowed method')
    }
    return _data;
}


async function callAuthAPI(type, endpoint, options = {}) {
    try {
        var data;
        /*if (options.csrf_cookie) {*/
            await instance
              .get('sanctum/csrf-cookie')
              .then(async(response) => {
                data = await call(type, endpoint, options.data);
              });
        /*} else {
            if(options.data){
              options.data._token = token.content;
            }
            data = await call(type, endpoint, options.data);
        }*/
        /*var data;
        data = await call(type, endpoint, options.data);*/
    } 
    catch (error) {
        throw error;
    }
    return data;
}

export default callAuthAPI;