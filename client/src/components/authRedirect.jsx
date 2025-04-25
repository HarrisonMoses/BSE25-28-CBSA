
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;
