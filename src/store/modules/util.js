import router from '@/routes'

export default {
    namespaced: true,
    state: {},
    getters: {
        isOverviewPage: function (){ 
            console.log(router);
            return router.name === 'overview'}
    },
    mutations: {}
}