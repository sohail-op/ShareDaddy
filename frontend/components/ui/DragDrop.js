import React, { useRef, useState } from 'react';
import { File, Image, FileText, Video, Music, FileQuestion } from 'lucide-react';
import useDragDrop from '../../hooks/useDragDrop';

const getFileIcon = (fileType) => {
  if (fileType.includes('image')) return <Image className="w-5 h-5 text-blue-500" />;
  if (fileType.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
  if (fileType.includes('video')) return <Video className="w-5 h-5 text-purple-500" />;
  if (fileType.includes('audio')) return <Music className="w-5 h-5 text-green-500" />;
  if (fileType.includes('file')) return <File className="w-5 h-5 text-yellow-500" />;
  return <FileQuestion className="w-5 h-5 text-gray-500" />;
};

const DragDrop = ({ icon, onFilesDrop, onKeyDown }) => {
  const { isDragging, handleDragOver, handleDragLeave, handleDrop } = useDragDrop(handleFileDrop);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleBrowseClick = () => fileInputRef.current?.click();

  function handleFileDrop(droppedFiles) {
    const fileList = Array.from(droppedFiles);
    setFiles(fileList);
    onFilesDrop?.(fileList);
  }

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      handleFileDrop(e.target.files);
    }
  };


  return (
    <form
      encType="multipart/form-data"
      className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all shadow-sm bg-white/50 backdrop-blur-sm ${
        isDragging ? 'border-[#2E2E2E] bg-white/80' : 'border-[#2E2E2E]/30 hover:border-[#2E2E2E]/50'
      }`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={`w-12 h-12 mx-auto mb-1 transition-colors ${
          isDragging ? 'text-[#2E2E2E]' : 'text-[#2E2E2E]/60'
        }`}
      >
        {icon}
      </div>

      <p className="text-[#2E2E2E]/70">
        Drag & drop files here or{' '}
        <button
          type="button"
          className="text-[#2E2E2E] font-medium hover:underline"
          onClick={handleBrowseClick}
        >
          browse
        </button>
      </p>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-[#2E2E2E]/70">Uploaded File:</h3>
          <ul className="mt-2 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center gap-3">
                {getFileIcon(file.type)}
                <span>{file.name} - {(file.size / 1024).toFixed(2)} KB</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default DragDrop;
