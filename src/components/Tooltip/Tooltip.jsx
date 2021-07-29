import { BdsIcon, BdsTooltip } from "blip-ds/dist/blip-ds-react";
import React from "react";

export const Tooltip = ({ text, position }) => {
  return (
    <BdsTooltip position={position} tooltipText={text}>
      <BdsIcon theme="solid" name="question" size="small" />
    </BdsTooltip>
  );
};
