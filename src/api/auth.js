import axios from "./api";

export default {
  loginByToken(token)
  {
    return axios
      .post(
        "/login",
        { token: token },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(res =>
      {
        console.log(`[*]Login by token ${res.data}`);
        return res.data;
      });
  },
  loginByEmailPassword(params)
  {
    return axios.post("/user/login", { email: params.email, password: params.password });
  },
  registerUser(params)
  {
    return axios.post("/user/register", params, { timeout: 10 * 1000 });
  },
  verifyUser(params)
  {
    return axios.post("/user/verifyEmail", params);
  },
  resendVerification(params)
  {
    return axios.post("/user/reverifyEmail", params, { timeout: 10 * 1000 });
  },
  me(token)
  {
    return axios.get('/user/me', { headers: { Authorization: "Bearer " + token } })
  },
  updateMe(params, token)
  {
    return axios.put('/user/me', params, { headers: { Authorization: "Bearer " + token } })
  }
};
