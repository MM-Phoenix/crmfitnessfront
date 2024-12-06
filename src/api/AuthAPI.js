import axios from 'axios';
import Constants from "@/api/Constants";
import authHeader from "@/store/authHeader";

class AuthAPI {

    signUp(user) {
        return axios.post(Constants.AUTH_URL + 'signup', user, {headers: authHeader(),});
    }

    login(user) {
        return axios
            .post(Constants.AUTH_URL + 'signing', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.bearer) {
                    localStorage.setItem('jwtToken', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
}

export default new AuthAPI();
