import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          {/* <link rel='manifest' href='/manifest.json' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black' />
          <meta name='apple-mobile-web-app-title' content='LT PWA' />
          <link rel='apple-touch-icon' href='/images/icons/icon-96x96.png' />
          <link rel='apple-touch-startup-icon' href='/images/icons/icon-96x96.png' /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

