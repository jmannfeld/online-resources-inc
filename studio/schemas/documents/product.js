import { BiBarcode } from 'react-icons/bi'

export default {
  title: 'Product',
  name: 'product',
  type: 'document',
  icon: BiBarcode,
  fieldsets: [{
    name: 'tech-specs', title: 'Tech Specs', options: {
      collapsible: true,
      collapsed: true,
      columns: 2
    },
    description: 'Select a category to enter specifications'
  }],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'SKU',
      name: 'sku',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text'
    },
    {
      title: 'Manufacturer',
      name: 'manufacturer',
      type: 'reference',
      to: [{ type: 'manufacturer' }]
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{ type: 'product-category' }]
    },
    {
      title: 'Brochure',
      name: 'brochure',
      type: 'file'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      }
    },
    {
      title: 'Accuracy',
      name: 'accuracy',
      type: 'string',
      fieldset: 'tech-specs',
      hidden: ({ document }) => !document?.category
    },
    {
      title: 'Weight',
      name: 'weight',
      type: 'string',
      fieldset: 'tech-specs',
      hidden: ({ document }) => !document?.category
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Public',
      name: 'public',
      type: 'boolean',
      description: 'Display product on the public website'
    },
  ],
  preview: {
    select: {
      title: 'name',
      // subtitle: ''
      // media: ''
    },
  },
}
