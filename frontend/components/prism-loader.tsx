"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-typescript";
import { useState } from "react";

export default function PrismLoader() {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <textarea
      className="textarea textarea-bordered w-full h-80 mb-4 rounded-lg bg-gray-700  ps-2 hidden"
      placeholder="Paste your Text here..."
      value={text}
      onChange={handleTextChange}
      required
    ></textarea>
  );
}
