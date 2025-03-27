import React from "react";

const Button = ({ text, icon, onClick ,className }) => {

  return (
    <button className={`w-full py-4 bg-[#2E2E2E] text-white rounded-2xl 
                       hover:bg-[#2E2E2E]/90 transition-all transform active:scale-[0.98] 
                       shadow-sm flex items-center justify-center space-x-2 ${className}`} onClick={onClick}>
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
