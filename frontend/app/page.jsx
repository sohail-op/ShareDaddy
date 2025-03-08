"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import socket from "../utils/socket.js";

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    socket.on("connect", () => console.log("Connected to server"));
    socket.on("disconnect", () => console.log("Disconnected from server"));

    return () => socket.off("connect").off("disconnect");
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) return alert("Please select a file first.");
    
    try {
      const formData = new FormData();
      formData.append("file", file); // FIXED: Changed from "fillo" to "file"

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/uploadFile`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Data: ", data);

      if (data.genCode) {
        setGeneratedCode(data.genCode);
        socket.emit("getCode", data.genCode);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleShareClick = async () => {
    if (text.trim().length === 0) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/uploadText`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (data.genCode) {
        setGeneratedCode(data.genCode);
        socket.emit("getCode", data.genCode);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#171c24]">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#00ADB5]">Text Share</h1>

        <textarea
          className="textarea textarea-bordered w-full h-80 mb-4 rounded-lg bg-gray-700 ps-2"
          placeholder="Paste your Text here..."
          value={text}
          onChange={handleTextChange}
          required
        ></textarea>

        <button
          className="btn btn-accent w-full mb-4 text-[#171c24] bg-[#00ADB5] hover:bg-[#009BA5] focus:bg-[#009BA5] focus:ring-2 focus:ring-[#00ADB5] rounded-lg py-2"
          onClick={handleShareClick}
        >
          Share
        </button>

        <input
          type="text"
          placeholder="Generated Code"
          value={generatedCode}
          readOnly
          className="input input-bordered w-full rounded-lg bg-gray-700 text-[#00ADB5] ps-2 h-8"
        />

        <center>
          <Link href={"/code"} className="mt-5 inline-block mx-auto text-center underline text-[#00ADB5]">
            Enter Code
          </Link>
        </center>

        {/* Fixed File Upload Section */}
        <div className="mt-4">
          <input type="file" onChange={handleFileChange} className="block w-full text-white" />
          <button
            type="button"
            className="btn btn-primary w-full mt-2 text-white bg-[#00ADB5] hover:bg-[#009BA5] rounded-lg py-2"
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
