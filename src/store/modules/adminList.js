export default {
  namespaced: true,
  state: {
    adminList: ["r@g.c", "ryanyen89@gmail.com", "lowzhao2", "lowzhao@gmail.com"]
  },
  getters: {
    adminList: state => state.adminList
  }
};
