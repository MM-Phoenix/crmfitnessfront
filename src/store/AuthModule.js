import AuthAPI from '../api/AuthAPI';
import store from "@/store/auth";

const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
const initialState = jwtToken
    ? {status: {loggedIn: true}, jwtToken: jwtToken}
    : {status: {loggedIn: false}, jwtToken: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, user) {
            return AuthAPI.login(user).then(
                jwtToken => {
                    commit('loginSuccess', jwtToken);
                    return Promise.resolve(jwtToken);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({commit}) {
            commit('logout');
        }
    },
    mutations: {
        loginSuccess(state, jwtToken) {
            state.status.loggedIn = true;
            state.jwtToken = jwtToken;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.jwtToken = undefined;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.jwtToken = undefined;
            store.state.auth.user = undefined;
            localStorage.removeItem('jwtToken');
        },
    }
};