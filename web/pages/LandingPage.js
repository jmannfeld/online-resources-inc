import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NextSeo from 'next-seo';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import Layout from '../components/Layout';
import client from '../client';
import RenderSections from '../components/RenderSections';
import styles from './LandingPage.module.css';

const builder = imageUrlBuilder(client);
const pageQuery = groq`
*[_type == "route" && slug.current == $slug][0]{
  ...,
  page-> {
    ...,
    content[] {
      ...,
      cta {
        ...,
        route->
      },
      ctas[] {
        ...,
        route->
      },
      members[]-> {
        ...,
        headshot {
          asset->
        }
      }
    },
  }
}
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

class LandingPage extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    // TODO: improve types
    disallowRobots: PropTypes.any,
    openGraphImage: PropTypes.any,
    content: PropTypes.any,
    config: PropTypes.any,
    slug: PropTypes.any,
    products: PropTypes.array
  };

  static async getInitialProps({ query }) {
    const { slug } = query;
    let pageData;

    if (!query) {
      console.error('no query');
      return;
    }

    // Page query if not on homepage
    if (slug && slug !== '/') {
      pageData = await client.fetch(pageQuery, { slug }).then((res) => ({ ...res.page, slug }));
    }

    // Query products if on products page
    if (slug && slug === 'products') {
      const products = await client.fetch(productQuery).then((products) => {
        if (products && pageData) {
          pageData.products = products;
        }
      });
    }

    // Frontpage query
    if (slug && slug === '/') {
      pageData = await client
        .fetch(
          groq`
        *[_id == "global-config"][0]{
          frontpage -> {
            ...,
            content[] {
              ...,
              cta {
                ...,
                route->
              },
              ctas[] {
                ...,
                route->
              },
              industries[]-> {
                name,
                description,
                "image": image {
                  asset->
                },
              }
            }
          }
        }
      `
        )
        .then((res) => ({ ...res.frontpage, slug }));
    }

    return pageData;
  }

  render() {
    const {
      title = 'Missing title',
      description,
      disallowRobots,
      openGraphImage,
      content = [],
      config = {},
      slug,
      products = [],
      layout
    } = this.props;

    const openGraphImages = openGraphImage
      ? [
          {
            url: builder.image(openGraphImage).width(800).height(600).url(),
            width: 800,
            height: 600,
            alt: title
          },
          {
            // Facebook recommended size
            url: builder.image(openGraphImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
            alt: title
          },
          {
            // Square 1:1
            url: builder.image(openGraphImage).width(600).height(600).url(),
            width: 600,
            height: 600,
            alt: title
          }
        ]
      : [];

    console.log('LandingPage layout: ', layout);
    return (
      <Layout config={config}>
        <NextSeo
          config={{
            title,
            titleTemplate: `${config.title} | %s`,
            description,
            canonical: config.url && `${config.url}/${slug}`,
            openGraph: {
              images: openGraphImages
            },
            noindex: disallowRobots
          }}
        />
        {content && (
          <div
            className={
              slug === '/'
                ? styles.home
                : slug === 'robotics'
                ? styles.robotics
                : slug === 'about-us'
                ? styles.about
                : layout === '2 columns'
                ? styles.fifty
                : styles.full
            }
          >
            <RenderSections sections={content} config={config} products={products} />
          </div>
        )}
      </Layout>
    );
  }
}

export default LandingPage;
