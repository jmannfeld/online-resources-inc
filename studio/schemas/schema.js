// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import customerReview from './documents/customerReview'
import industry from './documents/industry'
import manufacturer from './documents/manufacturer'
import page from './documents/page'
import product from './documents/product'
import productCategory from './documents/productCategory'
import route from './documents/route'
import siteConfig from './documents/siteConfig'
import teamMember from './documents/teamMember'

// Object types
import address from './objects/address'
import cta from './objects/cta'
import embedHTML from './objects/embedHTML'
import figure from './objects/figure'
import internalLink from './objects/internalLink'
import link from './objects/link'
import logoImageBlock from './objects/logoImageBlock'
import portableText from './objects/portableText'
import simplePortableText from './objects/simplePortableText'
import socialMedia from './objects/socialMedia'

// Landing page sections
import hero from './objects/hero'
import imageSection from './objects/imageSection'
import mailchimp from './objects/mailchimp'
import textSection from './objects/textSection'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our document types
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // objects
    address,
    cta,
    embedHTML,
    figure,
    hero,
    imageSection,
    internalLink,
    link,
    logoImageBlock,
    mailchimp,
    portableText,
    simplePortableText,
    siteConfig,
    socialMedia,
    textSection,
    // documents
    page,
    route,
    product,
    productCategory,
    manufacturer,
    industry,
    teamMember,
    customerReview
  ])
})
