import React, { useState, createContext } from "react";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  // toggle button
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // selected item
  const [selectedUrl, setSelectedUrl] = useState(window.location.pathname);
  const drawerWidth = 240;

  // selected item
  const handleListItemClick = (event, url) => {
    setSelectedUrl(url);
  };

  return (
    <HeaderContext.Provider
      value={{
        toggleSidebar,
        setToggleSidebar,
        drawerWidth,
        selectedUrl,
        setSelectedUrl,
        handleListItemClick,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
