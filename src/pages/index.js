import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const EditorContainer = styled.div`
  display: flex;
  width: 80%;
  height: 70%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 50%;
  height: 100%;
  padding: 1rem;
  border: none;
  font-size: 1.2rem;
  color: #333;
  background-color: #fff;
  resize: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Preview = styled(ReactMarkdown)`
  width: 50%;
  height: 100%;
  padding: 1rem;
  overflow-y: auto;
  font-size: 1.2rem;
  color: #333;
  background-color: #f9f9f9;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #4CAF50; /* Green */
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049; /* Darker green */
  }
`;

const ClearButton = styled(Button)`
  margin-right: 1rem;
`;

const DownloadButton = styled(Button)`
  background-color: #2196F3; /* Blue */
  margin-right: 1rem;
`;

const CopyButton = styled(Button)`
  background-color: #ff9800; /* Orange */
`;

const Index = () => {
  const [markdown, setMarkdown] = useState('## markdown preview');
  const [showPreview, setShowPreview] = useState(true);

  const handleChange = e => {
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
    const file = new Blob([markdown], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'markdown.txt';
    document.body.appendChild(element);
    element.click();
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    alert('Markdown copied to clipboard!');
  };

  return (
    <Container>
      <EditorContainer>
        <TextArea value={markdown} onChange={handleChange} />
        {showPreview && <Preview>{markdown}</Preview>}
      </EditorContainer>
      <ButtonContainer>
        <ClearButton onClick={clearInput}>Clear Input</ClearButton>
        <Button onClick={togglePreview}>
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
        <DownloadButton onClick={downloadMarkdown}>Download Markdown</DownloadButton>
        <CopyButton onClick={copyMarkdown}>Copy Markdown</CopyButton>
      </ButtonContainer>
    </Container>
  );
}

export default Index;
