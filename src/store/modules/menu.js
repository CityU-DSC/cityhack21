export default {
  namespaced: true,
  state: {
    drawerOpen: false
  },
  getters: {
    drawer: state => state.drawerOpen
  },
  mutations: {
    setDrawer: (state, drawerState) => {
      state.drawerOpen = drawerState;
    }
  },
};
