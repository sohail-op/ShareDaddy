import { useState } from "react";
// import socket from "../utils/socket";

const useTextShare = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const [text, setText] = useState("");

  const handleTextUpload = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/uploadText`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const data = await response.json();
      if (data.genCode) {
        setGeneratedCode(data.genCode);
        // socket.emit("getCode", data.genCode);
      }
    } catch (error) {
      console.error("Error sharing text:", error.message);
    }
  };

  return {
    generatedCode,
    text,
    setText,
    handleTextUpload,
  };
};

export default useTextShare;
