import { getOrCreateConfigResource, withLoading } from "api/commonServices";
import iframeService from "api/iframeServices";
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigContext";

// @ts-ignore
const CommonContext = React.createContext();

const CommonProvider = ({ children }) => {
  const { CONFIG_RESOURCE } = useContext(ConfigContext);
  const [account, setAccount] = useState({});
  const [queueConfig, setQueueConfig] = useState({});

  useEffect(() => {
    withLoading(async () => {
      setAccount(await iframeService.getAccount());
      setQueueConfig(await getOrCreateConfigResource(CONFIG_RESOURCE));
    });
  }, [CONFIG_RESOURCE]);

  const value = { account, queueConfig };

  return <CommonContext.Provider value={value}>{children}</CommonContext.Provider>;
};

export { CommonProvider, CommonContext };
