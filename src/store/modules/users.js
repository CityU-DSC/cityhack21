import users from '../../api/users'

export default {
    namespaced: true,
    state: {
        usersList: [],
    },
    getters: {
        usersList: (state) => state.usersList,
    },
    mutations: {
      // eslint-disable-next-line no-return-assign
        setUsersList: (state, usersList) => state.usersList = usersList,
    },
    actions: {
        listAllUsers ({ commit }, params) {
            return users.listAllUsers(params).then(users => {
                commit('setUsersList', users);
                return users;
            })
        },
    },
}
