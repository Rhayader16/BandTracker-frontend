import { createContext, useContext, useState, useEffect } from "react";
import myApi from "../service/axios";

export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function authenticateUser() {
    const storeToken = localStorage.getItem("authToken");
    if (!storeToken) {
      //Here there's no token so the user isn't logged in
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }
    try {
      const user = await myApi.getUserInfo(); //Here the token is valid and the user can login (changing of the state)
      setUser(user);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      //Here there's an error (expired or invalid token) and the user can't log in
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, authenticateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextWrapper;
