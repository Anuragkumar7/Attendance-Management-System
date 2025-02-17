import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // ✅ Check if the user is already logged in
    axios
      .get("http://localhost:8082/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setRole(res.data.role);
      })
      .catch(() => {
        setUser(null);
        setRole(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, setUser, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
