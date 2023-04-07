import React from "react";

const InputField = ({ value, onChange, ...rest }) => {
  return (
    <div>
      <textarea value={value} onChange={onChange} {...rest} />
    </div>
  );
};

export default InputField;
