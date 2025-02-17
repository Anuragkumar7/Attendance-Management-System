import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children, roles }) => {
  const [isAuthorized, setIsAuthorized] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true); // For showing loading state

  React.useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:8082/api/auth/me",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        const userRole = userResponse.data.role;
        setIsAuthorized(roles.includes(userRole));
      } catch (error) {
        console.error("Authorization failed", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false); // Once the request is done, stop loading
      }
    };

    fetchUserRole();
  }, [roles]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while the role is being checked
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
