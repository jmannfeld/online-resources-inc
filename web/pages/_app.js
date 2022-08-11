import React from 'react';
import BaseApp from 'next/app';
import client from '../client';
import groq from 'groq';
// import 'normalize.css'
import '../styles/shared.module.css';
import '../styles/layout.css';
// import '../styles/image-gallery.css';
import 'react-image-gallery/styles/css/image-gallery.css';

// you can import these packages anywhere
const LogRocket = require('logrocket');
const setupLogRocketReact = require('logrocket-react');

// only initialize when in the browser
if (typeof window !== 'undefined') {
  LogRocket.init('online-resources-inc/website');
  // plugins should also only be initialized when in the browser
  setupLogRocketReact(LogRocket);
}

const siteConfigQuery = groq`
  *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}},
    mainNavigation[] {
      _type == 'reference' => @-> {
        ...,
        "title": page->title
      },
      _type != 'reference' => @,
    },
    footerNavigation[] {
      _type == 'reference' => @-> {
        ...,
        "title": page->title
      },
      _type != 'reference' => @,
    },
    "productOrder": productOrder[]-> {
      name
    }.name
  }[0]
  `;

class App extends BaseApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Hacky way to remove trailing slash
    if (ctx.req && !ctx.req.url === '/') {
      const pathAndQueryDivided = ctx.req.url.split('?');
      if (pathAndQueryDivided[0].endsWith('/')) {
        const urlWithoutEndingSlash = pathAndQueryDivided[0].replace(/\/*$/gim, '');

        ctx.res.writeHead(301, {
          Location:
            urlWithoutEndingSlash +
            (pathAndQueryDivided.length > 1 ? `?${pathAndQueryDivided[1]}` : '')
        });
        ctx.res.end();
        return {};
      }
    }

    // Add site config from sanity on every page
    await client.fetch(siteConfigQuery).then((config) => {
      if (config && pageProps) {
        pageProps.config = config;
      }
    });

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default App;
