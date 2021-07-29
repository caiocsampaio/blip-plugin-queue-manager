import {
  BdsAlert,
  BdsAlertActions,
  BdsAlertBody,
  BdsAlertHeader,
  BdsButton,
  BdsInput
} from "blip-ds/dist/blip-ds-react";
import React, { useRef } from "react";
import "./createQueueModal.css";

export const CreateQueueModal = ({ open = false, handleClick = (isSave, value) => {} }) => {
  const inputRef = useRef(null);
  return (
    <BdsAlert open={open}>
      <BdsAlertHeader icon="info" variant="system">
        {"Criação de nova fila de atendimento"}
      </BdsAlertHeader>
      <BdsAlertBody>
        <BdsInput ref={inputRef} label="Nome da nova fila" />
      </BdsAlertBody>
      <BdsAlertActions>
        <BdsButton variant="primary" onClick={() => handleClick(true, inputRef.current.value)}>
          {"Salvar"}
        </BdsButton>
        <BdsButton variant="secondary" onClick={() => handleClick(false)}>
          {"Cancelar"}
        </BdsButton>
      </BdsAlertActions>
    </BdsAlert>
  );
};
