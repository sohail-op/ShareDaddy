import { useState } from 'react';
// import io from 'socket.io-client';

// const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

const useFileUpload = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (files) => {
    const selectedFile = files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file first.');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/uploadFile`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.genCode) {
        setGeneratedCode(data.genCode);
        // socket.emit('getCode', data.genCode);
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return {
    generatedCode,
    handleFileChange,
    handleFileUpload,
  };
};

export default useFileUpload;
