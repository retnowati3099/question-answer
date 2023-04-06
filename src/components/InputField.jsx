import React from "react";

const InputField = ({ value, onInput, ...rest }) => {
  return (
    <div>
      <textarea
        className="form-control mb-3 p-3"
        rows="1"
        value={value}
        onInput={onInput}
        {...rest}
        style={{ maxHeight: "200px", resize: "none" }}
      />
    </div>
  );
};

export default InputField;
