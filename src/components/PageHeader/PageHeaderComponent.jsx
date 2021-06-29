import React, { useContext } from "react";
import Proptypes from "prop-types";
import { BdsChip } from "blip-ds/dist/blip-ds-react";
import { ConfigContext } from "contexts/ConfigContext";

export const PageHeaderComponent = () => {
  const context = useContext(ConfigContext);
  const title = context.TITLE;
  const version = context.VERSION;
  return (
    <>
      <div className="pv2 header">
        <h1 className="bp-fs-3 bp-c-city">
          {title}
          &nbsp;
          <BdsChip disabled>{version}</BdsChip>
        </h1>
      </div>
      <div className="bp-divider-h"></div>
    </>
  );
};

PageHeaderComponent.propTypes = {
  title: Proptypes.string,
};
