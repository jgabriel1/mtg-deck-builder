import { ColorModeScript } from '@chakra-ui/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { theme } from '../styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />

          <link
            href="//cdn.jsdelivr.net/npm/mana-font@latest/css/mana.min.css"
            rel="stylesheet"
            type="text/css"
          />
        </Head>

        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />

          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
