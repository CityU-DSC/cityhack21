import auth from "../../api/auth";

export default {
  namespaced: true,
  state: {
    currentUser: null,
    currentUserToken: null,
    isLoggedIn: false
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    currentUser: state => (state.currentUser ? state.currentUser : null),
    currentUserName: state => state.currentUser ? state.currentUser.nickName : null
  },
  mutations: {
    setCurrentUser(state, user, token) {
      state.currentUser = user;
      state.currentUserToken = token;
    },
    updateLoginStatus(state, status) {
      state.isLoggedIn = status;
    },
    clearUserData(state) {
      state.currentUser = null;
      state.currentUserToken = null;
      state.isLoggedIn = false;
    },
    updateCurrentUser(state, user) {
      state.currentUser = Object.assign(state.currentUser, user);
    }
  },
  actions: {
    loginByEmailPassword({ commit }, params) {
      return auth.loginByEmailPassword(params).then(res => {
        console.log(`[*]AuthApi:: Login Success, ${res}`);
        if (res.token){
          commit("setCurrentUser", res.user, res.token);
          commit("updateLoginStatus", true);
        }
        return res;
      });
    },
    registerUser(commit, params) {
      return auth.registerUser(params).then(res => {
        console.log(`[*]AuthApi:: Register Success, ${res}`);
        // commit("setCurrentUser", res.data, res.token);
        return res;
      });
    },
    logOutUser({ commit }) {
      commit("clearUserData");
    },
    accountIdUsed(commit, accountId)
    {
      return auth.accountIdUsed({ accountId });
    },
    verifyUser({ commit }, params) {
      // params = { verificationCode, email, password }
      return auth.verifyUser(params).then(
        res => {
          commit("setCurrentUser", res.user, res.token);
          return res;
        }
      )
    },
    resendVerification(commit, params) {
      return auth.resendVerification(params);
    },
    me({ commit }, token){
      return auth.me(token).then(
        res => {
          commit("updateLoginStatus", true)
          commit("setCurrentUser", res, token)
        }
      );
    },
    updateMe({ commit }, params) {
      const token = localStorage.getItem('jwt');
      return auth.updateMe(params, token).then(
        () => {
          commit('updateCurrentUser', params);
        }
      )
    },
    async init({ commit, state }) {
      if (!localStorage.getItem('jwt')){
        return false;
      } else if (state.currentUser) {
        return true;
      } else {
        const token = localStorage.getItem('jwt');
        try {
          const res = await auth.me(token).then(
            res => {
              commit("updateLoginStatus", true)
              commit("setCurrentUser", res, token)
              return res;
            }
          );
          if (res == null){
            localStorage.removeItem('jwt');
            return false;
          } else {
            return true
          }
        } catch (e) {
          console.log(e);
          return false
        }
      }
    },
    forgetPassword(commit, params){
      // params = { email }
      return auth.forgetPassword(params)
    },
  }
};
