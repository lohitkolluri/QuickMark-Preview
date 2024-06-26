import React from 'react';

const Counter = ({ charCount }) => {
  return (
    <div className="absolute top-2 right-2 bg-gray-800 text-white-500 text-md px-3 py-2 rounded-md shadow-md">
      Character Count: {charCount}
    </div>
  );
};

export default Counter;
