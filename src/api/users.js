import adminAxios from './admin_api'
// import querystring from 'querystring'

export default {
    listAllUsers (params) {
        // let filter = querystring.stringify(params) ? '?' + querystring.stringify(params) : "";
        return adminAxios.get(`/user/listAllUsers/`, {params: params}).catch(err => console.log(err))
    },
}
