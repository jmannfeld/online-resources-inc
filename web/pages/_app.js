import React from 'react';
import BaseApp from 'next/app';
import client from '../client';
import groq from 'groq';
// import 'normalize.css'
import '../styles/shared.module.css';
import '../styles/layout.css';
// import '../styles/image-gallery.css';
import 'react-image-gallery/styles/css/image-gallery.css';

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
    }
  }[0]
  `;

const productQuery = groq`
  *[_type == "product" && public] {
    ...,
    category-> {
      name
    },
    manufacturer-> {
      name
    },
    slug {
      current
    },
    "mainImage": image {
      asset->
    },
    "galleryImages": gallery[] {
    "image": asset-> {
        url
      }
    }.image.url,
    "industries": industries[]-> {
      name
    }.name
  }
`;

class App extends BaseApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      // console.log('pageProps', pageProps);
      // adds commit
    }

    // hacky way to remove trailing slash
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

    // Add site config from sanity
    return await client
      .fetch(siteConfigQuery)
      .then((config) => {
        if (!config) {
          return { pageProps };
        }
        if (config && pageProps) {
          pageProps.config = config;
        }
        return { pageProps };
      })
      // Add products from sanity
      .then(
        await client.fetch(productQuery).then((products) => {
          if (!products) {
            return { pageProps };
          }
          if (products && pageProps) {
            pageProps.products = products;
          }
          return { pageProps };
        })
      );
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default App;
