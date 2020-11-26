export default {
  namespaced: true,
  state: {
    drawerOpen: false
  },
  getters: {
    drawer: state => state.drawerOpen
  },
  mutations: {
    toggleDrawer: state => {
      state.drawerOpen = !state.drawerOpen;
    }
  }
};
