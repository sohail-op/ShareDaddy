"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import socket from "../../utils/socket.js";

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [text, setText] = useState("");

socket.on("connect", () => {
  // console.log("Connected to server code");
})
  useEffect(() => {
    socket?.on("newText", (text) => {
      // console.log("Received from socket:", text);
      setText(text);
    });

    return () => socket?.off("newText");
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleInputChange = (e) => {
    setGeneratedCode(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleShareClick();
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleShareClick = async () => {
    if (!generatedCode.trim()) {
      console.warn("No generated code entered");
      return;
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/getText/${generatedCode}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      const data = await response.json();
      if (data.Text) {
        setText(data.Text);
        copyText(data.Text);
        socket.emit("getCode", generatedCode);
      }
    } catch (error) {
      console.error("Error fetching text:", error);
    }
  };
  

  return (
    <div className="h-screen flex justify-center items-center bg-[#171c24]">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#00ADB5]">
          Text Share
        </h1>
        <input
          type="number"
          placeholder="Enter Code"
          value={generatedCode}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="input mb-5 input-bordered w-full rounded-lg bg-gray-700"
        />

        <textarea
          className="textarea textarea-bordered w-full h-80 mb-4 rounded-lg bg-gray-700 "
          value={text}
          onChange={handleTextChange}
          readOnly
        ></textarea>
        <center>
          <Link
            href={"/"}
            className="inline-block mx-auto text-center underline text-[#00ADB5]"
          >
            Share Code
          </Link>
        </center>
      </div>
    </div>
  );
}
