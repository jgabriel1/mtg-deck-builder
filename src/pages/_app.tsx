import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { AppProvider } from '../hooks';

import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  );
}
export default MyApp;
