import { withLoading } from "api/commonServices";
import { getAccount, getResources } from "api/iframeServices";
import React, { useEffect, useState } from "react";

// @ts-ignore
const CommonContext = React.createContext();

const CommonProvider = ({ children }) => {
  const [account, setAccount] = useState({});
  const [resources, setResources] = useState([])
  
  useEffect(() => {
    withLoading(async () => {
      setAccount(await getAccount());
      setResources(await getResources());
    });
  }, []);

  const value = { account, resources };

  return <CommonContext.Provider value={value}>{children}</CommonContext.Provider>;
}

export { CommonProvider, CommonContext };
