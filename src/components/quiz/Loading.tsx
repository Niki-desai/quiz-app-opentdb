import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-400 via-purple-300 to-purple-100">
      <div className="flex flex-col items-center">
        <div className="loader border-t-4 border-purple-500 border-solid rounded-full w-16 h-16 animate-spin mb-4"></div>
        <p className="text-2xl font-semibold text-purple-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
