import teamsAPI from '../../api/teams'

export default {
    namespaced: true,
    state: {
        teamLists: [],

        currentTeam: null,
    },
    getters: {
        teamLists: state => state.teamLists,
        currentTeam: state => state.currentTeam,

    },
    mutations: {
        // eslint-disable-next-line no-return-assign
        setTeamsList: (state, teamsList) => state.teamsList = teamsList,
        setCurrentTeam: (state, team) => state.currentTeam = team,
        setCurrentTeamCode: (state, teamCode) => {
            if (state.currentTeam){
                state.currentTeam.teamCode = teamCode;
            }
        },
        updateCurrentTeam: (state, teamInfo) => {
            if (state.currentTeam){
                state.currentTeam = Object.assign(state.currentTeam, teamInfo);
            } else {
                throw Error('No team set currently for updating');
            }
        },
        toogleTeamPrivate: (state) => {
            if (state.currentTeam){
                state.currentTeam.private = !state.currentTeam.private;
            }
        }
    },
    actions: {
        listAllTeams({ commit }){
            return teamsAPI.all().then(res =>
            {
                commit('setTeamsList', res.teams);
                return res.teams;
            })
        },

        myTeam({ commit }) {
            return teamsAPI.me().then(
                res => {
                    commit("setCurrentTeam", res.team)
                    return res.team;
                }
            )
        },

        searchTeam(commit, params) {
            // params = {name, teamLeaderAccountId, useAtlas, useSagemaker}
            return teamsAPI.search(params);
        },

        getTeamCode({ commit }) {
            // Get team code for my team (private team)
            return teamsAPI.teamCode().then(
                res => {
                    commit("setCurrentTeamCode", res.teamCode);
                    return res.teamCode;
                }
            );
        },

        createTeam({ commit }, params) {
            //params = {name, description, topic, needPhysicalSpace}
            return teamsAPI.create(params).then(
                res => {
                    commit('setCurrentTeam', res.team);
                    return res.team;
                }
            )
        },

        //button游泳
        leaveTeam({ commit }) {
            return teamsAPI.leave().then(
                () => {
                    commit('setCurrentTeam', null);
                }
            )
        },

        //button游泳
        joinTeam({ commit }, params) {
            // params = { teamId, teamCode }
            return teamsAPI.join(params).then(
                res => {
                    commit('setCurrentTeam', res.team);
                    return res.team;
                }
            )
        },

        //edit toggle team private
        toogleTeamPrivate({ commit }) {
            return teamsAPI.tooglePrivate({}).then(
                res => {
                    commit('toogleTeamPrivate');
                    commit('setCurrentTeamCode', res.teamCode);
                }
            )
        },

        //掛在button上 （all can be edited）
        editTeam({ commit }, params) {
            // params = { name, topic, description, leader, needPhysicalSpace }
            return teamsAPI.edit(params).then(
                () => {
                    commit('updateCurrentTeam', params)
                }
            )
        }





    },
}
