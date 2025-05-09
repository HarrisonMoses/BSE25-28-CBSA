import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthRedirect = ({
  children,
  redirectPath = "/",
  requireUnauthenticated = true,
}) => {
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("AuthRedirect:", { isAuthenticated, loading, error });
    }
  }, [isAuthenticated, loading, error]);


  if (requireUnauthenticated ? isAuthenticated : !isAuthenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children;
};

export default AuthRedirect;
