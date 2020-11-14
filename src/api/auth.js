import axios from './api';

export default {
    loginByToken(token) {
        return axios.post('/login', {token: token}, {headers: {'Authorization': "Bearer " + token}})
            .then(res => {
                console.log(`[*]Login by token ${res.data}`);
                return res.data;
            });
    },
    loginByEmailPassword(params) {
        return axios.post('/user/login', {email: params.email, password: params.password})
            .then(res => res).catch(err => console.log(err));
    },
    registerUser(params){
        return axios.post('/user/register', params)
            .then(res => res).catch(err => console.log(err));
    },
}