import auth from '../../api/auth';

export default {
    namespaced: true,
    state: {
        currentUser: null,
        currentUserToken: null,
        isLoggedIn: false,
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        currentUser: (state) => state.currentUser? state.currentUser : null,
        currentUserName: (state) => state.currentUser? state.currentUser.name : null,
    },
    mutations: {
        setCurrentUser(state, user, token){
            state.currentUser = user;
            state.currentUserToken = token;
        },
        updateLoginStatus(state, status){
            state.isLoggedIn = status;
        },
        clearUserData(state){
            state.currentUser = state.currentUserToken = null;
            state.isLoggedIn = false;
        },
    },
    actions: {  
        loginByEmailPassword({commit}, params){
            return auth.loginByEmailPassword(params).then(res => {
                console.log(`[*]AuthApi:: Login Success, ${res}`);
                commit('setCurrentUser', res.user, res.token);
                commit('updateLoginStatus', true);
                return res;
            })
        },
        registerUser({commit}, params){
            return auth.registerUser(params).then(res => {
                console.log(`[*]AuthApi:: Register Success, ${res}`);
                commit('setCurrentUser', res.data, res.token);
                return res;
            })
        },
        logOutUser({commit}){
          commit('clearUserData');
        },
    }
    
}