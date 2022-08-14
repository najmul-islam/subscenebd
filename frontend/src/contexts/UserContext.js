import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
export const UserContext = createContext();

const API_URL = "/api/users/";
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  };

  const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
