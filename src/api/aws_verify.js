import axios from "./api";

export default {
  awsVerify(params, token){
      return axios.post("/user/createAWSVerification",
      {imgURL: params.imgURL},
      { headers: { Authorization: "Bearer " + token } }
      );
  },
  isAWSVerified(token){
    return axios.get('/user/isAWSVerified', { headers: { Authorization: "Bearer " + token } });
  }
};
