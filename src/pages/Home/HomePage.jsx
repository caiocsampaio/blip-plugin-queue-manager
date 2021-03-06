import blipServices from "api/blipServices";
import commonServices from "api/commonServices";
import helperServices from "api/helpersServices";
import iframeServices from "api/iframeServices";
import { BdsButton, BdsTypo } from "blip-ds/dist/blip-ds-react";
import { CreateQueueModal } from "components/CreateQueueModal/CreateQueueModal";
import { QueueList } from "components/QueueList/QueueList";
import React, { useEffect, useState } from "react";

export const HomePage = () => {
  const [queues, setQueues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    commonServices.withLoading(async () => {
      await setQueuesListData();
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      commonServices.withoutLoading(async () => {
        await setQueuesListData();
      });
    }
  }, [isModalOpen]);

  const setQueuesListData = async () => {
    const queuesFromDesk = await iframeServices.getQueues();
    if (queuesFromDesk.length > 0) {
      const sorted = helperServices.sortQueues(queuesFromDesk);
      setQueues(sorted);
    }
  };

  const handleSwitchQueue = async (e, queue) => {
    const checked = e.target.checked;
    await blipServices.changeQueueStatus(checked, queue);
  };

  const handleCreateQueueClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClick = async (isSave, value) => {
    try {
      if (!isSave) {
        setIsModalOpen(false);
      }

      const response = await blipServices.setQueue({
        name: value,
        isActive: true,
      });
      const success = response !== null;

      commonServices.showToast({
        title: success ? null : "Algo deu errado...",
        type: success ? "success" : "danger",
        message: success
          ? "Fila criada com sucesso!"
          : "Houve um erro ao salvar a fila, tente novamente.",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <BdsTypo variant="fs-20" bold="bold" className="hydrated">
          {"Filas de atendimento"}
        </BdsTypo>
        <BdsButton icon="add" onClick={handleCreateQueueClick}>
          {"Criar nova fila"}
        </BdsButton>
      </div>
      {queues.length > 0 ? (
        <QueueList queues={queues} handleSwitchQueue={handleSwitchQueue} />
      ) : (
        <BdsTypo variant="fs-14" bold="regular" className="hydrated">
          {"Voc?? ainda n??o possui nenhuma fila de atendimento cadastrada."}
        </BdsTypo>
      )}
      <CreateQueueModal open={isModalOpen} handleClick={handleModalClick} />
    </div>
  );
};
