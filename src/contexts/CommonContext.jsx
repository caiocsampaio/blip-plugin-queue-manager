import { getOrCreateConfigResource, withLoading } from "api/commonServices";
import { getAccount, getQueues } from "api/iframeServices";
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigContext";

// @ts-ignore
const CommonContext = React.createContext();

const CommonProvider = ({ children }) => {
  const { CONFIG_RESOURCE } = useContext(ConfigContext);
  const [account, setAccount] = useState({});
  const [queueConfig, setQueueConfig] = useState({})
  const [queues, setQueues] = useState([])
  
  useEffect(() => {
    withLoading(async () => {
      setAccount(await getAccount());
      setQueueConfig(await getOrCreateConfigResource(CONFIG_RESOURCE));
      setQueues(await getQueues());
    });
  }, [CONFIG_RESOURCE]);

  const value = { account, queueConfig, queues };

  return <CommonContext.Provider value={value}>{children}</CommonContext.Provider>;
}

export { CommonProvider, CommonContext };
