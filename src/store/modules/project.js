import projectAPI from '../../api/project'

const dc = x => x? JSON.parse(JSON.stringify(x)): undefined;

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
        toggleProjectVote: (state, voteProjectId) => {
          for (let project of state.projectLists ){
            if (project._id == voteProjectId._id){
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
        toggleProjectVote({ commit }, voteProjectId) {
            // params = { voteProjectId }
            return projectAPI.toggleVote({voteProjectId}).then(
                res => {
                    commit('toggleProjectVote', voteProjectId);
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
        },
        setProjectStatus({ commit, state }, params) {
            // params = { projectId, status }
            return projectAPI.setStatus(params). then(
                async res => {

                    const currentProject = dc(state.currentProject);
                    const projectLists = dc(state.projectLists);
                    
                    if (currentProject && currentProject._id == params.projectId){
                        currentProject.status = params.status;
                        commit('setCurrentProject', currentProject)                        
                    }
                    for (let project of projectLists){
                        if (project._id == params.projectId){
                            project.status = params.status;
                        }
                    }
                    commit('setProjectsList', projectLists)
                    
                    return res;
                }
            )
        }
    },
}
