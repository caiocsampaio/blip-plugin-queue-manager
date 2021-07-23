import { changeQueueStatus } from "api/blipServices";
import { withLoading } from "api/commonServices";
import { sortQueues } from "api/helpersServices";
import iframeService from "api/iframeServices";
import {
  BdsTypo
} from "blip-ds/dist/blip-ds-react";
import { QueueList } from "components/QueueList/QueueList";
import React, { useEffect, useState } from "react";

export const HomePage = () => {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    withLoading(async () => {
      const queuesFromDesk = await iframeService.getQueues();
      if (queuesFromDesk.length > 0) {
        const sorted = sortQueues(queuesFromDesk);
        setQueues(sorted);
      }
    });
  }, []);

  const handleSwitchQueue = async (e, queue) => {
    const checked = e.target.checked;
    await changeQueueStatus(checked, queue);
  };

  return (
    <div>
      <BdsTypo variant="fs-20" bold="bold" className="hydrated">
        Filas de atendimento
      </BdsTypo>
      {queues.length > 0 ? (
        <QueueList queues={queues} handleSwitchQueue={handleSwitchQueue} />
      ) : (
        <BdsTypo variant="fs-14" bold="regular" className="hydrated">
          Você ainda não possui nenhuma fila de atendimento cadastrada.
        </BdsTypo>
      )}
    </div>
  )
};
