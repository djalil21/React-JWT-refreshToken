import api from "./api";
import TokenService from "./token.service";

// const API_URL = 'http://localhost:1000/auth'


const signup = (email, password) => {
    return api
        .post("/auth/signup", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                TokenService.setUser(response.data)
                        }

            return response.data;
        });
};

const login = (email, password) => {
    return api
        .post("/auth/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                TokenService.setUser(response.data)
                        }

            return response.data;
        });
};

const logout = () => {
    TokenService.removeUser()
};

const getCurrentUser = () => {
    return TokenService.getUser();
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
};

export default authService;