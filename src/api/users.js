import adminAxios from './admin_api'

export default {
    listAllUsers () {
        return adminAxios.get('/user/listAllUsers').catch(err => console.log(err))
    },
}
