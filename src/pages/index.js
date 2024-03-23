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

const TextArea = styled.textarea`
  width: 50%;
  height: 50%;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem; /* Increase font size */
  color: black; /* Set the font color to black */
  background-color: white; /* Set the background color to white */
  resize: none;
`;

const Preview = styled(ReactMarkdown)`
  width: 50%;
  height: 50%;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem; /* Increase font size */
  overflow-y: scroll;
  background-color: white; /* Set the background color to white */
  color: black; /* Set the font color to black */
`;

const Index = () => {
  const [markdown, setMarkdown] = useState('## markdown preview');

  const handleChange = e => {
    setMarkdown(e.target.value);
  };

  return (
    <Container>
      <TextArea value={markdown} onChange={handleChange} />
      <Preview>{markdown}</Preview>
    </Container>
  );
}

export default Index;