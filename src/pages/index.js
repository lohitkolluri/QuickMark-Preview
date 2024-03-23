import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'; 

const Index = () => {
  const initialMarkdown = `# Markdown Preview`;

  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [showPreview, setShowPreview] = useState(true);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const clearInput = () => {
    setMarkdown('');
  };

  const downloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Markdown.md'; 
    document.body.appendChild(element);
    element.click();
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown)
      .then(() => alert('Markdown copied to clipboard!'))
      .catch(error => console.error('Error copying markdown:', error));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white">
      <div className="flex w-4/5 h-3/4 rounded overflow-hidden shadow-md">
        <textarea
          className="w-1/2 h-full p-4 border-none text-lg bg-gray-800 resize-none rounded-l text-white"
          value={markdown}
          onChange={handleChange}
          placeholder="Enter your Markdown here..."
          aria-label="Markdown Editor"
        />
        {showPreview && (
          <ReactMarkdown
            className="w-1/2 h-full p-4 overflow-y-auto text-lg bg-gray-700 rounded-r" // Changed bg-gray-800 to bg-gray-700
            remarkPlugins={[gfm]}
            children={markdown}
            aria-label="Markdown Preview"
          />
        )}
      </div>
      <div className="flex justify-between w-4/5 mt-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-red-500"
          onClick={clearInput}
          aria-label="Clear Input"
        >
          Clear Input
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-blue-500"
          onClick={downloadMarkdown}
          aria-label="Download Markdown"
        >
          Download Markdown
        </button>
        <button
          className="px-4 py-2 bg-yellow-600 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-yellow-500"
          onClick={copyMarkdown}
          aria-label="Copy Markdown"
        >
          Copy Markdown
        </button>
      </div>
    </div>
  );
};

export default Index;
