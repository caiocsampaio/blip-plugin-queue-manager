import React from 'react'
import _config from "../appsettings.json";

// @ts-ignore
const ConfigContext = React.createContext();

const ConfigProvider = ({ children }) => {
  const TITLE = _config.common.title;
  const VERSION = _config.common.version;
  const CONFIG_RESOURCE = _config.resource.name;

  const value = {
    TITLE,
    VERSION,
    CONFIG_RESOURCE
  };
  
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
