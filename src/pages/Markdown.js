import React, { useState, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import gfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import Counter from '../components/Counter';
import Navbar from '../components/Navbar';

const Markdown = () => {
  const initialMarkdown = `# Markdown Preview`;

  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [charCount, setCharCount] = useState(initialMarkdown.length);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const textareaRef = useRef();

  const handleChange = useCallback((e) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
    setCharCount(newMarkdown.length);

    const { selectionStart, selectionEnd } = textareaRef.current;
    textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
  }, []);

  const applyFormatting = (format) => {
    const { current } = textareaRef;
    if (!current) return;
  
    const { selectionStart, selectionEnd, value } = current;
    let selectedText = value.substring(selectionStart, selectionEnd);
    selectedText = selectedText.trim();
  
    const formattedText =
      format === 'code'
        ? `\`${selectedText}\``
        : format === 'header'
        ? `# ${selectedText}`
        : format === 'italic'
        ? `*${selectedText}*`
        : format === 'bold'
        ? `**${selectedText}**`
        : format === 'strikethrough'
        ? `~~${selectedText}~~`
        : selectedText;
    const newText = value.substring(0, selectionStart) + formattedText + value.substring(selectionEnd);
  
    setMarkdown(newText);
    current.focus();
    current.selectionStart = selectionStart;
    current.selectionEnd = selectionStart + formattedText.length;
  };
  

  const clearInput = () => {
    setMarkdown('');
    setCharCount(0);
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
    navigator.clipboard
      .writeText(markdown)
      .then(() => alert('Markdown copied to clipboard!'))
      .catch((error) => console.error('Error copying markdown:', error));
  };

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setMarkdown(fileContent);
        setCharCount(fileContent.length);
      };
      reader.readAsText(file);
    } else {
      console.error('Invalid file');
    }
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white relative">
      <Navbar
        buttons={[
          { label: 'Upload', color: 'white', onClick: () => document.getElementById('fileUpload').click() },
          { label: 'Clear', color: 'white', onClick: clearInput },
          { label: 'Copy', color: 'white', onClick: copyMarkdown },
          { label: 'Download', color: 'white', onClick: downloadMarkdown },
          { label: 'Italic', color: 'white', onClick: () => applyFormatting('italic') },
          { label: 'Bold', color: 'white', onClick: () => applyFormatting('bold') },
          { label: 'Header', color: 'white', onClick: () => applyFormatting('header') },
          { label: 'Strikethrough', color: 'white', onClick: () => applyFormatting('strikethrough') },
          { label: 'Code', color: 'white', onClick: () => applyFormatting('code') },
        ]}
        isOpen={isNavbarOpen}
        toggleNavbar={toggleNavbar}
      />
      <div className="flex-grow md:flex md:h-full">
        <textarea
          ref={textareaRef}
          className="w-full md:w-1/2 h-1/2 md:h-full p-4 border-none text-lg bg-gray-800 resize-none rounded-l text-white outline-none"
          value={markdown}
          onChange={handleChange}
          placeholder="Enter your Markdown here..."
          aria-label="Markdown Editor"
        />
        <div className="markdown w-full md:w-1/2 h-1/2 md:h-full p-4 overflow-y-auto text-lg bg-gray-700 rounded-r text-white">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[gfm, remarkEmoji]}
            components={{
              a: ({ node, ...props }) => <a style={{ color: 'skyblue' }} {...props} />,
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className={className} {...props}>
                    <code className={`language-${match[1]}`}>
                      {Prism.highlight(children, Prism.languages[match[1]], match[1])}
                    </code>
                  </pre>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
          <div className="absolute bottom-4 left-4">
            <Counter charCount={charCount} />
            <input id="fileUpload" type="file" className="hidden" onChange={handleFileUpload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markdown;
