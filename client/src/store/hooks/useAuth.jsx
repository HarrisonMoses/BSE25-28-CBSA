import { useSelector, useDispatch } from "react-redux";
import {
  registerUser,
  loginUser,
  fetchCurrentUser,
  logoutUser,
  clearAuthError,
} from "../slices/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, accessToken, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  return {
   
    user,
    accessToken,
    isAuthenticated,
    authLoading: loading,
    authError: error,

    // Actions
    register: (credentials) => dispatch(registerUser(credentials)),
    login: (credentials) => dispatch(loginUser(credentials)),
    loadUser: () => dispatch(fetchCurrentUser()),
    logout: () => dispatch(logoutUser()),
    clearError: () => dispatch(clearAuthError()),
  };
};
