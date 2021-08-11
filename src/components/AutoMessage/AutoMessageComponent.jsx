import blipServices from "api/blipServices";
import commonServices from "api/commonServices";
import constants from "api/constants";
import { showFeedbackInvalidAutoMessageForm } from "api/formServices";
import iframeService from "api/iframeServices";
import {
  BdsPaper, BdsTypo
} from "blip-ds/dist/blip-ds-react";
import { AutoMessageTextInput } from "components/AutoMessageTextInput/AutoMessageTextInput";
import { ChangesModal } from "components/ChangesModal";
import { FormBtnGroup } from "components/FormBtnGroup/FormBtnGroup";
import QueueTitle from "components/QueueTitle/QueueTitle";
import { Tooltip } from "components/Tooltip/Tooltip";
import { ConfigContext } from "contexts/ConfigContext";
import React, { useContext, useEffect, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";

 
export const AutoMessageComponent = ({ queueId }) => {
  const history = useHistory();
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(true);
  const { FORM } = useContext(ConfigContext);
  const [queue, setQueue] = useState({ name: "" });
  const [queueName, setQueueName] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [resource, setResource] = useState({});
  const [queueData, setQueueData] = useState(null);
  const [initialState, setInitialState] = useState({});
  const [goBack, setGoBack] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    commonServices.withoutLoading(async () => {
      setQueue(await iframeService.getQueue(queueId));
    });
  }, [queueId]);

  useEffect(() => {
    commonServices.withoutLoading(async () => {
      setQueueName(queue.name);
      const resourceResponse = await blipServices.getQueueResource();
      if (!!resourceResponse) {
        setResource(resourceResponse);
      }
    });
  }, [queue]);

  useEffect(() => {
    if (queueName) {
      let data = resource[queueId];
      if (!data) {
        data = constants.defaultQueueData;
      }
      setQueueData(data);
      setInitialState(data);
    }
  }, [resource, queueName]);

  useEffect(() => {
    if (goBack) {
      history.push("/");
    }
  }, [goBack, history]);

  const handleAutoMessageChange = (value) => {
    let newQueueData = { ...queueData };
    newQueueData.autoMessage = value;
    setQueueData(newQueueData);
    const isFormValid = validateForm(value);
    setIsSaveDisabled(!isFormValid);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(queueData.autoMessage)) {
      showFeedbackInvalidAutoMessageForm();
      return;
    }
    let newResource = { ...resource };
    newResource[queue.name] = queueData;
    const response = await blipServices.setQueueResource(newResource);
    const success = response !== null;
    commonServices.showToast({
      title: success ? null : "Algo deu errado...",
      type: success ? "success" : "danger",
      message: success
        ? "Fila salva com sucesso!"
        : "Houve um erro ao salvar a fila, tente novamente.",
    });
    if (success) {
      setShouldBlockNavigation(false);
      history.push("/");
    }
  };

  const validateForm = (textAreaValue) => {
    const isTextAreaValid = textAreaValue.length >= FORM.autoMessageMinLength;
    return isTextAreaValid;
  };

  const handleCancelClick = () => {
    history.goBack();
  };

  const handleBlockNavigation = () => {
    const hasFormChanged = queueData !== initialState;
    if (hasFormChanged) {
      setIsModalOpen(true);
      return false;
    }
  };

  const handleModalBtnClick = (isConfirmed) => {
    setIsModalOpen(false);
    if (isConfirmed) {
      setShouldBlockNavigation(false);
      setGoBack(true);
    }
  };

  return queueData ? (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <Prompt when={shouldBlockNavigation} message={handleBlockNavigation} />
      <div className="row w-100 pb-4">
        <QueueTitle title={queueName} />
      </div>
      <div className="flex-row d-flex">
        <BdsTypo variant="fs-20" bold="bold" className="hydrated">
          {"Mensagem automática: Atendimento indisponível"}
        </BdsTypo>
        &nbsp;
        <Tooltip position="right-center" text="Explique que o seu atendimento não está disponível e quando voltará ao normal. Essa mensagem aparecerá para o cliente" />
      </div>
      <div className="row">
        <BdsPaper elevation="static" className="m-3 p-4 auto-msg-background">
          <BdsTypo variant="fs-14" bold="bold" className="hydrated">
            Personalize a mensagem para o usuário, explique que o seu atendimento está indisponível
            e quando irá voltar ao normal.
          </BdsTypo>
          <div className="col-lg-8 col-sm-12">
            <AutoMessageTextInput minLength={FORM.autoMessageMinLength} handleAutoMessageChange={handleAutoMessageChange} value={queueData.autoMessage} />
          </div>
        </BdsPaper>
      </div>
      <FormBtnGroup handleCancelClick={handleCancelClick} isSaveDisabled={isSaveDisabled} />
      <ChangesModal open={isModalOpen} handleClick={handleModalBtnClick} />
    </form>
  ) : null;
};
