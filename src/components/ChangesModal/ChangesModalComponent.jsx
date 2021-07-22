import { BdsAlert, BdsAlertHeader, BdsAlertBody, BdsAlertActions, BdsButton } from "blip-ds/dist/blip-ds-react";
import React from "react";

export const ChangesModalComponent = ({ open = false, handleClick = (value) => {} }) => {
  return (
    <BdsAlert open={open}>
      <BdsAlertHeader icon="warning" variant="warning">
        {"Você possui alterações não salvas"}
      </BdsAlertHeader>
      <BdsAlertBody>
        {"Tem certeza de que deseja descartar suas alterações? Essa ação não poderá ser desfeita."}
      </BdsAlertBody>
      <BdsAlertActions>
        <BdsButton onClick={() => handleClick(true)} variant="secondary">
          {"Sim, descartar"}
        </BdsButton>
        <BdsButton onClick={() => handleClick(false)} variant="secondary">
          {"Não, cancelar"}
        </BdsButton>
      </BdsAlertActions>
    </BdsAlert>
  );
};
