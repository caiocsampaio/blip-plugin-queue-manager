import React from 'react'
import PropTypes from 'prop-types'

const PageTemplateComponent = ({
  children,
}) => {
  return <>
    <div className="pv4">
      <div className="bp-card card">
        {children}
      </div>
    </div>
  </>
}

PageTemplateComponent.propTypes = {
  children: PropTypes.node.isRequired,
}

export { PageTemplateComponent }
