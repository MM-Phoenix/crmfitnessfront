import authHeader from '../store/authHeader';
import Constants from "@/api/Constants";
import axios from "axios";

class OwnerAPI {

    createAdmin(user) {
        return axios.post(Constants.OWNER_URL + 'signup', user, {headers: authHeader(),});
    }
}

export default new OwnerAPI();
