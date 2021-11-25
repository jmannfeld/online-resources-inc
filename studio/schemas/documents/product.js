import { BiBarcode } from 'react-icons/bi'

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
    {
      title: 'Image gallery',
      name: 'gallery',
      type: 'array',
      of: [{ 
        type: 'image',
        fields: [
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
            options: {
              isHighlighted: true // <-- make this field easily accessible
            }
          },
        ]
      }],
    },
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
      type: 'text'
    },
    {
      title: 'Brochure',
      name: 'brochure',
      type: 'file'
    },
    {
      title: 'Tech specs',
      name: 'techSpecs',
      type: 'techSpecs',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
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
      title: 'Public',
      name: 'public',
      type: 'boolean',
      description: 'Display this product on the public website'
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
      }
    }
  }
}
