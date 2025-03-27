import React, { useEffect, useState } from "react";
import { ArrowBigRight } from "lucide-react";

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
    <div className="w-1/2 bg-[#2E2E2E] p-12 pt-20">
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
      </div>
    </div>
  );
};

export default ReceiveContent;
