import React from 'react'
import _config from "../appsettings.json";

// @ts-ignore
const ConfigContext = React.createContext();

const ConfigProvider = ({ children }) => {
  const TITLE = _config.common.title;
  const VERSION = _config.common.version;

  const value = {
    TITLE,
    VERSION,
  };
  
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
