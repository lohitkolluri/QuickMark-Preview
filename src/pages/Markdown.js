import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import gfm from 'remark-gfm';
import Counter from '../components/Counter';
import Navbar from '../components/Navbar';

const Markdown = () => {
  const initialMarkdown = `# Markdown Preview`;

  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [charCount, setCharCount] = useState(initialMarkdown.length);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const textareaRef = useRef();

  const handleChange = (e) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
    setCharCount(newMarkdown.length);

    // Maintain cursor position
    const { selectionStart, selectionEnd } = textareaRef.current;
    textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
  };
  
  const insertTextAtCursor = (text) => {
    const current = textareaRef.current;
    if (current) {
      const { selectionStart, selectionEnd, value } = current;
      const newText = value.substring(0, selectionStart) + text + value.substring(selectionEnd);
      setMarkdown(newText);
      const newCursorPosition = selectionStart + text.length;
      cursorPositionRef.current = newCursorPosition;
      current.focus();
      current.selectionStart = newCursorPosition;
      current.selectionEnd = newCursorPosition;
    }
  };

  const applyFormatting = (format) => {
    switch (format) {
      case 'italic':
        insertTextAtCursor('*italic text* ');
        break;
      case 'bold':
        insertTextAtCursor('**bold text** ');
        break;
      case 'header':
        insertTextAtCursor('# Header ');
        break;
      case 'strikethrough':
        insertTextAtCursor('~~strikethrough text~~ ');
        break;
      case 'code':
        insertTextAtCursor('```language\n// code block\n```');
        break;
      default:
        break;
    }
  };

  const applySelectedFormatting = (format) => {
    const { current } = textareaRef;
    if (current) {
      const { selectionStart, selectionEnd } = current;
      const selectedText = current.value.substring(selectionStart, selectionEnd);
      const newText =
        current.value.substring(0, selectionStart) +
        applyFormattingToSelectedText(selectedText, format) +
        current.value.substring(selectionEnd);
      setMarkdown(newText);
      cursorPositionRef.current = selectionStart + newText.length;
      current.focus();
      current.selectionStart = cursorPositionRef.current;
      current.selectionEnd = cursorPositionRef.current;
    }
  };

  const applyFormattingToSelectedText = (text, format) => {
    switch (format) {
      case 'italic':
        return `*${text}*`;
      case 'bold':
        return `**${text}**`;
      case 'header':
        return `# ${text}`;
      case 'strikethrough':
        return `~~${text}~~`;
      case 'code':
        return `\`${text}\``;
      default:
        return text;
    }
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

  const navbarButtons = [
    { label: 'Clear', color: 'white', onClick: clearInput },
    { label: 'Download', color: 'white', onClick: downloadMarkdown },
    { label: 'Copy', color: 'white', onClick: copyMarkdown },
    { label: 'Italic', color: 'white', onClick: () => applySelectedFormatting('italic') },
    { label: 'Bold', color: 'white', onClick: () => applySelectedFormatting('bold') },
    { label: 'Header', color: 'white', onClick: () => applySelectedFormatting('header') },
    { label: 'Strikethrough', color: 'white', onClick: () => applySelectedFormatting('strikethrough') },
    { label: 'Code', color: 'white', onClick: () => applySelectedFormatting('code') },
  ];

  const toggleNavbar = () =>
  {
    setIsNavbarOpen(!isNavbarOpen);
};

return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white relative"> 
      <div className="flex w-11/12 h-3/4 rounded overflow-hidden shadow-md relative"> 
        <textarea
          ref={textareaRef}
          className="w-1/2 h-full p-4 border-none text-lg bg-gray-800 resize-none rounded-l text-white" 
          value={markdown}
          onChange={handleChange}
          placeholder="Enter your Markdown here..."
          aria-label="Markdown Editor"
        />
        <div className="markdown w-1/2 h-full p-4 overflow-y-auto text-lg bg-gray-700 rounded-r text-white relative">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[gfm, remarkEmoji]}
            components={{
              a: ({ node, ...props }) => <a style={{ color: 'skyblue' }} {...props} />,
              code: ({ node, ...props }) => (
                <pre style={{ backgroundColor: '#333', padding: '0.5rem', borderRadius: '0.5rem', color: 'white', maxWidth: '100%', overflowX: 'auto' }}>
                  <code {...props} />
                </pre>
              )
            }}
          >
            {markdown}
          </ReactMarkdown>
          <div className="absolute bottom-4 left-4">
            <Counter charCount={charCount} />
          </div>
        </div>
      </div>
      <Navbar buttons={navbarButtons} isOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />
    </div>
  );
};

export default Markdown;
