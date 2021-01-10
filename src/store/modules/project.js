import projectAPI from '../../api/project'

export default {
    namespaced: true,
    state: {
        projectLists: [],
        currentProject: null,
    },
    getters: {
        projectLists: state => state.projectLists,
        currentProject: state => state.currentProject,
    },
    mutations: {
        // eslint-disable-next-line no-return-assign
        setProjectsList: (state, projectsList) => state.projectsList = projectsList,
        setCurrentProject: (state, project) => state.currentProject = project,
        toogleProjectVote: (state, projectVoted) => {
          for (let project of state.projectLists ){
            if (project._id == projectVoted._id){
              project.voted = !project.voted;
            }
          }
        },
        addCurrentProjectToProjectList: (state) => {
          state.projectLists.unshift(state.currentProject);
      }
    },
    actions: {
        listAllProjects({ commit }){
            return projectAPI.all().then(res =>
            {
                commit('setProjectsList', res.projects);
                return res.projects;
            })
        },

        myProject({ commit }) {
            return projectAPI.me().then(
                res => {
                    commit("setCurrentProject", res.project)
                    return res.project;
                }
            )
        },

        createProject({ commit }, params) {
            //params = {pdfUrl, repositoryUrl, description, motivation, tech, name}
            return projectAPI.create(params).then(
                async res => {
                    commit('setCurrentProject', res.project);
                    commit('addCurrentProjectToProjectList');
                    return res.project;
                }
            )
        },

        // edit toggle project like
        toggleProjectVote({ commit }) {
            return projectAPI.toogleVote({}).then(
                res => {
                    commit('toogleProjectVote');
                    return res;
                }
            )
        },
        editProject({ commit }, params) {
            // params = {pdfUrl, repositoryUrl, description, motivation, tech, name}
            return projectAPI.edit(params).then(
                async (res) => {
                  commit('setCurrentProject', res.project)
                  return res.project;
                }
            )
        }
    },
}
