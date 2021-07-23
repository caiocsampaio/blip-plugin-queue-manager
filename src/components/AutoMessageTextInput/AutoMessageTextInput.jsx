import { BdsInput } from "blip-ds/dist/blip-ds-react";
import React from "react";

export const AutoMessageTextInput = ({ handleAutoMessageChange, minLength, value = "" }) => {
  return (
    <BdsInput
      className="mt-4"
      inputName="auto-message"
      placeholder="ex: Hoje o nosso atendimento não está disponível. Voltaremos aos atendimentos no dia 00 às 0h."
      isTextarea={true}
      counterLength={true}
      maxlength={255}
      minlength={minLength}
      rows={5}
      icon="email"
      required
      errorMessage="Preenchimento obrigatório"
      minlengthErrorMessage="Preencha ao menos 10 caracteres"
      requiredErrorMessage="Campo obrigatório"
      // @ts-ignore
      onBdsChange={(e) => handleAutoMessageChange(e.target.value)}
      value={value}
    />
  );
};
