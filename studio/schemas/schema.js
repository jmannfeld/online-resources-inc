// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document types
import customerReview from './documents/customerReview';
import industry from './documents/industry';
import manufacturer from './documents/manufacturer';
import page from './documents/page';
import product from './documents/product';
import productAccessory from './documents/productAccessory';
import productAccessoryGroup from './documents/productAccessoryGroup';
import productCategory from './documents/productCategory';
import route from './documents/route';
import siteConfig from './documents/siteConfig';
import teamMember from './documents/teamMember';

// Object types
import address from './objects/address';
import benefits from './objects/benefits';
import contactForm from './objects/contactForm';
import cta from './objects/cta';
import embedHTML from './objects/embedHTML';
import externalUrl from './objects/externalUrl';
import figure from './objects/figure';
import galleryImage from './objects/galleryImage';
import industryList from './objects/industryList';
import internalLink from './objects/internalLink';
import link from './objects/link';
import logoImageBlock from './objects/logoImageBlock';
import portableText from './objects/portableText';
import priceBreakdown from './objects/priceBreakdown';
import simplePortableText from './objects/simplePortableText';
import serviceForm from './objects/serviceForm';
import signupForm from './objects/signupForm';
import socialMedia from './objects/socialMedia';
import techSpecs from './objects/techSpecs';

// Landing page sections
import companyContact from './objects/companyContact';
import hero from './objects/hero';
import imageSection from './objects/imageSection';
import mailchimp from './objects/mailchimp';
import productList from './objects/productList';
import teamList from './objects/teamList';
import textSection from './objects/textSection';
import textSectionSplit from './objects/textSectionSplit';
import youtubeEmbed from './objects/youtubeEmbed';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our document types
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // objects
    address,
    benefits,
    companyContact,
    contactForm,
    cta,
    embedHTML,
    externalUrl,
    figure,
    galleryImage,
    hero,
    imageSection,
    industryList,
    internalLink,
    link,
    logoImageBlock,
    mailchimp,
    portableText,
    priceBreakdown,
    productList,
    serviceForm,
    signupForm,
    simplePortableText,
    siteConfig,
    socialMedia,
    techSpecs,
    teamList,
    textSection,
    textSectionSplit,
    youtubeEmbed,
    // documents
    page,
    route,
    product,
    productAccessory,
    productAccessoryGroup,
    productCategory,
    manufacturer,
    industry,
    teamMember,
    customerReview
  ])
});
