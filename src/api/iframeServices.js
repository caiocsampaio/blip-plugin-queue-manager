import _config from "appsettings.json";
import { IframeMessageProxy } from "iframe-message-proxy";

const ACTION_SEND_COMMAND = _config.iframe.sendCommandAction;
// const DESTINATION_MESSAGING_HUB = _config.iframe.messagingHub;
const TO_POSTMASTER_MSGING = _config.iframe.msging;
const TO_POSTMASTER_DESK = _config.iframe.desk;
const QUEUE_JSON_TYPE = _config.iframe.queueType;

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

  return response;
};

export const getResource = async (resource) => {
  const { response } = await IframeMessageProxy.sendMessage({
    action: ACTION_SEND_COMMAND,
    content: {
      command: {
        to: TO_POSTMASTER_MSGING,
        method: "get",
        uri: `/resources/${resource}`,
      },
    },
  });
  return response;
};

export const setResource = async (resourceName, resourceType, resourceContent) => {
  const { response } = await IframeMessageProxy.sendMessage({
    action: ACTION_SEND_COMMAND,
    content: {
      command: {
        to: TO_POSTMASTER_MSGING,
        method: "set",
        uri: `/resources/${resourceName}`,
        type: resourceType,
        resource: resourceContent
      },
    },
  });
  return response;
};

export const getQueues = async () => {
  const { response } = await IframeMessageProxy.sendMessage({
    action: ACTION_SEND_COMMAND,
    content: {
      command: {
        to: TO_POSTMASTER_DESK,
        method: "get",
        uri: `/attendance-queues`,
      },
    },
  });
  
  if (!response || response.status === 'failure') {
    return {};
  }

  return response.items;
}

export const getQueue = async (id) => {
  const { response } = await IframeMessageProxy.sendMessage({
    action: ACTION_SEND_COMMAND,
    content: {
      command: {
        to: TO_POSTMASTER_DESK,
        method: "get",
        uri: `/attendance-queues/${id}`,
      },
    },
  });
  
  if (!response || response.status === 'failure') {
    return {};
  }

  return response;
}

export const setQueue = async (queue) => {
  const { response } = await IframeMessageProxy.sendMessage({
    action: ACTION_SEND_COMMAND,
    content: {
      command: {
        to: TO_POSTMASTER_DESK,
        method: "set",
        uri: `/attendance-queues`,
        type: QUEUE_JSON_TYPE,
        resource: queue
      },
    },
  });
  return response;
}