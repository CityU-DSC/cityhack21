import aws_verify from "../../api/aws_verify"

export default{
    namespaced: true,
    state:{
        currentImgUrl: null,
        verificationStatus: 'not submitted',
        awsVerifications: [],
        allAWSVerifications: [],
    },
    getters:{
        currentImgUrl: state => state.currentImgUrl,
        verificationStatus: state => state.verificationStatus,
        awsVerifications: state => state.awsVerifications,
        vuexGetAllAWSVerifications: state => state.allAWSVerifications,
    },
    mutations:{
        setCurrentImgUrl: (state, imgUrl) => {
            state.currentImgUrl = imgUrl;
        },
        setVerificationStatus: (state, status) => {
            state.verificationStatus = status;
        },
        setAWSVerifications: (state, aws) => state.awsVerifications = aws,
        setAllAWSVerifications: (state, allAWSVerifications) => state.allAWSVerifications = allAWSVerifications,
        setVerificationStatusForAWSVerification: (state, { awsVerification, status }) => {
            let toUpdates = [...state.awsVerifications.filter(s => s._id == awsVerification._id), ...state.allAWSVerifications.filter(s => s._id == awsVerification._id)];
            for (let toUpdate of toUpdates){
                toUpdate.status = status;
                if (state.awsVerifications.filter(s => s._id == awsVerification._id).length > 0){
                    state.verificationStatus = status;
                }
            }
        }
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
            return aws_verify.isAWSVerified().then(
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
        },
        getAllAWSVerification({commit}){
            return aws_verify.getAllAWSVerification().then(
                res => {
                    commit('setAllAWSVerifications', res.awsVerifications)
                    return res
                });
        },
        updateAWSVerificationStatus({commit}, params){
            // params = { awsId, status };
            return aws_verify.updateAWSVerificationStatus(params).then(
                res => {
                    commit('setVerificationStatusForAWSVerification',
                        { awsVerification: params.awsId, status: params.status }
                    );
                    return res;
                }
            )
        },

    }
}

