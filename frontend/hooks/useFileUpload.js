import { useState } from 'react';
import { toast } from 'react-toastify';
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
    if (!file) return toast.error('Please select a file to upload');

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
        toast.success('File Shared');
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
      toast.error('Error uploading file');
    }
  };

  return {
    generatedCode,
    handleFileChange,
    handleFileUpload,
  };
};

export default useFileUpload;
