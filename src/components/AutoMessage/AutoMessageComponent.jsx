import { getQueueResource, setQueueResource } from "api/blipServices";
import { showToast, withoutLoading } from "api/commonServices";
import { showFeedbackInvalidAutoMessageForm } from "api/formServices";
import iframeService from "api/iframeServices";
import {
  BdsButton,
  BdsIcon,
  BdsInput, BdsPaper,
  BdsTooltip,
  BdsTypo
} from "blip-ds/dist/blip-ds-react";
import { ChangesModal } from "components/ChangesModal";
import { ConfigContext } from "contexts/ConfigContext";
import React, { useContext, useEffect, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";

const defaultQueueData = {
  days: {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  },
  hours: {
    weekdays: {
      from: ["", ""],
      to: ["", ""],
    },
    weekend: {
      from: ["", ""],
      to: ["", ""],
    },
  },
  autoMessage: "",
};

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
    withoutLoading(async () => {
      setQueue(await iframeService.getQueue(queueId));
    });
  }, [queueId]);

  useEffect(() => {
    withoutLoading(async () => {
      setQueueName(queue.name);
      const resourceResponse = await getQueueResource();
      if (!!resourceResponse) {
        setResource(resourceResponse);
      }
    });
  }, [queue]);

  useEffect(() => {
    if (queueName) {
      let data = resource[queueName];
      if (!data) {
        data = defaultQueueData;
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

  useEffect(() => {
    console.log("queueName :>> ", queueName);
  }, [queueName]);

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
    const response = await setQueueResource(newResource);
    const success = response !== null;
    showToast({
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
        <BdsTypo variant="fs-24">{queueName}</BdsTypo>
      </div>
      <div className="flex-row d-flex">
        <BdsTypo variant="fs-20" bold="bold" className="hydrated">
          {"Mensagem automática: Atendimento indisponível"}
        </BdsTypo>
        &nbsp;
        <BdsTooltip
          position="right-center"
          tooltipText="Explique que o seu atendimento não está disponível e quando voltará ao normal. Essa mensagem aparecerá para o cliente"
        >
          <BdsIcon theme="solid" name="question" size="small" />
        </BdsTooltip>
      </div>
      <div className="row">
        <BdsPaper elevation="static" className="m-3 p-4 auto-msg-background">
          <BdsTypo variant="fs-14" bold="bold" className="hydrated">
            Personalize a mensagem para o usuário, explique que o seu atendimento está indisponível
            e quando irá voltar ao normal.
          </BdsTypo>
          <div className="col-lg-8 col-sm-12">
            <BdsInput
              className="mt-4"
              inputName="auto-message"
              placeholder="ex: Hoje o nosso atendimento não está disponível. Voltaremos aos atendimentos no dia 00 às 0h."
              isTextarea={true}
              counterLength={true}
              maxlength={255}
              minlength={FORM.autoMessageMinLength}
              rows={5}
              icon="email"
              required
              errorMessage="Preenchimento obrigatório"
              minlengthErrorMessage="Preencha ao menos 10 caracteres"
              requiredErrorMessage="Campo obrigatório"
              // @ts-ignore
              onBdsChange={(e) => handleAutoMessageChange(e.target.value)}
              value={queueData.autoMessage}
            />
          </div>
        </BdsPaper>
      </div>
      <div className="row">
        <div className="d-flex justify-content-end">
          <BdsButton variant="secondary" onClick={handleCancelClick}>
            Cancelar
          </BdsButton>
          &nbsp;
          <BdsButton variant="primary" type="submit" disabled={isSaveDisabled}>
            Salvar
          </BdsButton>
        </div>
      </div>
      <ChangesModal open={isModalOpen} handleClick={handleModalBtnClick} />
    </form>
  ) : null;
};
