import React from 'react';
import BaseApp from 'next/app';
import client from '../client';
import groq from 'groq';
// import 'normalize.css'
import '../styles/shared.module.css';
import '../styles/layout.css';
import '../styles/image-gallery.css';
import 'react-image-gallery/styles/css/image-gallery.css';

const siteConfigQuery = groq`
  *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}},
    mainNavigation[] -> {
      ...,
      "title": page->title
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
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

    // Add site config from sanity
    return (
      client
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
          client.fetch(productQuery).then((products) => {
            if (!products) {
              return { pageProps };
            }
            if (products && pageProps) {
              pageProps.products = products;
            }
          })
        )
    );
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default App;
