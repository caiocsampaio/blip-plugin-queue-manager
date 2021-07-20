import { changeQueueStatus } from "api/blipServices";
import { sortQueues } from "api/helpersServices";
import {
  BdsButtonIcon,
  BdsPaper,
  BdsSwitch,
  BdsTooltip,
  BdsTypo,
} from "blip-ds/dist/blip-ds-react";
import { CommonContext } from "contexts/CommonContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const context = useContext(CommonContext);
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    setQueues(sortQueues(context.queues));
  }, [context]);

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
        context.queues.map((queue, idx) => (
          <BdsPaper key={`${idx}-${queue.name}`} elevation="static" className="m-3 p-4">
            <div className="d-flex flex-row align-items-center">
              <div className="col-lg-10 col-sm-6">
                <BdsTypo variant="fs-12" bold="regular" className="hydrated">
                  Nome da fila
                </BdsTypo>
                <BdsTypo variant="fs-16" bold="bold" className="hydrated">
                  {queue.name}
                </BdsTypo>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="d-flex justify-content-end">
                  <Link to={`/editAutoMessage/${queue.id}`}>
                    <BdsTooltip position="top-center" tooltipText="Mensagem automática">
                      <BdsButtonIcon icon="email" variant="secondary" size="short" />
                    </BdsTooltip>
                  </Link>
                  <Link to={`/editWorkingHours/${queue.id}`}>
                    <BdsTooltip position="top-center" tooltipText="Horários">
                      <BdsButtonIcon icon="clock" variant="secondary" size="short" />
                    </BdsTooltip>
                  </Link>
                  <div className="border-end border-2"></div>
                  <div className="d-flex align-items-center m-2">
                    <BdsSwitch
                      name={`${queue.id}-switch`}
                      refer={`${queue.id}-switch`}
                      checked={queue.isActive}
                      onBdsChange={(e) => handleSwitchQueue(e, queue)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </BdsPaper>
        ))
      ) : (
        <BdsTypo variant="fs-14" bold="regular" className="hydrated">
          Você ainda não possui nenhuma fila de atendimento cadastrada.
        </BdsTypo>
      )}
    </div>
  );
};
