import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import client from '../client';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return client.fetch('*[_id == "global-config"] {lang}.lang[0]').then((lang) => {
      return { ...initialProps, lang };
    });
  }

  render() {
    return (
      <Html lang={this.props.lang || 'en'}>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            src="https://apiv2.popupsmart.com/api/Bundle/389631"
            async
          ></script>
        </body>
      </Html>
    );
  }
}
