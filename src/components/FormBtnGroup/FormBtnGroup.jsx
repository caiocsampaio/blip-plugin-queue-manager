import { BdsButton } from "blip-ds/dist/blip-ds-react";
import React from "react";

export const FormBtnGroup = ({ handleCancelClick, isSaveDisabled }) => {
  return (
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
  );
};
