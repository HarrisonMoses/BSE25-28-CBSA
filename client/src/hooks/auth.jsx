import { api, auth, setTokens } from "./axiosConfigs/intercepters";

export const Register_Auth = async (credentials) => {
  try {
    const res = await auth.post('auth/users/', credentials);
    return res;
  } catch (error) {
    throw error;
  }
}
    

export const Login_Auth = async (credentials) => {
 
  try { 
    const response = await auth.post("auth/jwt/create/", credentials);
    const { access, refresh } = response.data;
    setTokens(access, refresh);
    return response;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};


export const Current_user = async () => {
  const res = await api.get("auth/users/me/");
  return res.data;
};