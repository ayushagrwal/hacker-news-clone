import React from 'react';

const CustomTextarea = ({
  value,
  onChange,
  rows = 4,
  className = '',
  placeholder = '',
  ...rest
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className={`border px-1 border-gray-900 rounded-sm resize w-2/5 ${className}`}
      {...rest}
    />
  );
};

export default CustomTextarea;
