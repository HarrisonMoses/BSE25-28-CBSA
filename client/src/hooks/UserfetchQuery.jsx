import axios from 'axios';

const baseUrl = 'http://localhost:8000/';

const api = axios.create({
    baseURL: baseUrl,
})

const auth = axios.create({
  baseURL: baseUrl,
});

export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('acessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}
export const removeTokens = () => {
    localStorage.removeItem('acessToken', accessToken);
    localStorage.removeItem('refreshToken', refreshToken);
}

export const getAccessToken = (token) => {
    return localStorage.getItem(token);
}

export const VerifyToken = async (tokenkey) => {
    const token = getAccessToken(tokenkey);
    if (!token) { return False }
    const res = await auth.post('/auth/verify', { token: token });
    return res.status === 200 ? true :false;
}
export const redirectToLogin = () => {
  window.location.href = "/login";
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    redirectToLogin();
    return null;
    }
    // verify the token before i refresh token
    const res = await VerifyToken('refreshToken');
    if (res.status !== 200) {
        redirectToLogin();
        return null;
    } else {
        try {
            const response = await auth.post("auth/jwt/refresh/", {
                refresh: refreshToken,
            });
            const { access } = response.data;
            localStorage.setItem("accessToken", access);
            return access;
        } catch (error) {
            redirectToLogin();
            return null;
        }
    }
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error.config;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        api.defaults.headers["Authorization"] = "JWT " + newAccessToken;
        originalRequest.headers["Authorization"] = "JWT " + newAccessToken;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(

    async (config) => {
        


        const unprotectedEndpoints = [
            "auth/users/", // Registration endpoint
            "auth/jwt/create", // Login endpoint
            "auth/jwt/refresh", // Refresh token endpoint
            "auth/verify", // Verify token endpoint
        ];

        // Check if the request URL matches any of the unprotected endpoints
        if (
          unprotectedEndpoints.some((endpoint) => config.url.includes(endpoint))
        ) {
          return config;
        }

    const accessToken = getAccessToken();
    if (!accessToken) {
      redirectToLogin();
      return;
    }
    config.headers["Authorization"] = "JWT " + accessToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const Login_Auth = async(credentials) => {
    const res = await auth.post('auth/jwt/create', credentials);
    return res.data;
} 

export const Register_Auth = async (credentials) => { 
    const res = await auth.post('auth/users/', credentials);
    return res.data;
}
export const Current_user = async () => {
    const res = await api.get('auth/users/me/');
    return res.data;
}