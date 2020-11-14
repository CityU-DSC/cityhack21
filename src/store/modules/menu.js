export default {
    namespaced: true,
    state: {
        drawerOpen: false,
    },
    getters: {
        drawer: (state) => state.drawerOpen,
    },
    mutations: {
        toogleDrawer: (state) => { state.drawerOpen = !state.drawerOpen }
    }
}