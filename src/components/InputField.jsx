import React from "react";

const InputField = ({ value, onInput, ...rest }) => {
  return (
    <div>
      <textarea
        className="form-control"
        value={value}
        onInput={onInput}
        {...rest}
      />
    </div>
  );
};

export default InputField;
