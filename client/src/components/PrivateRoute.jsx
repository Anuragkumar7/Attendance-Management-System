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
            withCredentials: true, // Keep credentials with the request
            headers: { "Content-Type": "application/json" },
          }
        );

        // Assuming the API returns a `role` field
        const userRole = userResponse.data.role;

        // Check if the user role matches the allowed roles
        setIsAuthorized(roles.includes(userRole));
      } catch (error) {
        console.error("Authorization failed", error);
        // Handle authorization error (like expired session)
        setIsAuthorized(false);
      } finally {
        setIsLoading(false); // Set loading to false after the check
      }
    };

    fetchUserRole();
  }, [roles]); // Re-run the effect if the roles prop changes

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (isAuthorized) {
    return children; // If the user is authorized, render the children
  }

  // If the user is not authorized, redirect them to the login page
  return <Navigate to="/login" />;
};

export default PrivateRoute;
