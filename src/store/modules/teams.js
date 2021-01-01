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
                    return res.teams;
                }
            )
        },

        searchTeam({ commit }, params) {
            // params = {name, teamLeaderAccountId, useAtlas, useSagemaker}
            return teamsAPI.search(params);
        },

        getTeamCode({ commit }, params) {
            // Get team code for my team (private team)
            return teamsAPI.teamCode().then(
                res => {
                    commit("setCurrentTeamCode", res.teamCode);
                    return res.teamCode;
                }
            );
        },

        createTeam({ commit }, params) {
            // params = {name, description, topic, needPhysicalSpace, private}
            return teamsAPI.create().then(
                res => {
                    commit('setCurrentTeam', res.team);
                    return res.team;
                }
            )
        },
        
        leaveTeam({ commit }, params) {
            return teamsAPI.leave().then(
                res => {
                    commit('setCurrentTeam', null);
                }
            )
        },
        


    },
}
