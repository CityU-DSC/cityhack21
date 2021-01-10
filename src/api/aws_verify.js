import axios from "./api";

export default {
    awsVerify(params, token) {
        return axios.post("/user/createAWSVerification",
            {imageUrl: params.imageUrl},
            {headers: {Authorization: "Bearer " + token}}
        );
    },
    isAWSVerified(token) {
        return axios.get('/user/isAWSVerified', {headers: {Authorization: "Bearer " + token}});
    },

    getAWSVerifications() {
        return axios.get('/user/awsVerifications').catch(console.error);
    },
};
