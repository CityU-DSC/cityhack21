import adminAxios from './admin_api'
import axios from './api'
// import querystring from 'querystring'

export default {
    listAllUsers () {
        return adminAxios.get('/user/listAllUsers').catch(err => console.log(err))
    },
    listReferrers() {
        return axios.get(`/user/referrerCounts`).catch(err => console.error(err));
    }
}
