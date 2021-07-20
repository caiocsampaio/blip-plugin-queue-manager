import { setQueue } from "./iframeServices";

export const changeQueueStatus = async (isActive, queue) => {
  queue.isActive = isActive;
  const response = await setQueue(queue);
  return response;
}