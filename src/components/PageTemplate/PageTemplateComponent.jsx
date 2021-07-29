import PropTypes from "prop-types";
import React from "react";

const PageTemplateComponent = ({ children }) => {
  return (
    <>
      <div className="pt-2">
        <div className="bp-card card">{children}</div>
      </div>
    </>
  );
};

PageTemplateComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PageTemplateComponent };
