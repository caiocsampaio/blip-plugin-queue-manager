import React, { useContext } from "react";
import Proptypes from "prop-types";
import { BdsChip, BdsTypo } from "blip-ds/dist/blip-ds-react";
import { ConfigContext } from "contexts/ConfigContext";

export const PageHeaderComponent = () => {
  const context = useContext(ConfigContext);
  const title = context.TITLE;
  const version = context.VERSION;
  return (
    <>
      <div className="mt-4 mx-4">
        <BdsTypo variant="fs-24" bold="semi-bold" className="hydrated inline">
          {title}
          &nbsp;
          <BdsChip disabled>{version}</BdsChip>
        </BdsTypo>
      </div>
      <div className="bp-divider-h"></div>
    </>
  );
};

PageHeaderComponent.propTypes = {
  title: Proptypes.string,
};
