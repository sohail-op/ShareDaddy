"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";

import DragDrop from "./ui/DragDrop";
import TextInput from "./ui/TextInput";
import Button from "./ui/Button";
import useTextShare from "../hooks/useTextShare";
import useFileUpload from "../hooks/useFileUpload";

const ShareContent = () => {
  const { generatedCode: textCode, text, setText, handleTextUpload } = useTextShare();
  const { generatedCode: fileCode, handleFileChange, handleFileUpload } = useFileUpload();

  const [isTextMode, setIsTextMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleKeyDownForText = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await triggerUpload();
    }
  };

  const handleKeyDownForFile = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await triggerUpload();
    }
  };

  const triggerUpload = async () => {
    setLoading(true);
    try {
      if (isTextMode) {
        await handleTextUpload();
      } else {
        await handleFileUpload();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-[#F5F1ED] p-8 md:p-12">
      <header className="text-black -mt-10 pb-4">
        <a href="#" className="font-rochester text-4xl block leading-tight">
          ShareDaddy
        </a>
        <p className="text-[#2E2E2E]/90 text-base font-sans -mt-2">Daddy of Sharing</p>
      </header>

      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-[#2E2E2E]/90 flex flex-row gap-2 items-center">
          <h2 className="text-xl font-medium text-[#2E2E2E]/90">Share Content</h2>
          <textarea
            placeholder="Code"
            className={`ml-auto w-[4em] h-[2.5em] text-center p-1 border border-gray-300 rounded bg-white/50 resize-none transition-all duration-300 ${
              (isTextMode ? textCode : fileCode)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
            readOnly
            value={isTextMode ? textCode : fileCode}
          ></textarea>
        </div>

        <TextInput
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setIsTextMode(true);
          }}
          className="w-full h-64 bg-white/50 border-[#2E2E2E]/20 placeholder-[#2E2E2E]/50 text-[#2E2E2E]"
          onKeyDown={handleKeyDownForText}
        />

        <DragDrop
          icon={<Upload />}
          onFilesDrop={(files) => {
            handleFileChange(files);
            setIsTextMode(false);
          }}
          onKeyDown={handleKeyDownForFile}
        />

        <Button
          text={loading ? "Generating..." : "Generate Share Code"}
          onClick={triggerUpload}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default ShareContent;
