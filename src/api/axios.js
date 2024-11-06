import axios from "axios";
//export const baseURL = 'https://lavikinga.bytesoluciones.com/';
//export const baseURL = 'http://admin_la_vikinga.test/';
// export const baseURL = 'http://adminlavikinga.test/';
// export const baseURL = 'https://apiserv.lavikingaoficial.com/';
export const baseURL = "http://127.0.0.1:8000/";
const headers = {
	Accept: "application/json", //'*' ,
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
};
const withCredentials = false;

const instance = axios.create({
	baseURL,
	headers,
	withCredentials,
});

const call = async (_type, _endpoint, _body) => {
	var _data = undefined;
	switch (_type) {
		case "get":
			_data = await instance.get(_endpoint);
			break;
		case "post":
			_data = await instance.post(_endpoint, _body);
			break;
		case "put":
			_data = await instance.put(_endpoint, _body);
			break;
		case "delete":
			_data = await instance.delete(_endpoint, _body);
			break;
		default:
			throw new Error("Not allowed method");
	}
	return _data;
};

async function callAPI(type, endpoint, options = {}) {
	try {
		var data;
		await instance.get("sanctum/csrf-cookie").then(async (response) => {
			data = await call(type, endpoint, options.data);
		});
		//data = await call(type, endpoint, options.data);
	} catch (error) {
		throw error;
	}
	return data;
}

export default callAPI;
