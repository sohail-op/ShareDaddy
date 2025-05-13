import { useState } from "react";
import { toast } from "react-toastify";
// import socket from "../utils/socket";

const useTextRetrieval = () => {
  const [textCode, setTextCode] = useState("");
  const [text, setText] = useState("");

  const handleRetrieveText = async () => {
    if (!textCode.trim()) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/getData/${textCode}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch text");

      const data = await response.json();

      if (data.text) {
        setText(data.text);
        navigator.clipboard.writeText(data.text);
        toast.success("Text retrieved");
        // socket.emit("getCode", textCode);
      } else {
        toast.error("No text found!");
      }
    } catch (error) {
      console.error("Error retrieving text:", error);
      toast.error("Error retrieving text");
    }
  };

  return {
    // textCode,
    setTextCode,
    text,
    handleRetrieveText,
  };
};

export default useTextRetrieval;
