import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASEURL;

// Create axios instances
export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export const auth = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// Token management
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

let isRefreshing = false;
let failedRequests = [];

const processFailedRequests = (token) => {
  failedRequests.forEach((prom) => prom.resolve(token));
  failedRequests = [];
};

const addToFailedRequests = (resolve, reject) => {
  failedRequests.push({ resolve, reject });
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const publicEndpoints = ["auth/jwt/create/", "auth/users/"];
    if (publicEndpoints.some((endpoint) => config.url.includes(endpoint))) {
      return config;
    }

    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    // If no refresh token or it's a login request, reject
    if (!refreshToken || originalRequest.url.includes("auth/jwt/create/")) {
      removeTokens();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Handle 401/403 errors
    if ([401, 403].includes(error.response?.status)) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const response = await auth.post("auth/jwt/refresh/", {
              refresh: refreshToken,
            });

            const newAccessToken = response.data.access;
            setTokens(newAccessToken, refreshToken);
            originalRequest.headers.Authorization = `JWT ${newAccessToken}`;

            // Process queued requests
            processFailedRequests(newAccessToken);
            isRefreshing = false;

            // Retry original request
            return api(originalRequest);
          } catch (refreshError) {
            // Refresh failed - clear tokens and redirect
            removeTokens();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        } else {
          // If already refreshing, queue the request
          return new Promise((resolve, reject) => {
            addToFailedRequests(resolve, reject);
          })
            .then((newAccessToken) => {
              originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
      }
    }

    return Promise.reject(error);
  }
);
