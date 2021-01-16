import axios from "./api";

export default {
    awsVerify(params, token) {
        return axios.post("/user/createAWSVerification",
            {imageUrl: params.imageUrl},
            {headers: {Authorization: "Bearer " + token}}
        );
    },
    isAWSVerified() {
        return axios.get('/user/isAWSVerified');
    },

    getAWSVerifications() {
        return axios.get('/user/awsVerifications').catch(console.error);
    },

    getAllAWSVerification() {
        return axios.get('/user/awsVerification/all').catch(console.error);
    },
    updateAWSVerificationStatus(params) {
        return axios.put('/user/awsVerification/status', params).catch(console.error);
    },
};
