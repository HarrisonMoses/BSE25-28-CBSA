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

  if (loading) {
    // Show a loading spinner while auth state is being checked
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    console.error("Authentication error:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <p>Error verifying authentication status</p>
          <p className="text-sm text-gray-500">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  if (requireUnauthenticated ? isAuthenticated : !isAuthenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children;
};

export default AuthRedirect;
