import { on } from "events";
import React from "react";

const InputField = ({ value, onChange, placeholder, icon, onClick, onKeyDown }) => {
  return (
    <div className="relative flex justify-center">
      <input
        type="text"
        className="w-11/12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-4 
                   text-white placeholder-white/40 border border-white/10 
                   focus:border-white/20 focus:ring-1 focus:ring-white/20 
                   transition-all shadow-sm text-xl text-center"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-transparent 
                     rounded-xl flex items-center justify-center transition-colors 
                     hover:bg-white/10" onClick={onClick}>
        {icon}
      </button>
    </div>
  );
};

export default InputField;
