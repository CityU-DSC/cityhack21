import router from "@/routes";

export default {
  namespaced: true,
  state: {
    isOverviewPage: function() {
      return router.currentRoute.name === "overview";
    }
  },
  getters: {},
  mutations: {}
};
