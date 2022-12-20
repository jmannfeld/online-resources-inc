import React from 'react';
import NextSeo from 'next-seo';
import groq from 'groq';
import { FiExternalLink, FiShoppingCart } from 'react-icons/fi';
import imageUrlBuilder from '@sanity/image-url';
import Layout from '../../components/Layout';
import styles from './ProductPage.module.css';
import client from '../../client';
import SimpleBlockContent from '../../components/SimpleBlockContent';
import Cta from '../../components/Cta';
import PaypalCheckoutButton from '../../components/PayPalCheckoutButton';
import EmbedHTML from '../../components/EmbedHTML';
import { CartContext } from '../../components/CartContext';
import ProductListing from '../../components/ProductListing';

const builder = imageUrlBuilder(client);

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
    "industries": industries[]-> {
      name
    }.name,
    "accessories": accessories[]-> {
      name,
      price,
      shipping,
      _type,
      informationText,
      relatedAccessories[]-> {
        name,
        price,
        shipping,
      },
      addDiscount,
      discount,
      "discountedProducts": discountedProducts[]-> {
        name,
      }.name
    }
  }
`;

class ProductPage extends React.Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    return await client.fetch(productQuery, { slug }).then((res) => ({ ...res, slug }));
  }

  static contextType = CartContext;

  componentDidMount() {
    const [cart, setCart] = this.context;
  }

  render() {
    const {
      name,
      type,
      description,
      mainImage,
      manufacturer: { name: manufacturer } = '',
      category: { name: category } = '',
      techSpecs = {},
      embed3dModel,
      config,
      slug,
      brochure,
      acceptPaypal,
      price,
      shipping,
      tax,
      accessories = [],
      removeShipping
    } = this.props;

    // console.log('ProductPage props', this.props);

    const paypalProduct = {
      name,
      price,
      shipping,
      removeShipping
    };

    const openGraphImages = mainImage
      ? [
          {
            url: builder.image(mainImage).width(800).height(600).url(),
            width: 800,
            height: 600,
            alt: name
          },
          {
            // Facebook recommended size
            url: builder.image(mainImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
            alt: name
          },
          {
            // Square 1:1
            url: builder.image(mainImage).width(600).height(600).url(),
            width: 600,
            height: 600,
            alt: name
          }
        ]
      : [];

    const relatedAccessoryIsInCart = (relatedAccessory, accessories) => {
      const [cart] = this.context;
      let accessoryInCart = false;
      accessories.forEach((accessory) => {
        if (
          cart.find((item) => item.name === accessory.name && item.name !== relatedAccessory.name)
        ) {
          accessoryInCart = true;
        }
      });
      return accessoryInCart;
    };

    return (
      <Layout config={config}>
        <NextSeo
          config={{
            title: name,
            titleTemplate: `${config.title} | %s`,
            description: `${category} Products | Learn more about${
              category.includes('Scanning') ? ' the' : ''
            } ${name}`,
            canonical: config.url && `${config.url}/${slug}`,
            openGraph: {
              images: openGraphImages
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
            <div className={styles.askAnEngineer}>
              <Cta title="Ask an Engineer!" route={{ slug: { current: 'contact-us' } }} />
            </div>
          </div>
          {embed3dModel && (
            <div className={styles.embed3dModelWrapper}>
              <EmbedHTML node={embed3dModel} />
            </div>
          )}
          {mainImage && !embed3dModel && (
            <img
              className={styles.productImage}
              src={mainImage ? urlFor(mainImage) : '../static/logo.png'}
            ></img>
          )}
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
          {acceptPaypal && (
            <div className={styles.paypalButtonContainer}>
              <h2>Purchase Here</h2>
              {paypalProduct.removeShipping && (
                <p className={styles.accessoryInformationText}>
                  Free shipping on all accessories purchased with the {paypalProduct.name}!
                </p>
              )}
              <div className={styles.productsForSale}>
                <ProductListing
                  productToSell={paypalProduct}
                  removeShippingFromAccessories={paypalProduct.removeShipping}
                  key={`${paypalProduct}-listing`}
                />
                <h3 className={styles.accessoryHeading}>{`${paypalProduct.name} Accessories`}</h3>
                <p className={styles.accessoryInformationText}>
                  Get 25% off all accessories purchased with the V.I.P Warranty!
                </p>
                {accessories.map((accessory, ix) => {
                  if (accessory._type === 'product-accessory-group') {
                    return (
                      <div className={styles.accessoryGroup} key={`${accessory.name}-${ix}`}>
                        <h3 className={styles.accessoryHeading}>{accessory.name}</h3>
                        {accessory.informationText && (
                          <p className={styles.accessoryInformationText}>
                            {accessory.informationText}
                          </p>
                        )}
                        <div className={styles.accessoryGroupProducts}>
                          {accessory.relatedAccessories.map((relatedAccessory, aix) => (
                            <ProductListing
                              productToSell={relatedAccessory}
                              key={`${relatedAccessory.name}-${aix}`}
                              disabled={
                                relatedAccessoryIsInCart(
                                  relatedAccessory,
                                  accessory.relatedAccessories
                                )
                                  ? true
                                  : false
                              }
                            />
                          ))}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <ProductListing productToSell={accessory} key={`${accessory.name}-${ix}`} />
                    );
                  }
                })}
              </div>
            </div>
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
