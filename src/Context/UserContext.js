import React, { createContext, useState, useCallback } from "react";
import { fetchData } from "../api/FetchData";
import useOnce from "../api/UseOnce";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [botsWithLifetimeAccess, setBotsWithLifetimeAccess] = useState([]); // New state for bots data
  const [announcements, setAnnouncements] = useState([]);

  const loadUser = useCallback(async () => {
    try {
      const response = await fetchData("User/getuser", "GET");
      console.log(response);
      setIsLoggedIn(response.isLoggedIn);
      setUser(response.user);

      // Update bots data if the user's role is 'user' and data is available
      if (
        response.user &&
        response.user.role === "user" &&
        response.botsWithLifetimeAccess
      ) {
        setBotsWithLifetimeAccess(response.botsWithLifetimeAccess);
      }
      if (response.announcements) {
        setAnnouncements(response.announcements);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  console.log(botsWithLifetimeAccess);

  useOnce(loadUser);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        botsWithLifetimeAccess, // Make bots data available in context
        reloadUser: loadUser,
        announcements,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
