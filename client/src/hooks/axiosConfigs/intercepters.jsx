import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASEURL;

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json", 
  },
});

export const auth = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};
export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = (token) => {
  return localStorage.getItem(token);
};

export const VerifyToken = async (tokenkey) => {
  const token = getAccessToken(tokenkey);
  if (!token) return false;
  try {
    const res = await auth.post("/auth/jwt/verify/", { token });
    return res.status === 200;
  } catch (error) {
    return false;
  }
};
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
  const res = await VerifyToken("refreshToken");
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
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Auto-refresh token on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await auth.post("auth/jwt/refresh/", {
          refresh: localStorage.getItem("refreshToken"),
        });

        localStorage.setItem("accessToken", data.access);
        originalRequest.headers.Authorization = `JWT ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect on refresh failure
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    // const publicEndpoints = ["auth/jwt/create/", "auth/users/"];
    // if (publicEndpoints.some((endpoint) => config.url.includes(endpoint))) {
    //   return config;
    // }

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


