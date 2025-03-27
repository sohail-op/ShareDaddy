import { useState } from "react";
// import socket from "../utils/socket";

const useFileRetrieval = () => {
  const [fileCode, setFileCode] = useState("");
  // const [fileLink, setFileLink] = useState("");

  const handleOpenFile = (path) => {
    // setFileLink(path);
    window.open(path, "_blank");
  };

  const handleRetrieveFile = async () => {
    if (!fileCode.trim()) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/getData/${fileCode}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to retrieve content.");
      }
      handleOpenFile(response.url);
    } catch (error) {
      console.error("Error retrieving content:", error);
    }
  };

  return {
    // fileCode,
    setFileCode,
    // fileLink,
    handleRetrieveFile,
  };
};

export default useFileRetrieval;
