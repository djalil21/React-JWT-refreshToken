import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://localhost:1000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
        config.headers['Authorization']= 'Bearer '+token
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post("/auth/token", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

            const { accessToken } = rs.data;
            
            console.log("updateNewAccessToken", accessToken);

          TokenService.updateNewAccessToken(accessToken);

          return instance(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      }
      
      return Promise.reject(err)
  }
);

export default instance