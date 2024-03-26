import React from 'react';
import Head from 'next/head';
import Markdown from '../pages/Markdown';

const Home = () => {
  return (
    <div>
      <Head>
        <title>QuickMark Preview</title>
        <meta name="description" content="Live Markdown Editor" />
        <link type="image/png" sizes="96×96" rel="icon" href="/favicon.png" />
      </Head>
      <Markdown />
    </div>
  );
};

export default Home;
