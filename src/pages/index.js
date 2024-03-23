import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Index = () => {
  const [markdown, setMarkdown] = useState('## Markdown Preview');

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div>
      <textarea onChange={handleChange} value={markdown} />
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}

export default Index;
