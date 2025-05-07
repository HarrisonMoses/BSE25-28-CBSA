import { useEffect } from "react";
import { useAuth } from "../store/hooks/useAuth";

const AuthInitializer = ({ children }) => {
  const { accessToken,loadUser} = useAuth();

  useEffect(() => {
    if (accessToken) {
     loadUser(accessToken);
    }
  }, [accessToken]);

  return children;
};

export default AuthInitializer;
