import { useState } from "react";
import { toast } from "react-toastify";
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
      toast.success("File retrieved successfully!")
      handleOpenFile(response.url);
    } catch (error) {
      console.error("Error retrieving content:", error);
      toast.error("Error retrieving content.");
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
