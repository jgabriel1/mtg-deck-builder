import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { AppProvider } from '../hooks';

import { theme } from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
