import aws_verify from "../../api/aws_verify"

export default{
    namespaced: true,
    state:{
        currentImgUrl: null,
        verificationStatus: 'not submitted',
    },
    getters:{
        currentImgUrl: state => state.currentImgUrl,
        verificationStatus: state => state.verificationStatus
    },
    mutations:{
        setCurrentImgUrl: (state, imgUrl) => {
            state.currentImgUrl = imgUrl;
        },
        setVerificationStatus: (state, status) => {
            state.verificationStatus = status;
        }
    },
    actions:{
        awsVerify({ commit }, params, token){
            return aws_verify.awsVerify(params, token).then(res=>{
                console.log(`[*]AwsVerify:: Send URL Success, ${res}`);
                commit("setCurrentImgUrl", res.currentImgUrl);
                commit("setVerificationStatus", "pending");
                return res;
            })
        },
        isAWSVerified({ commit }, token ) {
            return aws_verify.isAWSVerified(token).then(
                res => {
                    commit("setCurrentImgUrl", res.imgURL);
                    commit("setVerificationStatus", res.status)
                }
            )
        }
    }
}

