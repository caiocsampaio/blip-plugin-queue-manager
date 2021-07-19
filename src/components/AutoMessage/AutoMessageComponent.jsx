import { BdsButton, BdsIcon, BdsInput, BdsPaper, BdsTooltip, BdsTypo } from 'blip-ds/dist/blip-ds-react';
import { CommonContext } from 'contexts/CommonContext';
import { ConfigContext } from 'contexts/ConfigContext';
import React, { useContext, useState } from 'react';

export const AutoMessageComponent = () => {
  const context = useContext(CommonContext);
  const { FORM } = useContext(ConfigContext);
  const [autoMessage, setAutoMessage] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)

  const handleAutoMessageChange = (value) => {
    setAutoMessage(value);
    const isFormValid = validateForm();
    setIsSaveDisabled(!isFormValid);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("auto message submit")
  }

  const validateForm = () => {
    const isTextAreaValid = autoMessage.length >= FORM.autoMessageMinLength - 1;
    return isTextAreaValid;
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <div className="flex-row d-flex">
        <BdsTypo variant="fs-20" bold="bold" className="hydrated">
          Mensagem automática: Atendimento indisponível
        </BdsTypo>
        &nbsp;
        <BdsTooltip position="right-center" tooltipText="Explique que o seu atendimento não está disponível e quando voltará ao normal. Essa mensagem aparecerá para o cliente">
          <BdsIcon theme="solid" name="question" size="small" />
        </BdsTooltip>
      </div>
      <div className="row">
        <BdsPaper elevation="static" className="m-3 p-4 auto-msg-background">
          <BdsTypo variant="fs-14" bold="bold" className="hydrated">
            Personalize a mensagem para o usuário, explique que o seu atendimento está indisponível e quando irá voltar ao normal.
          </BdsTypo>
          <div className="col-lg-8 col-sm-12">
            <BdsInput className="mt-4"
              inputName="auto-message"
              placeholder="Hoje o nosso atendimento não está disponível. Voltaremos aos atendimentos no dia 00 às 0h."
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
            />
          </div>
        </BdsPaper>
      </div>
      <div className="row">
        <div className="d-flex justify-content-end">
          <BdsButton variant="secondary">Cancelar</BdsButton>
          &nbsp;
          <BdsButton variant="primary" type="submit" disabled={isSaveDisabled}>Salvar</BdsButton>
        </div>
      </div>
      {/* <div className="row">
        <div className="d-flex justify-content-center">
          <BdsTypo variant="fs-14" bold="bold" className="hydrated">
            Explique que o seu atendimento não está disponível e quando voltará ao normal. Essa mensagem aparecerá para o cliente
          </BdsTypo>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="row mt-2">
          <BdsTypo variant="fs-14" bold="bold" className="hydrated">
            Crie sua mensagem para o usuário explicando porque seu atendimento não está disponível e quando irá voltar.
          </BdsTypo>
        </div>
      </div> */}
    </form>
  )
}
