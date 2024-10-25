// components/LoadingMessage.js
import React from 'react';

const LoadingMessage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-lg text-gray-800">
        <div className="flex items-center justify-center mb-4">
          <div className="w-6 h-6 border-t-4 border-gray-800 animate-spin"></div>
        </div>
        <p className="text-lg font-semibold">Carregando dados...</p>
      </div>
    </div>
  );
};

export default LoadingMessage;
