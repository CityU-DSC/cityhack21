import adminAxios from './admin_api'

export default {
    listAllUsers () {
        console.log("FROMAPI", adminAxios);
        return adminAxios.get('/user/listAllUsers').catch(err => console.log(err))
    },
}
