import paths from '@/api/paths';
import auth from '@/api/auth';
import callAPI from "@/api/axios"

const API = {
    ...paths,
    ...auth
}
export default API;