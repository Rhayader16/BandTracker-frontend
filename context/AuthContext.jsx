import { createContext, useContext, useState, useEffect } from "react";
import myApi from "../service/axios";

export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function storeToken(token) {
    localStorage.setItem("authToken", token);
  }

  async function authenticateUser() {
    const storeToken = localStorage.getItem("authToken");
    if (!storeToken) {
      //Here there's no token so the user isn't logged in
      setUser(null);
      setIsLoggedIn(false);
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await myApi.getUserInfo(); //Here the token is valid and the user can login (changing of the state)
      console.log(response);
      setUser(response.data);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      //Here there's an error (expired or invalid token) and the user can't log in
      removeToken();
      setUser(null);
      setIsLoggedIn(false);
      isAdmin(false);
      setIsLoading(false);
      console.log(error);
    }
  }

  async function checkAdminStatus() {
    try {
      const response = await myApi.checkAdmin(); // Sostituisci con l'endpoint appropriato
      console.log(response);
      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      setIsAdmin(false); // Se c'è un errore, l'utente non è un admin
      console.log(error);
    }
  }

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        isAdmin,
        authenticateUser,
        storeToken,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextWrapper;
