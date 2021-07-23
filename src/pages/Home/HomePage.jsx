import { changeQueueStatus } from "api/blipServices";
import { withLoading } from "api/commonServices";
import helperServices from "api/helpersServices";
import iframeService from "api/iframeServices";
import { BdsButton, BdsTypo } from "blip-ds/dist/blip-ds-react";
import { QueueList } from "components/QueueList/QueueList";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    withLoading(async () => {
      const queuesFromDesk = await iframeService.getQueues();
      if (queuesFromDesk.length > 0) {
        const sorted = helperServices.sortQueues(queuesFromDesk);
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
      <div className="d-flex flex-row justify-content-between">
        <BdsTypo variant="fs-20" bold="bold" className="hydrated">
          {"Filas de atendimento"}
        </BdsTypo>
        <Link to={`/createQueue`}>
          <BdsButton icon="add">{"Criar nova fila"}</BdsButton>
        </Link>
      </div>
      {queues.length > 0 ? (
        <QueueList queues={queues} handleSwitchQueue={handleSwitchQueue} />
      ) : (
        <BdsTypo variant="fs-14" bold="regular" className="hydrated">
          {"Você ainda não possui nenhuma fila de atendimento cadastrada."}
        </BdsTypo>
      )}
    </div>
  );
};
