import React, { useEffect, useState } from "react";
import { ArrowBigRight } from "lucide-react";
import { Bounce, ToastContainer } from "react-toastify";

import InputField from "./ui/InputField";
import TextInput from "./ui/TextInput";
import useTextRetrieval from "../hooks/useTextRetrival";
import useFileRetrieval from "../hooks/useFileRetrival"

const ReceiveContent = () => {
  const { setTextCode, text, handleRetrieveText } = useTextRetrieval();
  const { setFileCode, handleRetrieveFile } = useFileRetrieval();
  const [shareCode, setShareCode] = useState("");
  const [action, setAction] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRetrieveContent();
    }
  };
  const handleRetrieveContent = () => {
    if (shareCode.length === 4) {
      setTextCode(shareCode);
      setAction("text");
    } else if (shareCode.length === 5) {
      setFileCode(shareCode);
      setAction("file");
    } else {
      console.log("Invalid code.");
    }
  };

  useEffect(() => {
    if (action === "text") {
      handleRetrieveText();
      setAction(null);
    } else if (action === "file") {
      handleRetrieveFile();
      setAction(null);
    }
  }, [action]);

  return (
    <div className="w-full md:w-1/2 bg-[#2E2E2E] p-8 md:p-12 pt-16 md:pt-20">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-xl font-medium text-white/90">Receive Content</h2>

        <InputField
          value={shareCode}
          onChange={(e) => setShareCode(e.target.value)}
          placeholder="Enter share code"
          icon={<ArrowBigRight className="w-7 h-7 text-white/70" />}
          onClick={handleRetrieveContent}
          onKeyDown={handleKeyDown}
        />

        <TextInput
          placeholder="Shared content will appear here"
          value={text}
          className="w-full h-96 bg-white/10 border-white/10 placeholder-white/50 text-white"
          isReadOnly
        />

        <ToastContainer
          position="top-center"
          autoClose={1500}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />

        <ul className="space-y-1 text-sm text-white/70 pt-8 pl-16 list-disc list-inside">
          <li>
            Enter a 4-digit code for text or a 5-digit code for files.
          </li>
          <li>
            The code will be valid for 30 minutes.
          </li>
          <li>
            Text will be deleted after 30 minutes. Files are stored for 24 hours but become inaccessible after the first 30 minutes.
          </li>
        </ul>

      </div>
    </div>
  );
};

export default ReceiveContent;
