import users from '../../api/users'

export default {
    namespaced: true,
    state: {
        usersList: [],
        referrersList: [],
    },
    getters: {
        usersList: (state) => state.usersList,
        referrersList: (state) => state.referrersList,
    },
    mutations: {
      // eslint-disable-next-line no-return-assign
        setUsersList: (state, usersList) => state.usersList = usersList,
        setReferrersList: (state, referrers) => state.referrersList = referrers,
    },
    actions: {
        listAllUsers ({ commit }) {
            return users.listAllUsers().then(users => {
                commit('setUsersList', users);
                return users;
            })
        },
        listReferrers ({ commit }) {
          return users.listReferrers().then(res => {
              commit('setReferrersList', res);
              return res;
          })
        },
    },
}
