import React, { useState } from 'react';
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from '../theme';
import Layout from 'src/layout/Layout';

type appProps = {
  Component: any;
  pageProps: any;
};

const App = (props: appProps) => {
  const { Component, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.Fragment>
      <Head>
        <title>Application Logger</title>
        <meta
          name="description"
          content="Application Logger"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout mainPage={<Component {...pageProps} />} />
        </ThemeProvider>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App; 
