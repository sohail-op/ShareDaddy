import React from 'react'

const Footer = () => {

    return (
        <div className="bg-[#222831] text-[#EEEEEE] py-2 text-center">
        <p className="text-sm md:text-base">
          It&apos;s {" "}
          <a
            href="https://github.com/sohail-op/ShareDaddy"
            className="text-[#00ADB5] hover:text-[#33E0E6] underline transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            open source
          </a>
          , so if something&apos;s broken… congrats, it&apos;s your problem now!
        </p>
      </div>
    );
  };
  
export default Footer