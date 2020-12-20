import aws_verify from "../../api/aws_verify"

export default{
    namespaced: true,
    state:{
        currentImgUrl: null
    },
    getters:{
        currentImgUrl: state => state.currentImgUrl
    },
    mutations:{
        setCurrentImgUrl: (state, imgUrl) => {
            state.currentImgUrl = imgUrl;
        }
    },
    actions:{
        awsVerify({ commit }, params, token){
            return aws_verify.awsVerify(params, token).then(res=>{
                console.log(`[*]AwsVerify:: Send URL Success, ${res}`);
                commit("setCurrentImgUrl", res.currentImgUrl);
                return res;
            })
        }
    }
}

