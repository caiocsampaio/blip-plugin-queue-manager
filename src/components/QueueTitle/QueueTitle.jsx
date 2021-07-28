import { BdsInputEditable, BdsTypo } from "blip-ds/dist/blip-ds-react";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const QueueTitle = ({ title, setTitle }) => {
  const inputRef = useRef(null);

  const handleInputEditableSave = (e) => {
    setTimeout(() => { // o input editable tem um bug q me obriga a fazer gambiarras...
      setTitle(e.target.value)
    }, 100);
  }

  return (
    <BdsInputEditable
      onBdsInputEditableSave={handleInputEditableSave}
      ref={inputRef}
      size="standard"
      inputName="queue-name"
      expand={true}
      value={title}
      id="queue-name"
    />
  );
};

QueueTitle.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
};

QueueTitle.displayName = "QueueTitle";

export default QueueTitle;
