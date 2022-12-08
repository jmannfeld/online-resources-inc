import { BiBarcode } from 'react-icons/bi';
import PriceInput from '../custom-inputs/PriceInput';

export default {
  title: 'Product',
  name: 'product',
  type: 'document',
  icon: BiBarcode,
  fieldsets: [
    {
      title: 'Tech Specs',
      name: 'tech-specs',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2
      },
      description: 'Select a category to enter specifications'
    },
    {
      title: 'Price information',
      name: 'price-information',
      options: {
        columns: 2
      },
      description: 'All price information is required to sell this product',
      hidden: ({ document }) => !document.acceptPaypal
    }
  ],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Display image',
      name: 'image',
      type: 'image'
    },
    // {
    //   title: 'Image gallery',
    //   name: 'gallery',
    //   type: 'array',
    //   of: [{ type: 'galleryImage' }]
    // },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: ['Hardware', 'Software'],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{ type: 'product-category' }]
    },
    {
      title: 'Manufacturer',
      name: 'manufacturer',
      type: 'reference',
      to: [{ type: 'manufacturer' }]
    },
    {
      title: 'Industries',
      name: 'industries',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'industry'
            }
          ]
        }
      ]
    },
    {
      title: 'Description',
      name: 'description',
      type: 'portableText'
    },
    {
      title: 'Brochure',
      name: 'brochure',
      type: 'file'
    },
    {
      title: 'Tech specs',
      name: 'techSpecs',
      type: 'techSpecs'
    },
    {
      title: '3D model embed',
      name: 'embed3dModel',
      type: 'embedHTML',
      description: 'This will display in place of the main product image'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'This is the URL for the product',
      options: {
        source: 'name',
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 200)
      }
    },
    {
      title: 'Make public',
      name: 'public',
      type: 'boolean',
      description: 'Display this product on the public website',
      initialValue: false
    },
    {
      title: 'Sell on PayPal',
      name: 'acceptPaypal',
      type: 'boolean',
      description: 'Sell this product on the public website and accept payments via PayPal',
      initialValue: false
    },
    {
      title: 'Item price',
      name: 'price',
      type: 'string',
      description: 'Price of the product in USD',
      inputComponent: PriceInput,
      fieldset: 'price-information',
      validation: Rule =>
        Rule.custom((price, context) => {
          const priceIsRequired = context.document.acceptPaypal;
          if (
            priceIsRequired &&
            (context.document.price === '' || context.document.price === undefined)
          ) {
            return 'A price is required if you want to sell this product on the public website';
          }
          return true;
        })
    },
    {
      title: 'Shipping',
      name: 'shipping',
      type: 'string',
      description: 'Cost of shipping the product in USD',
      inputComponent: PriceInput,
      fieldset: 'price-information',
      validation: Rule =>
        Rule.custom((price, context) => {
          const priceIsRequired = context.document.acceptPaypal;
          if (
            priceIsRequired &&
            (context.document.shipping === '' || context.document.shipping === undefined)
          ) {
            return 'A shipping price is required if you want to sell this product on the public website';
          }
          return true;
        })
    },
    {
      title: 'Accessories for sale',
      name: 'accessories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product-accessory' }, { type: 'product-accessory-group' }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      sku: 'sku',
      media: 'image'
    },
    prepare({ title, sku, media }) {
      return {
        title,
        subtitle: sku ? `SKU: ${sku}` : '',
        media
      };
    }
  }
};
