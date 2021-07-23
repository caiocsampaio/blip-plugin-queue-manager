import { QueueListCard } from "components/QueueListCard/QueueListCard";
import React from "react";

export const QueueList = ({ queues, handleSwitchQueue }) => {
  return queues.map((queue) => (
    <QueueListCard key={queue.id} queue={queue} handleSwitchQueue={handleSwitchQueue} />
  ));
};
