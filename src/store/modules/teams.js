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
        },
        addCurrentTeamToTeamList: (state) => {
            state.teamLists.unshift(state.currentTeam);
        },
        removeMemberFromTeam(state, { teamId, memberId, newLeaderId=undefined }) {
            if (state.currentTeam && state.currentTeam._id == teamId){
                state.currentTeam.members = state.currentTeam.members.filter(x => x._id != memberId);
                if (newLeaderId && state.currentTeam.leader._id == memberId){
                    state.currentTeam.leader = state.currentTeam.members.filter(x => x._id == newLeaderId)[0];
                }
            }
            for (let i = 0; i < state.teamsList.length; i ++){
                if (state.teamsList[i]._id == teamId){
                    state.teamsList[i].members = state.currentTeam.members.filter(x => x._id != memberId);
                    if (newLeaderId && state.teamsList[i].leader._id == memberId){
                        state.teamsList[i].leader = state.teamsList[i].members.filter(x => x._id == newLeaderId)[0];
                    }
                }
            }
        }
    },
    actions: {
        // listAllTeams({ commit }){
        //     return teamsAPI.all().then(res =>
        //     {
        //         commit('setTeamsList', res.teams);
        //         return res.teams;
        //     })
        // },

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
            return teamsAPI.search(params).then(res => res.teams);
        },

        // getTeamCode({ commit }) {
        //     // Get team code for my team (private team)
        //     return teamsAPI.teamCode().then(
        //         res => {
        //             commit("setCurrentTeamCode", res.teamCode);
        //             return res.teamCode;
        //         }
        //     );
        // },

        createTeam({ commit }, params) {
            //params = {name, description, topic, needPhysicalSpace}
            return teamsAPI.create(params).then(
                async res => {
                    commit('setCurrentTeam', res.team);
                    commit('addCurrentTeamToTeamList');
                    return res.team;
                }
            )
        },
        leaveTeam({ commit }) {
            return teamsAPI.leave().then(
                async () => {
                    commit('setCurrentTeam', null);
                }
            )
        },
        joinTeam({ commit }, params) {
            // params = { teamId, teamCode }
            return teamsAPI.join(params).then(
                async res => {
                    commit('setCurrentTeam', res.team);
                    return res.team;
                }
            )
        },

        //edit toggle team private
        // toggleTeamPrivate({ commit }) {
        //     return teamsAPI.tooglePrivate({}).then(
        //         res => {
        //             commit('toogleTeamPrivate');
        //             commit('setCurrentTeamCode', res.teamCode);
        //             return res.teamCode;
        //         }
        //     )
        // },
        editTeam({ commit }, params) {
            // params = { name, topic, description, leader, needPhysicalSpace }
            return teamsAPI.edit(params).then(
                async (res) => {
                    commit('setCurrentTeam', res.team)
                    return res.team;
                }
            )
        },
        kickMember({ commit, state }, params) {
            // params = { kickMemberId };
            return teamsAPI.kickMember(params).then(
                async res => {
                    commit('removeMemberFromTeam', {
                        teamId: state.currentTeam._id,
                        memberId: params.kickMemberId 
                    });
                    return res;
                }
            )
        }
    },
}
