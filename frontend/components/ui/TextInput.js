import React from "react";

const TextInput = ({ placeholder, value, onChange, isReadOnly = false, className, onKeyDown }) => {
  return (
    <textarea
      className={`backdrop-blur-sm rounded-2xl p-4 
      border focus:border-[#2E2E2E]/30 focus:ring-1 focus:ring-[#2E2E2E]/30 
      transition-all resize-none shadow-sm placeholder:italic placeholder:text-center ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      readOnly={isReadOnly ? true : false} 
      />
  );
};

export default TextInput;


