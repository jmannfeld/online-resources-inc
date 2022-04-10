import PropTypes from 'prop-types';
import React from 'react';
import NextSeo from 'next-seo';
import groq from 'groq';
import { useRouter } from 'next/router';
import { FiExternalLink } from 'react-icons/fi';
// import ImageGallery from 'react-image-gallery';
import imageUrlBuilder from '@sanity/image-url';
import Layout from '../../components/Layout';
import styles from './ProductPage.module.css';
import client from '../../client';
import SimpleBlockContent from '../../components/SimpleBlockContent';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const productQuery = groq`
  *[_type == "product" && public && slug.current == $slug][0] {
    ...,
    category-> {
      name
    },
    manufacturer-> {
      name
    },
    brochure {
      asset->
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

class ProductPage extends React.Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    if (slug && slug !== '/') {
      return client.fetch(productQuery, { slug }).then((res) => {
        return { ...res, slug };
      });
    }
    return { ...props };
  }

  render() {
    const {
      name,
      type,
      description,
      mainImage,
      galleryImages,
      manufacturer: { name: manufacturer } = '',
      category: { name: category } = '',
      techSpecs = {},
      config,
      slug,
      brochure
    } = this.props;

    let listForGallery;
    if (galleryImages) {
      listForGallery = galleryImages.map((image) => ({
        original: image,
        thumbnail: image,
        originalHeight: '200px',
        thumbnailHeight: '200px'
      }));
      console.log('listForGallery', listForGallery);
    }
    console.log('PROPS in render', this.props);
    return (
      <Layout config={config}>
        <NextSeo
          config={{
            title: name,
            titleTemplate: `${config.title} | %s`,
            description,
            canonical: config.url && `${config.url}/${slug}`,
            openGraph: {
              images: mainImage
            },
            noindex: false
          }}
        />
        <div className={styles.productPageContainer}>
          <div className={styles.productNameWrapper}>
            <div>
              <h1 className={styles.productName}>{name}</h1>
              <p className={styles.manufacturerName}>{manufacturer && manufacturer}</p>
            </div>
            <div className={styles.productTags}>
              {category && (
                <p>
                  {category.slice(-1) === 's'
                    ? category.substring(0, category.length - 1)
                    : category}
                </p>
              )}
              {type && <p>{type}</p>}
            </div>
          </div>
          {mainImage && (
            <img
              className={styles.productImage}
              src={mainImage ? urlFor(mainImage) : '../static/logo.png'}
            ></img>
          )}
          {/* {galleryImages && <ImageGallery className={styles.imageGallery} items={listForGallery} />} */}
          <table className={styles.techSpecsTable}>
            <tbody>
              {techSpecs &&
                Object.entries(techSpecs).map(([key, value]) => {
                  // converts camelCase to split words
                  const techSpecField = key.replace(/([a-z])([A-Z])/g, '$1 $2');
                  if (!key.startsWith('_'))
                    return (
                      <tr key={key}>
                        <th>{techSpecField.toUpperCase()}</th>
                        <td>{value}</td>
                      </tr>
                    );
                })}
            </tbody>
          </table>
          {brochure && (
            <button
              className={styles.brochureButton}
              type="button"
              onClick={() => window.open(brochure.asset.url, '_blank')}
            >
              <span>Tech Specs Brochure</span>
              <FiExternalLink />
            </button>
          )}
          {description && (
            <div className={styles.productDescription}>
              <SimpleBlockContent blocks={description} />
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

// ProductPage.getInitialProps = async ({ props }) => {
//   console.log('ProductPage props', props);
//   // const listForGallery = props.galleryImages.map((image) => ({
//   //   originial: image,
//   //   thumbnail: image
//   // }));
//   return { ...props };
// };
// ProductPage.propTypes = {
//   config: PropTypes.object
// };

export default ProductPage;
