import aws_verify from "../../api/aws_verify"

export default{
    namespaced: true,
    state:{
        currentImgUrl: null,
        verificationStatus: 'not submitted',
        awsVerifications: [],
    },
    getters:{
        currentImgUrl: state => state.currentImgUrl,
        verificationStatus: state => state.verificationStatus,
        awsVerifications: state => state.awsVerifications,
    },
    mutations:{
        setCurrentImgUrl: (state, imgUrl) => {
            state.currentImgUrl = imgUrl;
        },
        setVerificationStatus: (state, status) => {
            state.verificationStatus = status;
        },
        setAWSVerifications: (state, aws) => state.awsVerifications = aws,
    },
    actions:{
        awsVerify({ commit }, params){
            const token = localStorage.getItem('jwt');
            return aws_verify.awsVerify(params, token).then(res=>{
                console.log(`[*]AwsVerify:: Send URL Success, ${res}`);
                commit("setCurrentImgUrl", res.currentImgUrl);
                commit("setVerificationStatus", "pending");
                return res;
            })
        },
        isAWSVerified({ commit } ) {
            const token = localStorage.getItem('jwt');
            return aws_verify.isAWSVerified(token).then(
                res => {
                    commit("setCurrentImgUrl", res.imgURL);
                    commit("setVerificationStatus", res.status)
                }
            )
        },
        getAWSVerifications({commit}) {
            return aws_verify.getAWSVerifications().then(res => {
                commit('setAWSVerifications', res.awsVerifications);
                return res.awsVerifications;
            })
        }
    }
}

