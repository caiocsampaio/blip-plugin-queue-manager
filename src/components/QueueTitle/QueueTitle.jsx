import { BdsInputEditable } from "blip-ds/dist/blip-ds-react";
import PropTypes from "prop-types";
import React, { useRef } from "react";

const QueueTitle = ({ title, setTitle }) => {
  const inputRef = useRef(null);

  const handleInputEditableSave = (e) => {
    setTimeout(() => {
      // o input editable tem um bug q me obriga a fazer gambiarras...
      setTitle(e.target.value);
    }, 100);
  };

  return (
    <BdsInputEditable
      onBdsInputEditableSave={handleInputEditableSave}
      ref={inputRef}
      size="standard"
      inputName="queue-name"
      expand={true}
      value={title}
      id="queue-name"
      data-testid="queueTitle"
    />
  );
};

QueueTitle.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
};

QueueTitle.displayName = "QueueTitle";

export default QueueTitle;
