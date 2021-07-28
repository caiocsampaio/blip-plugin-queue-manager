import iframeService from "./iframeServices";
import _config from "appsettings.json";

const RESOURCE_TYPE = 'application/json';

const setQueue = async (queue) => {
  const response = await iframeService.setQueue(queue);
  return response;
}

const changeQueueStatus = async (isActive, queue) => {
  queue.isActive = isActive;
  const response = await iframeService.setQueue(queue);
  return response;
}

const getQueueResource = async () => {
  const resourceName = _config.resource.name;
  const resource = await iframeService.getResource(resourceName);
  return resource;
}

const setQueueResource = async (data) => {
  const resourceName = _config.resource.name;
  try {
    const response = await iframeService.setResource(resourceName, RESOURCE_TYPE, data);
    return response;
  } catch (e) {
    return null;
  }
}

const blipServices = { setQueue, changeQueueStatus, getQueueResource, setQueueResource }
export default blipServices;