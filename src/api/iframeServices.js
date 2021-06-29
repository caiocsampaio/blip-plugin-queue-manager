import _config from "appsettings.json";
import { IframeMessageProxy } from "iframe-message-proxy";

const ACTION_SEND_COMMAND = _config.iframe.sendCommandAction;
// const DESTINATION_MESSAGING_HUB = _config.iframe.messagingHub;
const TO_POSTMASTER_MSGING = _config.iframe.msging;
// const TO_POSTMASTER_DESK = _config.iframe.desk;

export const getAccount = async () => {
  const { response: account } = await IframeMessageProxy.sendMessage({
    action: "getAccount",
  });

  return account;
};

export const getResources = async () => {
  const { response } = await IframeMessageProxy.sendMessage({
    action: ACTION_SEND_COMMAND,
    content: {
      command: {
        to: TO_POSTMASTER_MSGING,
        method: "get",
        uri: `/resources`,
      },
    },
  });
  console.log(`response`, response)
  return response;
};