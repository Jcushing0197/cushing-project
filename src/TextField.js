import React, { memo } from 'react';

const TextField = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Type comment here"
    />
  );
};

export default memo(TextField);